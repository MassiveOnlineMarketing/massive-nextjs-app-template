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
      <div className='flex flex-col'>
        <div className='ml-auto flex gap-1.5 items-center'>
          <svg width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.80385 0L11 9H0.607697L5.80385 0Z" fill="#22C55E" />
          </svg>
          <p className='theme-t-s text-[26px] font-semibold'>{improvedCount}</p>
        </div>
        <p className='text-xs text-slate-500'><span className='text-green-500'>{improvedPercentage.toFixed(0)}%</span> Improved</p>
      </div>
      <div className='flex flex-col'>
        <div className='ml-auto flex gap-1.5 items-center'>
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9.5L0.803848 0.5L11.1962 0.5L6 9.5Z" fill="#EF4444" />
          </svg>
          <p className='theme-t-s text-[26px] font-semibold'>{decreasedCount}</p>
        </div>
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