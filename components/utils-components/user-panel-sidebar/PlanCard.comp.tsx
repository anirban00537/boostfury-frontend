import React from "react";
import { Crown, Rocket } from "lucide-react";
import Link from "next/link";
import { GradientButton } from "@/components/ui/gradient-button";

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
}

export const PlanCard: React.FC<PlanCardProps> = ({ subscription }) => {
  const formatNumber = (num: number) => {
    if (num === -1) return "Unlimited";
    return num.toLocaleString();
  };

  // Simple subscription logging
  console.log("Subscription:", subscription);

  return (
    <div>
      <div className="px-5 mb-3">
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          Current Plan
        </span>
      </div>
      <div className="px-4">
        <div className="relative group">
          <div className="absolute -inset-[1px] bg-gradient-to-br from-primary/40 via-blue-600/30 to-violet-600/30 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-lg" />
          <div className="relative p-4 rounded-xl bg-gradient-to-br from-white/95 via-primary/10 to-blue-600/10 backdrop-blur-xl border border-white/30 shadow-lg shadow-primary/10 transition-all duration-300 group-hover:shadow-xl group-hover:border-primary/30 hover:bg-white/60">
            {/* Plan Header */}
            <div className="flex items-center gap-3">
              <div className="relative size-10 rounded-xl bg-gradient-to-br from-primary/40 to-blue-600/30 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/40 via-blue-600/30 to-violet-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Crown className="size-5 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div>
                <div className="text-sm font-semibold bg-gradient-to-r from-primary via-blue-600 to-violet-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:via-primary group-hover:to-violet-600 transition-all duration-300">
                  {subscription?.subscription?.package?.name || "Free"}
                </div>
                <div className="text-xs text-neutral-500 capitalize font-medium">
                  {subscription?.subscription?.package?.type || "basic"} Plan
                </div>
              </div>
            </div>

            <div className="mt-4">
              {/* Trial Badge */}
              {subscription?.subscription?.isTrial && (
                <div className="mb-3 py-2 px-3 rounded-lg bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-red-500/5 border border-amber-500/10">
                  <div className="text-xs font-medium bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                    Trial ends in{" "}
                    {Math.ceil(
                      (new Date(subscription.subscription.endDate).getTime() -
                        new Date().getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    days
                  </div>
                </div>
              )}

              {/* Upgrade Button */}
              <Link href="/pricing" className="block">
                <GradientButton
                  variant="primary"
                  size="sm"
                  fullWidth
                  className="shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 bg-gradient-to-r from-primary via-blue-600 to-violet-600 hover:from-blue-600 hover:via-primary hover:to-violet-600 group"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Rocket className="size-4 animate-pulse group-hover:animate-none group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-medium">Upgrade Package</span>
                  </div>
                </GradientButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
