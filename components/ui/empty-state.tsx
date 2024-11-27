import React from "react";
import { LucideIcon } from "lucide-react";
import { Button } from "./button";
import Link from "next/link";

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
      {/* Icon Container */}
      <div className="w-16 h-16 mb-6">
        <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center">
          <Icon className="w-8 h-8 text-primary" />
        </div>
      </div>

      {/* Text Content */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
        {title}
      </h3>
      <p className="text-gray-500 text-center max-w-md mb-8">
        {description}
      </p>

      {/* Action Buttons */}
      {(primaryAction || secondaryAction) && (
        <div className="flex gap-4">
          {primaryAction && (
            primaryAction.onClick ? (
              <Button
                onClick={primaryAction.onClick}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg
                          flex items-center gap-2 shadow-sm hover:shadow transition-all duration-200"
              >
                {primaryAction.icon && <primaryAction.icon className="w-4 h-4" />}
                {primaryAction.label}
              </Button>
            ) : (
              <Link href={primaryAction.href}>
                <Button
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg
                            flex items-center gap-2 shadow-sm hover:shadow transition-all duration-200"
                >
                  {primaryAction.icon && <primaryAction.icon className="w-4 h-4" />}
                  {primaryAction.label}
                </Button>
              </Link>
            )
          )}
          {secondaryAction && (
            secondaryAction.onClick ? (
              <Button
                variant="outline"
                onClick={secondaryAction.onClick}
                className="px-6 py-2 rounded-lg flex items-center gap-2"
              >
                {secondaryAction.icon && <secondaryAction.icon className="w-4 h-4" />}
                {secondaryAction.label}
              </Button>
            ) : (
              <Link href={secondaryAction.href}>
                <Button
                  variant="outline"
                  className="px-6 py-2 rounded-lg flex items-center gap-2"
                >
                  {secondaryAction.icon && <secondaryAction.icon className="w-4 h-4" />}
                  {secondaryAction.label}
                </Button>
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
} 