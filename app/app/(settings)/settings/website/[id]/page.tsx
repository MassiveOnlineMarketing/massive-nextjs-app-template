'use server';

import React from 'react'

import { getConnectedGscProperties, isAuthenticated } from '@/app/_modules/auth/actions';
import { getWebsiteWithLocation } from '@/app/_actions/website.actions';

import UpdateWebsiteForm from '@/app/_modules/settings/forms/UpdateWebsiteFrom';
import LocationsCard from './LocationsCard';
import { getFaviconUrl } from '@/app/_utils/imageUtils';

const page = async ({
  params: { id }
}: {
  params: { id: string }
}) => {
  await isAuthenticated();

  const [ connectedGscProperties, res ] = await Promise.all([
    getConnectedGscProperties(),
    getWebsiteWithLocation(id)
  ])

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

  const websiteFavicon = getFaviconUrl(website.domainUrl)

  return (
    <div className='flex gap-4'>
      <div className='max-w-[918px] w-full theme-bg-w border theme-b-p rounded-xl p-6'>
        <div className='pb-3 flex flex-col gap-1.5'>
          <p className='text-xl font-medium theme-t-p'>Website</p>
          <p className='text-sm theme-t-t'>Stel je website en locatie settings bij voor de Keyword Tracker</p>
        </div>
        <UpdateWebsiteForm defaultValues={defaultValues} gscProperties={connectedGscProperties.properties} />
      </div>

      <LocationsCard websiteFavicon={websiteFavicon} website={website} />
    </div>
  )
}

export default page