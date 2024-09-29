"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { cn } from "@/app/_components/utils";

type ExtendedSelectProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Root
> & { className?: string };

const FormInputSelect = React.forwardRef<HTMLDivElement, ExtendedSelectProps>(
  ({ className, children, ...props }, ref) => (
    <div className={className}>
      <SelectPrimitive.Root {...props}>
        <SelectPrimitive.Value ref={ref} />
        {children}
      </SelectPrimitive.Root>
    </div>
  ),
);
FormInputSelect.displayName = SelectPrimitive.Select.displayName;

const FormInputSelectValue = SelectPrimitive.Value;

const FormInputSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex w-full mt-1 justify-between px-4 py-3 rounded-xl border theme-b-p bg-primary-50/50 placeholder-gray-400 ring-base-500 focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDownIcon className="h-4 w-4 opacity-50 my-auto" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
FormInputSelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUpIcon className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDownIcon className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const FormInputSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-[8px] border theme-b-p theme-bg-w p-1 ",

        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === "popper" &&
        "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          position === "popper" &&
          "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
FormInputSelectContent.displayName = SelectPrimitive.Content.displayName

const FormInputSelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("p-2 text-xs font-medium theme-t-n", className)}
    {...props}
  />
));
FormInputSelectLabel.displayName = SelectPrimitive.Label.displayName;

const FormInputSelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm theme-t-p outline-none",
      // Background
      'focus:bg-base-50 data-[state=open]:bg-base-50 dark:focus:bg-theme-night-background-secondary dark:data-[state=open]:bg-theme-night-background-secondary data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
FormInputSelectItem.displayName = SelectPrimitive.Item.displayName;

const FromInputSelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn(
      "-mx-1 my-1 h-px bg-theme-light-stroke dark:bg-theme-night-stroke",
      className
    )}
    {...props}
  />
));
FromInputSelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  FormInputSelect,
  FormInputSelectValue,
  FormInputSelectTrigger,
  FormInputSelectContent,
  FormInputSelectLabel,
  FormInputSelectItem,
  FromInputSelectSeparator
};


// * Example Usage
{/* <FormField
  control={form.control}
  name="gscUrl"
  render={({ field }) => (
    <FormItem>
      <FormLabel className='flex items-center gap-1.5'>Google Search Console Property <InformationCircleIcon className='w-4 h-4 text-base-500' /></FormLabel>
      <FormInputSelect onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <FormInputSelectTrigger>
            <FormInputSelectValue placeholder="Select a property" />
          </FormInputSelectTrigger>
        </FormControl>
        <FormInputSelectContent>
          <FormInputSelectItem value="m@example.com">m@example.com</FormInputSelectItem>
          <FormInputSelectItem value="m@google.com">m@google.com</FormInputSelectItem>
          <FormInputSelectItem value="m@support.com">m@support.com</FormInputSelectItem>
        </FormInputSelectContent>
      </FormInputSelect>
      <FormMessage />
    </FormItem>
  )}
/> */}