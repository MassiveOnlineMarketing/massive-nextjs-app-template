import { cn } from "../../../_components/utils"
import { hexToRgba } from "../../../_utils/colorUtils";
import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  borderColor: string;
  theme: string | undefined;
}
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, borderColor, theme, ...props }, ref) => {

    const themedBorderColor = theme === 'dark' ? hexToRgba(borderColor, 0.09) : borderColor;

    return (
      <div
        ref={ref}
        className={cn(
          `bg-white dark:bg-dark-bg-light  rounded-lg `, // gradient-mask card-gradient relative
          className,
        )}
        style={{ borderColor: themedBorderColor, borderWidth: '1px' }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";


interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  total: string | number;
  description?: string;
}
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, description, total, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "p-6",
          className,
        )}
        {...props}
      >
        <p className='dark:text-dark-text-light'>{title}</p>
        <p className='text-sm dark:text-dark-text-dark'>{description}</p>
        <p className='pt-6 text-4xl font-semibold dark:text-dark-text-light'>{title === "CTR" ? `${total}%` : total}</p>
      </div>
    );
  },
);

CardHeader.displayName = "CardHeader";


interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  firstValue: string | number;
  lastValue: string | number;
  reverse?: boolean;
}
const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, firstValue, lastValue, reverse, ...props }, ref) => {

    const change = (firstValue: string | number, lastValue: string | number) => {
      if (typeof firstValue === 'number' && typeof lastValue === 'number') {
        if (firstValue === lastValue) return '0%';

        // Calculate the difference
        let difference = lastValue - firstValue;

        // Calculate the percentage change
        let percentageChange = (difference / firstValue) * 100;

        // Reverse the sign if the reversed prop is true
        if (reverse) {
          percentageChange = -percentageChange;
        }
        return percentageChange.toFixed(2) + ' %';
      }
      return '0%';
    };


    return (
      <div
        ref={ref}
        className={cn(
          "p-2 absolute bottom-6 w-full text-center",
          className,
        )}
        {...props}
      >
        <p className={cn(
          'text-sm inline-flex gap-2',
          change(firstValue, lastValue) === '0%' ? 'text-slate-800 dark:text-[#DFE5FA]/50' :
            change(firstValue, lastValue).includes('-') ? 'text-red-500' : 'text-green-500'
        )}>{change(firstValue, lastValue)} <span className="text-slate-800 dark:text-[#DFE5FA]/50">since last 7 days</span></p>
        <div className="h-[1px] bg-gradient-to-r from-[#DFE5FA]/0 via-50% via-[#DFE5FA]/10 to-[#DFE5FA]/0"></div>
      </div>
    );
  },
);

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter };