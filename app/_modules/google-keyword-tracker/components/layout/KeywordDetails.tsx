
import React from 'react'

import { LatestGoogleKeywordResultsDto } from '@/src/interface-adapters/controllers/google-keyword-tracker/get-latest-google-keyword-results.controller'
import { GoogleKeywordTracker } from '@/src/entities/models/google-keyword-tracker'

import MainKeywordDetailsGraph from '../keyword-details/MainKeywordDetailsGraph'
import { useWebsiteDetailsStore, WebsiteWithLocationDisplay } from '@/app/_stores/useWebsiteDetailsStore'
import useFetchRelatedQueriesWithSearchVolume from '../../hooks/fetching/useFetchRelatedQueriesWithSearchVolume'
import useFetchTopTenSerpResults from '../../hooks/fetching/useFetchTopTenSerpResults'
import MainResultDetails from '../keyword-details/MainResultDetails'

const KeywordDetails = ({ result, website, googleKeywordTracker }: { result: LatestGoogleKeywordResultsDto, website?: WebsiteWithLocationDisplay, googleKeywordTracker: GoogleKeywordTracker }) => {
  console.log('🆔 KeywordDetails', result, website)

  const selectedLocation = useWebsiteDetailsStore(state => state.selectedLocation)
  
  const { data, error, isLoading, isError } = useFetchTopTenSerpResults(result.keywordId)
  console.log('🆔 useFetchTopTenSerpResults', data, error, isLoading, isError)

  const { data: relatedQueriesData, error: relatedQueriesError, isLoading: relatedQueriesIsLoading, isError: relatedQueriesIsError } = useFetchRelatedQueriesWithSearchVolume(result.relatedSearches, selectedLocation)
  console.log('🆔 useFetchRelatedQueriesWithSearchVolume', relatedQueriesData, relatedQueriesError, relatedQueriesIsLoading, relatedQueriesIsError)

  return (
    // TODO: animate-open-down overflow-clip
    <div className='max-w-[1450px] mx-auto px-4 '>
      <MainKeywordDetailsGraph result={result} website={website} />
      <MainResultDetails keywordData={result} domain={website?.domainUrl || ''} location={selectedLocation} toolId={googleKeywordTracker.id}/>
    </div>
  )
}

export default KeywordDetails