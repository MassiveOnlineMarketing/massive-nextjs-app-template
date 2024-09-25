'use client';


import useGoogleKeywordTracker from '@/app/_modules/google-keyword-tracker/hooks/useGoogleKeywordTracker';
import { LatestGoogleKeywordResultsDto } from '@/src/interface-adapters/controllers/google-keyword-tracker/get-latest-google-keyword-results.controller';
import React, { useEffect } from 'react'

import useFilteredKeywordResults from '@/app/_modules/google-keyword-tracker/hooks/useFilteredResults';

import DataTable from '@/app/_modules/google-keyword-tracker/components/layout/ResultTable';
import { columns } from '@/app/_modules/google-keyword-tracker/components/table/columns';

const ClientPage = ({ latestResults }: { latestResults: LatestGoogleKeywordResultsDto[]}) => {
  
  const { setNewSerpResultState } = useGoogleKeywordTracker()
  
  useEffect(() => {
    setNewSerpResultState(latestResults)
  }, [latestResults])
  
  const filteredResults = useFilteredKeywordResults()

  return (
    <div>
      <DataTable
        columns={columns()}
        data={filteredResults}
      />
    </div>
  )
}

export default ClientPage