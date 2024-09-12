'use client';

import { useWebsiteDetailsStore } from '@/app/_stores/useWebsiteDetailsStore';
import React from 'react'
import WebsiteSelectionButton from './WebsiteSelectionButton';


const MainSideMenu = () => {

  const websites = useWebsiteDetailsStore((state) => state.websites)

  return (
    <div className='min-w-[328px] h-full pl-[18px] pr-[10px] pb-4'>
      <WebsiteSelectionButton websites={websites} />
      {/* {websites?.map((website) => {
        return (
          <div key={website.id}>
            <p className='text-sm'>Website: </p>
            <p>{website.websiteName}</p>
            {website.location?.map((location) => {
              return (
                <div key={location.id} className='ml-2'>
                  <p className='text-sm'>Location: </p>
                  <p>{location.language}, {location.country}</p>
                </div>
              )
            })}
          </div>
        )
      })} */}
    </div>
  )
}

export default MainSideMenu