'use server'

import React from 'react'
import Link from 'next/link'

import { isAuthenticated } from '../_modules/auth/actions'
import LogoutButton from '@/app/_modules/auth/components/logout-button'
import ClientPage from './ClientPage'

const page = async () => {
  const { user } = await isAuthenticated();

  return (
    <div className='w-full px-4'>
      <ClientPage user={user} />
    </div>
  )
}

export async function generateMetadata() {
 return {title: "Massive | Home",}
}

export default page

