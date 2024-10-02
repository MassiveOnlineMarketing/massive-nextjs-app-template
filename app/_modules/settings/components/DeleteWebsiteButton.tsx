'use client';

import React from 'react'

import { useWebsiteDetailsStore } from '@/app/_stores/useWebsiteDetailsStore';
import { useTransition } from 'react';
import { deleteWebsite } from '@/app/_actions/website.actions';

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
import { useToast } from '@/app/_components/ui/toast/use-toast';
import { useRouter } from 'next/navigation';


function DeleteWebsiteButton({ websiteId }: { websiteId: string }) {

  const deleteWebsiteFromStore = useWebsiteDetailsStore(state => state.deleteWebsite)
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast();
  const router = useRouter()

  const handleDeleteLocation = async () => {
    startTransition(async () => {
      const res = await deleteWebsite(websiteId)

      if (res.error) {
        toast({
          title: "Error",
          description: res.error,
          variant: "destructive",
        })
        console.error(res.error)
        return
      }

      if (res.deletedWebsite) {
        deleteWebsiteFromStore(res.deletedWebsite.id)
        // TODO: Route user to settings page?
        router.push('/app/settings/webiste')
      }
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild disabled={isPending}>
        <button className='px-4 py-1.5 h-fit text-red-500 border border-red-500 rounded-lg'><TrashIcon className='w-4 h-4' /></button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            website and it&apos;s locations. All data associated to it&apos;s connected tools will be removed from our servers.
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

export default DeleteWebsiteButton