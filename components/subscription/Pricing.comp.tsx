"use client";
import React, { useState } from "react";
import { createCheckout } from "@/services/subscription";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { PRICING_PLANS, PricingPlan } from "@/lib/pricing";
import { Check } from "lucide-react";
import toast from "react-hot-toast";

const Pricing = () => {
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const { loggedin } = useSelector((state: RootState) => state.user);

  const getPrice = (plan: PricingPlan) => {
    if (selectedPlan === "monthly") {
      return plan.price;
    }
    // Calculate yearly price (20% discount)
    return Math.floor(plan.price * 12 * 0.8);
  };

  const buyProduct = async (plan: PricingPlan) => {
    setLoading(true);
    if (loggedin) {
      try {
        // Get the correct variant ID based on billing period
        const variantId = selectedPlan === "monthly" 
          ? plan.variants.monthly 
          : plan.variants.yearly;

        const response = await createCheckout({
          variantId,
          redirectUrl: window.location.origin,
        });

        if (response.checkoutUrl) {
          window.open(response.checkoutUrl, "_blank", "noopener,noreferrer");
        } else {
          toast.error("Failed to create checkout session");
        }
      } catch (error) {
        console.error("Error purchasing product:", error);
        toast.error("An error occurred while purchasing the product. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please login to continue");
      setLoading(false);
    }
  };

  const formatLimit = (value: number) => {
    return value === -1 ? "Unlimited" : value.toLocaleString();
  };

  return (
    <div className="flex flex-col h-full bg-white text-gray-800 overflow-y-auto">
      {/* Header Section */}
      <div className="flex-shrink-0 p-6 text-center">
        <h2 className="text-3xl font-bold mb-2 text-gray-900">Pricing</h2>
        <p className="text-gray-600 mb-6">Choose the perfect plan for your needs</p>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-1 rounded-lg inline-flex">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                selectedPlan === "monthly"
                  ? "bg-white text-gray-900 shadow"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setSelectedPlan("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                selectedPlan === "yearly"
                  ? "bg-white text-gray-900 shadow"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setSelectedPlan("yearly")}
            >
              Yearly
            </button>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="flex-grow flex items-start justify-center gap-6 px-4 pb-6">
        {PRICING_PLANS.map((plan) => (
          <div key={plan.id} className="w-full max-w-sm">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 h-full">
              <div className="relative p-6">
                {plan.id === "pro" && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{plan.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{plan.description}</p>

                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ${getPrice(plan)}
                  </span>
                  <span className="text-gray-600">/{selectedPlan === "monthly" ? "mo" : "yr"}</span>
                  {selectedPlan === "yearly" && (
                    <div className="text-sm text-green-600 mt-1">Save 20% with yearly billing</div>
                  )}
                </div>

                <button
                  className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                    plan.id === "pro"
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                  }`}
                  onClick={() => buyProduct(plan)}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Get Started"}
                </button>
              </div>

              <div className="bg-gray-50 p-6">
                <h4 className="font-medium mb-3 text-gray-900">Features included:</h4>
                <ul className="space-y-2">
                  {plan.featureTexts.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <Check className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
                      {feature}
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
