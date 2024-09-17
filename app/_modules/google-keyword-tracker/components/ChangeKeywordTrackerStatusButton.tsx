'use client';

import React, { ButtonHTMLAttributes } from 'react'

import { useWebsiteDetailsStore } from '@/app/_stores/useWebsiteDetailsStore';
import { useTransition } from 'react';
import { deleteLocation } from '@/app/_actions/location.actions';

import { PauseIcon } from '@heroicons/react/20/solid'
import { useToast } from '@/app/_components/ui/toast/use-toast';
import { GoogleKeywordTrackerStatus } from '@/src/entities/models/google-keyword-tracker';
import { PlayIcon } from '@heroicons/react/16/solid';
import { changeGoogleKeywordTrackerStatus } from '../../actions/google-keyword-tracker.actions';


function ChangeKeywordTrackerStatusButton({ status, id }: { status: GoogleKeywordTrackerStatus, id: string }) {

  const [isPending, startTransition] = useTransition()

  const { toast } = useToast();


  const handleChangeStatus = async (changeTo: GoogleKeywordTrackerStatus) => {
    startTransition(async () => {
      console.log('changeTo', changeTo)
      const res = await changeGoogleKeywordTrackerStatus(id, changeTo)

      if (res.error) {
        toast({
          title: "Error",
          description: res.error,
          variant: "destructive",
        })
        console.error(res.error)
        return
      }

      toast({
        title: "Success",
        description: "Status changed successfully",
        variant: "success",
      })
    })
  }

  if (status === 'ACTIVE') {
    return (
      <Button disabled={isPending} onClick={() => handleChangeStatus('PAUSED')} ><PauseIcon className='w-4 h-4 theme-t-t' /></Button>
    )
  }

  if (status === 'PAUSED') {
    return (
      <Button disabled={isPending} onClick={() => handleChangeStatus('ACTIVE')}> <PlayIcon className='w-4 h-4 theme-t-t' /></Button>
    )
  }
}

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
  return (
    <button
      className='px-4 py-1.5 h-fit theme-t-t border theme-b-p rounded-lg flex items-center gap-2'
      {...props}
    >
      {children}
    </button>
  );
};

export default ChangeKeywordTrackerStatusButton