'use client';

import { useWebsiteDetailsStore } from '@/app/_stores/useWebsiteDetailsStore';
import React, { useEffect } from 'react'
import WebsiteSelectionButton from './WebsiteSelectionButton';
import { useCurrentUser } from '@/app/_modules/auth/hooks/user-current-user';
import { getWebsiteWithLocationByUser } from '@/app/_actions/website.actions';


const MainSideMenu = () => {
  const setInitialWebsiteDetails = useWebsiteDetailsStore(state => state.initialteWebsiteDetails)
  const user = useCurrentUser()

  useEffect(() => {
    const fetchWebsites = async () => {
      if (!user) return
      const res = await getWebsiteWithLocationByUser(user.id)
      console.log('fetch initial websiteStore', res)
      if (res.error) {
        console.log('error', res.error)
      }

      if (res.website || res.error === 'Must be logged in to get a website') {
        console.log('settings initial websites details', res.website)
        setInitialWebsiteDetails(res.website || [])
      }
    }

    fetchWebsites()
  }, [])

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