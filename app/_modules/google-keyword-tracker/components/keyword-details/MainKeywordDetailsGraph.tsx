'use client';
import React, { useState } from 'react'

import { LatestGoogleKeywordResultsDto } from "@/src/interface-adapters/controllers/google-keyword-tracker/get-latest-google-keyword-results.controller";
import { WebsiteWithLocationDisplay } from '@/app/_stores/useWebsiteDetailsStore';
import { FormattedResult } from '@/src/interface-adapters/controllers/google-keyword-tracker/getKeywordPositionsGraphData.controller';

import useFetchKeywordPositionsGraphData from '../../hooks/fetching/useFetchKeywordPositionsGraphData';
import useFetchSearchConsoleKeywordGraphData from '../../hooks/fetching/useFetchSearchConsoleKeywordGraphData';
import useGoogleToken from '@/app/_modules/auth/hooks/useGoogleRefreshToken';

import NewTest from './main-keyword-details-graph/NewTest';
import MainPositionWithCompetitorsGraph from './main-keyword-details-graph/MainPositionWithCompetitorsGraph';
import UserPositionDetailsGraph from './main-keyword-details-graph/UserPositionDetailsGraph';
import GoogleSearchConsoleKeywordDetailsGraph from './main-keyword-details-graph/GoogleSearchConsoleKeywordDetailsGraph';

import { cn } from '@/app/_components/utils';

const MainKeywordDetailsGraph = ({ result, website }: { result: LatestGoogleKeywordResultsDto, website?: WebsiteWithLocationDisplay }) => {

  const [dataRange, setDataRange] = useState(7);
  const { isLoading: isLoadingPositions, data: resPositions } = useFetchKeywordPositionsGraphData(result.keywordId, result.keywordName, result.url, dataRange, website?.gscUrl);
  const { isLoading: isLoadingSearchConsole, data: searchConsoleData } = useFetchSearchConsoleKeywordGraphData(result.keywordName, result.url, dataRange, website?.gscUrl);
  const { hasAccess, } = useGoogleToken('search-console');

  const handleRangeChange = (range: number) => {
    console.log('range', range)
    setDataRange(range);
  };

  return (
    <>
      <div className='border theme-b-p ring-1 ring-offset-2 dark:ring-offset-transparent ring-theme-light-stroke dark:ring-theme-night-stroke rounded-xl theme-bg-p   flex flex-row'>
        <div className='max-w-[273px] w-full flex flex-col'>
          <GoogleSearchConsoleKeywordDetailsGraph
            data={searchConsoleData?.data?.data}
            isLoading={isLoadingSearchConsole}
            hasAcces={hasAccess}
            websiteId={website?.id}
            gscUrl={website?.gscUrl}
          />
          <UserPositionDetailsGraph
            data={resPositions?.userResult}
            isLoading={isLoadingPositions}
          />
        </div>
        <NewTest
          userResults={resPositions?.userResult}
          competitorsResult={resPositions?.competitorResult}
          combinedData={resPositions?.combinedData}
          isLoading={isLoadingPositions}
          domain={website?.domainUrl}
          keywordName={result.keywordName}
          resultUrl={result.url}
        />
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
  )
}

function combineResults(array1?: FormattedResult[], array2?: FormattedResult[]): FormattedResult[] {
  // Convert array1 to a map for easier merging by date
  const map = new Map<string, FormattedResult>();

  array1?.forEach((item) => {
    map.set(item.date, { ...item });
  });

  // Merge array2 into the map, adding the URL data to the correct date
  array2?.forEach((item) => {
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


const Divider = () => {
  return <div className="h-5 w-[1px] my-[10px] bg-theme-light-stroke dark:bg-theme-night-stroke"></div>
}


export default MainKeywordDetailsGraph;