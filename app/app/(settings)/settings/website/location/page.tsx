import React from 'react'

import { isAuthenticated } from '@/app/_modules/auth/actions';
import { getWebsitesByUser } from '@/app/_actions/website.actions';

// import CreateLocationForm from '@/app/_modules/settings/forms/CreateLocationForm';
import SetupLocationForm from '@/app/_modules/settings/forms/SetupLocationForm';

export async function generateMetadata(){
  return {
    title:  "Massive | Create Location",
  }
}

const page = async () => {
  const { user } = await isAuthenticated() 

  const res = await getWebsitesByUser(user.id)

  return (
    <div className='max-w-[918px] theme-bg-w border theme-b-p rounded-xl mb-6'>
      <div className='px-6 pt-6 pb-3 flex flex-col gap-1.5'>
        <p className='text-xl font-medium theme-t-p'>Setup a location</p>
        <p className='text-sm theme-t-t max-w-[500px]'>Add a location with the keyword tracker to your website, to start tracking your positions for the specified location.</p>
      </div>
      <SetupLocationForm usersWebsites={res.websites} />
      {/* <CreateLocationForm location={undefined} usersWebsites={res.websites} /> */}
    </div>
  )
}

export default page