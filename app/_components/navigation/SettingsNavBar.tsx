'use client';

import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useWebsiteDetailsStore } from '@/app/_stores/useWebsiteDetailsStore';

import { cn } from '@/app/_components/utils';
import ThemeSwitcher from '@/app/_components/ui/ThemeSwitcher';

import { LinkIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/20/solid';

type NavItem = {
  href: string,
  text: string,
  icon: React.ElementType
}

const SettingsSideBar = () => {
  const router = useRouter()
  const websiteStore = useWebsiteDetailsStore(state => state.websites)

  const navItems = [
    { href: '/app/settings/profile', text: 'Profile Settings', icon: UserCircleIcon },
    { href: '/app/settings/integrations', text: 'Integrations', icon: LinkIcon },
  ]


  const [websitesListExpanded, setWebsitesListExpanded] = React.useState(false)

  const handleAddWebsite = () => {
    console.log('add website')
    router.push('/app/settings/website')
  }

  return (
    <div className='p-4 w-[300px] h-full'>
      <ThemeSwitcher />

      <div className='pb-6'>
        <p className='text-slate-400 text-sm font-light pt-4 pb-1 px-3'>Account Settings</p>
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            navItem={item}
            className='text-p-800'
          >
            {item.text}
          </NavItem>
        ))}
      </div>

      <div>
        <div className='flex justify-between items-center'>
          <button
            className='flex items-center gap-[6px]'
            onClick={() => setWebsitesListExpanded(!websitesListExpanded)}
          >
            <div className={websitesListExpanded ? 'rotate-90' : ''}>
              <Svg />
            </div>
            <p className='text-slate-500 text-sm '>
              Websites
              {websiteStore && websiteStore.length > 0 && (
                <span className='text-[#94A3B8] text-[12px] ml-1'>({websiteStore.length})</span>
              )}
            </p>
          </button>
          <button onClick={handleAddWebsite}>
            +
          </button>
        </div>


        {websitesListExpanded && (
          <div className={cn(
            'mt-2 overflow-hidden',
            websitesListExpanded ? 'animate-accordion-down ' : 'animate-accordion-up'
          )}>
            {websiteStore?.map((website, index) => (
              <Link key={index} href={`/app/settings/website/${website.id}`}>
                <div className='flex items-center gap-2 text-slate-600 p-3'>
                  <p>{website.websiteName}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

const NavItem = ({ navItem, children, className }: { navItem: NavItem, children: React.ReactNode, className: string }) => {
  return (
    <Link href={navItem.href} className={cn(
      'p-3 flex items-center gap-2 text-slate-600',
      className
    )}>
      <navItem.icon className='w-5 h-5 text-slate-400' />

      {children}
    </Link>
  )
}

const Svg = () => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.25 6.79907C6.25009 6.59755 6.30432 6.39974 6.40701 6.22634C6.50969 6.05294 6.65708 5.91031 6.83374 5.81335C7.01041 5.71639 7.20988 5.66867 7.41131 5.67518C7.61273 5.68168 7.8087 5.74217 7.97875 5.85032L13.0082 9.05057C13.1679 9.15218 13.2994 9.29243 13.3905 9.45833C13.4815 9.62424 13.5293 9.81044 13.5293 9.9997C13.5293 10.189 13.4815 10.3752 13.3905 10.5411C13.2994 10.707 13.1679 10.8472 13.0082 10.9488L7.97875 14.1498C7.80865 14.258 7.6126 14.3185 7.41112 14.325C7.20963 14.3314 7.01011 14.2837 6.83342 14.1866C6.65672 14.0896 6.50935 13.9468 6.40672 13.7733C6.30409 13.5998 6.24996 13.4019 6.25 13.2003L6.25 6.79907Z" fill="#94A3B8" />
    </svg>

  )
}

export default SettingsSideBar