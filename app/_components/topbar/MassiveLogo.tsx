import { MassiveLogoColor, MassiveTextDash } from '@/assets/branding'
import React from 'react'

const MassiveLogo = () => {
  return (
    <div className='min-w-[300px] h-[76px] flex ml-[18px] mr-2.5'>
      <div className='mt-auto mb-2 flex items-center gap-2.5'>
        <div className='w-[52px] h-[52px] theme-bg-w flex items-center justify-center  molecule rounded-lg before:rounded-lg after:rounded-[14px]'>
          <div className='w-[26px]'>
            <MassiveLogoColor />
          </div>
        </div>
        <MassiveTextDash />
      </div>
    </div>
  )
}

export default MassiveLogo