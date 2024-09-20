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
          "inline-flex w-full mt-3 justify-between px-4 py-3 rounded-[9px] border theme-b-p focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
          'bg-transparent hover:theme-bg-p focus:theme-bg-w',
          // Kan geen dynamische classes gebruiken op een of andere manier \\
          'ring-base-200 before:dark:ring-base-500 transition-shadow delay-75 focus:ring-2 focus:ring-ring focus:ring-offset-2',
          'theme-t-p font-medium',
          className,
        )}
        {...props}
      />
    );
  },
);
FormInputField.displayName = "FormInputField";


export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const TextareaApp = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "inline-flex w-full mt-3 justify-between px-4 py-3 rounded-[9px] focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
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
TextareaApp.displayName = "TextareaApp";

export { FormInputField, TextareaApp };