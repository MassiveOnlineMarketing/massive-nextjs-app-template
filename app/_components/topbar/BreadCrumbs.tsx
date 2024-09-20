import { HomeIcon } from '@heroicons/react/20/solid'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'

const BreadCrumbs = () => {
  return (
    <div className='flex gap-4 w-fit pr-8 items-center text-nowrap  molecule hover:after:border-[5px] hover:after:-top-[5px] hover:after:-left-[5px] rounded-[32px] before:rounded-[32px] after:rounded-[32px] '>
      <HomeButton />
      <ChevronRightIcon className='w-3 h-3 theme-t-n' />
      <Link href='/app/settings' className='theme-t-t hover:underline underline-offset-2'>Settings</Link>
      <ChevronRightIcon className='w-3 h-3 theme-t-n'/>
      <Link href='/app/settings' className='theme-t-p hover:underline underline-offset-2'>Massive Online Marketing</Link>
    </div>
  )
}

const HomeButton = () => {

  return(
    <Link href='/app' className='theme-bg-p ml-1.5 my-1.5  py-1.5 px-4 rounded-[30px] group/HomeIcon hover:theme-bg-s'>
      <HomeIcon className='w-5 h-5 theme-t-n group-hover/HomeIcon:fill-slate-500'/>
    </Link>
  )
}

export default BreadCrumbs