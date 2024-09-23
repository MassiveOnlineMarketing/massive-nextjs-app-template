'use client';

import React from 'react'
import useFilteredKeywordResults from '../../hooks/useFilteredResults';

const FilteredStats = () => {
  const filteredResults = useFilteredKeywordResults();
  
  // Filter results once and reuse
  const improvedResults = filteredResults.filter(result => result.latestChange !== null && result.latestChange <= 0);
  const decreasedResults = filteredResults.filter(result => result.latestChange !== null && result.latestChange > 0);
  const validPositions = filteredResults.filter(result => result.position !== null).map(result => result.position as number);
  const topThreeResults = filteredResults.filter(result => result.position !== null && result.position <= 3);
  const topTenResults = filteredResults.filter(result => result.position !== null && result.position <= 10);
  const topHundredResults = filteredResults.filter(result => result.position !== null && result.position <= 100);
  const notFoundResults = filteredResults.filter(result => result.position === null);

  // Calculate totals and percentages
  const totalResults = filteredResults.length;
  const improvedCount = improvedResults.length;
  const decreasedCount = decreasedResults.length;
  const topThreeCount = topThreeResults.length;
  const topTenCount = topTenResults.length;
  const topHundredCount = topHundredResults.length;

  const averagePosition = validPositions.reduce((acc, position) => acc + position, 0) / (validPositions.length || 1);

  const improvedPercentage = (improvedCount / (totalResults || 1)) * 100;
  const decreasedPercentage = (decreasedCount / (totalResults || 1)) * 100;
  const topThreePercentage = (topThreeCount / (totalResults || 1)) * 100;
  const topTenPercentage = (topTenCount / (totalResults || 1)) * 100;
  const topHundredPercentage = (topHundredCount / (totalResults || 1)) * 100;

  return (
    <div className='inline-flex gap-12'>
      <div className='text-right'>
        <p className='theme-t-s text-[26px] font-semibold'>{improvedCount}</p>
        <p className='text-xs text-slate-500'><span className='text-green-500'>{improvedPercentage.toFixed(0)}%</span> Improved</p>
      </div>
      <div className='text-right'>
        <p className='theme-t-s text-[26px] font-semibold'>{decreasedCount}</p>
        <p className='text-xs text-slate-500'><span className='text-red-500'>{decreasedPercentage.toFixed(0)}%</span> Decreased</p>
      </div>
      <div className='text-right'>
        <p className='theme-t-s text-[26px] font-semibold'>{totalResults}</p>
        <p className='text-xs text-slate-500'>Keywords</p>
      </div>
      <div className='text-right'>
        <p className='theme-t-s text-[26px] font-semibold'>{averagePosition.toFixed(1)}</p>
        <p className='text-xs text-slate-500'>Average Position</p>
      </div>
      <div className='text-right'>
        <p className='theme-t-s text-[26px] font-semibold'>{topThreeCount}</p>
        <p className='text-xs text-slate-500'>{topThreePercentage.toFixed(0)}% Top 3</p>
      </div>
      <div className='text-right'>
        <p className='theme-t-s text-[26px] font-semibold'>{topTenCount}</p>
        <p className='text-xs text-slate-500'>{topTenPercentage.toFixed(0)}% Top 10</p>
      </div>
      <div className='text-right'>
        <p className='theme-t-s text-[26px] font-semibold'>{topHundredCount}</p>
        <p className='text-xs text-slate-500'>{topHundredPercentage.toFixed(0)}% Top 100</p>
      </div>
    </div>
  );
};

export default FilteredStats;