'use client';

import Link from 'next/link';
import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation';

import { useCurrentUser } from '@/app/_modules/auth/hooks/user-current-user';
import { useWebsiteDetailsStore } from '@/app/_stores/useWebsiteDetailsStore';

import { getWebsiteWithLocationByUser } from '@/app/_actions/website.actions';

import WebsiteSelectionButton from './WebsiteSelectionButton';

import { cn } from '../utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { CreditCardIcon, LinkIcon, Squares2X2Icon, ViewfinderCircleIcon, Cog6ToothIcon } from '@heroicons/react/20/solid';


type NavigationItem = {
  label: string
  icon: React.ElementType;
  link: string;
  active: boolean;
}

const MainSideMenu = () => {
  const setInitialWebsiteDetails = useWebsiteDetailsStore(state => state.initialteWebsiteDetails)
  const user = useCurrentUser()
  const pathname = usePathname();

  const selectedWebsiteId = useWebsiteDetailsStore((state) => state.selectedWebsite?.id) ?? ''
  const selectedKeywordTrackerId = useWebsiteDetailsStore((state) => state.selectedLocation?.keywordTrackerToolId)
  const keywordTrackerLink = selectedKeywordTrackerId
  ? `/app/google-keyword-tracker/${selectedKeywordTrackerId}`
  : '/app/google-keyword-tracker';

  const [navigation, setNavigation] = React.useState<NavigationItem[]>([
    {
      label: 'Home',
      icon: Squares2X2Icon,
      link: '/app',
      active: isActive('/app', pathname)
    },
    {
      label: 'Keyword Tracker',
      icon: ViewfinderCircleIcon,
      link: keywordTrackerLink,
      active: isActive('/app/google-keyword-tracker', pathname)
    },
    {
      label: 'Settings',
      icon: Cog6ToothIcon,
      link: `/app/settings/website/${selectedWebsiteId}`,
      active: isActive('/app/settings', pathname)
    },
    {
      label: 'Billing',
      icon: CreditCardIcon,
      link: '/app/billing',
      active: isActive('/app/billing', pathname)
    },
    {
      label: 'Integrations',
      icon: LinkIcon,
      link: '/app/integrations',
      active: isActive('/app/integrations', pathname)
    },
  ])
  const [secondarySidebarOpen, setSecondarySidebarOpen] = React.useState(true)

  useEffect(() => {
    const fetchWebsites = async () => {
      if (!user) return
      const res = await getWebsiteWithLocationByUser(user.id)
      console.log('fetch initial websiteStore')
      if (res.error) {
        console.log('error', res.error)
      }

      if (res.website || res.error === 'Must be logged in to get a website') {
        console.log('settings initial websites details', res.website)
        setInitialWebsiteDetails(res.website || [])
      }
    }

    fetchWebsites()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update navigation items on pathname change, selectedWebsiteId or selectedKeywordTrackerId
  useEffect(() => {
    setNavigation([
      {
        label: 'Home',
        icon: Squares2X2Icon,
        link: '/app',
        active: isActive('/app', pathname)
      },
      {
        label: 'Keyword Tracker',
        icon: ViewfinderCircleIcon,
        link: keywordTrackerLink,
        active: isActive('/app/google-keyword-tracker', pathname)
      },
      {
        label: 'Settings',
        icon: Cog6ToothIcon,
        link: `/app/settings/website/${selectedWebsiteId}`,
        active: isActive('/app/settings', pathname)
      },
      {
        label: 'Billing',
        icon: CreditCardIcon,
        link: '/app/billing',
        active: isActive('/app/billing', pathname)
      },
      {
        label: 'Integrations',
        icon: LinkIcon,
        link: '/app/integrations',
        active: isActive('/app/integrations', pathname)
      },
    ])
  }, [pathname, selectedKeywordTrackerId, selectedWebsiteId])

  const websites = useWebsiteDetailsStore((state) => state.websites)

  return (
    <div className={cn(
      'group/openClose',
      'relative w-[80px] flex flex-col h-full pl-[18px] pr-[10px] pb-4',
      'transition-width duration-300',
      secondarySidebarOpen ? 'w-[328px]' : 'w-[80px]',
    )}>

      <div className='h-[88px] flex items-center' >
        <WebsiteSelectionButton websites={websites} isOpen={secondarySidebarOpen} />
      </div>

      <div className='flex flex-col'>
        <NavLabelWith isOpen={secondarySidebarOpen}>Main Menu</NavLabelWith>
        {navigation.map((item, index) => (
          <NavItemWith key={index} item={item} isOpen={secondarySidebarOpen} />
        ))}
      </div>


      {/* Open en Close secondary sidebar */}
      <div className="absolute w-4 h-fit -right-1 top-1/2 -translate-y-1/2 z-50">
        <Tooltip>
          <TooltipTrigger className="w-8 h-[72px]">
            <div
              className="h-[72px] w-8 items-center justify-center group hidden group-hover/openClose:flex "
              onClick={() => setSecondarySidebarOpen(!secondarySidebarOpen)}
            >
              <div className="flex h-6 w-6 flex-col items-center">
                <div
                  className={cn(
                    "h-3 w-1 rounded-full bg-gray-500 translate-y-[0.15rem] duration-300 ease-in-out",
                    secondarySidebarOpen
                      ? "group-hover:rotate-[15deg]"
                      : "group-hover:rotate-[-15deg]",
                  )}
                ></div>
                <div
                  className={cn(
                    "h-3 w-1 rounded-full bg-gray-500 translate-y-[-0.15rem] duration-300 ease-in-out",
                    secondarySidebarOpen
                      ? "group-hover:rotate-[-15deg]"
                      : "group-hover:rotate-[15deg]",
                  )}
                ></div>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{secondarySidebarOpen ? "Close" : "Open"}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}

function isActive(href: string, pathname: string) {
  return (
    (href === "/app" && pathname === href) ||
    (pathname.includes(href) && href !== "/app")
  );
};

const NavLabelWith = ({ children, isOpen }: { children: React.ReactNode, isOpen: boolean }) => {
  return (
    <p className={cn(
      'text-xs text-nowrap  px-3 py-1 text-base-50',
      isOpen ? 'theme-t-n w-[244px]' : 'w-0',
    )}>{children}</p>
  )
}

const NavItemWith = ({ item, isOpen }: { item: NavigationItem, isOpen: boolean }) => {
  return (
    <Link
      href={item.link}
      className={cn(
        'h-[52px] w-full flex items-center theme-b-p pb-1 group hover:rounded-[10px] hover:bg-theme-light-background-secondary hover:dark:bg-theme-night-background-primary',
        isOpen
          ? item.active ? 'theme-bg-w rounded-none border-x before:border-0 after:border-0 hover:bg-white' : ''
          : item.active ? 'molecule rounded-[8px] before:rounded-[8px] after:rounded-[12px] before:left-0 before:top-0' : '',
      )}>
      <div className='min-w-[52px] min-h-[52px]  flex items-center justify-center p-3'>
        <item.icon
          className={cn(
            'w-6 h-6 group-hover:fill-base-500',
            item.active ? 'text-base-500 ' : 'theme-t-n'
          )} />
      </div>
      <p
        className={cn(
          'text-nowrap overflow-hidden transition-width duration-300 underline:text-green-900 group-hover:text-base-500',
          item.active ? 'theme-t-p' : 'theme-t-n',
          isOpen ? 'w-[244px]' : 'w-0',
        )}
      >{item.label}</p>
    </Link >
  )
}


export default MainSideMenu