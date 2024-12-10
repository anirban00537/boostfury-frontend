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
      {/* Header Section - Updated with cancel button */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">
              Billing & Subscription
            </h1>
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
          <p className="text-sm text-gray-500">
            Manage your subscription and billing details
          </p>
        </div>
      </div>

      <div className="p-6">
        {/* Status Card - Updated with row design */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="bg-primary/5 p-2 rounded-lg">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Current Plan</span>
                  <span className="text-base font-semibold text-gray-900 capitalize">
                    {data?.data?.subscription.package.name}
                  </span>
                </div>
              </div>
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">Plan Type</span>
                <span className="text-base font-semibold text-gray-900 capitalize">
                  {data?.data?.subscription.package.type}
                </span>
              </div>
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">Status</span>
                <span className={`text-base font-semibold ${
                  data?.data?.isActive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {data?.data?.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${
              data?.data?.isActive 
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                data?.data?.isActive ? 'bg-green-500' : 'bg-red-500'
              }`}></span>
              {data?.data?.isActive ? "Active Plan" : "Inactive Plan"}
            </span>
          </div>
        </div>

        {/* Updated Subscription Details - Row Based */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-100">
            {/* Duration Row */}
            <div className="flex items-center p-4 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex-shrink-0 w-12 flex justify-center">
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-indigo-500" />
                </div>
              </div>
              <div className="flex-grow">
                <div className="text-sm font-medium text-gray-500">Subscription Period</div>
                <div className="mt-1 flex items-center gap-2 text-gray-900">
                  <span className="font-semibold">
                    {new Date(data?.data?.subscription.startDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <span className="text-gray-400">→</span>
                  <span className="font-semibold">
                    {new Date(data?.data?.subscription.endDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0 px-4">
                <div className="text-xs text-gray-500">
                  {Math.ceil((new Date(data?.data?.subscription.endDate).getTime() - new Date(data?.data?.subscription.startDate).getTime()) / (1000 * 60 * 60 * 24))} days total
                </div>
              </div>
            </div>

            {/* Trial Status Row */}
            <div className="flex items-center p-4 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex-shrink-0 w-12 flex justify-center">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                </div>
              </div>
              <div className="flex-grow">
                <div className="text-sm font-medium text-gray-500">Subscription Type</div>
                <div className="mt-1 flex items-center gap-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    data?.data?.subscription.isTrial
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-blue-50 text-blue-700'
                  }`}>
                    {data?.data?.subscription.isTrial ? "Trial Period" : "Full Access"}
                  </span>
                  {data?.data?.subscription.isTrial && (
                    <span className="text-xs text-gray-500">
                      Trial ends in {Math.ceil((new Date(data?.data?.subscription.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Remove the cancel button section from here */}
      </div>
    </div>
  );
};

export default SubscriptionDetails;
