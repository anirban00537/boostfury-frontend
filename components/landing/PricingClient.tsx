"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Sparkles, Crown, Rocket, Zap } from "lucide-react";
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
  packages: {
    monthly: PricingPlanType[];
  };
}

const PricingCard = ({ plan }: { plan: PricingPlanType }) => {
  const Icon =
    plan.price === 0
      ? Sparkles
      : plan.price < 50
      ? Zap
      : plan.price < 100
      ? Crown
      : Rocket;

  const isPro = plan.name === "Pro";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: isPro ? 0.2 : 0.1 }}
      className="relative group"
    >
      <div
        className={`absolute -inset-px ${
          isPro
            ? "bg-gradient-to-r from-blue-600 to-indigo-600"
            : "bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 opacity-0 group-hover:opacity-100"
        } rounded-3xl ${!isPro && "blur-sm"} transition-all duration-700`}
      />
      <div
        className={`relative h-full ${
          isPro ? "bg-neutral-900" : "bg-white"
        } rounded-3xl p-8 ${
          isPro ? "shadow-xl" : "shadow-sm hover:shadow-xl"
        } transition-all duration-500 ${
          !isPro && "border border-neutral-200/60"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Plan Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3
                className={`text-2xl font-bold ${
                  isPro ? "text-white" : "text-neutral-900"
                }`}
              >
                {plan.name}
              </h3>
              <span
                className={`px-3 py-1 text-sm ${
                  isPro
                    ? "text-indigo-200 bg-indigo-500/20"
                    : "text-blue-600 bg-blue-50"
                } rounded-full`}
              >
                {isPro ? "Best Value" : "Popular"}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span
                className={`text-5xl font-bold ${
                  isPro ? "text-white" : "text-neutral-900"
                }`}
              >
                ${plan.price}
              </span>
              <span className={isPro ? "text-neutral-400" : "text-neutral-500"}>
                /month
              </span>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-4 mb-8">
            {/* Word Generation Feature */}
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <div
                  className={`w-5 h-5 rounded-full ${
                    isPro ? "bg-indigo-500/20" : "bg-blue-50"
                  } flex items-center justify-center`}
                >
                  <Check
                    className={`w-3 h-3 ${
                      isPro ? "text-indigo-300" : "text-blue-600"
                    }`}
                  />
                </div>
              </div>
              <span className={isPro ? "text-neutral-300" : "text-neutral-600"}>
                {plan.features.wordGeneration.description}
              </span>
            </div>

            {/* Other Features */}
            {plan.features.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <div
                    className={`w-5 h-5 rounded-full ${
                      isPro ? "bg-indigo-500/20" : "bg-blue-50"
                    } flex items-center justify-center`}
                  >
                    <Check
                      className={`w-3 h-3 ${
                        isPro ? "text-indigo-300" : "text-blue-600"
                      }`}
                    />
                  </div>
                </div>
                <span
                  className={isPro ? "text-neutral-300" : "text-neutral-600"}
                >
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-auto">
            <ShimmerButton
              className={`w-full h-12 rounded-xl font-medium ${
                isPro && "bg-white"
              }`}
              background={
                isPro
                  ? "linear-gradient(110deg, #ffffff, #f3f4f6)"
                  : "linear-gradient(110deg, #2563eb, #4f46e5)"
              }
            >
              <Link
                href="/register"
                className={isPro ? "text-neutral-900" : "text-white"}
              >
                Get Started
              </Link>
            </ShimmerButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const PricingClient = ({ packages }: PricingProps) => {
  const monthlyPlans = packages?.monthly || [];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-slate-50/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Simple,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              transparent
            </span>{" "}
            pricing
          </h2>
          <p className="mt-4 text-xl text-neutral-600 max-w-2xl mx-auto">
            Choose the perfect plan for your LinkedIn growth journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {monthlyPlans.map((plan: PricingPlanType) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};
