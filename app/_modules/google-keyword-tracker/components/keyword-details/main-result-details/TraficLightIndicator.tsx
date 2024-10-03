
import React from 'react'

import { cn } from '@/app/_components/utils'

type TraficLightIndicatorProps = {
  maxValue: number | null
  currentValue: number | null
  flip?: boolean
  className?: string
}

const getBgColor = (index: number, isSelected: boolean) => {
  if (index < 3) return isSelected ? 'bg-red-600 inner-border border-red-900' : 'bg-red-600 opacity-35  inner-border border-red-900';
  if (index < 7) return isSelected ? 'bg-yellow-600' : 'bg-yellow-600/35';
  if (index < 10) return isSelected ? 'bg-green-600' : 'bg-green-600/35';
  return 'lightgray'; // Default color if none of the above conditions match
};

const TraficLightIndicator: React.FC<TraficLightIndicatorProps> = ({ maxValue, currentValue, flip, className }) => {
  let value = currentValue
  if (value === null) value = 0

  let maximumValue = maxValue
  if (maximumValue === null) maximumValue = 100

  const percentage = (value / maximumValue) * 100;
  let litSquares = Math.round((percentage / 100) * 10);

  if (flip) {
    litSquares = 11 - litSquares;
  }

  if (value > maximumValue) litSquares = 1;
  return (
    <div className={cn(
      'w-fit flex gap-1 p-1  rounded-[4px]',
      className
    )}>
      {Array.from({ length: 10 }, (_, index) => (
        <div
          className={cn(
            getBgColor(index, index < litSquares),
            'h-4 w-2 rounded-sm'
          )}
          style={{
            boxShadow: 'inset 0 0 0 1px rgba(223, 229, 250, 0.1) ',
          }}
          key={index}
        />
      ))}
    </div>

  );
};


const TraficLight = ({ children }: { children: React.ReactNode }) => {

  return (
    <div className='flex w-fit items-center'>
      {children}
    </div >
  )
}

type TraficLightMinMaxValueProps = {
  maxValue: number | null
  currentValue: number | null
}
const TraficLightMinMaxValue: React.FC<TraficLightMinMaxValueProps> = ({ maxValue, currentValue }) => {

  return (
    <p className='px-3 theme-t-s text-sm'><span>{currentValue ? currentValue : 'N/A'}</span>/<span>{maxValue}</span></p>
  )
}

export { TraficLightIndicator, TraficLight, TraficLightMinMaxValue };