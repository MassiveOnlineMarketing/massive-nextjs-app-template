'use client'

import React, { useState } from 'react'

import { LatestGoogleKeywordResultsDto } from '@/src/interface-adapters/controllers/google-keyword-tracker/get-latest-google-keyword-results.controller'
import { FormattedResult } from '@/src/interface-adapters/controllers/google-keyword-tracker/getKeywordPositionsGraphData.controller';
import { KeywordSearchConsoleData } from '@/src/application/api/search-console.api.types';

import useFetchKeywordPositionsGraphData from "@/app/_modules/google-keyword-tracker/hooks/fetching/useFetchKeywordPositionsGraphData";
import useGoogleToken from '@/app/_modules/auth/hooks/useGoogleRefreshToken';

import { YAxis, XAxis, Tooltip, ResponsiveContainer, Area, AreaChart, CartesianGrid, Legend, TooltipProps } from "recharts";

import { format, parse } from 'date-fns';
import { cn } from '@/app/_components/utils';
import { getOrdinalSuffix } from '@/app/_utils/numberUtils';
import { extractHostname } from '@/app/_utils/urlUtils';


const COLORS = ["#ec4899", "#a855f7", "#6366f1", "#0ea5e9", "#14b8a6", "#22c55e", "#eab308", "#f97316", "#78716c", "#f43f5e"];

const PositionDataGraph = ({ result, domain }: { result: LatestGoogleKeywordResultsDto, domain: string }) => {
  const [dataRange, setDataRange] = useState(7);
  const { isLoading, data: res } = useFetchKeywordPositionsGraphData(result.keywordId, 'sc-domain:baristart.nl', result.keywordName, result.url, dataRange);
  const { hasAccess } = useGoogleToken('search-console');

  console.log('rerender position data graph')


  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  if (!res?.userResult) {
    return (
      <div>
        No data
      </div>
    )
  }

  // Handlers for button clicks to update the data range
  const handleRangeChange = (range: number) => {
    console.log('range', range)
    setDataRange(range);
  };

  return (
    <>
      {/* Graphs */}
      <div className='border theme-b-p ring-1 ring-offset-2 dark:ring-offset-transparent ring-theme-light-stroke dark:ring-theme-night-stroke rounded-xl theme-bg-p   flex flex-row'>
        <SmallGraphs userResults={res.userResult} gscData={res.searchConsoleData} hasAccess={hasAccess} />

        <BigGraph usersResult={res.userResult} competitorsResult={res.competitorResult} domain={domain} keywordName={result.keywordName} />
      </div>

      {/* Data range selection */}
      <div className='h-11 w-fit mt-2.5 mb-4 p-[2px] rounded-lg border theme-b-p flex overflow-hidden text-sm'>
        <button className={cn(
          'px-4 py-[10px] rounded-l-[8px]',
          dataRange === 7 ? 'theme-t-p theme-bg-w' : 'theme-t-n theme-bg-p'
        )} onClick={() => handleRangeChange(7)}>7d</button>
        <Divider />
        <button className={cn(
          'px-4 py-[10px]',
          dataRange === 14 ? 'theme-t-p theme-bg-w' : 'theme-t-n theme-bg-p'
        )} onClick={() => handleRangeChange(14)}>14d</button>
        <Divider />
        <button className={cn(
          'px-4 py-[10px] rounded-r-[8px]',
          dataRange === 30 ? 'theme-t-p theme-bg-w' : 'theme-t-n theme-bg-p'
        )} onClick={() => handleRangeChange(30)}>30d</button>
      </div>
    </>
  );
}
const Divider = () => {
  return <div className="h-5 w-[1px] my-[10px] bg-theme-light-stroke dark:bg-theme-night-stroke"></div>
}

type SmallGraphsProps = {
  hasAccess: boolean,
  gscData: any,
  userResults: any
}
const SmallGraphs = ({
  hasAccess,
  gscData,
  userResults,
}: SmallGraphsProps) => {
  const userKey = Object.keys(userResults?.[userResults.length - 1] || {}).filter(key => key !== 'date')[0];
  const positionTotal = getAveragePositionForUser(userResults, userKey).toFixed(1);

  const ctrAverage = getCtrAverage(gscData || [], 'ctr');
  const totalClicks = getTotals(gscData || [], 'clicks');
  const totalImpressions = getTotals(gscData || [], 'impressions');
  console.log('rerender small graphs')

  return (
    <div className='max-w-[273px] w-full flex flex-col'>
      {/* Clicks */}
      <div className='flex-1 h-full bg-blue-50 dark:bg-blue-700/10 px-4 pt-4 pb-6'>
        <div className='pl-2.5 border-l-2 border-blue-500'>
          <div className='flex'>
            <p className='theme-t-p font-semibold text-[32px] w-[100px]'>{totalClicks}</p>
            <SmallGraphsWrapper hasAccess={hasAccess}>
              <div className='ml-auto' style={{ width: '110px', height: '30px' }}>
                <ResponsiveContainer>
                  <AreaChart data={gscData}  >
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
            </SmallGraphsWrapper>
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
                <AreaChart data={gscData}  >
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
                <AreaChart data={gscData}  >
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

      {/* Position */}
      <div className='flex-1 h-full bg-yellow-50 dark:bg-yellow-700/10 px-4 pt-4 pb-6'>
        <div className='pl-2.5 border-l-2 border-yellow-500'>
          <div className='flex'>
            <p className='theme-t-p font-semibold text-[32px] w-[100px]'>{positionTotal}</p>
            <div className='ml-auto' style={{ width: '110px', height: '30px' }}>
              <ResponsiveContainer>
                <AreaChart data={userResults}  >
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
      </div>
    </div>
  )
}

const SmallGraphsWrapper = ({ children, hasAccess }: { children: React.ReactNode, hasAccess: boolean }) => {

  if (!hasAccess) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <p className='theme-t-p text-lg'>You do not have access to this data</p>
      </div>
    )
  }

  return children
}


type BigGraphProps = {
  usersResult: any[],
  competitorsResult: any[],
  domain: string,
  keywordName: string
}
const BigGraph = ({
  usersResult,
  competitorsResult,
  domain,
  keywordName
}: BigGraphProps) => {

  const data = combineResults(usersResult, competitorsResult);
  const websiteKeys = Object.keys(competitorsResult?.[competitorsResult.length - 1] || {}).filter(key => key !== 'date');
  console.log('data, user, comp', data, usersResult, competitorsResult)

  // Chart config 
  const userDomain = extractHostname(domain);
  const strokeColor = '#DFE5FA'
  const tickColor = '#9CA3AF'

  console.log('rerender big graph')

  return (
    <div className='w-full h-[454px] px-4'>
      <div style={{ width: '100%', height: '454px' }}>
        <ResponsiveContainer>
          <AreaChart data={data} >
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
            <Tooltip wrapperStyle={{ zIndex: 1000 }} content={< CustomTooltip keywordName={keywordName} chartData={data} userDomain={userDomain} />} />
            <YAxis
              reversed
              yAxisId={1}
              hide={true}
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
            <Area
              key={userDomain}
              isAnimationActive={true}
              yAxisId={1}
              type="monotone"
              dataKey={userDomain}
              stroke='#EAB308'
              strokeWidth={2}
              fill="transparent"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

const CustomTooltip = ({ payload, label, chartData, keywordName, userDomain }: TooltipProps<string, string> & { chartData: any[], keywordName: string, userDomain: string }) => {
  if (!payload || payload.length === 0) {
    return null;
  }
  // console.log('alles hier',payload, label, chartData, keywordName, userDomain)

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
          percentageChange > 0 ? 'bg-green-50 dark:bg-green-700/20 text-green-500 border-green-500' : percentageChange === 0 ? 'bg-gray-50 dark:bg-transparent text-gray-500 border-gray-500' : 'bg-red-50 dark:bg-red-700/20 text-red-500 border-red-500'
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












// Define a type that includes only the keys of KeywordSearchConsoleData whose values are number
type NumericKeys<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

function getTotals<K extends NumericKeys<KeywordSearchConsoleData>>(data: KeywordSearchConsoleData[], key: K): number {
  return data.reduce((total, item) => total + item[key], 0);
}

const getCtrAverage = <K extends NumericKeys<KeywordSearchConsoleData>>(data: KeywordSearchConsoleData[], key: K): number => {
  return Number((getTotals(data, key) / data.length).toFixed(2));
}

function getTotalForUser(userResult: any[], userKey: string): number {
  return userResult.reduce((total, current) => {
    if (current[userKey] !== undefined) {
      return total + current[userKey];
    }
    return total;
  }, 0);
}

function getAveragePositionForUser(userResult: any[], userKey: string): number {
  const total = getTotalForUser(userResult, userKey);
  const numberOfPopulatedDays = userResult.filter((result) => result[userKey] !== undefined).length;
  return total / numberOfPopulatedDays;
}

function combineResults(array1: FormattedResult[], array2: FormattedResult[]): FormattedResult[] {
  // Convert array1 to a map for easier merging by date
  const map = new Map<string, FormattedResult>();

  array1.forEach((item) => {
    map.set(item.date, { ...item });
  });

  // Merge array2 into the map, adding the URL data to the correct date
  array2.forEach((item) => {
    const existingEntry = map.get(item.date);
    if (existingEntry) {
      // Merge URLs from array2 into the existing entry
      Object.assign(existingEntry, item);
    } else {
      // If no existing entry for the date, add the new entry
      map.set(item.date, { ...item });
    }
  });

  // Convert the map back into an array
  return Array.from(map.values()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export default PositionDataGraph