import { WebsiteWithLocation } from '@/src/entities/models/website'
import { ChevronUpIcon } from '@heroicons/react/16/solid'
import { MapPinIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import React from 'react'


const LocationsCard = ({ website }: { website: WebsiteWithLocation }) => {

  if (!website.location || website.location.length === 0) {
    return (
      <Card>
        <div>Setup locations</div>
      </Card>
    )
  }

  const groupedByCountry = sortAndGroupWebsiteWithLocations(website) || {};

  return (
    <Card>
      {Object.entries(groupedByCountry).map(([country, locations]) => (
        <div key={country} className='space-y-4 mb-4'>
          <p className='text-xs theme-t-t'>{country}</p>
          {locations.map((loc, index) => (
            <Link href={`/app/settings/website/location/${loc.id}`} key={index} className='ml-2 flex gap-3 group'>
              <div className='w-11 h-11 border border-base-100  rounded-full    transition-all duration-300 after:absolute after:w-full after:h-full after:border-[#F2F3FF] after:rounded-full after:border-0 group-hover:after:border-4  after:box-content after:top-0 after:left-0 group-hover:after:-left-1 group-hover:after:-top-1 relative'>
              </div>

              <div>
                <p className='font-medium theme-t-p'>{loc.location ? loc.location?.split(',')[0] : 'Country'} {loc.language}</p>
                <p className='text-sm theme-p-t'>{website.websiteName}</p>
              </div>

              <div className='group-hover:block hidden my-auto theme-t-p'>
                <ChevronUpIcon className='w-4 h-4 rotate-90' />
              </div>

              <div className='ml-auto my-auto'>
                {loc.keywordTrackerToolId ? (
                  <div className='flex gap-2 items-center px-4 py-1.5'><div className='w-1.5 h-1.5 rounded-full bg-green-500 border border-green-200'></div><p className='text-green-500'>Active</p></div>
                ) : (
                  <div className='flex gap-2 items-center px-4 py-1.5'><div className='w-1.5 h-1.5 rounded-full bg-yellow-500 border border-yellow-200'></div><p className='text-yellow-500'>Semi</p></div>
                )}
              </div>
            </Link>
          ))}
        </div>
      ))}
    </Card>
  )
}

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-[400px] theme-bg-w border theme-b-p rounded-lg'>
      <div className='flex items-center gap-1.5 p-6 theme-t-p border-b theme-b-p'>
        <MapPinIcon className='w-4 h-4' />
        <p>Locations</p>
      </div>
      <div className='p-6'>
        {children}
      </div>
    </div>
  )
}


function sortAndGroupWebsiteWithLocations(website: WebsiteWithLocation | undefined) {
  if (!website?.location) {
    return;
  }

  // Step 1: Sort the locations
  const sortedLocations = website.location.sort((a, b) => {
    if (a.country > b.country) {
      return 1;
    }
    if (a.country < b.country) {
      return -1;
    }

    // If countries are the same, sort by location
    if (a.location === null && b.location === null) {
      return 0;
    }
    if (a.location === null) {
      return -1;
    }
    if (b.location === null) {
      return 1;
    }
    if (a.location > b.location) {
      return 1;
    }
    if (a.location < b.location) {
      return -1;
    }
    return 0;
  });

  // Step 2: Group by country, put locations in an array under the country key
  const groupedByCountry = sortedLocations.reduce((acc, loc) => {
    const country = loc.country || 'Unknown';
    if (!acc[country]) {
      acc[country] = [];
    }
    acc[country].push(loc);
    return acc;
  }, {} as Record<string, typeof website.location>);

  return groupedByCountry;
}

export default LocationsCard