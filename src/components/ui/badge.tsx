import * as React from "react"

import { cn } from "@/lib/utils"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "info" | "destructive" | "outline" | "secondary"
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variant === "success" && "bg-green-100 text-green-800",
        variant === "warning" && "bg-yellow-100 text-yellow-800",
        variant === "info" && "bg-blue-100 text-blue-800",
        variant === "destructive" && "bg-red-100 text-red-800",
        variant === "outline" && "border border-input bg-background text-foreground",
        variant === "secondary" && "bg-secondary text-secondary-foreground",
        variant === "default" && "border bg-background text-foreground",
        className
      )}
      {...props}
    />
  )
)
Badge.displayName = "Badge"

export { Badge }
