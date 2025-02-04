"use client";

import React from "react";
import { motion } from "framer-motion";
import { LinkedInNotifications } from "@/components/landing/LinkedInNotifications";
import { Sparkles, Check } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import Link from "next/link";

export const Features = () => {
  return (
    <section className="py-32 px-4 bg-gradient-to-b from-white to-blue-50/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Real-Time Engagement
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900">
                Transform Your LinkedIn{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Into a Growth Engine
                </span>
              </h2>

              <p className="text-xl text-neutral-600 leading-relaxed">
                Watch your LinkedIn presence soar with our AI-powered content
                strategy. Users report up to 5x more profile views, 3x higher
                engagement rates, and meaningful connections that convert into
                opportunities.
              </p>

              <div className="space-y-4">
                {[
                  "500% increase in profile visibility",
                  "3x more post engagement & reactions",
                  "Consistent weekly profile growth",
                  "Quality connection requests daily",
                  "Higher ranking in LinkedIn search",
                  "Automated content that converts",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                      <Check className="w-3 h-3 text-blue-600" />
                    </div>
                    <span className="text-neutral-700 font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border border-blue-100/20">
                <p className="text-sm text-blue-700 leading-relaxed">
                  "After using Boostfury for just 30 days, my LinkedIn
                  engagement skyrocketed. My posts now regularly reach 10k+
                  views, and I've gained over 2,000 new relevant connections."
                  <span className="block mt-2 font-medium">
                    - Sarah Chen, Product Manager
                  </span>
                </p>
              </div>
            </div>

            <div>
              <ShimmerButton
                className="h-12 px-8 rounded-xl text-base font-medium"
                background="linear-gradient(110deg, #2563eb, #4f46e5)"
              >
                <Link
                  href="/register"
                  className="text-white flex items-center gap-2"
                >
                  <span>Start Growing Your Network</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </Link>
              </ShimmerButton>
            </div>
          </motion.div>

          {/* Right Side - Notifications */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Background Effects */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-3xl" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-2xl" />

            {/* Notifications Container */}
            <div className="relative bg-white/40 backdrop-blur-xl rounded-3xl p-8 border border-neutral-200/50">
              <LinkedInNotifications />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
