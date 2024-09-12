import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { WebsiteWithLocation } from '@/src/entities/models/website'
import { Location } from '@/src/entities/models/location';


interface WebsiteWithGroupedLocations extends WebsiteWithLocation {
  groupedLocations: Record<string, Location[]>;
}

const WebsiteSelectionButton: React.FC<{ websites: WebsiteWithLocation[] | undefined }> = ({ websites }) => {
  const [hoveredWebsiteId, setHoveredWebsiteId] = useState<string | null>(null);
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

  const hoveredWebsite = websitesWithGroupedLocations.find((website) => website.id === hoveredWebsiteId);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className='cursor-pointer w-full molecule my-4 flex items-center rounded-lg before:rounded-lg after:rounded-lg before:top-0 before:left-0 '>
          <div className='w-12 h-12 m-2 rounded-[8px] bg-green-50'></div>
          <p>test</p>
        </div>
      </PopoverTrigger>
      <PopoverContent className='w-[500px] h-[200px] translate-x-4 theme-bg-w grid grid-cols-2 gap-2'>
        <div>
          {websitesWithGroupedLocations.map((website) => (
            <div
              key={website.id}
              onMouseEnter={() => setHoveredWebsiteId(website.id)}
              className="cursor-pointer hover:bg-gray-200"
            >
              <h2 className="">{website.websiteName}</h2>
            </div>
          ))}
        </div>

        {hoveredWebsite && (
          <div className='overflow-y-auto'>
            {Object.entries(hoveredWebsite.groupedLocations).map(([country, locations]) => (
              <div key={country}>
                <p>{country}</p>
                {locations.map((location) => (
                  <p key={location.id} className='ml-1'>{location.location?.split(',')[0]}</p>
                ))}
              </div>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default WebsiteSelectionButton;