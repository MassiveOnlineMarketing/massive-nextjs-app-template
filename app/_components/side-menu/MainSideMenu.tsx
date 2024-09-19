'use client';

import { useWebsiteDetailsStore } from '@/app/_stores/useWebsiteDetailsStore';
import React, { useEffect } from 'react'
import WebsiteSelectionButton from './WebsiteSelectionButton';
import { useCurrentUser } from '@/app/_modules/auth/hooks/user-current-user';
import { getWebsiteWithLocationByUser } from '@/app/_actions/website.actions';
import WebsiteSelectionButtonHover from './WebsiteSelectionButtonHover';
import { MassiveLogoColor, MassiveTextDash } from '@/assets/branding';
import { CreditCardIcon, LinkIcon, Squares2X2Icon, ViewfinderCircleIcon, Cog6ToothIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../utils';
import { MainSideBarUserActions } from './MainSideBarUserActions';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';


type NavigationItem = {
  label: string
  icon: React.ElementType;
  link: string;
  active: boolean;
}

function isActive(href: string, pathname: string) {
  // console.log('href', href)
  // console.log('pathname', pathname)
  return (
    (href === "/app" && pathname === href) ||
    (pathname.includes(href) && href !== "/app")
  );
};

const MainSideMenu = () => {
  const setInitialWebsiteDetails = useWebsiteDetailsStore(state => state.initialteWebsiteDetails)
  const [navigation, setNavigation] = React.useState<NavigationItem[]>([
    { label: 'Home', icon: Squares2X2Icon, link: '/app', active: false },
    { label: 'Keyword Tracker', icon: ViewfinderCircleIcon, link: '/app/keyword-tracker', active: false },
    { label: 'Settings', icon: Cog6ToothIcon, link: '/app/settings', active: false },
    { label: 'Billing', icon: CreditCardIcon, link: '/app/billing', active: false },
    { label: 'Integrations', icon: LinkIcon, link: '/app/integrations', active: false },
  ])
  const [secondarySidebarOpen, setSecondarySidebarOpen] = React.useState(true)

  const user = useCurrentUser()
  const pathname = usePathname();

  useEffect(() => {
    const fetchWebsites = async () => {
      if (!user) return
      const res = await getWebsiteWithLocationByUser(user.id)
      console.log('fetch initial websiteStore', res)
      if (res.error) {
        console.log('error', res.error)
      }

      if (res.website || res.error === 'Must be logged in to get a website') {
        console.log('settings initial websites details', res.website)
        setInitialWebsiteDetails(res.website || [])
      }
    }

    fetchWebsites()
  }, [])

  const websites = useWebsiteDetailsStore((state) => state.websites)
  const selectedWebsiteId = useWebsiteDetailsStore((state) => state.selectedWebsite?.id) ?? null
  const selectedKeywordTrackerId = useWebsiteDetailsStore((state) => state.selectedLocation?.keywordTrackerToolId) ?? null

  useEffect(() => {
    console.log('pathname', pathname)
    const keywordTrackerLink = selectedKeywordTrackerId
      ? `/app/google-keyword-tracker/${selectedKeywordTrackerId}`
      : '/app/google-keyword-tracker';

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
  }, [pathname])


  return (
    <div className={cn(
      'relative w-[80px] flex flex-col h-screen pl-[18px] pr-[10px] pb-4',
      'transition-width duration-300',
      secondarySidebarOpen ? 'w-[328px]' : 'w-[80px]',
    )}>
      <div className='w-full h-[76px] flex'>
        <LogoWithHover isOpen={secondarySidebarOpen} />
      </div>
      <div className='h-[88px] flex items-center' >
        <WebsiteSelectionButtonHover websites={websites} isOpen={secondarySidebarOpen} />
      </div>

      <div className='flex flex-col'>
        <NavLabelWithHover isOpen={secondarySidebarOpen}>Main Menu</NavLabelWithHover>
        {navigation.map((item, index) => (
          <NavItemWithHover key={index} item={item} isOpen={secondarySidebarOpen} />
        ))}
      </div>

      <div className='mt-auto'>
        <MainSideBarUserActions />
      </div>

      {/* Open en Close secondary sidebar */}
      <div className="absolute w-4 h-fit -right-1 top-1/2 -translate-y-1/2 z-50">
        <Tooltip>
          <TooltipTrigger className="w-8 h-[72px]">
            <div
              className="flex h-[72px] w-8 items-center justify-center group "
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


// Group hover nav

const NavLabelWithHover = ({ children, isOpen }: { children: React.ReactNode, isOpen: boolean }) => {
  return (
    <p className={cn(
      'text-xs text-nowrap  px-3 py-1 text-base-50',
      isOpen ? 'theme-t-n w-[244px]' : 'w-0',
    )}>{children}</p>
  )
}

const NavItemWithHover = ({ item, isOpen }: { item: NavigationItem, isOpen: boolean }) => {
  return (
    <Link
      href={item.link}
      className={cn(
        'h-[52px] w-full  flex items-center theme-b-p',
        isOpen
          ? item.active ? 'theme-bg-w rounded-none border-x before:border-0 after:border-0' : ''
          : item.active ? 'molecule rounded-[8px] before:rounded-[8px] after:rounded-[12px] before:left-0 before:top-0' : '',
      )}>
      <div className='min-w-[52px] min-h-[52px]  flex items-center justify-center p-3'>
        <item.icon
          className={cn(
            'w-6 h-6 ',
            item.active ? 'text-base-500' : 'theme-t-n'
          )} />
      </div>
      <p
        className={cn(
          'text-nowrap overflow-hidden transition-width duration-300',
          item.active ? 'theme-t-p' : 'theme-t-n',
          isOpen ? 'w-[244px]' : 'w-0',
        )}
      >{item.label}</p>
    </Link >
  )
}


const LogoWithHover = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className='mt-auto mb-2 flex items-center gap-2.5'>
      <div className='w-[52px] h-[52px] theme-bg-w flex items-center justify-center  molecule rounded-lg before:rounded-lg after:rounded-[14px]'>
        <div className='w-[26px]'>
          <MassiveLogoColor />
        </div>
      </div>
      <div className={cn(
        'overflow-hidden transition-width duration-300',
        isOpen ? 'w-[244px]' : 'w-0',
      )}>
        <MassiveTextDash />
      </div>
    </div>
  )
}

export default MainSideMenu