import React from "react";
import { LucideIcon } from "lucide-react";
import { Button } from "./button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    href: string;
    icon?: LucideIcon;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href: string;
    icon?: LucideIcon;
    onClick?: () => void;
  };
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  primaryAction,
  secondaryAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Icon Container with Glassmorphism */}
      <div className="relative mb-8 group">
        <div className="absolute -inset-[1px] bg-gradient-to-r from-neutral-200/50 via-neutral-300/50 to-neutral-200/50 rounded-xl blur-md group-hover:blur-lg transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-50 via-white to-neutral-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative w-20 h-20 bg-white backdrop-blur-xl rounded-xl 
          flex items-center justify-center border border-neutral-200/60 
          shadow-lg shadow-neutral-200/50 group-hover:shadow-xl 
          transition-all duration-500">
          <Icon className="w-10 h-10 text-neutral-900" />
        </div>
      </div>

      {/* Text Content */}
      <div className="text-center space-y-2 mb-8">
        <h3 className="text-2xl font-bold bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-700 bg-clip-text text-transparent">
          {title}
        </h3>
        <p className="text-neutral-600 max-w-md">
          {description}
        </p>
      </div>

      {/* Action Buttons */}
      {(primaryAction || secondaryAction) && (
        <div className="flex gap-3">
          {primaryAction && (
            primaryAction.onClick ? (
              <button
                onClick={primaryAction.onClick}
                className="group relative"
              >
                <div className="absolute -inset-[1px] bg-gradient-to-r from-neutral-200/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                <div className="relative flex items-center gap-2 px-6 py-2.5 rounded-xl 
                  bg-neutral-900 text-white text-sm font-medium
                  hover:bg-neutral-800 transition-all duration-200">
                  {primaryAction.icon && <primaryAction.icon className="w-4 h-4" />}
                  {primaryAction.label}
                </div>
              </button>
            ) : (
              <Link href={primaryAction.href}>
                <div className="group relative">
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-neutral-200/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                  <div className="relative flex items-center gap-2 px-6 py-2.5 rounded-xl 
                    bg-neutral-900 text-white text-sm font-medium
                    hover:bg-neutral-800 transition-all duration-200">
                    {primaryAction.icon && <primaryAction.icon className="w-4 h-4" />}
                    {primaryAction.label}
                  </div>
                </div>
              </Link>
            )
          )}

          {secondaryAction && (
            secondaryAction.onClick ? (
              <button
                onClick={secondaryAction.onClick}
                className="group relative"
              >
                <div className="absolute -inset-[1px] bg-gradient-to-r from-neutral-200/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                <div className="relative flex items-center gap-2 px-6 py-2.5 rounded-xl 
                  bg-white/50 backdrop-blur-sm border border-neutral-200/60 text-sm font-medium text-neutral-900
                  hover:bg-white/80 hover:border-neutral-300/80 transition-all duration-200">
                  {secondaryAction.icon && <secondaryAction.icon className="w-4 h-4" />}
                  {secondaryAction.label}
                </div>
              </button>
            ) : (
              <Link href={secondaryAction.href}>
                <div className="group relative">
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-neutral-200/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                  <div className="relative flex items-center gap-2 px-6 py-2.5 rounded-xl 
                    bg-white/50 backdrop-blur-sm border border-neutral-200/60 text-sm font-medium text-neutral-900
                    hover:bg-white/80 hover:border-neutral-300/80 transition-all duration-200">
                    {secondaryAction.icon && <secondaryAction.icon className="w-4 h-4" />}
                    {secondaryAction.label}
                  </div>
                </div>
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
} 