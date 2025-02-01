"use client";
import {
  cancelSubscription,
  checkSubscription,
} from "@/services/subscription.service";
import { RootState } from "@/state/store";
import { ResponseData } from "@/types";
import React from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import LoadingSection from "@/components/utils-components/loading/LoadingSection.comp";
import {
  CreditCard,
  Calendar,
  Clock,
  AlertCircle,
  FileText,
  Crown,
  Rocket,
  Sparkles,
  Zap,
  Check,
} from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { ShimmerButton } from "@/components/ui/shimmer-button";

const pricingPlans = [
  {
    name: "Starter",
    price: "19",
    description:
      "Perfect for individuals getting started with content creation",
    features: [
      "10,000 words per month",
      "5 LinkedIn posts per day",
      "Basic AI content generation",
      "Standard support",
    ],
    gradient: "from-blue-500 via-cyan-500 to-sky-500",
    icon: Zap,
  },
  {
    name: "Professional",
    price: "49",
    description: "Ideal for professionals and growing businesses",
    features: [
      "50,000 words per month",
      "15 LinkedIn posts per day",
      "Advanced AI content generation",
      "Priority support",
      "Custom tone & style settings",
    ],
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    icon: Crown,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "99",
    description: "For teams and businesses needing maximum power",
    features: [
      "Unlimited words",
      "Unlimited LinkedIn posts",
      "Premium AI content generation",
      "24/7 Priority support",
      "Custom tone & style settings",
      "API access",
      "Team collaboration",
    ],
    gradient: "from-amber-500 via-orange-500 to-red-500",
    icon: Rocket,
  },
];

const tabConfigs = [
  {
    id: "current",
    title: "Current Plan",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: "plans",
    title: "Available Plans",
    icon: <Crown className="w-4 h-4" />,
  },
] as const;

interface TabHeaderProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabHeader: React.FC<TabHeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex gap-1">
      {tabConfigs.map((config) => (
        <button
          key={config.id}
          onClick={() => onTabChange(config.id)}
          className={cn(
            "group relative px-4 py-3",
            "transition-all duration-200 focus:outline-none"
          )}
        >
          <div className="relative flex items-center gap-2">
            <div
              className={cn(
                "size-8 rounded-lg flex items-center justify-center transition-colors",
                activeTab === config.id
                  ? "bg-gradient-to-br from-primary/10 to-primary/5 text-primary shadow-inner"
                  : "text-neutral-500 group-hover:text-primary/80"
              )}
            >
              {config.icon}
            </div>
            <span
              className={cn(
                "text-sm font-medium",
                activeTab === config.id
                  ? "text-neutral-900"
                  : "text-neutral-600 group-hover:text-neutral-800"
              )}
            >
              {config.title}
            </span>
          </div>

          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-200",
              activeTab === config.id
                ? "bg-primary"
                : "bg-transparent group-hover:bg-neutral-200"
            )}
          />
        </button>
      ))}
    </div>
  );
};

const PricingPlan = ({
  plan,
  currentPlan,
}: {
  plan: (typeof pricingPlans)[0];
  currentPlan?: string;
}) => {
  const isCurrentPlan = currentPlan === plan.name;

  return (
    <div className="relative pt-4 h-full">
      <div
        className={cn(
          "relative group rounded-xl bg-white/80 backdrop-blur-sm border border-neutral-200/60 shadow-sm transition-all duration-300 hover:shadow-lg mt-4 h-full flex flex-col",
          plan.popular && "ring-2 ring-primary/20 shadow-lg"
        )}
      >
        {plan.popular && (
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
                <plan.icon
                  className={cn(
                    "w-6 h-6",
                    plan.popular ? "text-primary" : "text-neutral-900"
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
            {plan.features.map((feature) => (
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
              disabled={isCurrentPlan}
              className={cn(
                "w-full h-12 rounded-xl font-medium shadow-lg transition-all duration-300 hover:-translate-y-0.5",
                isCurrentPlan ? "opacity-50 cursor-not-allowed" : ""
              )}
              background={
                plan.popular
                  ? "linear-gradient(110deg, #2563eb, #4f46e5, #7c3aed)"
                  : "linear-gradient(110deg, #0f172a, #1e293b)"
              }
            >
              {isCurrentPlan ? "Current Plan" : `Upgrade to ${plan.name}`}
            </ShimmerButton>
          </div>
        </div>
      </div>
    </div>
  );
};

const PricingPlans = ({ currentPlan }: { currentPlan?: string }) => {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 bg-clip-text text-transparent">
          Choose Your Plan
        </h2>
        <p className="mt-4 text-neutral-600">
          Select the perfect plan for your content creation needs. Upgrade or
          downgrade anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {pricingPlans.map((plan) => (
          <PricingPlan key={plan.name} plan={plan} currentPlan={currentPlan} />
        ))}
      </div>
    </div>
  );
};

const SubscriptionDetails = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { userinfo, loggedin } = useSelector((state: RootState) => state.user);
  const [activeTab, setActiveTab] = React.useState(
    (searchParams?.get("tab") as string) || "current"
  );

  // Effect to handle URL query params for active tab
  React.useEffect(() => {
    const tab = searchParams?.get("tab");
    if (tab && tabConfigs.some((config) => config.id === tab)) {
      setActiveTab(tab);
    } else if (searchParams && !searchParams.get("tab")) {
      // Set default tab to 'current' if none exists
      updateQueryParams("current");
    }
  }, [searchParams]);

  // Update URL when tab changes
  const updateQueryParams = (tab: string) => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("tab", tab);
    window.history.pushState({}, "", newUrl.toString());
    setActiveTab(tab);
  };

  // Update tab click handler
  const handleTabClick = (tabId: string) => {
    updateQueryParams(tabId);
  };

  // Fetch subscription details
  const {
    data,
    isLoading: isSubscriptionLoading,
    refetch: refetchSubscription,
  } = useQuery<ResponseData, Error>(["subscription"], checkSubscription, {
    enabled: loggedin,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
    onError: (error: Error) => {
      toast.error(`Failed to fetch subscription: ${error.message}`);
    },
  });

  // Mutation for canceling subscription
  const { mutate: cancelPlan, isLoading: isCanceling } = useMutation(
    cancelSubscription,
    {
      onSuccess: () => {
        toast.success("Subscription canceled successfully.");
        refetchSubscription();
      },
      onError: (error: Error) => {
        toast.error(`Failed to cancel subscription: ${error.message}`);
      },
    }
  );

  const handleCancelSubscription = () => {
    if (window.confirm("Are you sure you want to cancel your subscription?")) {
      cancelPlan();
    }
  };

  if (isSubscriptionLoading) {
    return (
      <div className="min-h-screen">
        <div className="relative border-b border-neutral-200/60 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="px-8 pt-8 pb-0">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-neutral-200/40 to-transparent rounded-xl"></div>
                  <div className="absolute -inset-[1px] blur-sm bg-gradient-to-r from-transparent via-neutral-200/20 to-transparent rounded-xl"></div>
                  <div className="relative w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-neutral-200/40 shadow-sm">
                    <CreditCard className="w-5 h-5 text-neutral-900" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-b from-black to-neutral-800 bg-clip-text text-transparent">
                    Billing & Subscription
                  </h1>
                  <p className="text-sm text-neutral-600 mt-1">
                    Manage your subscription and billing details
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 sm:px-6 py-8">
          <div className="p-6">
            <LoadingSection className="min-h-[400px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="relative border-b border-neutral-200/60 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="px-8 pt-8 pb-0">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-neutral-200/40 to-transparent rounded-xl"></div>
                <div className="absolute -inset-[1px] blur-sm bg-gradient-to-r from-transparent via-neutral-200/20 to-transparent rounded-xl"></div>
                <div className="relative w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-neutral-200/40 shadow-sm">
                  <CreditCard className="w-5 h-5 text-neutral-900" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-b from-black to-neutral-800 bg-clip-text text-transparent">
                  Billing & Subscription
                </h1>
                <p className="text-sm text-neutral-600 mt-1">
                  Manage your subscription and billing details
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {data?.data?.isActive && !data?.data?.subscription.isTrial && (
                <GradientButton
                  variant="danger"
                  size="default"
                  onClick={handleCancelSubscription}
                  isLoading={isCanceling}
                  className="shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>
                      {isCanceling ? "Canceling..." : "Cancel Subscription"}
                    </span>
                  </div>
                </GradientButton>
              )}
            </div>
          </div>

          {/* Tabs Navigation */}
          <TabHeader activeTab={activeTab} onTabChange={handleTabClick} />
        </div>
      </div>

      <div className="px-4 sm:px-6  py-8">
        {activeTab === "current" && (
          <div className="space-y-8">
            {/* Current Plan Overview */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-neutral-200/60 shadow-sm">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    {/* Plan Info */}
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-neutral-200/40 to-transparent rounded-lg"></div>
                        <div className="relative w-10 h-10 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center border border-neutral-200/40">
                          <FileText className="w-5 h-5 text-neutral-900" />
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-neutral-500">
                          Current Plan
                        </div>
                        <div className="text-lg font-semibold text-neutral-900 capitalize mt-0.5">
                          {data?.data?.subscription.package.name}
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-10 w-px bg-neutral-200/60"></div>

                    {/* Plan Type */}
                    <div>
                      <div className="text-sm font-medium text-neutral-500">
                        Plan Type
                      </div>
                      <div className="text-lg font-semibold text-neutral-900 capitalize mt-0.5">
                        {data?.data?.subscription.package.type}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-10 w-px bg-neutral-200/60"></div>

                    {/* Status */}
                    <div>
                      <div className="text-sm font-medium text-neutral-500">
                        Status
                      </div>
                      <div
                        className={`text-lg font-semibold mt-0.5 ${
                          data?.data?.isActive
                            ? "text-emerald-600"
                            : "text-red-600"
                        }`}
                      >
                        {data?.data?.isActive ? "Active" : "Inactive"}
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      data?.data?.isActive
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                        : "bg-red-50 text-red-700 border border-red-100"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          data?.data?.isActive ? "bg-emerald-500" : "bg-red-500"
                        }`}
                      ></span>
                      {data?.data?.isActive ? "Active Plan" : "Inactive Plan"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscription Details */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-neutral-200/60 shadow-sm">
              <div className="px-6 py-4 border-b border-neutral-100">
                <h2 className="text-base font-semibold text-neutral-900">
                  Subscription Details
                </h2>
              </div>

              <div className="divide-y divide-neutral-100">
                {/* Duration Row */}
                <div className="px-6 py-4 flex items-center hover:bg-neutral-50/50 transition-colors">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative">
                      <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-neutral-200/40 to-transparent rounded-lg"></div>
                      <div className="relative w-10 h-10 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center border border-neutral-200/40">
                        <Clock className="w-5 h-5 text-neutral-900" />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-neutral-900">
                        Subscription Period
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-sm text-neutral-500">
                        <span>
                          {new Date(
                            data?.data?.subscription.startDate
                          ).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span>→</span>
                        <span>
                          {new Date(
                            data?.data?.subscription.endDate
                          ).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-neutral-500">
                    {Math.ceil(
                      (new Date(data?.data?.subscription.endDate).getTime() -
                        new Date(
                          data?.data?.subscription.startDate
                        ).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    days total
                  </div>
                </div>

                {/* Trial Status Row */}
                {data?.data?.subscription.isTrial && (
                  <div className="px-6 py-4 flex items-center hover:bg-neutral-50/50 transition-colors">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="relative">
                        <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-neutral-200/40 to-transparent rounded-lg"></div>
                        <div className="relative w-10 h-10 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center border border-neutral-200/40">
                          <AlertCircle className="w-5 h-5 text-neutral-900" />
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-neutral-900">
                          Trial Status
                        </div>
                        <div className="mt-1 flex items-center gap-3">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/5 text-primary">
                            Trial Period
                          </span>
                          <span className="text-sm text-neutral-500">
                            Trial ends in{" "}
                            {Math.ceil(
                              (new Date(
                                data?.data?.subscription.endDate
                              ).getTime() -
                                new Date().getTime()) /
                                (1000 * 60 * 60 * 24)
                            )}{" "}
                            days
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "plans" && (
          <PricingPlans currentPlan={data?.data?.subscription?.package?.name} />
        )}
      </div>
    </div>
  );
};

export default SubscriptionDetails;
