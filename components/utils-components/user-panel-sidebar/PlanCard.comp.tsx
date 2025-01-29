import React from "react";
import { Crown, Rocket } from "lucide-react";
import Link from "next/link";
import { GradientButton } from "@/components/ui/gradient-button";
import { cn } from "@/lib/utils";

interface Usage {
  words: {
    used: number;
    limit: number;
    nextReset: string;
  };
  linkedin: {
    accountsUsed: number;
    accountsLimit: number;
    postsUsed: number;
    postsLimit: number;
    nextReset: string;
  };
}

interface SubscriptionPackage {
  name: string;
  type: string;
}

interface Subscription {
  id: string;
  status: string;
  isTrial: boolean;
  startDate: string;
  endDate: string;
  package: SubscriptionPackage;
  subscriptionId: string | null;
  features: {
    viralPostGeneration: boolean;
    aiStudio: boolean;
    postIdeaGenerator: boolean;
  };
}

interface SubscriptionData {
  isActive: boolean;
  subscription: Subscription;
  usage: Usage;
}

interface PlanCardProps {
  subscription: any;
  formatTokens?: (tokens: number) => string;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  subscription,
  formatTokens,
}) => {
  const formatNumber = (num: number) => {
    if (num === -1) return "Unlimited";
    return formatTokens ? formatTokens(num) : num.toLocaleString();
  };

  // Get remaining trial days if on trial
  const getRemainingDays = () => {
    if (!subscription?.subscription?.endDate) return 0;
    return Math.ceil(
      (new Date(subscription.subscription.endDate).getTime() -
        new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    );
  };

  const wordUsagePercentage =
    (subscription.usage.words.used / subscription.usage.words.limit) * 100;

  return (
    <div>
      <div className="px-4">
        <div className="relative group">
          <div className="absolute -inset-[1px] bg-gradient-to-br from-primary/60 via-blue-600/60 to-violet-600/60 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-lg" />
          <div className="relative p-3.5 rounded-xl bg-gradient-to-br from-primary via-blue-600 to-violet-600 border border-white/10 shadow-lg shadow-primary/20 transition-all duration-300">
            {/* Plan Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative size-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
                  <Crown className="size-4 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    {subscription?.subscription?.package?.name || "Free"}
                  </div>
                  <div className="text-[10px] text-white/70 capitalize">
                    {subscription?.subscription?.package?.type || "basic"} Plan
                  </div>
                </div>
              </div>

              {/* Trial Badge */}
              {subscription?.subscription?.isTrial && (
                <div className="py-1 px-2 rounded-lg bg-white/10 border border-white/10">
                  <div className="text-[10px] font-medium text-white/90">
                    {getRemainingDays()}d left
                  </div>
                </div>
              )}
            </div>

            {/* Word Usage */}
            <div className="mt-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium text-white/70">
                  Words Used
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-medium text-white">
                    {formatNumber(subscription.usage.words.used)}
                  </span>
                  <span className="text-[10px] text-white/40">/</span>
                  <span className="text-[10px] text-white/70">
                    {formatNumber(subscription.usage.words.limit)}
                  </span>
                </div>
              </div>
              <div className="relative w-full h-1 bg-white/10 rounded-lg overflow-hidden">
                <div
                  className={cn(
                    "absolute inset-y-0 left-0 transition-all duration-300 ease-in-out",
                    wordUsagePercentage > 80 ? "bg-red-500" : "bg-white"
                  )}
                  style={{ width: `${wordUsagePercentage}%` }}
                />
              </div>
            </div>

            {/* Upgrade Button */}
            <Link href="/pricing" className="block mt-3">
              <GradientButton
                variant="secondary"
                size="xs"
                fullWidth
                className="bg-white/10 hover:bg-white/20 border-white/10 hover:border-white/20 text-white shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 h-9"
              >
                <div className="flex items-center justify-center gap-2">
                  <Rocket className="size-4 animate-pulse group-hover:animate-none group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium text-sm">
                    {subscription?.subscription?.isTrial
                      ? "Upgrade Now"
                      : "Manage Plan"}
                  </span>
                </div>
              </GradientButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
