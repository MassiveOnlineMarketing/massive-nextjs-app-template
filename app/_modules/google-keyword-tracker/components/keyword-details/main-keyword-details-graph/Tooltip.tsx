import { TooltipProps } from "recharts";
import { format, parse } from 'date-fns';
import { getOrdinalSuffix } from '@/app/_utils/numberUtils';
import { cn } from "@/app/_components/utils";
import { FormattedResult } from "@/src/interface-adapters/controllers/google-keyword-tracker/getKeywordPositionsGraphData.controller";

const MainKeywordDetailsGrapTooltip = ({ payload, label, chartData, keywordName, userDomain }: TooltipProps<string, string> & { chartData: FormattedResult[], keywordName: string, userDomain: string }) => {
  if (!payload || payload.length === 0) {
    return null;
  }
  // console.log('alles hier',payload, label, chartData, keywordName, userDomain)

  const currentDate = payload[0].payload.date;
  const currentIndex = chartData.findIndex(data => data.date === currentDate);

  let previousDate = null;
  let previousPosition = null;
  const currentPosition = Number(chartData[currentIndex][userDomain]);

  if (currentIndex > 0) {
    previousDate = chartData[currentIndex - 1].date;
    previousPosition = Number(chartData[currentIndex - 1][userDomain]);
  }

  const percentageChange = previousPosition ? ((previousPosition - currentPosition) / previousPosition) * 100 : 0;

  const formattedDate = format(parse(label, 'yyyy-MM-dd', new Date()), 'dd MMMM yyyy');

  return (
    <div
      className='w-[375px]  rounded-xl debug backdrop-blur  bg-white/60 dark:bg-theme-night-background-secondary border theme-b-p ring-4 ring-base-100 dark:ring-theme-night-background-secondary'
      style={{
        transform: 'translate(-80px,-110px)',
      }}
    >
      <div className='w-full pt-2.5 px-4 flex items-center'>
        <div>
          <p className='theme-t-p font-medium'>{formattedDate}</p>
          <p className='theme-t-s text-sm'>{keywordName}</p>
        </div>
        <p className={cn(
          'ml-auto px-2.5 py-1 rounded-md border text-xs',
          percentageChange > 0 ? 'bg-green-50 dark:bg-green-700/20 text-green-500 border-green-500' : percentageChange === 0 ? 'bg-gray-50 dark:bg-transparent text-gray-500 border-gray-500' : 'bg-red-50 dark:bg-red-700/20 text-red-500 border-red-500'
        )}>{percentageChange > 0 ? `+${percentageChange.toFixed(0)}` : percentageChange.toFixed(0)}%</p>
        <p className='ml-2 text-3xl theme-t-p font-semibold'>
          {currentPosition}
          <span className='text-sm theme-t-t '>{getOrdinalSuffix(currentPosition)}</span>
        </p>
      </div>
      <div className='p-4 flex flex-col gap-3'>
        {/* Qick and nasty sort */}
        {payload?.sort((a, b) => {
          const aValue = Number(a.value ?? 0);
          const bValue = Number(b.value ?? 0);
          return aValue - bValue;
        }).map((entry, index) => (
          <div key={index}>
            <div style={{ borderLeft: `2px solid ${entry.color}` }} className='flex justify-between'>
              <div className='ml-2'>
                <p className='theme-t-p text-sm'>{entry.name}</p>
                <p className='theme-t-t text-xs'>{entry.name}</p>
              </div>
              <p className='w-fit h-fit px-2 py-[2px] border theme-b-p rounded-md text-xs' style={{ color: entry.color }}>
                Position
                <span className='ml-1'>
                  {entry.value}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainKeywordDetailsGrapTooltip;