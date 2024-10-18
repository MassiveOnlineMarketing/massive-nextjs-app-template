'use client';

import React from 'react'
import useRefreshOnUserChange from '../_hooks/useRefreshOnUserChange'
import { ExtendedUser } from '@/next-auth';
import Banner from './Banner';
import MessageFromTeam from './Message';

const ClientPage = ({ user }: { user: ExtendedUser }) => {
  useRefreshOnUserChange(user.id)

  // TODO: Contact for the URL
  return (
    <div>
      <Banner user={user} className='mb-4' />
      <MessageFromTeam
        className="max-w-[770px] mb-6"
        heading="Message from Team"
        message='Keyword Tracker is a product in development, we are constantly updating and improving the user experience. Your feedback is valuable to us. For any questions regarding assistance and feedback, please feel free to <a class="text-base-500" href="https://yourwebsite.com/contact">contact us</a>.'
      />
    </div>
  )
}

export default ClientPage