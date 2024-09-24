import React from 'react'

import { isAuthenticated } from '@/app/_modules/auth/actions';

const page = async () => {
  await isAuthenticated();
  
  return (
    <div>page</div>
  )
}

export default page