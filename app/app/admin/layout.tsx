import React from 'react'

export default function layout(
  { children }: { children: React.ReactNode }
) {
  return (
    <div className='h-fit bg-white dark:bg-p-1100 rounded-t-xl border border-light-stroke dark:border-dark-stroke'>
      <div className='h-[calc(100vh-70px)] custom-scrollbar -mr-3 pr-[3px]'>
        {children}
      </div>
    </div>
  )
}

