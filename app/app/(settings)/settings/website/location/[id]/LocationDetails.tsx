'use server';

import Link from 'next/link'

// import { LOCATION_LANGUAGE_OPTIONS } from '@/src/constants/locationLanguages'
// import { LOCATION_COUNTRY_OPTIONS } from '@/src/constants/locationCountries'
// import { LOCATION_LOCATION_OPTIONS } from '@/src/constants/locationLocations'

import { Website } from '@/src/entities/models/website'
import { Location } from '@/src/entities/models/location'

import { cn } from '@/app/_components/utils'
import { Label } from '@/app/_components/ui/label'
import { Card, CardContent, CardHeader } from '@/app/_modules/settings/components/SettingsCard'
import { Button } from '@/app/_components/ui/button'

import { ClipboardDocumentIcon } from '@heroicons/react/20/solid'
import DeleteLocationButton from '@/app/_modules/settings/components/DeleteLocationButton';
// import { getCountry, getLanguage, getLocation } from './utils';


const LocationDetails = async ({
  defaultLocation,
  usersWebsites,
}: {
  defaultLocation: Location;
  usersWebsites: Website[] | undefined;
}) => {
  // const language = await getLanguage(defaultLocation.languageCode);
  // const location = await getLocation(defaultLocation.location);
  // const country = await getCountry(defaultLocation.country)
  const website = usersWebsites?.find(website => website.id === defaultLocation.websiteId);

  return (
    <Card className='mx-6 mb-6'>
      <CardHeader className='flex justify-between items-center py-3'>
        <p>Location Details</p>
        <div className='flex items-center gap-3'>
          {/* // TODO: add as coppy button in the Card */}
          <Link href={`/app/settings/website/copy-location/${defaultLocation.id}`} className='px-4 py-1.5 h-fit text-slate-500 border border-light-stroke rounded-lg  flex items-center gap-2'><ClipboardDocumentIcon className='w-4 h-4' /></Link>
          {/* // TODO: add as delete button in the Card */}
          <DeleteLocationButton locationId={defaultLocation.id} />
        </div>
      </CardHeader>
      <CardContent className='grid grid-cols-2 gap-3'>

        <div className='flex flex-col'>
          <Label className={cn('font-normal text-sm text-slate-500',)}>Website</Label>
          <Button
            variant="outline"
            role="combobox"
            className={cn("w-[412px] justify-between items-center cursor-default ")}
          >
            {website ? (
              <p>{website.websiteName}</p>
            ) : (
              <p>No Website selected</p>
            )}
          </Button>
        </div>

        <div className='flex flex-col'>
          <Label className={cn('font-normal text-sm text-slate-500',)}>Language</Label>
          <Button
            variant="outline"
            role="combobox"
            className={cn("w-[412px] justify-between items-center cursor-default ")}
          >
            {defaultLocation ? (
              <p>{defaultLocation.location}</p>
            ) : (
              <p>No Language selected</p>
            )}
          </Button>
        </div>

        <div className='flex flex-col'>
          <Label className={cn('font-normal text-sm text-slate-500',)}>Location <span className='text-xs'>(optional)</span></Label>
          <Button
            variant="outline"
            role="combobox"
            className={cn("w-[412px] justify-between items-center cursor-default ")}
          >
            {defaultLocation.location ? (
              <>
                <p className='text-xs font-bold'>{defaultLocation.location}</p>
                <p className='text-sm pl-1'>{defaultLocation.location}</p>

                <p className='ml-auto'>{defaultLocation.location}</p>
              </>
            ) : (
              <p>No Location selected</p>
            )}
          </Button>
        </div>

        <div className='flex flex-col'>
          <Label className={cn('font-normal text-sm text-slate-500',)}>Country</Label>
          <Button
            variant="outline"
            role="combobox"
            className={cn("w-[412px] justify-between items-center cursor-default ")}
          >
            {defaultLocation ? (
              <p>{defaultLocation.location}</p>
            ) : (
              <p>No Country selected</p>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default LocationDetails