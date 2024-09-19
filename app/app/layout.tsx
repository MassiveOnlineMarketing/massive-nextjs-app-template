import React from 'react'
import Providers from './providers'

import Topbar from '../_components/topbar/Topbar'
import MainSideMenu from '@/app/_components/side-menu/MainSideMenu'

export default function layout(
  { children }: { children: React.ReactNode }
) {
  return (
    <Providers>
      {/* TODO: FIX? RIGHT BG clolro */}
      <div className='min-w-screen min-h-screen overflow-y-hidden overflow-x-auto bg-base-50 dark:bg-base-950'>
        <Topbar />

        <div className='flex h-[calc(100vh-79px)] w-full'>
          <MainSideMenu />
          {children}
        </div>

      </div>
    </Providers>
  )
}

