import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex",
    "items-center",
    "justify-center",
    "whitespace-nowrap",
    "rounded-xl",
    "text-sm",
    "font-medium",
    "transition-all",
    "duration-200",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-teal-600",
    "focus-visible:ring-offset-2"
  ],
  {
    variants: {
      variant: {
        default:
          "bg-teal-700 text-white hover:bg-teal-800",

        secondary:
          "bg-gray-100 hover:bg-gray-200 text-gray-900",

        outline:
          "border border-gray-300 bg-white hover:bg-gray-50",

        ghost:
          "hover:bg-gray-100",

        destructive:
          "bg-red-600 text-white hover:bg-red-700"
      },

      size: {
        sm: "h-9 px-3",

        default: "h-11 px-5",

        lg: "h-12 px-8",

        icon: "h-11 w-11"
      }
    },

    defaultVariants: {
      variant: "default",

      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        buttonVariants({
          variant,
          size
        }),
        className
      )}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
