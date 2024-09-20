'use client';

import React from 'react'

import { Card, CardContent, CardHeader } from '@/app/_modules/settings/components/SettingsCard'
import { GoogleAdsSvg, GoogleIconSvg, GoogleSearchConsoleSvg } from '@/assets/logos'
import GoogleServiceCard from './_components/GoogleServiceCard';


const GoogleIntegrations = () => {
  return (
    <Card>
      <CardHeader>Google Intergrations</CardHeader>
      <CardContent className='space-y-6'>
        <GoogleServiceCard
          scope="account"
          Icon={GoogleIconSvg}
          heading="Google Account"
          currentlyAvailable={true}
        />
        <GoogleServiceCard
          scope="search-console"
          Icon={GoogleSearchConsoleSvg}
          heading="Google Search Console"
          currentlyAvailable={true}
        />
        <GoogleServiceCard
          heading="Google Ads"
          scope='ads'
          Icon={GoogleAdsSvg}
          currentlyAvailable={false}
        />
      </CardContent>
    </Card>
  )
}

export default GoogleIntegrations