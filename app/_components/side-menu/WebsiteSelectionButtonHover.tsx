import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { WebsiteWithLocation } from '@/src/entities/models/website'
import { Location } from '@/src/entities/models/location';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '../ui/command';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { getFaviconUrl } from '@/app/_utils/imageUtils';
import { Cog6ToothIcon, PlusIcon } from '@heroicons/react/24/outline';



interface WebsiteWithGroupedLocations extends WebsiteWithLocation {
  groupedLocations: Record<string, Location[]>;
}

const WebsiteSelectionButtonHover: React.FC<{ websites: WebsiteWithLocation[] | undefined }> = ({ websites }) => {
  const [websitesWithGroupedLocations, setWebsitesWithGroupedLocations] = useState<WebsiteWithGroupedLocations[]>([]);

  useEffect(() => {
    if (!websites) {
      return;
    }

    const transformedWebsites = websites.map((website) => {
      if (!website.location || website.location.length === 0) {
        return {
          ...website,
          groupedLocations: {},
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
      };
    });

    setWebsitesWithGroupedLocations(transformedWebsites);
  }, [websites]);

  console.log('websitesWithGroupedLocations', websitesWithGroupedLocations);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='cursor-pointer w-fit flex items-center      molecule rounded-lg before:rounded-lg after:rounded-[14px] before:top-0 before:left-0 '>
          <div className='w-[42px] h-[42px] m-1 group-hover/side-bar:m-2 rounded-[8px] bg-green-50'></div>
          <p className='w-0 group-hover/side-bar:w-[244px] overflow-hidden transition-width duration-300 '>test</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[350px]'>
        <DropdownMenuLabel>Websites</DropdownMenuLabel>

        {websitesWithGroupedLocations?.map((website) => (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className='flex gap-2 items-center'>
              <img src={getFaviconUrl(website.domainUrl)} width={16} height={16} alt='favicon' className='w-4 h-4' />
              {website.websiteName}
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>

              <DropdownMenuSubContent>
                <Command>
                  <CommandInput placeholder='Search locations...' />
                  <CommandList>
                    <CommandGroup className='p-0'>
                      <DropdownMenuLabel>Locations</DropdownMenuLabel>
                      {Object.entries(website.groupedLocations).map(([country, locations]) => (
                        <div key={country}>
                          {locations.map((l) => (
                            <CommandItem key={l.id}>
                              {l.location ? (
                                website.websiteName + ' ' + country + ' ' + l.location.split(',')[0]
                              ) : (
                                website.websiteName + ' ' + country + ' ' +'Country'
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
                  <DropdownMenuItem className='flex gap-2 items-center theme-t-t'>
                    <Cog6ToothIcon className="h-4 w-4 theme-t-n" />
                    Add new location
                    <PlusIcon className="ml-auto h-4 w-4 theme-t-n" />
                  </DropdownMenuItem>
              </DropdownMenuSubContent>

            </DropdownMenuPortal>
          </DropdownMenuSub>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem className='flex gap-2 items-center theme-t-t'>
          <Cog6ToothIcon className="h-4 w-4 theme-t-n" />
          Add new website
          <PlusIcon className="ml-auto h-4 w-4 theme-t-n" />
        </DropdownMenuItem>
      </DropdownMenuContent>

    </DropdownMenu >
  );
};

export default WebsiteSelectionButtonHover;