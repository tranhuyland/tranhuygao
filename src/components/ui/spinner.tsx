import * as React from "react";
import { cn } from "@/lib/utils";

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function Spinner({
  className,
  ...props
}: SpinnerProps) {
  return (
    <div
      className={cn(
        "h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-teal-600",
        className
      )}
      {...props}
    />
  );
}
