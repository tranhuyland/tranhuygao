import * as React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
}

export function Avatar({
  className,
  src,
  alt = "avatar",
  ...props
}: AvatarProps) {
  return (
    <div
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-200",
        className
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="text-sm font-medium text-gray-600">
          {alt?.charAt(0)?.toUpperCase()}
        </span>
      )}
    </div>
  );
}
