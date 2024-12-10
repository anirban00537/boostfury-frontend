"use client";
import { cancelSubscription, checkSubscription } from "@/services/subscription.service";
import { RootState } from "@/state/store";
import { ResponseData } from "@/types";
import React from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import LoadingSection from "@/components/utils-components/loading/LoadingSection.comp";
import { CreditCard, Calendar, Clock, AlertCircle } from "lucide-react"; // Add these imports
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
        refetchSubscription(); // Refresh subscription details
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
      {/* Header Section */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">
                <span className="text-gray-900">Billing</span>{" "}
                <span className="text-primary">& Subscription</span>
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage your subscription and billing details
              </p>
            </div>
            {data?.data?.isActive && (
              <GradientButton
                variant="danger"
                size="default"
                onClick={handleCancelSubscription}
                isLoading={isCanceling}
                leftIcon={<AlertCircle className="w-4 h-4" />}
                className="shadow-sm"
              >
                {isCanceling ? "Canceling..." : "Cancel Subscription"}
              </GradientButton>
            )}
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Current Plan Overview */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                {/* Plan Info */}
                <div className="flex items-center gap-4">
                  <div className="bg-primary/5 p-3 rounded-lg">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Current Plan</div>
                    <div className="text-lg font-semibold text-gray-900 capitalize mt-0.5">
                      {data?.data?.subscription.package.name}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-10 w-px bg-gray-200"></div>

                {/* Plan Type */}
                <div>
                  <div className="text-sm font-medium text-gray-500">Plan Type</div>
                  <div className="text-lg font-semibold text-gray-900 capitalize mt-0.5">
                    {data?.data?.subscription.package.type}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-10 w-px bg-gray-200"></div>

                {/* Status */}
                <div>
                  <div className="text-sm font-medium text-gray-500">Status</div>
                  <div className={`text-lg font-semibold mt-0.5 ${
                    data?.data?.isActive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {data?.data?.isActive ? "Active" : "Inactive"}
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                data?.data?.isActive 
                  ? 'bg-green-50 text-green-700 border border-green-100'
                  : 'bg-red-50 text-red-700 border border-red-100'
              }`}>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    data?.data?.isActive ? 'bg-green-500' : 'bg-red-500'
                  }`}></span>
                  {data?.data?.isActive ? "Active Plan" : "Inactive Plan"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Details */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-900">Subscription Details</h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            {/* Duration Row */}
            <div className="px-6 py-4 flex items-center hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center gap-4 flex-1">
                <div className="bg-primary/5 p-2.5 rounded-lg">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Subscription Period</div>
                  <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                    <span>
                      {new Date(data?.data?.subscription.startDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <span>→</span>
                    <span>
                      {new Date(data?.data?.subscription.endDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {Math.ceil((new Date(data?.data?.subscription.endDate).getTime() - new Date(data?.data?.subscription.startDate).getTime()) / (1000 * 60 * 60 * 24))} days total
              </div>
            </div>

            {/* Trial Status Row */}
            <div className="px-6 py-4 flex items-center hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center gap-4 flex-1">
                <div className="bg-primary/5 p-2.5 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Subscription Type</div>
                  <div className="mt-1 flex items-center gap-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      data?.data?.subscription.isTrial
                        ? 'bg-primary/5 text-primary'
                        : 'bg-blue-50 text-blue-600'
                    }`}>
                      {data?.data?.subscription.isTrial ? "Trial Period" : "Full Access"}
                    </span>
                    {data?.data?.subscription.isTrial && (
                      <span className="text-sm text-gray-500">
                        Trial ends in {Math.ceil((new Date(data?.data?.subscription.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDetails;
