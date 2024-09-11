'use client';

import React from 'react'

import { useWebsiteDetailsStore } from '@/app/_stores/useWebsiteDetailsStore';
import { useTransition } from 'react';
import { deleteLocation } from '@/app/_actions/location.actions';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog"

import { TrashIcon } from '@heroicons/react/20/solid'


function DeleteLocationButton({ locationId }: { locationId: string }) {

  const deleteLocationFromStore = useWebsiteDetailsStore(state => state.deleteLocation)
  const [isPending, startTransition] = useTransition()

  const handleDeleteLocation = async () => {
    startTransition(async () => {
      const res = await deleteLocation(locationId)
      console.log('res LocationDetails.tsx > deleteLocation', res)

      // TODO: throw error/ toast
      if (res.error) {
        console.error(res.error)
        return
      }

      if (res.deletedLocation) {
        deleteLocationFromStore(res.deletedLocation.id)
        // TODO: Route user to the website? res.deletedLocation.websiteId
      }
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild disabled={isPending} >
        <button className='px-4 py-[6px] h-fit text-red-500 border border-red-500 rounded-[10px]'><TrashIcon className='w-4 h-4' /></button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            location. All data associated to it's connected tools will be removed from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteLocation}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteLocationButton