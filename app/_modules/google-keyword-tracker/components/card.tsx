
import { cn } from "../../../_components/utils";
import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
// import { KeywordMetricsApiResponse } from "@/application/useCases/googleAdsApi/getGoogleSearchKeywordMetrics";


const FILL = "dark:bg-dark-bg-light bg-[#FBFBFF]";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white dark:bg-dark-bg-light p-1 rounded-lg  border border-light-stroke dark:border-dark-stroke", 
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";


interface CardTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  fill?: boolean;
  children?: React.ReactNode;
}

const CardTitle = React.forwardRef<HTMLDivElement, CardTitleProps>(
  ({ className, fill, title, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "p-3 w-full flex gap-3 items-center text-nowrap",
          fill ? FILL : "",
          className,
        )}
        {...props}
      >
        {/* Title */}
        <p className="text-sm leading-5 text-p-800 dark:text-dark-text-light">
          {title}
        </p>
        {/* Divider */}
        <div className="w-full h-[1px] bg-p-100 dark:bg-dark-stroke mix-blend-multiply dark:mix-blend-plus-lighter"></div>
        {/* Children */}
        {children}
      </div>
    );
  },
);

CardTitle.displayName = "CardTitle";


interface CardPlainRowProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  paragraphStyles?: string;
  fill?: boolean;
}
const CardPlainRow = React.forwardRef<HTMLDivElement, CardPlainRowProps>(
  ({ className, value, fill, paragraphStyles, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "p-3 w-full flex items-center justify-between",
          fill ? FILL : "",
          className,
        )}
        {...props}
      >
        {/* Value */}
        <p className={cn(
          'text-base leading-5 text-slate-500 dark:text-dark-text-dark',
          paragraphStyles
        )}>
          {value}
        </p>
      </div>
    );
  }
);

CardPlainRow.displayName = "CardPlainRow";


interface CardRowProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number | null;
  fill?: boolean;
}
const CardRow = React.forwardRef<HTMLDivElement, CardRowProps>(
  ({ className, label, value, fill, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "p-3 w-full flex items-center justify-between",
          fill ? FILL : "",
          className,
        )}
        {...props}
      >
        {/* Label */}
        <p className="text-sm text-p-800 dark:text-dark-text-light">
          {label}
        </p>
        {/* Value */}
        <p className="text-sm text-slate-500 dark:text-dark-text-dark">
          {value ? value : "N/A"}
        </p>
      </div>
    );
  }
);
CardRow.displayName = "CardRow";

const CardAdsBidRow = React.forwardRef<HTMLDivElement, CardRowProps>(
  ({ className, label, value, fill, ...props }, ref) => {

    const formattedValue = typeof value === 'number' ? `$${(value / 1000000).toFixed(2)}` : value;
    return (
      <div
        ref={ref}
        className={cn(
          "p-3 w-full flex items-center justify-between",
          fill ? FILL : "",
          className,
        )}
        {...props}
      >
        {/* Label */}
        <p className="text-sm text-p-800 dark:text-dark-text-light">
          {label}
        </p>
        {/* Value */}
        <p className="text-sm text-slate-500 dark:text-dark-text-dark">
          {formattedValue}
        </p>
      </div>
    );
  }
);
CardAdsBidRow.displayName = "CardAdsBidRow";


interface CardDateRowProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: Date;
  fill?: boolean;
}
const CardDateRow = React.forwardRef<HTMLDivElement, CardDateRowProps>(
  ({ className, label, value, fill, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "p-3 w-full flex items-center justify-between",
          fill ? FILL : "",
          className,
        )}
        {...props}
      >
        {/* Label */}
        <p className="text-sm leading-5 text-p-800 dark:text-dark-text-light">
          {label}
        </p>
        {/* Value */}
        <p className="text-sm leading-5 text-slate-500 dark:text-dark-text-dark">
          {new Date(value).toLocaleDateString()}
        </p>
      </div>
    );
  }
);

CardDateRow.displayName = "CardDateRow";


type Tags = {
  id: string;
  name: string;
}
interface CardTagsRowProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  tags: Tags[];
  fill?: boolean;
}
const CardTagsRow = React.forwardRef<HTMLDivElement, CardTagsRowProps>(
  ({ className, label, tags, fill, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "p-3 w-full flex items-center justify-between",
          fill ? FILL : "",
          className,
        )}
        {...props}
      >
        {/* Label */}
        <p className="text-sm leading-5 text-p-800 dark:text-dark-text-light">
          {label}
        </p>
        {/* Data */}
        <div className="flex gap-2">
          {tags.map((tag: Tags) => (
            <span key={tag.id} className="text-xs leading-5 text-slate-500 dark:text-dark-text-dark bg-dark-stroke mix-blend-multiply dark:mix-blend-plus-lighter px-2 py-1 rounded-sm">
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    );
  }
);

CardTagsRow.displayName = "CardTagsRow";

// interface CardRowInputProps {
//   item: KeywordMetricsApiResponse;
//   selectedSearches: string[];
//   handleCheckboxChange: (query: string) => void;
// }
// const CardRowInput = React.forwardRef<HTMLLabelElement, CardRowInputProps>(({
//   item,
//   selectedSearches,
//   handleCheckboxChange
// }, ref) => (
//   <label
//     className={cn(
//       "flex items-center gap-3 px-3 py-2 cursor-pointer",
//       selectedSearches.includes(item.text) && "bg-p-25 dark:bg-dark-bg-light rounded-lg"
//     )}
//     key={item.text}
//     ref={ref}
//   >
//     {/* Label */}
//     <span className="ml-auto min-w-10">{item.keyword_metrics.avg_monthly_searches ?? 'N/A'}</span>
//     <p className="text-nowrap flex justify-between text-xs leading-5 text-slate-500 dark:text-dark-text-dark">
//       <span>{item.text}</span>
//     </p>
//     {/* Divider */}
//     <div className="w-full h-[1px] bg-p-100 dark:bg-dark-stroke mix-blend-multiply dark:mix-blend-plus-lighter"></div>
//     {/* Checkbox */}
//     <input
//       type="checkbox"
//       name={item.text}
//       // TODO: Styles
//       className={cn(
//         "h-4 w-4 my-auto rounded",
//         "bg-transparent",
//         "border border-slate-300 dark:border-dark-stroke mix-blend-multiply dark:mix-blend-plus-lighter focus:ring-p-1100 ",
//         // "appearance-none"
//       )}
//       value={item.text}
//       checked={selectedSearches.includes(item.text)}
//       onChange={() => handleCheckboxChange(item.text)}
//     />
//   </label>
// ));
// CardRowInput.displayName = "CardRowInput";




// Accordion
const CardAccordion = AccordionPrimitive.Root

const CardAccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('rounded-lg data-[state=open]:shadow-CardAccordion data-[state=open]:bg-primary-50 data-[state=open]:dark:bg-transparent overflow-hidden', className)}
    {...props}
  />
))
CardAccordionItem.displayName = "AccordionItem"

const CardAccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        // TODO: light styles
        "flex flex-1 items-center justify-between gap-3 px-2 py-2 text-sm leading-5 transition-all text-slate-500 dark:text-dark-text-dark dark:hover:text-[#DFE5FA] dark:[&[data-state=open]]:text-[#DFE5FA] [&[data-state=open]>svg]:-rotate-90 bg-white dark:bg-transparent m-1",
        className
      )}
      {...props}
    >
      <div className="text-nowrap">{children}</div>
      {/* Divider */}
      <div className="w-full h-[1px] bg-p-100 dark:bg-dark-stroke mix-blend-multiply dark:mix-blend-plus-lighter"></div>
      <ChevronDownIcon className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
CardAccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const CardAccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="mx-[1px] mb-1  dark:bg-p-1100 overflow-hidden text-sm font-light transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("p-3 text-slate-500 dark:text-dark-text-dark", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

CardAccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Card, CardTitle, CardPlainRow, CardRow, CardAdsBidRow, CardDateRow, CardTagsRow,
  //  CardRowInput 
  };
export { CardAccordion, CardAccordionItem, CardAccordionTrigger, CardAccordionContent }