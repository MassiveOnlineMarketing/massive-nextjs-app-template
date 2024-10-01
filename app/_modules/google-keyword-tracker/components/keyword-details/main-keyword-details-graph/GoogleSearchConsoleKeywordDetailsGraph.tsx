'use client';

import React from 'react'
import Link from 'next/link';

import { KeywordSearchConsoleData } from '@/src/application/api/search-console.api.types';

import { YAxis, XAxis, ResponsiveContainer, Area, AreaChart } from "recharts";

import { LockClosedIcon } from '@heroicons/react/16/solid';


type Props = {
  hasAcces: boolean;
  isLoading: boolean;
  data?: KeywordSearchConsoleData[];
  gscUrl?: string | null;
  websiteId?: string;
}

const GoogleSearchConsoleKeywordDetailsGraph = ({
  hasAcces,
  isLoading,
  data,
  gscUrl,
  websiteId
}: Props) => {

  if (!hasAcces) {
    return (
      <>
        {/* Clicks */}
        <div className='relative flex-1 h-full bg-blue-50 dark:bg-blue-700/10 px-4 pt-4 pb-6'>
          <div className='pl-2.5 border-l-2 border-blue-500'>
            <MochGraphCard value={420} dataKey='clicks' stroke='#3B82F6' label='Total Clicks' />
          </div>
          <ConnectSearchConsoleOverlay />
        </div>

        {/* Impressions */}
        <div className='relative flex-1 h-full bg-base-50 dark:bg-base-700/10 px-4 pt-4 pb-6'>
          <div className='pl-2.5 border-l-2 border-base-500'>
            <MochGraphCard value={420} dataKey='impressions' stroke='#7857FE' label='Total Impressions' />
          </div>
          <ConnectSearchConsoleOverlay />
        </div>

        {/* Click through rate */}
        <div className='relative  flex-1 h-full bg-green-50 dark:bg-green-700/10 px-4 pt-4 pb-6'>
          <div className='pl-2.5 border-l-2 border-green-500'>
            <MochGraphCard value={420} dataKey='ctr' stroke='#22C55E' label='Average Click Through Rate' />
          </div>
          <ConnectSearchConsoleOverlay />
        </div>
      </>
    )
  }

  if (!gscUrl) {
    return (
      <>
      {/* Clicks */}
      <div className='relative flex-1 h-full bg-blue-50 dark:bg-blue-700/10 px-4 pt-4 pb-6'>
        <div className='pl-2.5 border-l-2 border-blue-500'>
          <MochGraphCard value={420} dataKey='clicks' stroke='#3B82F6' label='Total Clicks' />
        </div>
        <AddGSCPropertyOverlay websiteId={websiteId} />
      </div>

      {/* Impressions */}
      <div className='relative flex-1 h-full bg-base-50 dark:bg-base-700/10 px-4 pt-4 pb-6'>
        <div className='pl-2.5 border-l-2 border-base-500'>
          <MochGraphCard value={420} dataKey='impressions' stroke='#7857FE' label='Total Impressions' />
        </div>
        <AddGSCPropertyOverlay websiteId={websiteId}/>
      </div>

      {/* Click through rate */}
      <div className='relative  flex-1 h-full bg-green-50 dark:bg-green-700/10 px-4 pt-4 pb-6'>
        <div className='pl-2.5 border-l-2 border-green-500'>
          <MochGraphCard value={420} dataKey='ctr' stroke='#22C55E' label='Average Click Through Rate' />
        </div>
        <AddGSCPropertyOverlay websiteId={websiteId}/>
      </div>
    </>
    )
  }

  if (isLoading) return <IsLoadingSkeleton />

  if (!data) return <IsLoadingSkeleton />


  const ctrAverage = getCtrAverage(data, 'ctr');
  const totalClicks = getTotals(data, 'clicks');
  const totalImpressions = getTotals(data, 'impressions');

  return (
    <>
      {/* Clicks */}
      <div className='flex-1 h-full bg-blue-50 dark:bg-blue-700/10 px-4 pt-4 pb-6'>
        <div className='pl-2.5 border-l-2 border-blue-500'>
          <div className='flex'>
            <p className='theme-t-p font-semibold text-[32px] w-[100px]'>{totalClicks}</p>
            <div className='ml-auto' style={{ width: '110px', height: '30px' }}>
              <ResponsiveContainer>
                <AreaChart data={data}  >
                  <XAxis
                    dataKey={'date'}
                    hide={true}
                  />
                  <YAxis
                    yAxisId={1}
                    hide={true}
                  />

                  <Area
                    isAnimationActive={true}
                    yAxisId={1}
                    type="monotone"
                    dataKey='clicks'
                    stroke='#3B82F6'
                    strokeWidth={2}
                    fill="transparent"
                  />

                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p className='theme-t-t text-sm'>Total Clicks</p>
        </div>
      </div>

      {/* Impressions */}
      <div className='flex-1 h-full bg-base-50 dark:bg-base-700/10 px-4 pt-4 pb-6'>
        <div className='pl-2.5 border-l-2 border-base-500'>
          <div className='flex'>
            <p className='theme-t-p font-semibold text-[32px] w-[100px]'>{totalImpressions}</p>
            <div className='ml-auto' style={{ width: '110px', height: '30px' }}>
              <ResponsiveContainer>
                <AreaChart data={data}  >
                  <XAxis
                    dataKey={'date'}
                    hide={true}
                  />
                  <YAxis
                    yAxisId={1}
                    hide={true}
                  />

                  <Area
                    isAnimationActive={true}
                    yAxisId={1}
                    type="monotone"
                    dataKey='impressions'
                    stroke='#7857FE'
                    strokeWidth={2}
                    fill="transparent"
                  />

                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p className='theme-t-t text-sm'>Total Impressions</p>
        </div>
      </div>

      {/* Click through rate */}
      <div className='flex-1 h-full bg-green-50 dark:bg-green-700/10 px-4 pt-4 pb-6'>
        <div className='pl-2.5 border-l-2 border-green-500'>
          <div className='flex'>
            <p className='theme-t-p font-semibold text-[32px] w-[100px]'>{ctrAverage ? ctrAverage : '0'}%</p>
            <div className='ml-auto' style={{ width: '110px', height: '30px' }}>
              <ResponsiveContainer>
                <AreaChart data={data}  >
                  <XAxis
                    dataKey={'date'}
                    hide={true}
                  />
                  <YAxis
                    yAxisId={1}
                    hide={true}
                  />

                  <Area
                    isAnimationActive={true}
                    yAxisId={1}
                    type="monotone"
                    dataKey='ctr'
                    stroke='#22C55E'
                    strokeWidth={2}
                    fill="transparent"
                  />

                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p className='theme-t-t text-sm'>Average Click Through Rate</p>
        </div>
      </div>
    </>
  )
}

const IsLoadingSkeleton = () => {
  return (
    <>
      {/* Clicks */}
      <div className='animate-pulse  flex-1 h-full bg-slate-50 dark:bg-blue-700/10 px-4 pt-4 pb-6'>
        <div className='pl-2.5 border-l-2 border-slate-500'>
          <MochGraphCard value={420} dataKey='clicks' stroke='#64748B' label='Total Clicks' />
        </div>
      </div>

      {/* Impressions */}
      <div className='animate-pulse  flex-1 h-full bg-slate-50 dark:bg-base-700/10 px-4 pt-4 pb-6'>
        <div className='pl-2.5 border-l-2 border-slate-500'>
          <MochGraphCard value={420} dataKey='impressions' stroke='#64748B' label='Total Impressions' />
        </div>
      </div>

      {/* Click through rate */}
      <div className='animate-pulse  flex-1 h-full bg-slate-50 dark:bg-green-700/10 px-4 pt-4 pb-6'>
        <div className='pl-2.5 border-l-2 border-slate-500'>
          <MochGraphCard value={420} dataKey='ctr' stroke='#64748B' label='Average Click Through Rate' />
        </div>
      </div>
    </>
  )
}

const ConnectSearchConsoleOverlay = () => {
  return (
    <div className='absolute top-0 left-0 w-full h-full bg-white/[0.01] dark:bg-theme-night-background-secondary backdrop-blur-sm flex flex-col gap-2.5 items-center justify-center '>
      <LockClosedIcon className='w-5 h-5 theme-t-t' />
      <p className='theme-t-s text-sm text-center'>Please connect your <br /> <Link className='text-base-500' href='/app/integrations' >Search Console Account</Link></p>
    </div>
  )
}

const AddGSCPropertyOverlay = ({ websiteId }: { websiteId?: string }) => {
  return (
    <div className='absolute top-0 left-0 w-full h-full bg-white/[0.01] dark:bg-theme-night-background-secondary backdrop-blur-sm flex flex-col gap-2.5 items-center justify-center '>
      <LockClosedIcon className='w-5 h-5 theme-t-t' />
      <p className='theme-t-s text-sm text-center'>Please add your <br />
        {
          websiteId
            ? <Link className='text-base-500' href={`/app/settings/website/${websiteId}`} >Search Console Property</Link>
            : 'Search Console Property'
        }
      </p>
    </div>
  )
}

export const MochGraphCard = ({ value, dataKey, stroke, label }: { value: number, dataKey: string, stroke: string, label: string }) => {
  return (
    <>
      <div className='flex'>
        <p className='theme-t-p font-semibold text-[32px] w-[100px]'>{value}</p>
        <div className='ml-auto' style={{ width: '110px', height: '30px' }}>
          <ResponsiveContainer>
            <AreaChart data={MOCK_DATA}  >
              <XAxis
                dataKey={'date'}
                hide={true}
              />
              <YAxis
                yAxisId={1}
                hide={true}
              />

              <Area
                isAnimationActive={false}
                yAxisId={1}
                type="monotone"
                dataKey={dataKey}
                stroke={stroke}
                strokeWidth={2}
                fill="transparent"
              />

            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <p className='theme-t-t text-sm'>{label}</p>
    </>
  )
}


// Define a type that includes only the keys of KeywordSearchConsoleData whose values are number
type NumericKeys<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

function getTotals<K extends NumericKeys<KeywordSearchConsoleData>>(data: KeywordSearchConsoleData[], key: K): number {
  return data.reduce((total, item) => total + item[key], 0);
}

const getCtrAverage = <K extends NumericKeys<KeywordSearchConsoleData>>(data: KeywordSearchConsoleData[], key: K): number => {
  const numberOfPopulatedDays = data.filter((result) => result[key] !== 0).length;
  return Number((getTotals(data, key) / numberOfPopulatedDays).toFixed(2));
}

const MOCK_DATA: KeywordSearchConsoleData[] = [
  {
    "clicks": 0,
    "ctr": 0,
    "date": "2024-09-24",
    "impressions": 1,
    "position": 3
  },
  {
    "clicks": 0,
    "ctr": 0,
    "date": "2024-09-25",
    "impressions": 3,
    "position": 73.66666666666667
  },
  {
    "clicks": 0,
    "ctr": 0,
    "date": "2024-09-27",
    "impressions": 1,
    "position": 93
  },
  {
    "clicks": 0,
    "ctr": 0,
    "date": "2024-09-29",
    "impressions": 1,
    "position": 7
  },
  {
    "clicks": 0,
    "ctr": 0,
    "date": "2024-09-30",
    "impressions": 0,
    "position": 10
  }
]

export default GoogleSearchConsoleKeywordDetailsGraph