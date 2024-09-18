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


type NavigationItem = {
  label: string
  icon: React.ElementType;
  link: string;
  active: boolean;
}

const UitgeklaptMainSideMenu = () => {
  const setInitialWebsiteDetails = useWebsiteDetailsStore(state => state.initialteWebsiteDetails)
  const [navigation, setNavigation] = React.useState<NavigationItem[]>([
    { label: 'Home', icon: Squares2X2Icon, link: '/app', active: false },
    { label: 'Keyword Tracker', icon: ViewfinderCircleIcon, link: '/app/keyword-tracker', active: false },
    { label: 'Settings', icon: Cog6ToothIcon, link: '/app/settings', active: false },
    { label: 'Billing', icon: CreditCardIcon, link: '/app/billing', active: false },
    { label: 'Integrations', icon: LinkIcon, link: '/app/integrations', active: false },
  ])
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

  useEffect(() => {
    console.log('pathname', pathname)

    setNavigation([
      { label: 'Home', icon: Squares2X2Icon, link: '/app', active: pathname === '/app' },
      { label: 'Keyword Tracker', icon: ViewfinderCircleIcon, link: '/app/keyword-tracker', active: false },
      { label: 'Settings', icon: Cog6ToothIcon, link: '/app/settings', active: pathname === '/app/settings' },
      { label: 'Billing', icon: CreditCardIcon, link: '/app/settings/billing', active: pathname === '/app/settings/billing' },
      { label: 'Integrations', icon: LinkIcon, link: '/app/settings/integrations', active: pathname === '/app/settings/integrations' },
    ])
  }, [pathname])



  return (
    <div className='w-[328px] flex flex-col h-screen pl-[18px] pr-[10px] pb-4'>
      <div className='h-full pl-[18px] pr-[10px] pb-4 w-[328px]'>
        <Logo />
        <div className='py-3'>
          <WebsiteSelectionButton websites={websites} />
        </div>

        <div>
          <NavLabel>Main Menu</NavLabel>
          {navigation.map((item, index) => (
            <NavItem key={index} item={item} />
          ))}
        </div>
      </div>

      <div className='mt-auto'>
        <MainSideBarUserActions />
      </div>
    </div>
  )
}


// Uitgeklapte nav

const NavLabel = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className='text-xs theme-t-n px-3 py-1'>{children}</p>
  )
}

const NavItem = ({ item }: { item: NavigationItem }) => {
  return (
    <Link
      href={item.link}
      className={cn(
        'h-[52px] p-3 flex gap-2 items-center',
        item.active ? 'theme-bg-w border-x theme-b-p ' : ''
      )}>
      <item.icon
        className={cn(
          'w-6 h-6 ',
          item.active ? 'text-base-500' : 'theme-t-n'
        )} />
      <p
        className={cn(
          item.active ? 'theme-t-p' : 'theme-t-n'
        )}
      >{item.label}</p>
    </Link >
  )
}

const Logo = () => {
  return (
    <div className='h-[76px] flex'>
      <div className='mt-auto ml-2 mb-2 flex items-center gap-2.5'>
        <div className='w-[52px] h-[52px] theme-bg-w flex items-center justify-center  molecule rounded-lg before:rounded-lg after:rounded-[14px]'>
          <div className='w-[26px]'>
            <MassiveLogoColor />
          </div>
        </div>
        <div><MassiveTextDash /></div>
      </div>
    </div>
  )
}



export default UitgeklaptMainSideMenu