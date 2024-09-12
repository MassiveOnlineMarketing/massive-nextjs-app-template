import React from 'react'
import BackAndForwardButtons from './BackAndForwardButton'
import BreadCrumbs from './BreadCrumbs'
import ThemeSwitcher from '../ui/ThemeSwitcher'

const Topbar = () => {
  return (
    <div className='flex gap-[12px]'>
      <BackAndForwardButtons />
      <BreadCrumbs />
      <ThemeSwitcher />
    </div>
  )
}

export default Topbar