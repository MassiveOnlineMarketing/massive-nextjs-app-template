import React from 'react'

export default function layout(
  { children }: { children: React.ReactNode }
) {
  return (
    <div className='flex min-h-screen bg-p-25'>
      <div className='w-[300px]'>
        Side bar
      </div>
      <div className='w-full px-3 pt-3 layout'>
        <div className='h-fit bg-white rounded-t-xl border'>
          <div className='h-[calc(100vh-14px)] custom-scrollbar -mr-3 pr-[3px]'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

