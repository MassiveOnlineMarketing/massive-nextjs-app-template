import React from 'react'


import { LatestGoogleKeywordResultsDto } from '@/src/interface-adapters/controllers/google-keyword-tracker/get-latest-google-keyword-results.controller'

import { CardTitle, CardAdsBidRow, WhiteRow } from '../Card'
import { TraficLight, TraficLightIndicator, TraficLightMinMaxValue } from '../TraficLightIndicator'

const GoogleAdsMetrics = ({ keywordData }: { keywordData: LatestGoogleKeywordResultsDto }) => {
  const competitionIndex = Number(keywordData.competitionIndex)
  const highTopOfBidPage = Number(keywordData.highTopOfPageBid)
  const lowTopOfBidPage = Number(keywordData.lowTopOfPageBid)

  return (
    <div>
      <CardTitle title='Competition Index' >
        <TraficLight>
          <TraficLightMinMaxValue maxValue={100} currentValue={competitionIndex} />
          <TraficLightIndicator maxValue={100} currentValue={competitionIndex} flip className='molecule2'/>
        </TraficLight>
      </CardTitle>
      <WhiteRow label='Keyword volume' value={`${keywordData.avgMonthlySearches}/mo`} />
      <CardAdsBidRow label='Higest bid' value={highTopOfBidPage} />
      <CardAdsBidRow label='Lowest bid' value={lowTopOfBidPage} noBorder/>
    </div>
  )
}

export default GoogleAdsMetrics