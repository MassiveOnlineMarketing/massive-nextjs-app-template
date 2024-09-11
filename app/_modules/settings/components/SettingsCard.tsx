import { cn } from "@/app/_components/utils";
import * as React from "react";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "border theme-b-p rounded-lg",
      className,
    )}
    {...props}
  >{children}</div>
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-4 theme-t-p", className)}
    {...props}
  >
    {children}
  </div>
));
CardHeader.displayName = "CardHeader";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-4 border-t theme-b-p rounded-lg", className)} {...props} />
));
CardContent.displayName = "CardContent";


export {
  Card,
  CardHeader,
  CardContent,
};
