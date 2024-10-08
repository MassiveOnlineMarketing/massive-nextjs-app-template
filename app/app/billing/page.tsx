import React from 'react'

import { isAuthenticated } from '@/app/_modules/auth/actions';

export async function generateMetadata(){
  return {
    title: "Massive | Billing",
  }
}


const page = async () => {
  await isAuthenticated();
  
  return (
    <div>page</div>
  )
}

export default page