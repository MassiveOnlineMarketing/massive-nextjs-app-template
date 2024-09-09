'use server'

import React from 'react'
import Link from 'next/link'

import LogoutButton from '@/app/_modules/auth/components/logout-button'
import ClientPage from './ClientPage'
import { isAllowedToViewPage } from '@/app/_modules/auth/pageAuth'
 
const page = async () => {
  const session = await isAllowedToViewPage('private');

  return (
    <div>


      <LogoutButton />
      <Link href='/auth/login'>Login</Link>
      <h1>page</h1>
      <ClientPage />
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}

export default page

