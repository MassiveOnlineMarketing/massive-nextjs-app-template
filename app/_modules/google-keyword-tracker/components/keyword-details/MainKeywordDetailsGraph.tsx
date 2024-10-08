'use client';
import React, { useState } from 'react'

import { LatestGoogleKeywordResultsDto } from '@/src/interface-adapters/presenters/latest-google-keyword-results.presenter';

import { WebsiteWithLocationDisplay } from '@/app/_stores/useWebsiteDetailsStore';

import useFetchKeywordPositionsGraphData from '../../hooks/fetching/useFetchKeywordPositionsGraphData';
import useFetchSearchConsoleKeywordGraphData from '../../hooks/fetching/useFetchSearchConsoleKeywordGraphData';
import useGoogleToken from '@/app/_modules/auth/hooks/useGoogleRefreshToken';

import MainPositionWithCompetitorsGraph from './main-keyword-details-graph/MainPositionWithCompetitorsGraph';
import UserPositionDetailsGraph from './main-keyword-details-graph/UserPositionDetailsGraph';
import GoogleSearchConsoleKeywordDetailsGraph from './main-keyword-details-graph/GoogleSearchConsoleKeywordDetailsGraph';

import { cn } from '@/app/_components/utils';

const MainKeywordDetailsGraph = ({ result, website }: { result: LatestGoogleKeywordResultsDto, website?: WebsiteWithLocationDisplay }) => {
  console.log('Render MainKeywordDetailsGraph');

  const [dataRange, setDataRange] = useState(7);
  const { isLoading: isLoadingPositions, data: resPositions } = useFetchKeywordPositionsGraphData(result.keywordId, dataRange);
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
        <MainPositionWithCompetitorsGraph
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

const Divider = () => {
  return <div className="h-5 w-[1px] my-[10px] bg-theme-light-stroke dark:bg-theme-night-stroke"></div>
}


export default MainKeywordDetailsGraph;