import React from 'react'
import { Card, CardContent, CardHeader } from '../../../_components/SettingsCard'
import { ClipboardDocumentIcon, TrashIcon } from '@heroicons/react/20/solid'

const UpdateLocationForm = () => {
  return (
    <Card className='mb-6'>
      <CardHeader className='flex justify-between items-center py-[9.5px]'>
        <p>Location Details</p>
        <div className='flex items-center gap-3'>
          {/* // TODO: add as coppy button in the Card */}
          <button className='px-4 py-[6px] border border-light-stroke rounded-[10px] text-slate-500 flex items-center gap-2'><ClipboardDocumentIcon className='w-4 h-4'/><p>Duplicate</p></button>
          {/* // TODO: add as delete button in the Card */}
          <button className='px-4 py-[6px] h-fit text-red-500 border border-red-500 rounded-[10px]'><TrashIcon className='w-4 h-4' /></button>
        </div>
      </CardHeader>
      <CardContent className='grid grid-cols-2 gap-3'>
        <p>Website</p>
        <p>Language</p>
        <p>Location</p>
        <p>Country</p>
      </CardContent>
    </Card>
  )
}

export default UpdateLocationForm