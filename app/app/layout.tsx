import React from 'react'
import Providers from './providers'
import MainSideBar from '../_components/navigation/MainSideBar'

export default function layout(
  { children }: { children: React.ReactNode }
) {
  return (
    <Providers>
      {/* TODO: FIX? RIGHT BG clolro */}
      <div className='relative flex min-h-screen bg-base-50 dark:bg-base-950'>
        <div className='h-[68px] pt-4 pl-2 pb-2 absolute top-0 left-4 flex items-center gap-2.5'>
          <div className='w-[52px] h-[52px] theme-bg-w molecule rounded-lg before:rounded-lg after:rounded-lg'></div>
          <p>Massive</p>
        </div>

        <div className='mt-[68px]'>
          <MainSideBar />
        </div>

        {children}
      
      </div>
    </Providers>
  )
}

