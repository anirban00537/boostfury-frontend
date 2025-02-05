"use client";
import React, { useState } from "react";
import { createCheckout, getPackages } from "@/services/subscription.service";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Check, Sparkles, Loader2, Crown, Rocket, Zap } from "lucide-react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { cn } from "@/lib/utils";
import { ShimmerButton } from "@/components/ui/shimmer-button";

interface PricingPlanType {
  id: string;
  name: string;
  description: string;
  price: number;
  variantId: string;
  features: {
    wordGeneration: {
      limit: number;
      description: string;
    };
    features: string[];
  };
}

interface PricingProps {
  currentPlan?: string;
  className?: string;
}

const PricingPlan = ({
  plan,
  currentPlan,
}: {
  plan: PricingPlanType;
  currentPlan?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { loggedin } = useSelector((state: RootState) => state.user);
  const isCurrentPlan = currentPlan === plan.name;
  const Icon =
    plan.price === 0
      ? Sparkles
      : plan.price < 50
      ? Zap
      : plan.price < 100
      ? Crown
      : Rocket;

  const handleUpgrade = async () => {
    setIsLoading(true);
    if (loggedin) {
      try {
        const response = await createCheckout({
          variantId: plan.variantId,
          redirectUrl: window.location.origin,
        });

        if (response.checkoutUrl) {
          window.open(response.checkoutUrl, "_blank", "noopener,noreferrer");
        } else {
          toast.error("Failed to create checkout session");
        }
      } catch (error: any) {
        console.error("Error purchasing product:", error);
        toast.error(
          "An error occurred while purchasing the product. Please try again."
        );
      }
    } else {
      toast.error("Please login to continue");
    }
    setIsLoading(false);
  };

  return (
    <div className="relative pt-4 h-full">
      <div
        className={cn(
          "relative group rounded-xl bg-white/80 backdrop-blur-sm border border-neutral-200/60 shadow-sm transition-all duration-300 hover:shadow-lg mt-4 h-full flex flex-col",
          plan.name === "Pro" && "ring-2 ring-primary/20 shadow-lg"
        )}
      >
        {plan.name === "Pro" && (
          <div className="absolute -top-3 right-8">
            <div className="px-4 py-1.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs font-medium rounded-full shadow-lg">
              Most Popular
            </div>
          </div>
        )}
        <div className="p-8 flex flex-col flex-1">
          {/* Plan Header */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-neutral-200/40 to-transparent rounded-xl"></div>
              <div className="relative w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-neutral-200/40">
                <Icon
                  className={cn(
                    "w-6 h-6",
                    plan.name === "Pro" ? "text-primary" : "text-neutral-900"
                  )}
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-neutral-900">
                {plan.name}
              </h3>
              <p className="text-sm text-neutral-500 mt-1">
                {plan.description}
              </p>
            </div>
          </div>

          {/* Price */}
          <div className="mt-8">
            <div className="flex items-baseline">
              <span className="text-4xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-800 bg-clip-text text-transparent">
                ${plan.price}
              </span>
              <span className="ml-2 text-neutral-500">/month</span>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 space-y-4 flex-1">
            {/* Other features */}
            {plan.features.features.map((feature: string) => (
              <div key={feature} className="flex items-start gap-3">
                <div className="relative mt-1">
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-emerald-200/40 to-transparent rounded-full"></div>
                  <div className="relative w-4 h-4 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-emerald-200/40">
                    <Check className="w-2.5 h-2.5 text-emerald-600" />
                  </div>
                </div>
                <span className="text-neutral-600 text-sm">{feature}</span>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="mt-8">
            <ShimmerButton
              disabled={isCurrentPlan || isLoading}
              onClick={handleUpgrade}
              className={cn(
                "w-full h-12 rounded-xl font-medium shadow-lg transition-all duration-300 hover:-translate-y-0.5",
                isCurrentPlan || isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              )}
              background={
                plan.name === "Pro"
                  ? "linear-gradient(110deg, #2563eb, #4f46e5, #7c3aed)"
                  : "linear-gradient(110deg, #0f172a, #1e293b)"
              }
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </span>
              ) : isCurrentPlan ? (
                "Current Plan"
              ) : (
                `Upgrade to ${plan.name}`
              )}
            </ShimmerButton>
          </div>
        </div>
      </div>
    </div>
  );
};

const Pricing = ({ currentPlan, className }: PricingProps) => {
  const { data: packagesData } = useQuery(["packages"], getPackages, {
    enabled: true,
  });

  const monthlyPlans = packagesData?.data?.packages?.monthly || [];

  return (
    <div className={cn("space-y-8", className)}>
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 bg-clip-text text-transparent">
          Choose Your Plan
        </h2>
        <p className="mt-4 text-neutral-600">
          Select the perfect plan for your content creation needs. Upgrade or
          downgrade anytime.
        </p>
      </div>

      <div className="flex justify-center">
        <div className={cn(
          "grid gap-8 px-4 w-full",
          monthlyPlans.length === 1 ? "max-w-md" : 
          monthlyPlans.length === 2 ? "md:grid-cols-2 max-w-3xl" : 
          "md:grid-cols-3 max-w-6xl"
        )}>
          {monthlyPlans.map((plan: PricingPlanType) => (
            <PricingPlan key={plan.id} plan={plan} currentPlan={currentPlan} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
