import * as React from "react";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-between transition-all duration-200 rounded-md border relative focus:outline-none focus:ring-2 focus:ring-offset-1",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 hover:from-gray-100 hover:via-gray-200 hover:to-gray-300 text-gray-700 border-t-gray-200 border-l-gray-200 border-r-gray-300 border-b-gray-400 focus:ring-blue-500/20 relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/60 before:to-transparent before:pointer-events-none before:rounded-md after:absolute after:inset-0 after:rounded-[5px] after:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)] after:pointer-events-none",
        primary:
          "bg-gradient-to-br from-primary via-secondary to-primary/80 hover:from-primary/80 hover:via-secondary/80 hover:to-primary/90 text-primary-foreground border-t-primary border-l-primary border-r-primary/80 border-b-primary/90 focus:ring-primary/20 relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none before:rounded-md after:absolute after:inset-0 after:rounded-[5px] after:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] after:pointer-events-none",
        success:
          "bg-gradient-to-br from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800 text-white border-t-green-400 border-l-green-400 border-r-green-600 border-b-green-700 focus:ring-green-500/20 relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none before:rounded-md after:absolute after:inset-0 after:rounded-[5px] after:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] after:pointer-events-none",
        danger:
          "bg-gradient-to-br from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 text-white border-t-red-400 border-l-red-400 border-r-red-600 border-b-red-700 focus:ring-red-500/20 relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none before:rounded-md after:absolute after:inset-0 after:rounded-[5px] after:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] after:pointer-events-none",
        warning:
          "bg-gradient-to-br from-yellow-500 via-yellow-600 to-yellow-700 hover:from-yellow-600 hover:via-yellow-700 hover:to-yellow-800 text-white border-t-yellow-400 border-l-yellow-400 border-r-yellow-600 border-b-yellow-700 focus:ring-yellow-500/20 relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none before:rounded-md after:absolute after:inset-0 after:rounded-[5px] after:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] after:pointer-events-none",
        outline:
          "bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 hover:from-gray-100 hover:via-gray-100 hover:to-gray-200 text-gray-700 border-t-gray-200 border-l-gray-200 border-r-gray-300 border-b-gray-400 focus:ring-gray-500/20 relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/60 before:to-transparent before:pointer-events-none before:rounded-md after:absolute after:inset-0 after:rounded-[5px] after:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)] after:pointer-events-none",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        default: "h-9 px-4",
        lg: "h-10 px-6 text-lg",
      },
      shadow: {
        none: "",
        default:
          "shadow-[0.5px_0.5px_0px_0.5px_rgba(0,0,0,0.1),2px_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0.5px_0.5px_0px_0.5px_rgba(0,0,0,0.1),1px_1px_2px_rgba(0,0,0,0.1)] active:shadow-[0px_0px_0px_0.5px_rgba(0,0,0,0.1),0px_0px_1px_rgba(0,0,0,0.1)] active:translate-y-[1px] active:translate-x-[1px]",
        soft: "shadow-[2px_2px_4px_rgba(0,0,0,0.05)] hover:shadow-[1px_1px_2px_rgba(0,0,0,0.05)] active:shadow-[0px_0px_1px_rgba(0,0,0,0.05)]",
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
              "text-xs px-1.5 py-0.5 rounded border shadow-sm ml-2",
              variant === "default"
                ? "bg-gray-100 border-gray-200/60"
                : "bg-white/10 border-white/20"
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
