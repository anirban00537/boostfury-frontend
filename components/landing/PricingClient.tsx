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
  const isPro = plan.name === "Pro";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: isPro ? 0.2 : 0.1 }}
      className="relative group"
    >
      {/* Background gradient */}
      <div
        className={`absolute -inset-[2px] ${
          isPro
            ? "bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600"
            : "bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 opacity-0 group-hover:opacity-100"
        } rounded-[32px] transition-all duration-500`}
      />

      {/* Card Content */}
      <div
        className={`relative h-full ${
          isPro ? "bg-neutral-900" : "bg-white"
        } rounded-[30px] p-8 transition-all duration-500 backdrop-blur-sm ${
          !isPro && "border border-neutral-200/60 hover:border-transparent"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Plan Header */}
          <div className="space-y-6 mb-8">
            <div className="flex items-center justify-between">
              <h3
                className={`text-2xl font-bold ${
                  isPro ? "text-white" : "text-neutral-900"
                }`}
              >
                {plan.name}
              </h3>
              {isPro ? (
                <div className="relative">
                  <div className="absolute -inset-3 bg-indigo-500/20 blur-lg rounded-full" />
                  <span className="relative px-3 py-1 text-sm text-indigo-200 bg-indigo-500/20 rounded-full border border-indigo-400/20">
                    Best Value
                  </span>
                </div>
              ) : (
                <span className="px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-full border border-blue-100">
                  Popular
                </span>
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span
                  className={`text-5xl font-bold tracking-tight ${
                    isPro ? "text-white" : "text-neutral-900"
                  }`}
                >
                  ${plan.price}
                </span>
                <span
                  className={`${
                    isPro ? "text-neutral-400" : "text-neutral-500"
                  }`}
                >
                  /month
                </span>
              </div>
              <p
                className={`${
                  isPro ? "text-neutral-400" : "text-neutral-500"
                } text-sm`}
              >
                {plan.description}
              </p>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-5 mb-8">
            {plan.features.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="flex items-start gap-3 group/item"
              >
                <div className="flex-shrink-0 mt-1">
                  <div
                    className={`w-5 h-5 rounded-full ${
                      isPro
                        ? "bg-gradient-to-br from-indigo-500/20 to-blue-500/20"
                        : "bg-gradient-to-br from-blue-50 to-indigo-50"
                    } flex items-center justify-center transition-colors group-hover/item:${
                      isPro ? "bg-indigo-500/30" : "bg-blue-100/80"
                    }`}
                  >
                    <Check
                      className={`w-3 h-3 ${
                        isPro ? "text-indigo-300" : "text-blue-600"
                      }`}
                    />
                  </div>
                </div>
                <span
                  className={`${
                    isPro ? "text-neutral-300" : "text-neutral-600"
                  } text-sm leading-relaxed`}
                >
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-auto">
            <ShimmerButton
              className={`w-full h-12 rounded-xl font-medium transform transition-transform duration-200 hover:scale-[1.02] ${
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
                className={`flex items-center justify-center gap-2 ${
                  isPro ? "text-neutral-900" : "text-white"
                }`}
              >
                Get Started
                {isPro && <Sparkles className="w-4 h-4" />}
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
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Simple,{" "}
            <span className="relative">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                transparent
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-3 bg-blue-100/60 -skew-x-6" />
            </span>{" "}
            pricing
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
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
