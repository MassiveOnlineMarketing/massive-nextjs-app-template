import React from 'react'

import CreateWebsiteForm from '@/app/_modules/settings/forms/CreateWebsiteForm'

const page = () => {
  return (
    <div className='max-w-[918px] theme-bg-w border theme-b-p rounded-xl'>
      <div className='px-6 pt-6 pb-3 flex flex-col gap-1.5'>
        <p className='text-xl font-medium theme-t-p'>Add a website</p>
        <p className='text-sm theme-t-t'>Add a new website to your account</p>
      </div>
      <CreateWebsiteForm />
    </div>
  )
}

export default page