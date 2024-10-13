'use server';

import Link from 'next/link'

import { Website } from '@/src/entities/models/website'
import { Location } from '@/src/entities/models/location'

import { getCountry, getLanguage, getLocation } from './utils';
import DeleteLocationButton from '@/app/_modules/settings/components/DeleteLocationButton';

import { cn } from '@/app/_components/utils'
import { Label } from '@/app/_components/ui/label'
import { Card, CardContent, CardHeader } from '@/app/_modules/settings/components/SettingsCard'

import { ClipboardDocumentIcon } from '@heroicons/react/20/solid'


const LocationDetails = async ({
  defaultLocation,
  usersWebsites,
}: {
  defaultLocation: Location;
  usersWebsites: Website[] | undefined;
}) => {
  const language = await getLanguage(defaultLocation.languageCode);
  const location = await getLocation(defaultLocation.location);
  const country = await getCountry(defaultLocation.country)
  const website = usersWebsites?.find(website => website.id === defaultLocation.websiteId);

  return (
    <Card className='mx-6 mb-6'>
      <CardHeader className='flex justify-between items-center py-3'>
        <p>Location Details</p>
        <div className='flex items-center gap-3'>
          {/* <Link href={`/app/settings/website/copy-location/${defaultLocation.id}`} className='px-4 py-1.5 h-fit border theme-b-p rounded-lg  flex items-center gap-2'><ClipboardDocumentIcon className='w-4 h-4 theme-t-t' /></Link> */}
          {/* // TODO: add as delete button in the Card */}
          <DeleteLocationButton locationId={defaultLocation.id} websiteId={defaultLocation.websiteId}/>
        </div>
      </CardHeader>
      <CardContent className='grid grid-cols-2 gap-3'>

        <div className='flex flex-col'>
          <Label className={cn('font-normal text-sm text-slate-500',)}>Website</Label>
          <div
            className={cn(
              "w-[412px] justify-between items-center text-sm opacity-50 ",
              "inline-flex w-full mt-1 justify-between px-4 py-3 rounded-xl border theme-b-p bg-primary-50/50 placeholder-gray-400 ring-base-500 focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
            )}
          >
            {website ? (
              <p>{website.websiteName}</p>
            ) : (
              <p>No Website selected</p>
            )}
          </div>
        </div>

        <div className='flex flex-col'>
          <Label className={cn('font-normal text-sm text-slate-500',)}>Language</Label>
          <div
            className={cn(
              "w-[412px] justify-between items-center text-sm opacity-50 ",
              "inline-flex w-full mt-1 justify-between px-4 py-3 rounded-xl border theme-b-p bg-primary-50/50 placeholder-gray-400 ring-base-500 focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
            )}
          >
            {language ? (
              <p>{language.name}</p>
            ) : (
              <p>No Language selected</p>
            )}
          </div>
        </div>

        <div className='flex flex-col'>
          <Label className={cn('font-normal text-sm text-slate-500',)}>Location <span className='text-xs'>(optional)</span></Label>
          <div
            className={cn(
              "w-[412px] justify-between items-center text-sm opacity-50 ",
              "inline-flex w-full mt-1 justify-between px-4 py-3 rounded-xl border theme-b-p bg-primary-50/50 placeholder-gray-400 ring-base-500 focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
            )}
          >
            {location ? (
              <>
                <p className='text-xs font-bold'>{location.countryCode}</p>
                <p className='text-sm pl-1'>{location.name}</p>

                <p className='ml-auto'>{location.targetType}</p>
              </>
            ) : (
              <p>No Location selected</p>
            )}
          </div>
        </div>

        <div className='flex flex-col'>
          <Label className={cn('font-normal text-sm text-slate-500',)}>Country</Label>
          <div
            className={cn(
              "w-[412px] justify-between items-center text-sm opacity-50 ",
              "inline-flex w-full mt-1 justify-between px-4 py-3 rounded-xl border theme-b-p bg-primary-50/50 placeholder-gray-400 ring-base-500 focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
            )}
          >
            {country ? (
              <p>{country.name}</p>
            ) : (
              <p>No Country selected</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default LocationDetails