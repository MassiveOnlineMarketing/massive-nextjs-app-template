import React from 'react'

import { redirect } from 'next/navigation';
import { auth } from '@/app/_modules/auth/_nextAuth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

import { getLatestGoogleKeywordResults } from '@/app/_modules/actions/google-keyword-tracker.actions';

import ClientPage from './ClientPage';

import { ViewfinderCircleIcon } from '@heroicons/react/20/solid'
import FilteredStats from '@/app/_modules/google-keyword-tracker/components/layout/FilteredStats';

const page = async ({
  params: { id }
}: {
  params: { id: string }
}) => {
  const session = await auth();

  if (!session?.user || !session?.user.id) (
    redirect(DEFAULT_LOGIN_REDIRECT)
  )

  const res = await getLatestGoogleKeywordResults(id)
  console.log('new page fetch',id, res.results?.length)

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

          <ClientPage latestResults={res.results ?? []} />

        </div>
      </div>
    </div>
  )
}

export default page