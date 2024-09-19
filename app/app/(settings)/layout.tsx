import React from 'react'

import SettingsSideMenu from '@/app/_components/side-menu/SettingsSideMenu'

export default function Layout(
  { children }: { children: React.ReactNode }
) {

  return (
    <>
      <SettingsSideMenu />

      <div className='pr-3 w-full'>

        {/* Calc height needs to be the height of the top bar above */}
        <div className='h-[calc(100vh-79px)] overflow-y-auto custom-scrollbar -mr-3 pr-[3px]'>
          {children}
        </div>
      </div>
    </>
  )
}
