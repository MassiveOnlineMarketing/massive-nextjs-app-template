import Topbar from '@/app/_components/topbar/Topbar'
import React from 'react'

export default function layout(
  { children }: { children: React.ReactNode }
) {
  return (
    <div className='px-3 w-full'>
      <div className='h-fit w-full theme-bg-w rounded-t-xl border border-light-stroke dark:border-dark-stroke'>
        {/* Calc height needs to be the height of the top bar above */}
        <div className='h-[calc(100vh-79px)] custom-scrollbar -mr-3 pr-[3px]'>
          {children}
        </div>
      </div>
    </div>
  )
}

