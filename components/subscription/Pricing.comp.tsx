"use client";
import React, { useState } from "react";
import { createCheckout, getPackages } from "@/services/subscription.service";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Check, Sparkles, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { cn } from "@/lib/utils";

interface Package {
  id: string;
  name: string;
  description: string;
  billing: {
    price: number;
    currency: string;
    interval: string;
    variantId: string;
  };
  features: {
    wordGeneration: { description: string };
    linkedin: {
      accounts: { description: string };
      posts: { description: string };
    };
    carousels: { description: string };
    core: string[];
    additional: string[];
  };
}

const Pricing = () => {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null); // Track loading for each plan
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const { loggedin } = useSelector((state: RootState) => state.user);

  // Fetch packages data
  const { data: packagesData } = useQuery({
    queryKey: ["packages"],
    queryFn: getPackages,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const packages = packagesData?.data?.packages;

  const getPrice = (plan: Package) => {
    return plan.billing.price;
  };

  const buyProduct = async (plan: Package) => {
    setLoadingPlan(plan.id); // Set the loading state for the clicked plan
    if (loggedin) {
      try {
        const response = await createCheckout({
          variantId: plan.billing.variantId,
          redirectUrl: window.location.origin,
        });

        if (response.checkoutUrl) {
          window.open(response.checkoutUrl, "_blank", "noopener,noreferrer");
        } else {
          toast.error("Failed to create checkout session");
        }
      } catch (error) {
        console.error("Error purchasing product:", error);
        toast.error(
          "An error occurred while purchasing the product. Please try again."
        );
      } finally {
        setLoadingPlan(null); // Reset the loading state once the request is completed
      }
    } else {
      toast.error("Please login to continue");
      setLoadingPlan(null); // Reset the loading state in case the user is not logged in
    }
  };

  const currentPackages = packages?.[selectedPlan] || [];

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-white to-blue-50/30 text-gray-800 overflow-y-auto">
      {/* Header Section */}
      <div className="flex-shrink-0 p-6 sm:p-12 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Choose Your Perfect Plan
        </h2>
        <p className="text-base sm:text-lg text-gray-600 mb-3 max-w-2xl mx-auto px-4 sm:px-0">
          Get started with the features you need today and upgrade as you grow
        </p>
      </div>

      {/* Plans Grid */}
      <div className="flex-grow flex flex-col md:flex-row items-center justify-center gap-6 px-4 pb-12">
        {currentPackages.map((plan: Package) => (
          <div key={plan.id} className="w-full md:w-96 p-4">
            <div
              className={cn(
                "bg-white rounded-2xl overflow-hidden h-full border transition-all duration-300 shadow-md hover:shadow-lg",
                plan.id === "pro" ? "border-blue-200" : "border-gray-200"
              )}
            >
              <div className="relative p-6 sm:p-8">
                {plan.id === "pro" && (
                  <div className="absolute top-6 right-6">
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      <Sparkles className="w-3 h-3" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex flex-col h-full">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">
                    {plan.description}
                  </p>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1 justify-center">
                      <span className="text-4xl font-bold text-gray-900">
                        ${getPrice(plan)}
                      </span>
                      <span className="text-gray-500">
                        /{plan.billing.interval}
                      </span>
                    </div>
                  </div>

                  <button
                    className={cn(
                      "w-full py-3 px-4 rounded-xl font-medium transition-all duration-300",
                      plan.id === "pro"
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                    )}
                    onClick={() => buyProduct(plan)}
                    disabled={loadingPlan === plan.id} // Disable button only if it's loading
                  >
                    {loadingPlan === plan.id ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      "Get Started"
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 p-6 sm:p-8">
                <h4 className="font-semibold mb-4 text-gray-900 flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-500" />
                  Everything you get:
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-gray-700">
                    <Check className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                    <span>{plan.features.wordGeneration.description}</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-700">
                    <Check className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                    <span>{plan.features.linkedin.accounts.description}</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-700">
                    <Check className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                    <span>{plan.features.linkedin.posts.description}</span>
                  </li>

                  {plan.features.core.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-gray-700"
                    >
                      <Check className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {plan.features.additional.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-gray-700"
                    >
                      <Check className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
