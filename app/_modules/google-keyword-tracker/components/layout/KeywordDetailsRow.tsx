
import React from 'react'

import { LatestGoogleKeywordResultsDto } from '@/src/interface-adapters/controllers/google-keyword-tracker/get-latest-google-keyword-results.controller'
import { GoogleKeywordTracker } from '@/src/entities/models/google-keyword-tracker'

import { useWebsiteDetailsStore, WebsiteWithLocationDisplay } from '@/app/_stores/useWebsiteDetailsStore'

import MainKeywordDetailsGraph from '../keyword-details/MainKeywordDetailsGraph'
import MainResultDetails from '../keyword-details/MainResultDetails'

const KeywordDetailsRow = ({ result, website, googleKeywordTracker }: { result: LatestGoogleKeywordResultsDto, website?: WebsiteWithLocationDisplay, googleKeywordTracker: GoogleKeywordTracker }) => {
  console.log('Render KeywordDetailsRow')

  const selectedLocation = useWebsiteDetailsStore(state => state.selectedLocation)
  
  return (
    // TODO: animate-open-down overflow-clip
    <div className='max-w-[1450px] mx-auto px-4 '>
      <MainKeywordDetailsGraph result={result} website={website} />
      <MainResultDetails keywordData={result} domain={website?.domainUrl || ''} location={selectedLocation} toolId={googleKeywordTracker.id}/>
    </div>
  )
}

export default KeywordDetailsRow