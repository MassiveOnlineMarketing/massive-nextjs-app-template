'use client';

import { useWebsiteDetailsStore } from '@/app/_stores/useWebsiteDetailsStore';
import React from 'react'


// TODO: Fix page contents 
const Page = () => {
  const selectedLocation = useWebsiteDetailsStore((state) => state.selectedLocation)

  if (!selectedLocation) {
    return <div>Please first select a location</div>
  }

  if (!selectedLocation.keywordTrackerToolId) {
    return <div>Setup Keyword Tracker</div>
  }

  return (
    <div>Something went wrong please try again later</div>
  )
}

export default Page