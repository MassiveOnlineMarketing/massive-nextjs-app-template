import React from 'react'
import Providers from './providers'
import MainSideBar from '../_components/navigation/MainSideBar'
import Topbar from '../_components/navigation/Topbar'

export default function layout(
  { children }: { children: React.ReactNode }
) {
  return (
    <Providers>
      <div className='flex min-h-screen bg-p-25 dark:bg-p-1100'>
        <MainSideBar />
        <div className='px-3 w-full'>
          <div className='py-4'>
            <Topbar />
          </div>
          {children}
        </div>
      </div>
    </Providers>
  )
}

