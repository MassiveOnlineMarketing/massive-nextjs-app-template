import React from 'react'

import { auth } from '@/app/_modules/auth/_nextAuth';
import { getWebsitesByUser } from '@/app/_actions/website.actions';

import CreateLocationForm from '@/app/_modules/settings/forms/CreateLocationForm';

const page = async () => {
  const session = await auth();
  if (!session?.user.id) return <>No user id</>

  const res = await getWebsitesByUser(session.user.id)

  return (
    <div className='max-w-[918px] theme-bg-w border theme-b-p rounded-xl'>
      <div className='px-6 pt-6 pb-3 flex flex-col gap-1.5'>
        <p className='text-xl font-medium theme-t-p'>Add a location</p>
        <p className='text-sm theme-t-t'>What location will you be using to power up your website?</p>
      </div>
      <CreateLocationForm location={undefined} usersWebsites={res.websites} />
    </div>
  )
}

export default page