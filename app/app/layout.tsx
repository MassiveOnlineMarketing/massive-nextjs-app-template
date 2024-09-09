import Link from 'next/link'
import React from 'react'
import SettingsNavBar from './settings/_components/SettingsNavBar'
import Providers from './providers'

export default function layout(
  { children }: { children: React.ReactNode }
) {
  return (
    <Providers>
      <div className='flex min-h-screen bg-p-25 dark:bg-p-1100'>
        <div className='w-[328px]'>

          <SettingsNavBar />
          {/* Side bar
        <div className='flex flex-col mt-2'>
          <Link href='/app'>
            home
          </Link>
          <Link href='/app/settings/website'>
            Website
          </Link>
          <Link href='/app/settings/profile'>
            Profile
          </Link>
        </div> */}
        </div>
        <div className='w-full px-3 pt-3 layout'>
          <div className='h-fit bg-white dark:bg-p-1100 rounded-t-xl border border-light-stroke dark:border-dark-stroke'>
            <div className='h-[calc(100vh-14px)] custom-scrollbar -mr-3 pr-[3px]'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </Providers>
  )
}

