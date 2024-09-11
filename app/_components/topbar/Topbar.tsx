import React from 'react'
import BackAndForwardButtons from './BackAndForwardButton'
import BreadCrumbs from './BreadCrumbs'

const Topbar = () => {
  return (
    <div className='flex gap-[12px]'>
      <BackAndForwardButtons />
      <BreadCrumbs />
      
    </div>
  )
}

export default Topbar