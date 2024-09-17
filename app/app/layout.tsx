import React from 'react'
import Providers from './providers'
import MainSideMenu from '@/app/_components/side-menu/MainSideMenu'

export default function layout(
  { children }: { children: React.ReactNode }
) {
  return (
    <Providers>
      {/* TODO: FIX? RIGHT BG clolro */}
      <div className='flex min-w-screen min-h-screen overflow-y-hidden overflow-x-auto bg-base-50 dark:bg-base-950'>

        <div className=''>
          <MainSideMenu />
        </div>

        {children}
      
      </div>
    </Providers>
  )
}

