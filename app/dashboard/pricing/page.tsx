"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";

const PLANS = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for getting started",
    features: [
      "5 AI-generated posts per month",
      "Basic scheduling",
      "Standard AI model",
      "Community support",
    ],
    cta: "Current Plan",
    disabled: true,
  },
  {
    name: "Pro",
    price: "19",
    description: "Best for professionals",
    features: [
      "50 AI-generated posts per month",
      "Advanced scheduling",
      "Advanced AI model",
      "Priority support",
      "Custom instructions",
      "Analytics dashboard",
    ],
    cta: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Business",
    price: "49",
    description: "For teams and businesses",
    features: [
      "Unlimited AI-generated posts",
      "Team collaboration",
      "Advanced analytics",
      "Custom AI training",
      "API access",
      "Dedicated support",
      "Custom branding",
    ],
    cta: "Contact Sales",
  },
];

export default function PricingPage() {
  const [billingInterval, setBillingInterval] = useState<"monthly" | "yearly">(
    "monthly"
  );

  return (
    <div className="mx-auto px-6 py-6">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-2xl font-semibold text-gray-900">
          Choose Your Plan
        </h1>
        <p className="text-gray-500 mt-2">
          Get more value with our premium features and increased post generation
          limits
        </p>

        {/* Billing Toggle */}
        <div className="mt-6 p-1 bg-gray-100 rounded-lg inline-flex">
          <button
            onClick={() => setBillingInterval("monthly")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              billingInterval === "monthly"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingInterval("yearly")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              billingInterval === "yearly"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Yearly
            <Badge
              variant="secondary"
              className="ml-2 bg-blue-50 text-blue-600"
            >
              Save 20%
            </Badge>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`relative bg-white rounded-xl border ${
              plan.popular
                ? "border-blue-200 shadow-xl shadow-blue-100"
                : "border-gray-200"
            } p-6 flex flex-col`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-0 right-0 mx-auto w-fit">
                <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1">
                  <Sparkles className="w-3.5 h-3.5 mr-1" />
                  Most Popular
                </Badge>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {plan.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
              <div className="mt-4 flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">
                  $
                  {billingInterval === "yearly"
                    ? (parseInt(plan.price) * 0.8).toString()
                    : plan.price}
                </span>
                <span className="text-gray-500 ml-1">/month</span>
              </div>
            </div>

            <div className="mt-6 space-y-4 flex-1">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center">
                  <Check className="h-4 w-4 text-blue-500 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              className={`mt-8 ${
                plan.popular
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-900 hover:bg-gray-800"
              }`}
              disabled={plan.disabled}
            >
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mt-16 max-w-3xl mx-auto text-center">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="grid gap-6 text-left">
          <div>
            <h3 className="font-medium text-gray-900">
              Can I change my plan later?
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Yes, you can upgrade or downgrade your plan at any time. Changes
              will be reflected in your next billing cycle.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">
              What payment methods do you accept?
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              We accept all major credit cards, PayPal, and bank transfers for
              Business plans.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Do you offer refunds?</h3>
            <p className="mt-1 text-sm text-gray-500">
              Yes, we offer a 14-day money-back guarantee for all paid plans.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
