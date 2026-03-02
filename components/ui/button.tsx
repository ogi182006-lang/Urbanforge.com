import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 select-none min-h-12",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 text-white hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:-translate-y-0.5",
        destructive: "bg-red-600 text-white hover:bg-red-500",
        outline:
          "border border-white/10 bg-white/5 text-white backdrop-blur-sm hover:border-cyan-400/50 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(0,240,255,0.15)]",
        secondary:
          "bg-white/10 text-white backdrop-blur-sm hover:bg-white/20",
        ghost: "text-white/70 hover:text-white hover:bg-white/10",
        link: "text-cyan-400 underline-offset-4 hover:underline",
        neon: "btn-neon rounded-xl px-6 text-white font-bold tracking-wide",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-14 rounded-2xl px-8 text-base",
        xl: "h-16 rounded-2xl px-10 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
