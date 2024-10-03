

import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { cn } from "@/app/_components/utils";
import { FetchHistoricalMetricsResponseGoogleAdsApi } from "@/src/application/api/google-ads.api.types";


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
          "theme-bg-w border theme-b-p p-1 rounded-[8px] ", 
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
        <p className="theme-t-p font-medium">
          {title}
        </p>
        {/* CHECK: Divider */}
        <div className="w-full h-[1px] theme-bg-s"></div>
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
          "p-3 w-full flex items-center justify-between theme-bg-p rounded-[4px]",
          fill ? FILL : "",
          className,
        )}
        {...props}
      >
        {/* Value */}
        <p className={cn(
          'text-base  theme-t-s',
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
        <p className="text-sm theme-t-p">
          {label}
        </p>
        {/* Value */}
        <p className="text-sm theme-t-t">
          {value ? value : "N/A"}
        </p>
      </div>
    );
  }
);
CardRow.displayName = "CardRow";


interface WhiteRowProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number | null;
  noBorder?: boolean;
}
const WhiteRow = React.forwardRef<HTMLDivElement, WhiteRowProps>(
  ({ className, label, value, noBorder, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "p-3 w-full flex items-center justify-between",
          noBorder ? '' : "border-dashed border-b theme-b-p",
          className,
        )}
        {...props}
      >
        {/* Label */}
        <p className="text-sm theme-t-s">
          {label}
        </p>
        {/* Value */}
        <p className="text-sm theme-t-p">
          {value ? value : "N/A"}
        </p>
      </div>
    );
  }
);
WhiteRow.displayName = "WhiteRow";

const CardAdsBidRow = React.forwardRef<HTMLDivElement, WhiteRowProps>(
  ({ className, label, value, noBorder, ...props }, ref) => {

    const formattedValue = typeof value === 'number' ? `$${(value / 1000000).toFixed(2)}` : value;
    return (
      <div
        ref={ref}
        className={cn(
          "p-3 w-full flex items-center justify-between",
          noBorder ? '' : "border-dashed border-b theme-b-p",
          className,
        )}
        {...props}
      >
        {/* Label */}
        <p className="text-sm theme-t-s">
          {label}
        </p>
        {/* Value */}
        <p className="text-sm theme-t-p">
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
  noBorder?: boolean;
}
const CardDateRow = React.forwardRef<HTMLDivElement, CardDateRowProps>(
  ({ className, label, value, noBorder, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "p-3 w-full flex items-center justify-between",
          noBorder ? '' : "border-dashed border-b theme-b-p",
          className,
        )}
        {...props}
      >
        {/* Label */}
        <p className="text-sm theme-t-s">
          {label}
        </p>
        {/* Value */}
        <p className="text-sm theme-t-p">
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
        <p className="text-sm leading-5 theme-t-p">
          {label}
        </p>
        {/* CHECK:Data */}
        <div className="flex gap-2">
          {tags.map((tag: Tags) => (
            <span key={tag.id} className="text-xs leading-5 theme-t-t bg-dark-stroke mix-blend-multiply dark:mix-blend-plus-lighter px-2 py-1 rounded-sm">
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    );
  }
);

CardTagsRow.displayName = "CardTagsRow";




// Accordion
const CardAccordion = AccordionPrimitive.Root

const CardAccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('data-[state=open]:border theme-b-p px-1 rounded-[8px] data-[state=open]:shadow-CardAccordion data-[state=open]:bg-primary-50 data-[state=open]:dark:bg-transparent overflow-hidden', className)}
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
        "flex flex-1 items-center justify-between gap-3 px-1 py-2 text-sm leading-5 transition-all theme-t-t dark:hover:text-[#DFE5FA] dark:[&[data-state=open]]:text-[#DFE5FA] [&[data-state=open]>svg]:-rotate-90 bg-white dark:bg-transparent ",
        className
      )}
      {...props}
    >
      <div className="text-nowrap">{children}</div>
      {/* Divider */}
      <div className="w-full h-[1px] theme-bg-s"></div>
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
    className="mx-[1px] mb-1 theme-bg-p rounded-[4px] overflow-hidden transition-width data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("p-3 theme-t-t", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

CardAccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Card, CardTitle, CardPlainRow, CardRow, WhiteRow, CardAdsBidRow, CardDateRow, CardTagsRow };
export { CardAccordion, CardAccordionItem, CardAccordionTrigger, CardAccordionContent }