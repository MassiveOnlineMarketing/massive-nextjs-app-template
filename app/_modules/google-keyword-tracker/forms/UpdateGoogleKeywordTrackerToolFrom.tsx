import React from 'react'
import { Card, CardContent, CardHeader } from '../../settings/components/SettingsCard'

const UpdateGoogleKeywordTrackerToolFrom = () => {
  return (
    <Card className='mb-6 mx-6'>
      <CardHeader className='flex justify-between'>
        <p>Google Keyword Tracker Tool</p> <p className='text-green-500'>Active</p>
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

export default UpdateGoogleKeywordTrackerToolFrom