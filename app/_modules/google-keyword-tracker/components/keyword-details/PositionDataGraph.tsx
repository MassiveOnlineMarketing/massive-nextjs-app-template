'use client'

import { LatestGoogleKeywordResultsDto } from '@/src/interface-adapters/controllers/google-keyword-tracker/get-latest-google-keyword-results.controller'
import React from 'react'

import useFetchKeywordPositionsGraphData from "@/app/_modules/google-keyword-tracker/hooks/fetching/useFetchKeywordPositionsGraphData";

import { YAxis, XAxis, Tooltip, ResponsiveContainer, Area, AreaChart, CartesianGrid, Legend, TooltipProps } from "recharts";

import { format, parse } from 'date-fns';
import { cn } from '@/app/_components/utils';
import { getOrdinalSuffix } from '@/app/_utils/numberUtils';
import { extractHostname } from '@/app/_utils/urlUtils';

const COLORS = ["#ec4899", "#a855f7", "#6366f1", "#0ea5e9", "#14b8a6", "#22c55e", "#eab308", "#f97316", "#78716c", "#f43f5e"];


const PositionDataGraph = ({ result, domain }: { result: LatestGoogleKeywordResultsDto, domain: string }) => {
  const { isLoading, data: res } = useFetchKeywordPositionsGraphData(result.keywordId)

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  if (!res?.data) {
    return (
      <div>
        No data
      </div>
    )
  }

  const data = res.data
  const keys = Object.keys(data?.[data.length - 1] || {});
  const websiteKeys = keys.filter(key => key !== 'date');

  const userDomain = extractHostname(domain);

  const strokeColor = '#DFE5FA'
  const tickColor = '#9CA3AF'



  return (
    <div className='border theme-b-p ring-1 ring-offset-2 ring-base-200 rounded-xl bg-base-50   flex flex-row'>
      <div className='max-w-[273px] w-full flex flex-col'>
        <div className='flex-1 h-full bg-blue-50'>
          
        </div>
        <div className='flex-1 h-full bg-base-50'>
          
        </div>
        <div className='flex-1 h-full bg-green-50'>
          
        </div>
        {/* <div className='flex-1 h-full bg-yellow-50'>
          
        </div> */}
      </div>
      <div style={{ width: '100%', height: '454px' }}>
        <ResponsiveContainer>
          <AreaChart data={data} style={{ paddingBottom: 0, marginLeft: -25 }} >
            <XAxis
              dataKey={'date'}
              interval={0}
              tickFormatter={(tickItem) => {
                const date = parse(tickItem, "yyyy-MM-dd", new Date());
                return format(date, "MM/dd");
              }}
              tick={{ fontSize: 14, fill: tickColor }}
              padding={{ left: 30, right: 30 }}
              axisLine={{ strokeWidth: 1, stroke: strokeColor }}
            />
            <CartesianGrid stroke={strokeColor} strokeDasharray={'10 10'} horizontal={true} vertical={false} />
            <Tooltip wrapperStyle={{ zIndex: 1000 }} content={< CustomTooltip keywordName={result.keywordName} chartData={data} userDomain={userDomain} />} />
            <YAxis
              reversed
              yAxisId={1}
              axisLine={false}
              tick={{ fontSize: 14, fill: tickColor }}
            />
            {websiteKeys.map((websiteKey, index) => (
              <Area
                key={websiteKey}
                isAnimationActive={true}
                yAxisId={1}
                type="monotone"
                dataKey={websiteKey}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={2}
                fill="transparent"
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const CustomTooltip = ({ payload, label, chartData, keywordName, userDomain }: TooltipProps<string, string> & { chartData: any[], keywordName: string, userDomain: string }) => {
  if (!payload || payload.length === 0) {
    return null;
  }

  const currentDate = payload[0].payload.date;
  const currentIndex = chartData.findIndex(data => data.date === currentDate);

  let previousDate = null;
  let previousPosition = null;
  const currentPosition = chartData[currentIndex][userDomain];

  if (currentIndex > 0) {
    previousDate = chartData[currentIndex - 1].date;
    previousPosition = chartData[currentIndex - 1][userDomain];
  }

  const percentageChange = previousPosition ? ((previousPosition - currentPosition) / previousPosition) * 100 : 0;

  const formattedDate = format(parse(label, 'yyyy-MM-dd', new Date()), 'dd MMMM yyyy');

  return (
    <div
      className='w-[375px]  rounded-xl debug backdrop-blur  bg-white/60 dark:bg-theme-night-background-secondary border theme-b-p ring-4 ring-base-200 dark:ring-theme-night-background-secondary'
      style={{
        transform: 'translate(-80px,-110px)',
      }}
    >
      <div className='w-full pt-2.5 px-4 flex items-center'>
        <div>
          <p className='theme-t-p font-medium'>{formattedDate}</p>
          <p className='theme-t-s text-sm'>{keywordName}</p>
        </div>
        <p className={cn(
          'ml-auto px-2.5 py-1 rounded-md border text-xs',
          percentageChange > 0 ? 'bg-green-50 text-green-500 border-green-500' : percentageChange === 0 ? 'bg-gray-50 text-gray-500 border-gray-500' : 'bg-red-50 text-red-500 border-red-500'
        )}>{percentageChange > 0 ? `+${percentageChange.toFixed(0)}` : percentageChange.toFixed(0)}%</p>
        <p className='ml-2 text-3xl theme-t-p font-semibold'>
          {currentPosition}
          <span className='text-sm theme-t-t '>{getOrdinalSuffix(currentPosition)}</span>
        </p>
      </div>
      <div className='p-4 flex flex-col gap-3'>
        {/* Qick and nasty sort */}
        {payload?.sort((a, b) => {
          const aValue = Number(a.value ?? 0);
          const bValue = Number(b.value ?? 0);
          return aValue - bValue;
        }).map((entry, index) => (
          <div key={index}>
            <div style={{ borderLeft: `2px solid ${entry.color}` }} className='flex justify-between'>
              <div className='ml-2'>
                <p className='theme-t-p text-sm'>{entry.name}</p>
                <p className='theme-t-t text-xs'>{entry.name}</p>
              </div>
              <p className='w-fit h-fit px-2 py-[2px] border theme-b-p rounded-md text-xs' style={{ color: entry.color }}>
                Position
                <span className='ml-1'>
                  {entry.value}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PositionDataGraph