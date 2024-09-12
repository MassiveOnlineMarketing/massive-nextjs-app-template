'use server'

import React from 'react'
import Link from 'next/link'

import LogoutButton from '@/app/_modules/auth/components/logout-button'
import ClientPage from './ClientPage'
import { isAllowedToViewPage } from '@/app/_modules/auth/pageAuth'
import { Dialog, DialogContent } from '../_components/ui/dialog'

const page = async () => {
  const session = await isAllowedToViewPage('private');

  return (
    <div>
      <Dialog open={true}>
        <DialogContent className='w-[1000px] h-[400px] bg-red-500 animate-pulse-fast flex items-center justify-center'>
          <div className='flex flex-col gap-10 justify-center text-center'>
            <div className='animate-spin'>
              <h1 className='text-3xl animate-pulse text-green-500'>ERROR</h1>
            </div>
            <div className='group hover:translate-y-32'>
            <Link className=' group-hover:animate-spin' href='/app/settings'>Settings</Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>


      <LogoutButton />
      <Link href='/auth/login'>Login</Link>
      <h1>page</h1>
      <ClientPage />
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}

export default page

