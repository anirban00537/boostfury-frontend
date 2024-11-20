import * as React from "react";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  // Enhanced base styles
  "inline-flex items-center justify-between transition-all duration-200 rounded-lg border relative focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-70 disabled:cursor-not-allowed font-medium",
  {
    variants: {
      variant: {
        default: `
          bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 
          hover:from-gray-100 hover:via-gray-200 hover:to-gray-300 
          text-gray-700 
          border-t-gray-200/60 border-l-gray-200/60 border-r-gray-300/60 border-b-gray-400/60 
          focus:ring-blue-500/20 
          relative 
          before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/60 before:to-transparent before:pointer-events-none before:rounded-lg 
          after:absolute after:inset-0 after:rounded-lg after:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)] after:pointer-events-none
          disabled:before:from-white/40 disabled:hover:from-gray-50 disabled:hover:via-gray-100 disabled:hover:to-gray-200
        `,
        primary: `
          bg-gradient-to-br from-primary via-secondary to-primary/90 
          hover:from-primary/90 hover:via-secondary/90 hover:to-primary/95
          active:from-primary/95 active:via-secondary/95 active:to-primary 
          text-primary-foreground 
          border-t-primary/40 border-l-primary/40 border-r-primary/60 border-b-primary/70
          focus:ring-primary/30
          relative 
          before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none before:rounded-lg 
          after:absolute after:inset-0 after:rounded-lg after:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] after:pointer-events-none
          disabled:before:from-white/10
        `,
        success: `
          bg-gradient-to-br from-green-500 via-green-600 to-green-700 
          hover:from-green-600 hover:via-green-700 hover:to-green-800 
          active:from-green-700 active:via-green-800 active:to-green-900
          text-white 
          border-t-green-400/40 border-l-green-400/40 border-r-green-600/60 border-b-green-700/60 
          focus:ring-green-500/30
          relative 
          before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none before:rounded-lg 
          after:absolute after:inset-0 after:rounded-lg after:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] after:pointer-events-none
          disabled:before:from-white/10
        `,
        danger: `
          bg-gradient-to-br from-red-500 via-red-600 to-red-700 
          hover:from-red-600 hover:via-red-700 hover:to-red-800 
          active:from-red-700 active:via-red-800 active:to-red-900
          text-white 
          border-t-red-400/40 border-l-red-400/40 border-r-red-600/60 border-b-red-700/60 
          focus:ring-red-500/30
          relative 
          before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none before:rounded-lg 
          after:absolute after:inset-0 after:rounded-lg after:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] after:pointer-events-none
          disabled:before:from-white/10
        `,
        warning: `
          bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 
          hover:from-amber-600 hover:via-amber-700 hover:to-amber-800 
          active:from-amber-700 active:via-amber-800 active:to-amber-900
          text-white 
          border-t-amber-400/40 border-l-amber-400/40 border-r-amber-600/60 border-b-amber-700/60 
          focus:ring-amber-500/30
          relative 
          before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none before:rounded-lg 
          after:absolute after:inset-0 after:rounded-lg after:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] after:pointer-events-none
          disabled:before:from-white/10
        `,
        outline: `
          bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100/80
          hover:from-gray-100 hover:via-gray-100 hover:to-gray-200/80 
          active:from-gray-200 active:via-gray-100 active:to-gray-50
          text-gray-700 
          border-t-gray-200/60 border-l-gray-200/60 border-r-gray-300/60 border-b-gray-400/60
          focus:ring-gray-500/20 
          relative 
          before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/60 before:to-transparent before:pointer-events-none before:rounded-lg 
          after:absolute after:inset-0 after:rounded-lg after:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)] after:pointer-events-none
          disabled:before:from-white/40
        `,
      },
      size: {
        sm: "h-8 px-3 text-sm",
        default: "h-10 px-4 text-sm",
        lg: "h-11 px-6 text-base",
      },
      shadow: {
        none: "",
        default: `
          shadow-[0_2px_4px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.1)] 
          hover:shadow-[0_3px_6px_rgba(0,0,0,0.05),0_2px_4px_rgba(0,0,0,0.1)] 
          active:shadow-[0_1px_2px_rgba(0,0,0,0.05)] 
          active:translate-y-[0.5px]
          transition-shadow duration-200
        `,
        soft: `
          shadow-[0_2px_4px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.04)] 
          hover:shadow-[0_4px_8px_rgba(0,0,0,0.02),0_2px_4px_rgba(0,0,0,0.04)] 
          active:shadow-[0_1px_2px_rgba(0,0,0,0.02)]
          transition-shadow duration-200
        `,
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shadow: "default",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  kbd?: string;
}

const GradientButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      shadow,
      fullWidth,
      isLoading,
      leftIcon,
      rightIcon,
      kbd,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          buttonVariants({ variant, size, shadow, fullWidth, className })
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        <div className="flex items-center gap-2">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            leftIcon && <span className="h-4 w-4">{leftIcon}</span>
          )}
          <span className="font-medium">{children}</span>
          {rightIcon && <span className="h-4 w-4">{rightIcon}</span>}
        </div>
        {kbd && (
          <kbd
            className={cn(
              "text-xs px-1.5 py-0.5 rounded-md border shadow-sm ml-2 font-medium",
              variant === "default"
                ? "bg-gray-100/80 border-gray-200/40 text-gray-600"
                : "bg-white/10 border-white/20 text-white/90"
            )}
          >
            {kbd}
          </kbd>
        )}
      </button>
    );
  }
);

GradientButton.displayName = "GradientButton";

export { GradientButton, buttonVariants };
