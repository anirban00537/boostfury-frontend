"use client";
import { cancelSubscription, checkSubscription } from "@/services/subscription.service";
import { RootState } from "@/state/store";
import { ResponseData } from "@/types";
import React from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";

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
      <div className="flex items-center justify-center h-[400px]">
        <div className="text-center">
          <div className="loader border-4 border-blue-500 rounded-full w-8 h-8 animate-spin mb-4"></div>
          <p className="text-gray-500">Loading subscription details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">
          Manage Subscriptions
        </h1>
        <p className="text-gray-500 mt-2">
          Review your subscription details and manage your plans effortlessly.
        </p>
      </div>

      {/* Subscription Details Section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Plan Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4 transition">
            <span className="text-sm font-medium text-gray-500">Status</span>
            <span
              className={`text-lg font-semibold ${
                data?.data?.isActive ? "text-green-600" : "text-red-600"
              }`}
            >
              {data?.data?.isActive ? "Active" : "Inactive"}
            </span>
          </div>
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4 transition">
            <span className="text-sm font-medium text-gray-500">Plan</span>
            <span className="text-lg font-semibold capitalize">
              {data?.data?.subscription.package.name} (
              {data?.data?.subscription.package.type})
            </span>
          </div>
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4 transition">
            <span className="text-sm font-medium text-gray-500">Start Date</span>
            <span className="text-lg font-semibold">
              {new Date(data?.data?.subscription.startDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4 transition">
            <span className="text-sm font-medium text-gray-500">End Date</span>
            <span className="text-lg font-semibold">
              {new Date(data?.data?.subscription.endDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4 transition">
            <span className="text-sm font-medium text-gray-500">Trial</span>
            <span className="text-lg font-semibold">
              {data?.data?.subscription.isTrial ? "Yes" : "No"}
            </span>
          </div>
        </div>

        {/* Cancel Subscription Button */}
        <div className="mt-8 text-center">
          {data?.data?.isActive && (
            <button
              className={`px-6 py-3 rounded-lg text-white font-semibold ${
                isCanceling ? "bg-gray-400 cursor-not-allowed" : "bg-red-400 hover:bg-red-700"
              }`}
              onClick={handleCancelSubscription}
              disabled={isCanceling}
            >
              {isCanceling ? "Canceling..." : "Cancel Subscription"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDetails;
