'use client';

import React from 'react'

import { FormattedResult } from '@/src/interface-adapters/controllers/google-keyword-tracker/from-hooks/getKeywordPositionsGraphData.controller';

import { YAxis, XAxis, ResponsiveContainer, Area, AreaChart, CartesianGrid, Tooltip } from "recharts";
import MainKeywordDetailsGrapTooltip from './Tooltip';

import { extractHostname } from '@/app/_utils/urlUtils';
import { format, parse } from 'date-fns';


type Props = {
  isLoading: boolean;
  competitorsResult?: FormattedResult[];
  combinedData?: FormattedResult[];
  domain?: string;
  keywordName: string;
  resultUrl: string | null;
}

const LINE_COLORS = ["#ec4899", "#a855f7", "#6366f1", "#0ea5e9", "#14b8a6", "#22c55e", "#eab308", "#f97316", "#78716c", "#f43f5e"];

const MainPositionWithCompetitorsGraph = ({
  isLoading,
  competitorsResult,
  combinedData,
  domain,
  keywordName,
  resultUrl
}: Props) => {

  if (isLoading) return <MockGraphMainPositionWithCompetitors />

  if (!combinedData) return <MockGraphMainPositionWithCompetitors />

  const websiteKeys = Object.keys(competitorsResult?.[competitorsResult.length - 1] || {}).filter(key => key !== 'date');

  // Chart config 
  const userDomain = extractHostname(domain || resultUrl || '');
  const strokeColor = '#DFE5FA'
  const tickColor = '#9CA3AF'

  return (
    <div className='w-full h-[454px] px-4' >
      <div style={{ width: '100%', height: '454px' }}>
        <ResponsiveContainer>
          <AreaChart data={combinedData} >
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
            <Tooltip  wrapperStyle={{ zIndex: 1000}} content={< MainKeywordDetailsGrapTooltip keywordName={keywordName} chartData={combinedData} userDomain={userDomain} />} />
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
                stroke={LINE_COLORS[index % LINE_COLORS.length]}
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
    </div >
  )
}
const MOCK_LINE_COLORS = ["#e5e7eb", "#d1d5db", "#9ca3af", "#e5e7eb", "#4b5563", "#374151", "#1f2937", "#111827"];
const MockGraphMainPositionWithCompetitors = () => {
  const websiteKeys = Object.keys(MOCK_DATA?.[MOCK_DATA.length - 1] || {}).filter(key => key !== 'date');
  const strokeColor = '#DFE5FA'
  const tickColor = '#9CA3AF'

  return (
    <div className='animate-pulse w-full h-[454px] px-4'>
      <div style={{ width: '100%', height: '454px' }}>
        <ResponsiveContainer>
          <AreaChart data={MOCK_DATA} >
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
            <CartesianGrid stroke={'#DFE5FA'} strokeDasharray={'10 10'} horizontal={true} vertical={false} />
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
                isAnimationActive={false}
                yAxisId={1}
                type="monotone"
                dataKey={websiteKey}
                stroke={MOCK_LINE_COLORS[index % MOCK_LINE_COLORS.length]}
                strokeWidth={2}
                fill="transparent"
              />
            ))}

          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

const MOCK_DATA = [
  {
    "date": "2024-09-23",
    "baristart.nl": 7,
    "www.koffiewarenhuis.nl": 6,
    "www.vanpommeren.nl": 3,
    "www.casabarista.nl": 5
  },
  {
    "date": "2024-09-24",
    "baristart.nl": 6,
    "www.koffiewarenhuis.nl": 5,
    "www.vanpommeren.nl": 4,
    "www.casabarista.nl": 6
  },
  {
    "date": "2024-09-25",
    "baristart.nl": 8,
    "www.koffiewarenhuis.nl": 5,
    "www.vanpommeren.nl": 2,
    "www.casabarista.nl": 4
  },
  {
    "date": "2024-09-26",
    "baristart.nl": 6,
    "www.koffiewarenhuis.nl": 4,
    "www.vanpommeren.nl": 1,
    "www.casabarista.nl": 5
  },
  {
    "date": "2024-09-29",
    "baristart.nl": 5,
    "www.koffiewarenhuis.nl": 3,
    "www.vanpommeren.nl": 2,
    "www.casabarista.nl": 4
  },
  {
    "date": "2024-09-30",
    "baristart.nl": 4,
    "www.koffiewarenhuis.nl": 3,
    "www.vanpommeren.nl": 2,
    "www.casabarista.nl": 5
  },
  {
    "date": "2024-10-01",
    "baristart.nl": 5,
    "www.koffiewarenhuis.nl": 3,
    "www.vanpommeren.nl": 2,
    "www.casabarista.nl": 4
  }
]

export default MainPositionWithCompetitorsGraph