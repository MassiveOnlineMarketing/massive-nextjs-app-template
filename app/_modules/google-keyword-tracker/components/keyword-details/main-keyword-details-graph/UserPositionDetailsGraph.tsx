'use client';

import React from 'react'

import { FormattedResult } from '@/src/interface-adapters/controllers/google-keyword-tracker/getKeywordPositionsGraphData.controller';

import { YAxis, XAxis, ResponsiveContainer, Area, AreaChart } from "recharts";
import { MochGraphCard } from './GoogleSearchConsoleKeywordDetailsGraph';


type Props = {
  isLoading: boolean;
  data?: FormattedResult[];
}

const UserPositionDetailsGraph = ({
  isLoading,
  data
}: Props) => {

  if (isLoading) {
    return (
      <div className='animate-pulse  flex-1 h-full bg-slate-50 dark:bg-blue-700/10 px-4 pt-4 pb-6'>
        <div className='pl-2.5 border-l-2 border-slate-500'>
          <MochGraphCard value={420} dataKey='position' stroke='#64748B' label='Average Position' />
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }
  const userKey = Object.keys(data?.[data.length - 1] || {}).filter(key => key !== 'date')[0];
  const positionTotal = getAveragePositionForUser(data, userKey).toFixed(1);

  return (
    < div className='flex-1 h-full bg-yellow-50 dark:bg-yellow-700/10 px-4 pt-4 pb-6' >
      <div className='pl-2.5 border-l-2 border-yellow-500'>
        <div className='flex'>
          <p className='theme-t-p font-semibold text-[32px] w-[100px]'>{positionTotal ? positionTotal : 0}</p>
          <div className='ml-auto' style={{ width: '110px', height: '30px' }}>
            <ResponsiveContainer>
              <AreaChart data={data}  >
                <XAxis
                  dataKey={'date'}
                  hide={true}
                />
                <YAxis
                  reversed
                  yAxisId={1}
                  hide={true}
                />

                <Area
                  isAnimationActive={true}
                  yAxisId={1}
                  type="monotone"
                  dataKey={userKey}
                  stroke='#EAB308'
                  strokeWidth={2}
                  fill="transparent"
                />

              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <p className='theme-t-t text-sm'>Average Position</p>
      </div>
    </div >
  )
}

function getTotalForUser(userResult: any[], userKey: string): number {
  return userResult.reduce((total, current) => {
    if (current[userKey] !== undefined) {
      return total + current[userKey];
    }
    return total;
  }, 0);
}

function getAveragePositionForUser(userResult: FormattedResult[], userKey: string): number {
  const total = getTotalForUser(userResult, userKey);
  const numberOfPopulatedDays = userResult.filter((result) => result[userKey] !== undefined).length;
  return total / numberOfPopulatedDays;
}

export default UserPositionDetailsGraph