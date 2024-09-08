'use server';

import React from 'react'
import Link from 'next/link';

import UpdateWebsiteForm from './UpdateWebsiteFrom';
import { getWebsiteWithLocation } from '../../actions';

const page = async ({
  params: { id }
}: {
  params: { id: string }
}) => {

  const res = await getWebsiteWithLocation(id)

  console.log('website/id page: ', res)

  // TODO: Not Found
  if (!res?.website) {
    return <div>not found</div>
  }
  const website = res.website

  const defaultValues = {
    id: website.id,
    websiteName: website.websiteName,
    domainUrl: website.domainUrl,
    gscUrl: website.gscUrl || null,
  }

  return (
    <>
      <UpdateWebsiteForm defaultValues={defaultValues} />
      <div className='mx-6 border-t mt-10 pt-6'>
        <div className='flex justify-between'>
          <h1>Locations</h1>
          <p>Add</p>
        </div>
        {website.location?.map((location, index) => (
          <Link href={`/app/settings/website/location/${location.id}`} key={index} className='flex gap-2'>
            <p>{location.id}</p>
            <p>{location.country}</p>
            <p>{location.language}</p>     
            <p className='ml-auto'>Copy</p>
          </Link>
        ))}
      </div>
      <pre className='mt-10'>{JSON.stringify(website, null, 2)}</pre>
    </>
  )
}

export default page