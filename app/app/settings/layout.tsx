'use client';

import React, { useEffect } from 'react'

import { useCurrentUser } from '@/app/_modules/auth/hooks/user-current-user';
import { useWebsiteDetailsStore } from '@/app/_stores/useWebsiteDetailsStore';

import { getWebsiteWithLocationByUser } from '@/app/_actions/website.actions';

import Topbar from '@/app/_components/topbar/Topbar'
import SettingsSideMenu from '@/app/_components/side-menu/SettingsSideMenu'

export default function Layout(
  { children }: { children: React.ReactNode }
) {

  return (
    <>
      <div className='mt-[68px]'>
        <SettingsSideMenu />
      </div>

      <div className='pr-3 w-full'>
        <div className='py-4'>
          <Topbar />
        </div>
        {/* Calc height needs to be the height of the top bar above */}
        <div className='h-[calc(100vh-79px)] overflow-y-auto custom-scrollbar -mr-3 pr-[3px]'>
          {children}
        </div>
      </div>
    </>
  )
}
