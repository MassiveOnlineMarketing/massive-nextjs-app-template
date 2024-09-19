import { Card, CardContent, CardHeader } from '@/app/_modules/settings/components/SettingsCard'
import React from 'react'

const page = () => {
  return (
    <div className='max-w-[918px] w-full theme-bg-w border theme-b-p rounded-xl p-6'>
      <div className='pb-3 flex flex-col gap-1.5'>
        <p className='text-xl font-medium theme-t-p'>Integrations</p>
        <p className='text-sm theme-t-t'>Manage your connected applications</p>
      </div>
      <Card>
        <CardHeader>Google Intergrations</CardHeader>
        <CardContent>
          content
        </CardContent>
      </Card>
    </div>
  )
}

export default page