import { cn } from "@/app/_components/utils";
import React from "react";

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
}

const FormInputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "inline-flex w-full mt-3 justify-between px-4 py-3 rounded-[9px] border theme-b-p theme-t-p focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
          'bg-transparent',
          'ring-base-500 focus:ring-1 focus:ring-ring focus:ring-offset-2',
          'placeholder-theme-light-text-tertiary dark:placeholder-theme-night-text-tertiary',
          className,
        )}
        {...props}
      />
    );
  },
);
FormInputField.displayName = "FormInputField";

export { FormInputField };