import React from 'react'
import GoogleIntegrations from './GoogleIntegrations'
import Message from './_components/Message'

const page = () => {
  return (
    <div className='max-w-[918px] w-full theme-bg-w border theme-b-p rounded-xl p-6'>
      <div className='pb-3 flex flex-col gap-1.5'>
        <p className='text-xl font-medium theme-t-p'>Integrations</p>
        <p className='text-sm theme-t-t'>Manage your connected applications</p>
      </div>

      <GoogleIntegrations />

      <Message className='mt-6'>
        Our app adhere&aposs to <a className='underline' target='_blank' href='https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes'>Google API Services User Data Policy</a>, including the Limited Use requirements.
      </Message>

    </div>
  )
}

export default page