import React from 'react'
import Providers from './providers'
import MainSideBar from '../_components/navigation/MainSideBar'

export default function layout(
  { children }: { children: React.ReactNode }
) {
  return (
    <Providers>
      <div className='flex min-h-screen bg-p-25 dark:bg-p-1100'>
        <MainSideBar />

        {children}
      </div>
    </Providers>
  )
}

