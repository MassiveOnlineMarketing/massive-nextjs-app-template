
import React from 'react'

import { LatestGoogleKeywordResultsDto } from '@/src/interface-adapters/controllers/google-keyword-tracker/get-latest-google-keyword-results.controller';

import { CardDateRow, CardTagsRow, CardTitle, WhiteRow } from '../Card';
import { TraficLight, TraficLightIndicator } from '../TraficLightIndicator';

import { getOrdinalSuffix } from '@/app/_utils/numberUtils';

const KeywordDetails = ({ keywordData }: { keywordData: LatestGoogleKeywordResultsDto }) => {
  return (
    <div>
      <CardTitle title={keywordData.keywordName}>
        <TraficLight>
          <div className='text-p-800 dark:text-dark-text-light font-semibold mr-3'>
            {getPositionSvg(keywordData.position)}
          </div>
          <TraficLightIndicator maxValue={10} currentValue={keywordData.position} flip className='molecule2 ' />
        </TraficLight>
      </CardTitle>
      {/* <CardPlainRow value={keywordData.keywordName} /> */}
      <WhiteRow label='Position' value={keywordData.position} />
      <WhiteRow label='Best Position' value={keywordData.bestPosition} />
      <WhiteRow label='First Position' value={keywordData.firstPosition} />
      <WhiteRow label='Latest Change' value={keywordData.latestChange} />
      <CardDateRow label='Created At' value={keywordData.createdAt} />
      <CardTagsRow label='Tags' tags={keywordData.tags} />
    </div>
  )
}


const getPositionSvg = (position: number | null) => {
  if (position === null) {
    return (
      <p className="text-sm">
        N/A
      </p>
    );
  }

  const suffix = getOrdinalSuffix(position);

  return (
    <p className='text-sm'>
      {position}
      <span className='text-[10px]'>{suffix}</span>
    </p>
  );
};

export default KeywordDetails