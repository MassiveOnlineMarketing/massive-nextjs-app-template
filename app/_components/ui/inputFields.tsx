import React from "react";

import { cn } from "../utils";

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
}

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  label?: string;
}

export interface CheckFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

interface TestFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "inline-flex w-full mt-3 justify-between  py-4 px-8 rounded-xl border border-gray-200",
          className,
        )}
        {...props}
      />
    );
  },
);
InputField.displayName = "InputField";

const InputFieldApp = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "inline-flex w-full mt-3 justify-between px-4 py-3 rounded-xl border border-p-100 bg-primary-50/50 placeholder-gray-400 ring-p-500 focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
          className,
        )}
        {...props}
      />
    );
  },
);
InputFieldApp.displayName = "InputFieldApp";

export interface InputFieldWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  Icon: React.ElementType;
}
const InputFieldAppWithIcon = React.forwardRef<HTMLInputElement, InputFieldWithIconProps>(
  ({ className, label, Icon, ...props }, ref) => {
    return (
      <div className="relative mt-3 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <Icon className="h-6 w-6 text-gray-300" aria-hidden="true" />
        </div>
        <input
          ref={ref}
          className={cn(
            "block w-full rounded-xl p-4 pl-[50px] ",
            'bg-primary-50/50 placeholder-gray-400',
            'border border-primary-100 ',
            'ring-primary-500 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
InputFieldAppWithIcon.displayName = "InputFieldAppWithIcon";

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "inline-flex w-full mt-3 justify-between  py-4 px-8 rounded-xl border border-gray-200",
          className,
        )}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

const TextareaApp = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "inline-flex w-full mt-3 justify-between  p-4 rounded-xl border border-primary-100 bg-primary-50/50 placeholder-gray-400 ring-primary-500 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
          className,
        )}
        {...props}
      />
    );
  },
);
TextareaApp.displayName = "TextareaApp";

const CheckField = React.forwardRef<HTMLInputElement, CheckFieldProps>(
  ({ className, label, value, name, ...props }, ref) => {
    return (
      <label
        className={cn(
          "inline-flex justify-between  py-4 px-8 rounded-xl border border-gray-200 w-full",
          "hover:bg-gray-50",
          className,
        )}
      >
        <p>{label}</p>
        <CheckInput {...props} value={value} name={name} />
      </label>
    );
  },
);
CheckField.displayName = "CheckField";

const CheckInput = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ value, name, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "h-4 w-4 rounded border-gray-300 accent-primary-500 focus:accent-primary-500",
          className,
        )}
        value={value}
        name={name}
        {...props}
      />
    );
  },
);
CheckInput.displayName = "CheckInput";

const TestInput = React.forwardRef<HTMLInputElement, TestFieldProps>(
  ({ className, label, value, ...props }, ref) => {
    return (
      <label
        className={cn(
          "inline-flex justify-between  py-4 px-8 rounded-xl border border-gray-200 w-full",
          "hover:bg-gray-50",
          className,
        )}
      >
        <p>{label}</p>
        <input
          ref={ref}
          className={cn(
            "h-4 w-4 my-auto rounded border-gray-300 accent-primary-500 focus:accent-primary-500",
          )}
          value={value}
          {...props}
        />
      </label>
    );
  },
);
TestInput.displayName = "TestInput";

const ErrorMessage = ({ message }: { message?: string }) => {
  return message && <p className="text-red-500 text-sm mt-2">{message}</p>;
};
export {
  InputField,
  InputFieldApp,
  InputFieldAppWithIcon,
  Textarea,
  TextareaApp,
  CheckField,
  CheckInput,
  TestInput,
  ErrorMessage,
};


// import { EnvelopeIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";

{/* 
<InputFieldAppWithIcon
type="email"
placeholder="email@me"
Icon={EnvelopeIcon}
/>

<InputFieldAppWithIcon
type="text"
placeholder="Username"
Icon={UserIcon}
/>

<InputFieldAppWithIcon
type="password"
placeholder="*********"
Icon={LockClosedIcon}
/> */}
