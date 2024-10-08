import { urlWithoutDomain } from "@/app/_utils/urlUtils";
import { cn } from "@/app/_components/utils";

import { ArrowTrendingDownIcon, ArrowTrendingUpIcon } from "@heroicons/react/20/solid";
import { extractFullPath } from "@/src/utils/url.utils";

interface ColumnRowCellProps {
  value: string | number | null | undefined;
  highlight?: boolean
}

const StandardRowCell: React.FC<ColumnRowCellProps> = ({ value, highlight }) => {
  return (
    <p className={cn(
      "text-sm font-normal",
      highlight ? 'theme-t-p' : 'theme-t-t'
    )}>
      {value}
    </p>
  );
}


interface TrendingIndicatorProps {
  value: number | null;
}

const TrendingIndicatorRowCell: React.FC<TrendingIndicatorProps> = ({ value }) => {
  let colorClass = "";
  let icon = null;

  if (value) {
    if (value > 0) {
      colorClass = "";
      icon = <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />;
    } else if (value < 0) {
      colorClass = "";
      icon = <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" />;
    }
  }

  return (
    <div className="flex gap-[2px] items-center">
      <span className={cn(
        'text-sm font-normal theme-t-t',
        colorClass
      )}>{value}</span>
      {icon}
    </div>
  );
}


interface DateRowCellProps {
  value: Date;
}
const DateRowCell: React.FC<DateRowCellProps> = ({ value }) => {
  if (value instanceof Date) {
    return (
      <p className="text-sm font-normal theme-t-t">
        {value.toDateString()}
      </p>
    );
  }

  return (
    <p className="text-sm font-normal theme-t-t">
      {new Date().toDateString()}
    </p>
  );
};

export default DateRowCell;


interface UrlRowCellProps {
  value: string | null;
  domainUrl?: string;
}

const UrlRowCell: React.FC<UrlRowCellProps> = ({ value, domainUrl }) => {
  const url = value;

  if (url === null || url === undefined || url === "") {
    return (
      <p className="mx-auto text-sm font-normal theme-t-t">
        No Result Found
      </p>
    );
  }

  return (
    <p className="mx-auto text-sm font-normal theme-t-t">
      {
        url.length > 52
          ? extractFullPath(url).substring(0, 52) + "..."
          : extractFullPath(url)
      }
    </p>
  );
}


export { StandardRowCell, TrendingIndicatorRowCell, DateRowCell, UrlRowCell }

