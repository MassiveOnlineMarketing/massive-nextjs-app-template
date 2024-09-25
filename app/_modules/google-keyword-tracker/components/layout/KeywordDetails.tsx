
import React from 'react'

import { LatestGoogleKeywordResultsDto } from '@/src/interface-adapters/controllers/google-keyword-tracker/get-latest-google-keyword-results.controller'

import PositionDataGraph from '../keyword-details/PositionDataGraph'

const KeywordDetails = ({ result, domain }: { result: LatestGoogleKeywordResultsDto, domain: string }) => {
  return (
    <div className='max-w-[1450px] mx-auto px-4'>
      <PositionDataGraph result={result} domain={domain} />
    </div>
  )
}

export default KeywordDetails