'use server';

import React from 'react'
import ProfileSettingsForm from './ProfileSettingsForm'
import { isAllowedToViewPage } from '@/app/_modules/auth/pageAuth'

const page = async () => {
  const { session } = await isAllowedToViewPage('private');

  return (
    <div className='max-w-[918px] theme-bg-w border theme-b-p rounded-xl'>
      <div className='px-6 pt-6 pb-3 flex flex-col gap-1.5'>
        <p className='text-xl font-medium theme-t-p'>Profile Settings</p>
        <p className='text-sm theme-t-t'>Manage your profile settings here</p>
      </div>
      <ProfileSettingsForm user={session.user} />
    </div>
  )
}

export default page