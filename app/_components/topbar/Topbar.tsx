import React from 'react'
import BackAndForwardButtons from './BackAndForwardButton'
import BreadCrumbs from './BreadCrumbs'
import ThemeSwitcher from '../ui/ThemeSwitcher'
import UserCredits from './UserCredits'
import MassiveLogo from './MassiveLogo'

const Topbar = () => {
  return (
    <div className='inline-flex'>
      <MassiveLogo />
      <div className='py-4 flex gap-[12px] w-full'>
        <BackAndForwardButtons />
        <BreadCrumbs />
        <UserCredits />
        <ThemeSwitcher />
      </div>
    </div>
  )
}

export default Topbar