'use server';

import React from 'react';
import { cn } from '@/app/_components/utils';
import { Label } from '@/app/_components/ui/label';
import { Card, CardContent, CardHeader } from '@/app/_modules/settings/components/SettingsCard';
import { Button } from '@/app/_components/ui/button';
import { ClipboardDocumentIcon } from '@heroicons/react/20/solid';

const LocationDetailsLoadingSkeleton = async () => {


  return (
    <Card className='mx-6 mb-6 animate-pulse'>
      <CardHeader className='flex justify-between items-center py-3'>
        <p>Location Details</p>
        <div className='flex items-center gap-3'>
          <p className='px-4 py-1.5 h-fit text-slate-500 border border-light-stroke rounded-lg flex items-center gap-2'>
            <ClipboardDocumentIcon className='w-4 h-4' />
          </p>
        </div>
      </CardHeader>
      <CardContent className='grid grid-cols-2 gap-3'>
        <div className='flex flex-col'>
          <SkeletonLabel />
        </div>

        <div className='flex flex-col'>
          <SkeletonLabel />
        </div>

        <div className='flex flex-col'>
          <SkeletonLabel />
        </div>

        <div className='flex flex-col'>
          <SkeletonLabel />
        </div>
      </CardContent>
    </Card>
  );
};

const SkeletonLabel = () => {
  return (
    <div className='flex flex-col'>
      <Label className={cn('font-normal text-sm bg-slate-200 h-3 my-1 w-[70px] rounded-full')}></Label>
      <button
        role="combobox"
        className={cn(
          "w-[412px] h-11 justify-between items-center text-sm",
          "inline-flex w-full mt-1 justify-between px-4 py-3 rounded-xl border theme-b-p bg-primary-50/50 placeholder-gray-400 ring-base-500 focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        )}
      >
      </button>
    </div>
  );
}


export default LocationDetailsLoadingSkeleton;