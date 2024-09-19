import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../utils"


const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[10px] after:rounded-[14px] before:rounded-[10px] text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-base-500 text-base-50 hover:bg-base-500/90 hover:dark:bg-base-400 hover:text-white hover:ring-4 hover:ring-base-200 hover:dark:ring-base-800/[.6] hover:dark:shadow-neon hover:dark:transition-shadow hover:dark:duration-150 hover:dark:ease-in",
        destructive:
          "border border-red-500 text-red-500 hover:text-red-400 hover:border-red-400 hover:bg-gradient-to-b from-white via-white hover:to-red-50 hover:dark:bg-gradient-to-b hover:dark:from-base-950 hover:dark:to-red-500/[.02]",
        outline:
          "theme-t-t hover:theme-t-s molecule after:hidden hover:after:block hover:after:border-base-50 hover:after:dark:border-theme-night-background-primary",
        secondary:
          "theme-t-t hover:text-base-500",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-base-500 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 rounded-[10px]",
        sm: "h-9 px-3 rounded-[10px]",
        lg: "h-11 rounded-md px-8 rounded-[10px]",
        icon: "h-10 w-10 rounded-[10px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
