import React from 'react'
import CreateWebsiteForm from './CreateWebsiteForm'

const page = () => {
  return (
    <>
      <div className='px-6 pt-6 pb-3 flex flex-col gap-[6px]'>
        <p className='text-xl font-medium text-p-800'>Website Settings</p>
        <p>Create Website</p>
      </div>
      <CreateWebsiteForm />
    </>
  )
}

export default page