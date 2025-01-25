import React from "react";
import { Linkedin, Plus, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type BaseProps = {
  variant?: "default" | "compact" | "redirect";
  className?: string;
};

type ConditionalProps = 
  | { variant?: "redirect" }
  | { 
      variant?: "default" | "compact";
      onConnect: () => void;
      isConnecting: boolean;
    };

type LinkedInConnectProps = BaseProps & ConditionalProps;

export const LinkedInConnect: React.FC<LinkedInConnectProps> = ({
  variant = "default",
  className,
  ...props
}) => {
  if (variant === "redirect") {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center h-full p-8 text-center",
          className
        )}
      >
        <div className="w-20 h-20 rounded-2xl bg-[#0A66C2]/10 flex items-center justify-center mb-6">
          <Linkedin className="w-10 h-10 text-[#0A66C2]" />
        </div>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-3">
          Connect Your LinkedIn Account
        </h2>
        <p className="text-neutral-600 mb-8 max-w-md">
          To start creating and scheduling posts, you'll need to connect your LinkedIn account first. 
          Head over to the Account Settings to set up your LinkedIn integration.
        </p>
        <Link
          href="/account"
          className={cn(
            "h-11 px-8 rounded-xl bg-gradient-to-r from-[#0A66C2] to-[#2C8EFF]",
            "hover:from-[#0A66C2] hover:to-[#1B7FE8] text-white transition-all",
            "flex items-center gap-2 text-sm font-medium shadow-lg shadow-[#0A66C2]/20",
            "group"
          )}
        >
          <span>Go to Account Settings</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    );
  }

  const { onConnect, isConnecting } = props as { onConnect: () => void; isConnecting: boolean };

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center h-full p-8 text-center",
          className
        )}
      >
        <div className="w-16 h-16 rounded-full bg-[#0A66C2]/10 flex items-center justify-center mb-6">
          <Linkedin className="w-8 h-8 text-[#0A66C2]" />
        </div>
        <h3 className="text-xl font-semibold text-neutral-900 mb-2">
          Connect Your LinkedIn Account
        </h3>
        <p className="text-sm text-neutral-600 mb-6 max-w-[300px]">
          To start creating and scheduling posts, you'll need to connect your
          LinkedIn account first.
        </p>
        <button
          onClick={onConnect}
          disabled={isConnecting}
          className={cn(
            "h-10 px-6 rounded-xl bg-gradient-to-r from-[#0A66C2] to-[#2C8EFF]",
            "hover:from-[#0A66C2] hover:to-[#1B7FE8] text-white transition-all",
            "flex items-center gap-2 text-sm font-medium shadow-lg shadow-[#0A66C2]/20",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {isConnecting ? (
            <>
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <Linkedin className="w-4 h-4" />
              <span>Connect LinkedIn</span>
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-neutral-200/60 shadow-sm overflow-hidden",
        className
      )}
    >
      <div className="p-8 text-center">
        <div className="size-16 rounded-2xl bg-[#0A66C2]/10 flex items-center justify-center mx-auto mb-6">
          <Linkedin className="size-8 text-[#0A66C2]" />
        </div>
        <h2 className="text-xl font-semibold text-neutral-900 mb-2">
          Connect LinkedIn Account
        </h2>
        <p className="text-neutral-600 mb-6 max-w-md mx-auto">
          Connect your LinkedIn profile to start creating and scheduling posts
          for your professional network.
        </p>
        <button
          onClick={onConnect}
          disabled={isConnecting}
          className={cn(
            "h-11 px-8 rounded-xl bg-gradient-to-r from-[#0A66C2] to-[#2C8EFF]",
            "hover:from-[#0A66C2] hover:to-[#1B7FE8] text-white transition-all",
            "flex items-center gap-2 text-sm font-medium shadow-lg shadow-[#0A66C2]/20",
            "mx-auto",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {isConnecting ? (
            <>
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>Connect LinkedIn Account</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
