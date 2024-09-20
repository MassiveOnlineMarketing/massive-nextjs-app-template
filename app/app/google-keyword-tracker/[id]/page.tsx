
import { ViewfinderCircleIcon } from '@heroicons/react/20/solid'
import React from 'react'

const page = async ({
  params: { id }
}: {
  params: { id: string }
}) => {
  return (
    <div className='w-full theme-bg-w border theme-b-p mr-3 rounded-t-2xl '>
      <div className=' h-[calc(100vh-79px)]  custom-scrollbar -mr-3 pr-[3px]'>
        <div className='px-6'>
          <div className='sticky top-0 theme-bg-w pt-5 pb-3 flex justify-between'>

            <div className='theme-t-p flex items-center gap-4'>
              <div className='w-14 h-14 molecule2 rounded-lg flex items-center justify-center'>
                <ViewfinderCircleIcon className='w-6 h-6 ' />
              </div>
              <p className='font-medium text-2xl'>Keyword Tracker</p>
            </div>

            <div>
              Insert Stats
            </div>
          </div>
          {id}
          <div className=' border'>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <div className='sticky top-6'>test</div>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page