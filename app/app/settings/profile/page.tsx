'use server';

import React from 'react'
import ProfileSettingsForm from './ProfileSettingsForm'
import { isAllowedToViewPage } from '@/app/_modules/auth/pageAuth'

const page = async () => {
  const { session } = await isAllowedToViewPage('private');

  return (
    <>

      <div className='max-w-[918px] bg-white border border-light-stroke rounded-xl'>
        <div className='px-6 pt-6 pb-3 flex flex-col gap-[6px]'>
          <p className='text-xl font-medium text-p-800'>Profile Settings</p>
          <p>Manage your profile settings here</p>
        </div>
        <ProfileSettingsForm user={session.user} />
      </div>
    </>
  )
}

export default page