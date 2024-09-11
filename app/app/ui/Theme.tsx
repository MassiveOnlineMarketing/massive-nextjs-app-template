import ThemeSwitcher from '@/app/_components/ui/ThemeSwitcher'
import React from 'react'

const Theme = () => {
  return (
    <div className='bg-theme-bg-p'>
        <ThemeSwitcher />
        <div className='theme-t-p       px-4 py-2'>Text-primary</div>
        <div className='theme-t-s       px-4 py-2'>Text-secondary</div>
        <div className='theme-t-t       px-4 py-2'>Text-tertiary</div>

        <div className='theme-bg-p      px-4 py-2'>background-primary</div>
        <div className='theme-bg-s      px-4 py-2'>background-secondary</div>

        <div className='border theme-b-p px-4 py-2'>stroke</div>
    </div>
  )
}

export default Theme