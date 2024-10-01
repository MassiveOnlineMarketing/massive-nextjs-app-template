
import React from 'react'

import { LatestGoogleKeywordResultsDto } from '@/src/interface-adapters/controllers/google-keyword-tracker/get-latest-google-keyword-results.controller'

// import PositionDataGraph from '../keyword-details/PositionDataGraph'
import MainKeywordDetailsGraph from '../keyword-details/MainKeywordDetailsGraph'
import { WebsiteWithLocationDisplay } from '@/app/_stores/useWebsiteDetailsStore'

const KeywordDetails = ({ result, website }: { result: LatestGoogleKeywordResultsDto, website?: WebsiteWithLocationDisplay }) => {
  console.log('🆔 KeywordDetails', result, website)
  return (
    <div className='max-w-[1450px] mx-auto px-4'>
      <MainKeywordDetailsGraph result={result} website={website} />
      {/* <PositionDataGraph result={result} domain={website?.domainUrl || ''} /> */}
    </div>
  )
}

export default KeywordDetails