'use client';

import React from 'react'

import { useTransition } from 'react';

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
import { deleteGoogleKeywordTracker } from '../../actions/google-keyword-tracker.actions';
import { useRouter } from 'next/navigation';
import { useWebsiteDetailsStore } from '@/app/_stores/useWebsiteDetailsStore';


function DeleteKeywordTrackerButton({ KeywordTrackerId }: { KeywordTrackerId: string }) {
  const [isPending, startTransition] = useTransition()

  const { toast } = useToast();
  const router = useRouter()
  const removeKeywordTrackerFromStrore = useWebsiteDetailsStore(state => state.removeKeywordTracker)

  const handleDeleteKeywordTracker = async () => {
    startTransition(async () => {
      const res = await deleteGoogleKeywordTracker(KeywordTrackerId)

      if (res.error) {
        toast({
          title: "Error",
          description: res.error,
          variant: "destructive",
        })
        console.error(res.error)
        return
      }

      if (res.googleKeywordTracker) {
        toast({
          title: "Success",
          description: "Keyword Tracker deleted successfully",
          variant: "success",
        })
        removeKeywordTrackerFromStrore(res.googleKeywordTracker)
        router.refresh()
      }
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild disabled={isPending} >
        <button className='px-4 py-1.5 h-fit text-red-500 border border-red-500 rounded-lg'><TrashIcon className='w-4 h-4' /></button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            KeywordTracker. All data associated to it&apos;s connected tools will be removed from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteKeywordTracker}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteKeywordTrackerButton