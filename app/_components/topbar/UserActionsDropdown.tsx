'use client';

import React from 'react'

import { logout } from '@/app/_modules/auth/actions';
import { useCurrentUser } from '@/app/_modules/auth/hooks/user-current-user';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuItemLink, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';

import { ChevronDownIcon, UserIcon } from '@heroicons/react/20/solid';

const UserActionsDropdown = () => {
  const user = useCurrentUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='px-1.5 flex gap-3 items-center'>
        <div className='w-9 h-9 molecule rounded-full before:rounded-full after:rounded-full before:left-0'>
          {user?.image ? (
            // eslint-disable-next-line @next/next/no-img-element 
            <img src={user.image} alt='user' className='w-full h-full rounded-full' />
          ) : (
            <div className='w-full h-full flex items-center justify-center rounded-full '>
              <UserIcon className='theme-t-n w-9 h-9 rounded-full ' />
            </div>
          )}
        </div>
        <p className='text-nowrap theme-t-p text-[15px] font-medium'>{user?.name}</p>
        <ChevronDownIcon className='w-5 h-5' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[200px]'>
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuItemLink href='/app/settings/profile'>Profile</DropdownMenuItemLink>
        <DropdownMenuItemLink href='/app/integrations'>Integrations</DropdownMenuItemLink>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='cursor-pointer' onClick={async () => await logout() }  >Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserActionsDropdown