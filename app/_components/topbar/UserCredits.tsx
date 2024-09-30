'use client';

import { useCurrentUser } from '@/app/_modules/auth/hooks/user-current-user';
import React from 'react'

const UserCredits = () => {
  const user = useCurrentUser()

  return (
    <div className='ml-auto flex items-center px-4 molecule rounded-lg before:rounded-lg after:rounded-[12px] before:left-0'> 
      <p className='theme-t-p text-nowrap'>{user?.credits ? user.credits : 0} <span className='theme-t-n text-sm'>Credits</span></p>
    </div>
  )
}

export default UserCredits