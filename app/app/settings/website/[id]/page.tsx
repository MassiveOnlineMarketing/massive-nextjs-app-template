'use server';

import React from 'react'

import { getWebsiteWithLocation } from '@/app/_actions/website.actions';

import UpdateWebsiteForm from '@/app/_modules/settings/forms/UpdateWebsiteFrom';
import LocationsCard from './LocationsCard';

const page = async ({
  params: { id }
}: {
  params: { id: string }
}) => {

  const res = await getWebsiteWithLocation(id)

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
    <div className='flex gap-4'>
      <div className='max-w-[918px] w-full theme-bg-w border theme-b-p rounded-xl p-6'>
        <div className='pb-3 flex flex-col gap-[6px]'>
          <p className='text-xl font-medium theme-t-p'>Website</p>
          <p className='text-sm theme-t-t'>Stel je website en locatie settings bij voor de Keyword Tracker</p>
        </div>
        <UpdateWebsiteForm defaultValues={defaultValues} />
      </div>

      <LocationsCard website={website} />
    </div>
  )
}

export default page