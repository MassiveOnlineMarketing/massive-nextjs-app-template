'use client';

import React, { useEffect, useState } from 'react'
import Link from 'next/link';

import { useWebsiteDetailsStore } from '@/app/_stores/useWebsiteDetailsStore';

import { WebsiteWithLocation } from '@/src/entities/models/website'
import { Location } from '@/src/entities/models/location';

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '../ui/command';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '../ui/dropdown-menu';

import { getFaviconUrl } from '@/app/_utils/imageUtils';
import { Cog6ToothIcon, PlusIcon } from '@heroicons/react/24/outline';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { BoxIcon } from '@radix-ui/react-icons';
import { cn } from '../utils';



interface WebsiteWithGroupedLocations extends WebsiteWithLocation {
  groupedLocations: Record<string, Location[]>;
  faviconUrl: string;
}

const WebsiteSelectionButtonHover: React.FC<{ websites: WebsiteWithLocation[] | undefined, isOpen: boolean }> = ({ websites, isOpen }) => {
  const [websitesWithGroupedLocations, setWebsitesWithGroupedLocations] = useState<WebsiteWithGroupedLocations[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!websites) {
      return;
    }

    const transformedWebsites = websites.map((website) => {
      if (!website.location || website.location.length === 0) {
        return {
          ...website,
          groupedLocations: {},
          faviconUrl: getFaviconUrl(website.domainUrl),
        };
      }

      const sortedLocations = website.location.sort((a, b) => {
        if (a.country > b.country) return 1;
        if (a.country < b.country) return -1;
        if (a.location === null && b.location === null) return 0;
        if (a.location === null) return -1;
        if (b.location === null) return 1;
        if (a.location > b.location) return 1;
        if (a.location < b.location) return -1;
        return 0;
      });

      const groupedByCountry = sortedLocations.reduce((acc, loc) => {
        const country = loc.country || 'Unknown';
        if (!acc[country]) {
          acc[country] = [];
        }
        acc[country].push(loc);
        return acc;
      }, {} as Record<string, Location[]>);

      return {
        ...website,
        groupedLocations: groupedByCountry,
        faviconUrl: getFaviconUrl(website.domainUrl),
      };
    });

    setWebsitesWithGroupedLocations(transformedWebsites);
  }, [websites]);

  const { selectedWebsite, selectedLocation, setSelectedWebsite, setSelectedLocation } = useWebsiteDetailsStore(state => ({
    selectedWebsite: state.selectedWebsite,
    selectedLocation: state.selectedLocation,
    setSelectedWebsite: state.setSelectedWebsite,
    setSelectedLocation: state.setSelectedLocation,
  }));

  const handleWebsiteSelect = (website: WebsiteWithGroupedLocations) => {
    setSelectedWebsite(website.id);
    const firstCountryKey = Object.keys(website.groupedLocations)[0];
    const firstLocationArray = website.groupedLocations[firstCountryKey];

    if (firstLocationArray && firstLocationArray.length > 0 && firstLocationArray[0].id) {
      setSelectedLocation(firstLocationArray[0].id);
    } else {
      setSelectedLocation(undefined);
    }

    setOpen(false);
  }

  const handleLocationSelect = (location: Location) => {
    setSelectedWebsite(location.websiteId);
    setSelectedLocation(location.id);
    setOpen(false);
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className='cursor-pointer w-fit flex items-center      molecule rounded-lg before:rounded-lg after:rounded-[14px] before:top-0 before:left-0 '>

          {/* Favicon box */}
          <div className={cn(
            'w-[42px] h-[42px] rounded-[8px] bg-green-50 flex items-center justify-center transition-all duration-300',
            isOpen ? 'm-2' : 'm-1',
          )}>
            {selectedWebsite ? (
              <img src={selectedWebsite.faviconUrl} alt={`favicon ${selectedWebsite.websiteName}`} width={28} height={28} />
            ) : (
              <BoxIcon className='h-[28px] w-[28px] theme-t-n' />
            )}
          </div>

          {/* Website and location */}
          <div className={cn(
            'overflow-hidden transition-width duration-300 flex items-center',
            isOpen ? 'w-[244px]' : 'w-0',
          )}>
            <div>
              {/* Website */}
              <p className='text-nowrap theme-t-p'>
                {selectedWebsite ? (
                  selectedWebsite.websiteName
                ) : (
                  'No website selected'
                )}
              </p>
              {/* Location */}
              <p className='text-nowrap text-sm theme-t-n'>
                {selectedLocation ? (
                  selectedLocation?.location ? (
                    selectedLocation.country + ', ' + selectedLocation.location.split(',')[0]
                  ) : (
                    selectedLocation.country + ', ' + 'Country'
                  )
                ) : (
                  'No location selected'
                )}
              </p>
            </div>

            <ChevronUpDownIcon className='ml-auto h-5 w-5 theme-t-n mr-5' />
          </div>
        </div>
      </DropdownMenuTrigger>


      <DropdownMenuContent className='w-[350px]'>
        <DropdownMenuLabel>Websites</DropdownMenuLabel>

        {websitesWithGroupedLocations?.map((website) => (
          <DropdownMenuSub key={website.id}>
            {/* Website */}
            <DropdownMenuSubTrigger onClick={() => handleWebsiteSelect(website)} className='flex gap-2 items-center'>
              <img src={website.faviconUrl} width={16} height={16} alt='favicon' className='w-4 h-4' />
              {website.websiteName}
            </DropdownMenuSubTrigger>

            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {/* Locations */}
                <Command>
                  <CommandInput placeholder='Search locations...' />
                  <CommandList>
                    <CommandGroup className='p-0'>
                      <DropdownMenuLabel>Locations</DropdownMenuLabel>
                      {Object.entries(website.groupedLocations).map(([country, locations]) => (
                        <div key={country}>
                          {locations.map((l) => (
                            <CommandItem
                              onSelect={() => handleLocationSelect(l)}
                              key={l.id}
                            >
                              {l.location ? (
                                website.websiteName + ' ' + country + ' ' + l.location.split(',')[0]
                              ) : (
                                website.websiteName + ' ' + country + ' ' + 'Country'
                              )}
                            </CommandItem>
                          ))}
                        </div>
                      ))}
                    </CommandGroup>
                    <CommandEmpty>No locations found</CommandEmpty>
                  </CommandList>
                  <CommandSeparator />
                </Command>

                {/* Add Location */}
                <Link onClick={() => setOpen(false)} href='/app/settings/website/location' className='rounded-sm px-2 py-1.5  flex gap-2 items-center text-sm theme-t-t hover:bg-base-50 dark:hover:bg-theme-night-background-secondary'>
                  <Cog6ToothIcon className="h-4 w-4 theme-t-n" />
                  Add new location
                  <PlusIcon className="ml-auto h-4 w-4 theme-t-n" />
                </Link>
              </DropdownMenuSubContent>

            </DropdownMenuPortal>
          </DropdownMenuSub>
        ))}

        <DropdownMenuSeparator />

        {/* Add Website */}
        <Link onClick={() => setOpen(false)} href='/app/settings/website' className='rounded-sm px-2 py-1.5  flex gap-2 items-center text-sm theme-t-t hover:bg-base-50 dark:hover:bg-theme-night-background-secondary'>
          <Cog6ToothIcon className="h-4 w-4 theme-t-n" />
          Add new website
          <PlusIcon className="ml-auto h-4 w-4 theme-t-n" />
        </Link>
      </DropdownMenuContent>

    </DropdownMenu >
  );
};

export default WebsiteSelectionButtonHover;