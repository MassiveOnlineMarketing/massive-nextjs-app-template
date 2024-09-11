'use client';

import { useWebsiteDetailsStore } from '@/app/_stores/useWebsiteDetailsStore';
import React from 'react'

const MainSideBar = () => {

  const websites = useWebsiteDetailsStore((state) => state.websites)

  return (
    <div className='min-w-[150px]  bg-green-50'>
      {websites?.map((website) => {
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
      })}
    </div>
  )
}

export default MainSideBar