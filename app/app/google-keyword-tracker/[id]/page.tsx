import React, { Suspense } from 'react'

import { isAuthenticated } from '@/app/_modules/auth/actions';
import { getLatestGoogleKeywordResults } from '@/app/_modules/actions/google-keyword-tracker.actions';

import FilteredStats from '@/app/_modules/google-keyword-tracker/components/layout/FilteredStats';
import ClientPage from './ClientPage';

import { ViewfinderCircleIcon } from '@heroicons/react/20/solid'
import dynamic from 'next/dynamic';
import { LoadingSpinner } from '@/app/_components/ui/loading-spinner';



const page = async ({
  params: { id }
}: {
  params: { id: string }
}) => {
  await isAuthenticated();


  // console.log('new page fetch',id, res.results?.length)


  return (
    <div className='w-full theme-bg-w border theme-b-p mr-3 rounded-t-2xl '>
      <div className=' h-[calc(100vh-79px)]  custom-scrollbar -mr-3 pr-[3px]'>
        <div className='px-6'>
          <div className='sticky top-0 theme-bg-w pt-5 pb-3 flex justify-between'>

            <div className='theme-t-p flex items-center gap-4'>
              <div className='w-14 h-14 molecule2 rounded-lg flex items-center justify-center'>
                <ViewfinderCircleIcon className='w-6 h-6 ' />
              </div>
              <p className='font-medium text-2xl'>Keyword Tracker</p>
            </div>

            <div>
              <FilteredStats />
            </div>
          </div>

          <Suspense fallback={<div className='flex h-[calc(100vh-170px)] w-full items-center justify-center'><LoadingSpinner /></div>}>
            <PageInitialization toolId={id}/>
          </Suspense>
        </div>
      </div>
    </div>
  )
}

async function PageInitialization({ toolId }: { toolId: string }) {
  const res = await getLatestGoogleKeywordResults(toolId)

  return <ClientPage latestResults={res.results || []} />
}

export default page