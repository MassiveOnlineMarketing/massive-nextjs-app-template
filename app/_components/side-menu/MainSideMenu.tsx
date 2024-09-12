'use client';

import { useWebsiteDetailsStore } from '@/app/_stores/useWebsiteDetailsStore';
import React from 'react'
import WebsiteSelectionButton from './WebsiteSelectionButton';


const MainSideMenu = () => {

  const websites = useWebsiteDetailsStore((state) => state.websites)

  return (
    <div className='w-[64px] flex flex-col items-center h-full pl-[18px] pr-[10px] pb-4 group hover:w-[328px] hover:block'>
      <div className='py-4'>
        <WebsiteSelectionButton websites={websites} />
      </div>
      <NavLabel>label</NavLabel>
      <NavItem>1</NavItem>

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


const NavLabel = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className='text-xs'>{children}</p>
  )
}

const NavItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-[52px] h-[52px] bg-green-50 rounded-lg'>{children}</div>
  )
}

export default MainSideMenu