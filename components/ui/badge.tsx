import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gradient-to-r from-cyan-400 to-purple-600 text-white",
        secondary:
          "border-transparent bg-white/10 text-white/80 backdrop-blur-sm",
        destructive:
          "border-transparent bg-red-600/80 text-white",
        outline: "border-white/20 text-white/70",
        neon: "border-cyan-400/50 bg-cyan-400/10 text-cyan-400",
        new: "border-transparent bg-gradient-to-r from-green-400 to-emerald-600 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
