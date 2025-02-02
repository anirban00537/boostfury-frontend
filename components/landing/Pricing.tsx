"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export const Pricing = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Basic Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative group"
          >
            <div className="absolute -inset-px bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700" />
            <div className="relative h-full bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-neutral-200/60">
              <div className="flex flex-col h-full">
                {/* Plan Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-neutral-900">
                      Basic
                    </h3>
                    <span className="px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-full">
                      Popular
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-neutral-900">
                      $19
                    </span>
                    <span className="text-neutral-500">/month</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {[
                    "10,000 words per month",
                    "5 LinkedIn posts per day",
                    "Basic AI content generation",
                    "Post scheduling",
                    "Analytics dashboard",
                    "Email support",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center">
                          <Check className="w-3 h-3 text-blue-600" />
                        </div>
                      </div>
                      <span className="text-neutral-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="mt-auto">
                  <ShimmerButton
                    className="w-full h-12 rounded-xl font-medium"
                    background="linear-gradient(110deg, #2563eb, #4f46e5)"
                  >
                    <Link href="/register" className="text-white">
                      Get Started
                    </Link>
                  </ShimmerButton>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute -inset-px bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl" />
            <div className="relative h-full bg-neutral-900 rounded-3xl p-8 shadow-xl">
              <div className="flex flex-col h-full">
                {/* Plan Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white">Pro</h3>
                    <span className="px-3 py-1 text-sm text-indigo-200 bg-indigo-500/20 rounded-full">
                      Best Value
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white">$49</span>
                    <span className="text-neutral-400">/month</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {[
                    "Unlimited words",
                    "Unlimited LinkedIn posts",
                    "Advanced AI content generation",
                    "Priority post scheduling",
                    "Advanced analytics & insights",
                    "Priority support",
                    "Custom branding",
                    "Team collaboration",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-indigo-300" />
                        </div>
                      </div>
                      <span className="text-neutral-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="mt-auto">
                  <ShimmerButton
                    className="w-full h-12 rounded-xl font-medium bg-white"
                    background="linear-gradient(110deg, #ffffff, #f3f4f6)"
                  >
                    <Link href="/register" className="text-neutral-900">
                      Get Started
                    </Link>
                  </ShimmerButton>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
