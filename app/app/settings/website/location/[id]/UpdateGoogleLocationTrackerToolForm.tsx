import React from 'react'
import { Card, CardContent, CardHeader } from '../../../_components/SettingsCard'

const UpdateGoogleLocationTrackerToolForm = () => {
  return (
    <Card>
      <CardHeader className='flex justify-between'>
        <p>Google Location Tracker Tool</p> <p className='text-red-500'>Deactivated</p>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2 gap-3'>
          <p>Competitors</p>
          <p>Keywords</p>
        </div>
        <p>Refresh</p>
      </CardContent>
    </Card>
  )
}

export default UpdateGoogleLocationTrackerToolForm