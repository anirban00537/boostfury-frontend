import React, { CSSProperties } from "react";

import { cn } from "@/lib/utils";

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "rgba(255, 255, 255, 0.4)",
      shimmerSize = "0.05em",
      shimmerDuration = "3s",
      borderRadius = "0.75rem",
      background = "linear-gradient(145deg, #1F80FF, #0747d1)",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        style={
          {
            "--spread": "90deg",
            "--shimmer-color": shimmerColor,
            "--radius": borderRadius,
            "--speed": shimmerDuration,
            "--cut": shimmerSize,
            "--bg": background,
          } as CSSProperties
        }
        className={cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap",
          "border-t-blue-400 border-l-blue-400 border-r-blue-600 border-b-blue-700",
          "bg-[linear-gradient(145deg,#1F80FF,#1255dd,#0747d1)]",
          "shadow-[0.5px_0.5px_0px_0.5px_rgba(0,0,0,0.1),2px_2px_4px_rgba(0,0,0,0.1)]",
          "hover:shadow-[0.5px_0.5px_0px_0.5px_rgba(0,0,0,0.1),1px_1px_2px_rgba(0,0,0,0.1)]",
          "active:shadow-[0px_0px_0px_0.5px_rgba(0,0,0,0.1),0px_0px_1px_rgba(0,0,0,0.1)]",
          "active:translate-y-[1px] active:translate-x-[1px]",
          "px-6 py-3",
          "[border-radius:var(--radius)]",
          "text-white",
          "transform-gpu transition-all duration-300 ease-in-out",
          className
        )}
        ref={ref}
        {...props}
      >
        {/* spark container */}
        <div className="absolute inset-0 overflow-visible [container-type:size] -z-30 blur-[1px]">
          {/* spark */}
          <div className="absolute inset-0 h-[100cqh] animate-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
            {/* spark before */}
            <div className="animate-spin-around absolute inset-[-100%] w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
          </div>
        </div>

        {/* Top highlight overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none rounded-[inherit]" />

        {children}

        {/* Inner shadow highlight */}
        <div
          className={cn(
            "absolute inset-0 rounded-[inherit]",
            "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]",
            "pointer-events-none"
          )}
        />

        {/* Bottom inner shadow */}
        <div
          className={cn(
            "absolute inset-0",
            "rounded-[inherit]",
            "shadow-[inset_0_-8px_10px_rgba(0,0,0,0.2)]",
            "transform-gpu transition-all duration-300 ease-in-out",
            "group-hover:shadow-[inset_0_-6px_10px_rgba(0,0,0,0.25)]",
            "group-active:shadow-[inset_0_-4px_8px_rgba(0,0,0,0.3)]",
            "pointer-events-none"
          )}
        />

        {/* backdrop */}
        <div
          className={cn(
            "absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]"
          )}
        />
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";

export default ShimmerButton;
