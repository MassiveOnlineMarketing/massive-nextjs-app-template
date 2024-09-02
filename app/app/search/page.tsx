'use server'

import LogoutButton from '@/app/_auth/components/logout-button'
import { auth } from '@/app/api/auth/[...nextauth]/_nextAuth'
import { BASE_URL } from '@/routes'
import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
  const session = await isAllowedToViewPage()
  return (
    <div>
      <LogoutButton />
      <Link href='/auth/login'>Login</Link>
      <h1>page</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}

export default page

async function isAllowedToViewPage() {
  const headersList = headers();
  const route = headersList.get("referer")
  
  const session = await auth()

  const isLoggedIn = !!session?.user
  if (!isLoggedIn) {
    if (route) {
      const encodedCallbackUrl = encodeURIComponent(route);
      return redirect(`/auth/login?callbackUrl=${encodedCallbackUrl}`);
    }

    return redirect(`/auth/login`)
  }

  return session;
}