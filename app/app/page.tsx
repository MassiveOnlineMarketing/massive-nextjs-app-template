'use server'

import React from 'react'
import Link from 'next/link'

import { isAuthenticated } from '../_modules/auth/actions'
import LogoutButton from '@/app/_modules/auth/components/logout-button'
import ClientPage from './ClientPage'

const page = async () => {
  const { user } = await isAuthenticated();

  return (
    <div className='w-full'>
      <LogoutButton />
      <Link href='/auth/login' className='ml-2'>Login</Link>
      <ClientPage userId={user.id} />
      <p>Server Session - User</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}

export default page

