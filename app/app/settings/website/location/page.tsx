import React from 'react'

import { auth } from '@/app/api/auth/[...nextauth]/_nextAuth';
import { getWebsitesByUser } from '@/app/_actions/website.actions';

import CreateLocationForm from '@/app/_modules/settings/forms/CreateLocationForm';

const page = async () => {
  const session = await auth();
  if (!session?.user.id) return <>No user id</>

  const res = await getWebsitesByUser(session.user.id)

  return (
    <>
      <div className='px-6 pt-6 pb-3 flex flex-col gap-[6px]'>
        <p className='text-xl font-medium text-p-800'>Add a location</p>
        <p>What location will you be using to power up your website?</p>
      </div>
      <CreateLocationForm location={undefined} usersWebsites={res.websites}/>
    </>
  )
}

export default page