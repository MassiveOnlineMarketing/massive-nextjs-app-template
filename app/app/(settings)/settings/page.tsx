import { isAuthenticated } from '@/app/_modules/auth/actions'
import React from 'react'

export async function generateMetadata(){
  return {
    title: "Massive | Settings",
  }
}

const page = async () => {
  await isAuthenticated();

  return (
    <div>Settings page</div>
  )
}

export default page