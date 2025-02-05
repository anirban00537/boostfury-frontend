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
            ? "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"
            : "bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 opacity-0 group-hover:opacity-100"
        } rounded-[32px] transition-all duration-500`}
      />

      {/* Card Content */}
      <div
        className={`relative h-full ${
          isPro ? "bg-neutral-900" : "bg-white/50 backdrop-blur-sm"
        } rounded-[30px] p-8 transition-all duration-500 ${
          !isPro && "border border-blue-100/50 hover:border-transparent"
        }`}
      >
        <div className="flex flex-col h-full space-y-6">
          {/* Plan Name & Price */}
          <div className="space-y-4">
            <h3
              className={`text-2xl font-medium ${
                isPro ? "text-white" : "text-neutral-900"
              }`}
            >
              {plan.name}
            </h3>
            <div className="flex items-baseline">
              <span
                className={`text-4xl font-medium ${
                  isPro ? "text-white" : "text-neutral-900"
                }`}
              >
                ${plan.price}
              </span>
              <span
                className={`text-sm ml-2 ${
                  isPro ? "text-neutral-400" : "text-neutral-500"
                }`}
              >
                /month
              </span>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4 flex-grow">
            <p
              className={`text-sm ${
                isPro ? "text-neutral-400" : "text-neutral-600"
              }`}
            >
              {plan.description}
            </p>
            <div className="space-y-3">
              {plan.features.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 w-5 h-5 rounded-full ${
                      isPro ? "bg-blue-500/20" : "bg-blue-100"
                    } flex items-center justify-center`}
                  >
                    <Check
                      className={`w-3 h-3 ${
                        isPro ? "text-blue-400" : "text-blue-600"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-sm ${
                      isPro ? "text-neutral-300" : "text-neutral-600"
                    }`}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div>
            <ShimmerButton
              className={`w-full h-12 rounded-xl text-base font-medium ${
                isPro
                  ? "bg-white text-neutral-900 hover:bg-neutral-100"
                  : "bg-neutral-900 text-white hover:bg-neutral-800"
              }`}
              background={isPro
                ? "linear-gradient(110deg, #ffffff, #f3f4f6, #ffffff)"
                : "linear-gradient(110deg, #2563eb, #4f46e5, #2563eb)"
              }
            >
              Get Started
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
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
            Simple,{" "}
            <span className="relative">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-gradient">
                transparent
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-blue-200 via-purple-200 to-indigo-200 opacity-70 -skew-x-6" />
            </span>{" "}
            pricing
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-light">
            Choose the perfect plan for your LinkedIn growth journey
          </p>
        </motion.div>

        {/* Pricing Cards Container */}
        <div className="flex flex-wrap justify-center items-stretch gap-8 px-4">
          {monthlyPlans.map((plan, index) => (
            <div key={plan.id} className="w-full md:w-[380px] xl:w-[400px]">
              <PricingCard plan={plan} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
