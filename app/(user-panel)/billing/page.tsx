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
} from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";

const SubscriptionDetails = () => {
  const { userinfo, loggedin } = useSelector((state: RootState) => state.user);

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
      <div className="min-h-[600px] flex items-center justify-center">
        <LoadingSection className="scale-150" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header Section - Following My Posts pattern */}
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
        </div>
      </div>

      <div className="px-4 sm:px-6 py-8">
        <div className="p-6">
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
          <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-xl border border-neutral-200/60 shadow-sm">
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
                      new Date(data?.data?.subscription.startDate).getTime()) /
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
      </div>
    </div>
  );
};

export default SubscriptionDetails;
