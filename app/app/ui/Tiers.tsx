import React from 'react'

const Tiers = () => {
  return (
    <div className='flex flex-col gap-10'>
      <div className='w-full h-[200px] flex items-center justify-center'>
        <div className='w-fit'>
          <div className='w-[200px] h-[200px] molecule rounded-full after:rounded-full before:rounded-full'>
          </div>
        </div>
      </div>
      <div className='w-full h-[200px] flex items-center justify-center'>
        <div className='w-fit'>
          <div className='w-[200px] h-[200px]  molecule2 rounded-lg hover:ring-8'>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tiers