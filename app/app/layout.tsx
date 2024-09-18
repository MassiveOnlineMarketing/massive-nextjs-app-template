import React from 'react'
import Providers from './providers'
import MainSideMenu from '@/app/_components/side-menu/MainSideMenu'
import UitgeklaptMainSideMenu from '../_components/side-menu/UitgeklaptMainSideMenu'

export default function layout(
  { children }: { children: React.ReactNode }
) {
  return (
    <Providers>
      {/* TODO: FIX? RIGHT BG clolro */}
      <div className='flex min-w-screen min-h-screen overflow-y-hidden overflow-x-auto bg-base-50 dark:bg-base-950'>

        <MainSideMenu />
        {/* <UitgeklaptMainSideMenu /> */}

        {children}

      </div>
    </Providers>
  )
}

