'use client';

import React, { useEffect } from 'react'

import { useCurrentUser } from '@/app/_modules/auth/hooks/user-current-user';
import { useWebsiteDetailsStore } from '@/app/_stores/useWebsiteDetailsStore';

import { getWebsiteWithLocationByUser } from '@/app/_actions/website.actions';

import Topbar from '@/app/_components/topbar/Topbar'
import SettingsSideBar from '@/app/_components/navigation/SettingsNavBar'

export default function Layout(
  { children }: { children: React.ReactNode }
) {

  const setInitialWebsiteDetails = useWebsiteDetailsStore(state => state.initialteWebsiteDetails)
  const user = useCurrentUser()

  useEffect(() => {
    const fetchWebsites = async () => {
      if (!user) return
      const res = await getWebsiteWithLocationByUser(user.id)
      console.log('fetch initial websiteStore', res)
      if (res.error) {
        console.log('error', res.error)
      }

      if (res.website) {
        console.log('settings initial websites details', res.website)
        setInitialWebsiteDetails(res.website)
      }
    }

    fetchWebsites()
  }, [])

  return (
    <>
      <div className='mt-[68px]'>
        <SettingsSideBar />
      </div>

      <div className='px-3 w-full'>
        <div className='py-4'>
          <Topbar />
        </div>
        {/* Calc height needs to be the height of the top bar above */}
        <div className='h-[calc(100vh-80px)]'>
          {children}
        </div>
      </div>
    </>
  )
}
