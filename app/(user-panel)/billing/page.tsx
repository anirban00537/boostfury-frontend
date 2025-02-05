"use client";
import {
  cancelSubscription,
  checkSubscription,
  getPackages,
} from "@/services/subscription.service";
import { RootState } from "@/state/store";
import { ResponseData } from "@/types";
import { PackageType, PackageStatus } from "@/types/packages";
import React from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import LoadingSection from "@/components/utils-components/loading/LoadingSection.comp";
import {
  CreditCard,
  FileText,
  Crown,
  Clock,
  AlertCircle,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import Pricing from "@/components/subscription/Pricing.comp";

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
    data: subscriptionData,
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
          </div>
          <TabHeader activeTab={activeTab} onTabChange={handleTabClick} />
        </div>
      </div>

      <div className="px-4 sm:px-6 py-8">
        <Tabs value={activeTab} className="w-full">
          <TabsContent value="current">
            {/* Current Plan Content */}
            {subscriptionData?.data?.subscription ? (
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
                              {subscriptionData?.data?.subscription?.package
                                ?.name || "No Plan"}
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
                            {subscriptionData?.data?.subscription?.package
                              ?.type || "N/A"}
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
                              subscriptionData?.data?.isActive
                                ? "text-emerald-600"
                                : "text-red-600"
                            }`}
                          >
                            {subscriptionData?.data?.isActive
                              ? "Active"
                              : "Inactive"}
                          </div>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                          subscriptionData?.data?.isActive
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                            : "bg-red-50 text-red-700 border border-red-100"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              subscriptionData?.data?.isActive
                                ? "bg-emerald-500"
                                : "bg-red-500"
                            }`}
                          ></span>
                          {subscriptionData?.data?.isActive
                            ? "Active Plan"
                            : "Inactive Plan"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subscription Details */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-neutral-200/60 shadow-sm">
                  <div className="px-6 py-4 border-b border-neutral-100">
                    <div className="flex items-center justify-between">
                      <h2 className="text-base font-semibold text-neutral-900">
                        Subscription Details
                      </h2>
                      {subscriptionData?.data?.subscription?.package?.name.toLowerCase() !== 'trial' && (
                        <button
                          onClick={handleCancelSubscription}
                          disabled={isCanceling}
                          className={cn(
                            "px-4 py-2 text-sm font-medium rounded-lg",
                            "text-red-600 hover:text-red-700",
                            "bg-red-50 hover:bg-red-100",
                            "border border-red-200/50",
                            "transition-colors duration-200",
                            "disabled:opacity-50 disabled:cursor-not-allowed"
                          )}
                        >
                          {isCanceling ? 'Canceling...' : 'Cancel Plan'}
                        </button>
                      )}
                    </div>
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
                                subscriptionData?.data?.subscription?.startDate
                              ).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                            <span>→</span>
                            <span>
                              {new Date(
                                subscriptionData?.data?.subscription?.endDate
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
                          (new Date(
                            subscriptionData?.data?.subscription?.endDate
                          ).getTime() -
                            new Date(
                              subscriptionData?.data?.subscription?.startDate
                            ).getTime()) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        days total
                      </div>
                    </div>

                    {/* Trial Status Row */}
                    {subscriptionData?.data?.subscription?.isTrial && (
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
                                    subscriptionData?.data?.subscription?.endDate
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
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No active subscription</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="plans">
            <Pricing
              currentPlan={subscriptionData?.data?.subscription?.package?.name}
              className="py-4"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SubscriptionDetails;
