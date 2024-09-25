import { isAuthenticated } from '@/app/_modules/auth/actions'
import React from 'react'

const page = async () => {
  await isAuthenticated();

  return (
    <div>Settings page</div>
  )
}

export default page