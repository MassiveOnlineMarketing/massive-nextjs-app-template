'use client'

import { Button } from '@/app/_components/ui/button'
import React from 'react'
import FormStuff from './FormStuff'
import { useToast } from '@/app/_components/ui/toast/use-toast'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@/app/_components/ui/dropdown-menu'
import { Settings } from 'lucide-react'
import { LoadingSpinner, LoadingSpinnerSmall } from '@/app/_components/ui/loading-spinner'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/app/_components/ui/tooltip'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from '@/app/_components/ui/command'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from '@/app/_components/ui/alert-dialog'

import UiCard from './UiCard'
import KwDetailCard from './KwDetailCard'
import Theme from './Theme'
import Tiers from './Tiers'

const Page = () => {
  const { toast } = useToast()

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

        {/* Destructive */}
        <Button variant='destructive' size='default'>Button</Button>
        <Button variant='destructive' size='sm'>Button</Button>
        <Button variant='destructive' size='lg'>Button</Button>
        <Button variant='destructive' size='icon'>Button</Button>

        {/* Ghost */}
        <Button variant='ghost' size='default'>Button</Button>
        <Button variant='ghost' size='sm'>Button</Button>
        <Button variant='ghost' size='lg'>Button</Button>
        <Button variant='ghost' size='icon'>Button</Button>
      </div>

      <FormStuff />

      {/* Toast */}
      <div className='mt-6 mb-3'>
        <h1 className='text-xl font-semibold mb-2'>Toast</h1>
        <div className='grid grid-cols-4 gap-6 items-center place-items-center'>
          {/* Zonder icon */}
          <Button onClick={() => toast({
            title: 'Toast Title',
            description: 'Toast Description',
            variant: 'success',
            duration: 50000,
          })} variant='default' size='default'>Succes</Button>
          <Button onClick={() => toast({
            title: 'Toast Title',
            description: 'Toast Description',
            variant: 'default',
            duration: 50000,
          })} variant='default' size='default'>Default</Button>
          <Button onClick={() => toast({
            title: 'Toast Title',
            description: 'Toast Description',
            variant: 'destructive',
            duration: 50000,
          })} variant='default' size='default'>Destructive</Button>
          <Button onClick={() => toast({
            title: 'Toast Title',
            description: 'Toast Description',
            variant: 'warning',
            duration: 50000,
          })} variant='default' size='default'>Warning</Button>

          {/* Met Icon */}
          <Button onClick={() => toast({
            title: 'Toast Title',
            description: 'Toast Description',
            icon: 'success',
            variant: 'success',
            duration: 50000,
          })} variant='default' size='default'>Succes w icon</Button>
          <Button variant='default' size='default'>NIKS</Button>
          <Button onClick={() => toast({
            title: 'Toast Title',
            icon: 'destructive',
            description: 'Toast Description',
            variant: 'destructive',
            duration: 50000,
          })} variant='default' size='default'>Destructive w icon</Button>
          <Button onClick={() => toast({
            title: 'Toast Title',
            icon: 'warning',
            description: 'Toast Description',
            variant: 'warning',
            duration: 50000,
          })} variant='default' size='default'>Warning w icon</Button>
        </div>
      </div>

      {/* Dropdown */}
      <div className='mt-6 mb-3'>
        <h1 className='text-xl font-semibold mb-2'>Dropdown & Command</h1>
        <div className='grid grid-cols-3 place-items-center gap-3'>
          <p>Dropdown met Button component</p>
          <p>Dropdown met original trigger</p>
          <p>Command Box, can gebruikt worden als een dropdown</p>
          {/* //! voeg open={true} toe aan DropdownMenu om hem altijd te openen, makkelijk om ui changes the checken  */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='default' size='default' className='w-fit'>Dropdown</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Dropdown Menu Label</DropdownMenuLabel>
              <DropdownMenuItem>Dropdown Menu Item</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Invite users</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Email</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Message</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>More...</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Dropdown Menu Item</DropdownMenuItem>
              <DropdownMenuItem>Dropdown Menu Item</DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* //! voeg open={true} toe aan DropdownMenu om hem altijd te openen, makkelijk om ui changes the checken  */}
          <DropdownMenu>
            <DropdownMenuTrigger className='w-fit'>
              Dropdown
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Dropdown Menu Label</DropdownMenuLabel>
              <DropdownMenuItem>Dropdown Menu Item</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Invite users</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Email</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Message</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>More...</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Dropdown Menu Item</DropdownMenuItem>
              <DropdownMenuItem>Dropdown Menu Item</DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Command className="rounded-lg border shadow-md md:min-w-[450px]">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Search Emoji</span>
                </CommandItem>
                <CommandItem disabled>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Calculator</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </div>

      {/* Alert Dialog */}
      <div className='mt-6 mb-3'>
        <h1 className='text-xl font-semibold mb-2'>Alert Dialog</h1>
        <div className='grid grid-cols-2 place-items-center gap-3'>
          <p>W button</p>
          <p>Normal trigger</p>
          {/* Dialog for deleting keyword */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='default' size='default'>Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>Are you sure you want to delete this keyword?</AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Confirm</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger>
              Delete
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>Are you sure you want to delete this keyword?</AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Confirm</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Loading spinners */}
      <div className='mt-6 mb-3'>
        <h1 className='text-xl font-semibold mb-2'>Loading Spinners</h1>
        <div className='grid grid-cols-2 place-items-center gap-3'>
          <p>Small</p>
          <p>Normal</p>
          <LoadingSpinnerSmall />
          <LoadingSpinner />
        </div>
      </div>

      <div className='mt-6 mb-3'>
        <h1 className='text-xl font-semibold mb-2'>Tooltip</h1>
        <div className='grid grid-cols-2 place-items-center gap-3'>
          <Tooltip delayDuration={0}>
            <TooltipTrigger>
              <p>tooltip</p>
            </TooltipTrigger>
            <TooltipContent>
              <p>Tooltip content</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className='mt-6 mb-3'>
        <h1 className='text-xl font-semibold mb-2'>Settings & kw detail card</h1>
        <div className='grid grid-cols-2 place-items-center gap-3'>
          <UiCard />
          <KwDetailCard />
        </div>
      </div>

      <div className='p-6'>
        <Theme />
      </div>

      <div className='p-6'>
        <Tiers />
      </div>

    </div >
  )
}

export default Page