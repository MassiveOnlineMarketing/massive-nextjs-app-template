'use client'

import { Button } from '@/app/_components/ui/button'
import React from 'react'
import FormStuff from './FormStuff'

const Page = () => {
  return (
    <div className='p-6'>
      {/* Buttons */}
      <h1 className='text-xl font-semibold mb-2'>Buttons</h1>
      <div className='grid grid-cols-4 gap-6 items-center place-items-center'>

        {/* Default */}
        <Button variant='default' size='default'>Button</Button>
        <Button variant='default' size='sm'>Button</Button>
        <Button variant='default' size='lg'>Button</Button>
        <Button variant='default' size='icon'>Button</Button>

        {/* Outline */}
        <Button variant='outline' size='default'>Button</Button>
        <Button variant='outline' size='sm'>Button</Button>
        <Button variant='outline' size='lg'>Button</Button>
        <Button variant='outline' size='icon'>Button</Button>

        {/* Secondary */}
        <Button variant='secondary' size='default'>Button</Button>
        <Button variant='secondary' size='sm'>Button</Button>
        <Button variant='secondary' size='lg'>Button</Button>
        <Button variant='secondary' size='icon'>Button</Button>

        {/* Ghost */}
        <Button variant='ghost' size='default'>Button</Button>
        <Button variant='ghost' size='sm'>Button</Button>
        <Button variant='ghost' size='lg'>Button</Button>
        <Button variant='ghost' size='icon'>Button</Button>
      </div>

      <FormStuff />

      <div className='mt-6 mb-3'>
        <h1 className='text-xl font-semibold mb-2'>Toast</h1>
      </div>
    </div >
  )
}

export default Page