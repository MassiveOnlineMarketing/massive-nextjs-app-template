'use client';


import useGoogleKeywordTracker from '@/app/_modules/google-keyword-tracker/hooks/useGoogleKeywordTracker';
import { LatestGoogleKeywordResultsDto } from '@/src/interface-adapters/controllers/google-keyword-tracker/get-latest-google-keyword-results.controller';
import { GoogleKeywordTracker } from '@/src/entities/models/google-keyword-tracker';
import React, { useEffect } from 'react'

import useFilteredKeywordResults from '@/app/_modules/google-keyword-tracker/hooks/useFilteredResults';

import DataTable from '@/app/_modules/google-keyword-tracker/components/layout/ResultTable';
import { columns } from '@/app/_modules/google-keyword-tracker/components/table/columns';

const ClientPage = ({ latestResults, googleKeywordTracker }: { latestResults: LatestGoogleKeywordResultsDto[], googleKeywordTracker: GoogleKeywordTracker}) => {
  
  const { setNewSerpResultState } = useGoogleKeywordTracker()
  
  useEffect(() => {
    setNewSerpResultState(latestResults)
    
    // No need to add setNewSerpResultState to the dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestResults])
  
  const filteredResults = useFilteredKeywordResults()

  return (
    <div>
      <DataTable
        columns={columns()}
        data={filteredResults}
        googleKeywordTracker={googleKeywordTracker}
      />
    </div>
  )
}

export default ClientPage