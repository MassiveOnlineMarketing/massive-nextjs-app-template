import React from 'react'

import BackAndForwardButtons from './BackAndForwardButton'
import BreadCrumbs from './BreadCrumbs'
import ThemeSwitch from './ThemeSwitch'
import UserCredits from './UserCredits'
import MassiveLogo from './MassiveLogo'
import UserActionsDropdown from './UserActionsDropdown'

const Topbar = () => {
  return (
    <div className='inline-flex w-full'>
      <MassiveLogo />
      <div className='py-4 pr-3 flex item gap-3 w-full'>
        <BackAndForwardButtons />
        <BreadCrumbs />
        <UserCredits />
        <VerticalDevider />
        <ThemeSwitch />
        <VerticalDevider />
        <UserActionsDropdown />
      </div>
    </div>
  )
}

const VerticalDevider = () => {
  return (
    <div className='h-[19px] w-[1px] my-auto bg-theme-light-stroke dark:bg-theme-night-stroke'></div>
  )
}

export default Topbar