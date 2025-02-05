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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-blue-100 text-sm">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient font-medium">
                Real-Time Engagement
              </span>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-medium text-neutral-900">
                Transform Your LinkedIn{" "}
                <span className="relative">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-gradient">
                    Into a Growth Engine
                  </span>
                  <span className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-blue-200 via-purple-200 to-indigo-200 opacity-70 -skew-x-6 transform transition-all duration-300" />
                </span>
              </h2>

              <p className="text-xl text-neutral-600 leading-relaxed font-light">
                Watch your LinkedIn presence soar with our AI-powered content
                strategy. Users report up to 5x more profile views, 3x higher
                engagement rates, and meaningful connections that convert into
                opportunities.
              </p>

              <div className="space-y-4">
                {[
                  {
                    text: "500% increase in profile visibility",
                    gradient: "from-blue-600 to-indigo-600"
                  },
                  {
                    text: "3x more post engagement & reactions",
                    gradient: "from-purple-600 to-violet-600"
                  },
                  {
                    text: "Consistent weekly profile growth",
                    gradient: "from-indigo-600 to-blue-600"
                  },
                  {
                    text: "Quality connection requests daily",
                    gradient: "from-blue-600 to-purple-600"
                  },
                  {
                    text: "Higher ranking in LinkedIn search",
                    gradient: "from-purple-600 to-indigo-600"
                  },
                  {
                    text: "Automated content that converts",
                    gradient: "from-indigo-600 to-blue-600"
                  }
                ].map((feature, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-3 group"
                  >
                    <div className="relative">
                      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      {index < 5 && (
                        <div className="hidden md:block absolute w-[2px] h-6 bg-gradient-to-b from-blue-400 to-indigo-400 left-1/2 transform -translate-x-1/2 top-6"></div>
                      )}
                    </div>
                    <span className="text-neutral-700 font-light">
                      {feature.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-blue-100">
                <p className="text-sm text-neutral-600 leading-relaxed font-light">
                  "After using Boostfury for just 30 days, my LinkedIn
                  engagement skyrocketed. My posts now regularly reach 10k+
                  views, and I've gained over 2,000 new relevant connections."
                  <span className="block mt-2 font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    - Sarah Chen, Product Manager
                  </span>
                </p>
              </div>
            </div>

            <div>
              <Link href="/register">
                <ShimmerButton
                  className="h-14 px-8 rounded-xl text-lg font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02]"
                  background="linear-gradient(110deg, #2563eb, #4f46e5, #2563eb)"
                >
                  <div className="text-white flex items-center gap-2">
                    <span>Start Growing Your Network</span>
                    <div className="w-2 h-2 rounded-full bg-white/80" />
                  </div>
                </ShimmerButton>
              </Link>
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
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-indigo-500/5 rounded-3xl" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-indigo-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-blue-500/10 rounded-full blur-3xl" />

            {/* Notifications Container */}
            <div className="relative bg-white/40 backdrop-blur-xl rounded-3xl p-8 border border-blue-100/50 shadow-xl shadow-blue-500/5">
              <LinkedInNotifications />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
