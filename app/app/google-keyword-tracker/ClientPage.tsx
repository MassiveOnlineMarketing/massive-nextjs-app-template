'use client';

import React from 'react'
import { useWebsiteDetailsStore } from '@/app/_stores/useWebsiteDetailsStore';
const ClientPage = () => {
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

export default ClientPage