import * as React from "react";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center transition-all duration-300 rounded-xl border relative focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-70 disabled:cursor-not-allowed font-medium",
  {
    variants: {
      variant: {
        default: `
          bg-gradient-to-r from-gray-50 via-white to-gray-50
          hover:from-gray-100 hover:via-white hover:to-gray-100
          text-gray-700
          border-gray-200/60
          focus:ring-blue-500/20
          relative
          before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/60 before:to-transparent before:pointer-events-none before:rounded-xl
          after:absolute after:inset-0 after:rounded-xl after:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)] after:pointer-events-none
          disabled:before:from-white/40 disabled:hover:from-gray-50 disabled:hover:via-white disabled:hover:to-gray-50
        `,
        primary: `
          bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#4F46E5]
          hover:from-[#4338CA] hover:via-[#6D28D9] hover:to-[#4338CA]
          active:from-[#3730A3] active:via-[#5B21B6] active:to-[#3730A3]
          text-white
          border-0
          focus:ring-indigo-500/30
          relative
          before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none before:rounded-xl
          after:absolute after:inset-0 after:rounded-xl after:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] after:pointer-events-none
          disabled:before:from-white/10
          group-hover:shadow-lg group-hover:shadow-indigo-500/20
          transition-all duration-300
        `,
        success: `
          bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-500
          hover:from-emerald-600 hover:via-green-600 hover:to-emerald-600
          active:from-emerald-700 active:via-green-700 active:to-emerald-700
          text-white
          border-emerald-500/20
          focus:ring-emerald-500/30
          relative
          before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none before:rounded-xl
          after:absolute after:inset-0 after:rounded-xl after:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] after:pointer-events-none
          disabled:before:from-white/10
          group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]
          transition-shadow duration-300
        `,
        danger: `
          bg-gradient-to-r from-red-500 via-rose-500 to-red-500
          hover:from-red-600 hover:via-rose-600 hover:to-red-600
          active:from-red-700 active:via-rose-700 active:to-red-700
          text-white
          border-red-500/20
          focus:ring-red-500/30
          relative
          before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none before:rounded-xl
          after:absolute after:inset-0 after:rounded-xl after:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] after:pointer-events-none
          disabled:before:from-white/10
          group-hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]
          transition-shadow duration-300
        `,
        warning: `
          bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500
          hover:from-amber-600 hover:via-orange-600 hover:to-amber-600
          active:from-amber-700 active:via-orange-700 active:to-amber-700
          text-white
          border-amber-500/20
          focus:ring-amber-500/30
          relative
          before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none before:rounded-xl
          after:absolute after:inset-0 after:rounded-xl after:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] after:pointer-events-none
          disabled:before:from-white/10
          group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]
          transition-shadow duration-300
        `,
        outline: `
          bg-gradient-to-r from-gray-50/50 via-white/50 to-gray-50/50
          hover:from-gray-100/50 hover:via-white/50 hover:to-gray-100/50
          active:from-gray-200/50 active:via-white/50 active:to-gray-200/50
          text-gray-700
          border-gray-200/60
          focus:ring-gray-500/20
          relative
          before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/60 before:to-transparent before:pointer-events-none before:rounded-xl
          after:absolute after:inset-0 after:rounded-xl after:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)] after:pointer-events-none
          disabled:before:from-white/40
          backdrop-blur-sm
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
          shadow-[0_2px_8px_rgba(0,0,0,0.08)]
          hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]
          active:shadow-[0_1px_4px_rgba(0,0,0,0.05)]
          active:translate-y-[0.5px]
          transition-all duration-200
        `,
        soft: `
          shadow-[0_2px_4px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.04)]
          hover:shadow-[0_4px_8px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.06)]
          active:shadow-[0_1px_2px_rgba(0,0,0,0.02)]
          transition-all duration-200
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
          "group",
          buttonVariants({ variant, size, shadow, fullWidth, className })
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        <div className="flex items-center justify-center gap-2 w-full">
          {isLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            leftIcon && <span className="size-4 flex-shrink-0">{leftIcon}</span>
          )}
          <span className="font-medium">{children}</span>
          {rightIcon && (
            <span className="size-4 flex-shrink-0">{rightIcon}</span>
          )}
        </div>
        {kbd && (
          <kbd
            className={cn(
              "text-xs px-1.5 py-0.5 rounded-lg border shadow-sm ml-2 font-medium transition-colors duration-200",
              variant === "default"
                ? "bg-gray-100/80 border-gray-200/40 text-gray-600 group-hover:bg-gray-200/80"
                : "bg-white/10 border-white/20 text-white/90 group-hover:bg-white/20"
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
