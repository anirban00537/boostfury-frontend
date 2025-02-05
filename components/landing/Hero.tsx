"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Bot, Sparkles, ArrowRight, Users, Zap, Trophy, Clock } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50/50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-blue-100/20 to-transparent blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-36 pb-24">
        <div className="text-center space-y-12">
          {/* Highlight badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-5 py-2 rounded-full border border-blue-100 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
              Join 10,000+ LinkedIn Professionals
            </span>
          </motion.div>

          {/* Main title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-8"
          >
            <h1 className="text-[2.75rem] sm:text-6xl lg:text-7xl font-medium tracking-tight text-neutral-900 leading-[1.1] sm:leading-[1.1] max-w-4xl mx-auto">
              <span className="block mb-3 sm:mb-4">
                Create{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
                    Powerful Content
                  </span>
                  <span className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-blue-200 via-purple-200 to-indigo-200 opacity-70 -skew-x-6 transform transition-all duration-300 hover:scale-105" />
                </span>
              </span>
              <span className="block text-neutral-800/90 font-light">
                for LinkedIn{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient relative font-medium">
                  with AI
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 max-w-2xl mx-auto mt-8 font-light leading-relaxed">
              AI-powered content creation that helps you build your personal brand, engage your network, and drive real results
            </p>
          </motion.div>

          {/* CTA section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 space-y-8"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/dashboard">
                <ShimmerButton
                  className="h-14 px-8 rounded-xl text-lg font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02]"
                  background="linear-gradient(110deg, #2563eb, #4f46e5, #2563eb)"
                >
                  <div className="flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    <span>Start Creating</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </ShimmerButton>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-neutral-600">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">10K+</div>
                <div className="text-sm mt-1 font-medium">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">500K+</div>
                <div className="text-sm mt-1 font-medium">Posts Generated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">85%</div>
                <div className="text-sm mt-1 font-medium">Engagement Rate</div>
              </div>
            </div>
          </motion.div>
          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center items-stretch gap-6 max-w-6xl mx-auto mt-12"
          >
            {[
              {
                icon: <Bot className="w-5 h-5 text-blue-600" />,
                title: "Generate Content",
                description: "Create engaging posts with AI in seconds",
                color: "from-blue-500/20 to-blue-600/20",
              },
              {
                icon: <Clock className="w-5 h-5 text-purple-600" />,
                title: "Schedule Posts",
                description: "Auto-post at peak engagement times",
                color: "from-purple-500/20 to-purple-600/20",
              },
              {
                icon: <Trophy className="w-5 h-5 text-indigo-600" />,
                title: "Drive Results",
                description: "Boost engagement and grow network",
                color: "from-indigo-500/20 to-indigo-600/20",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + i * 0.1,
                  ease: "easeOut",
                }}
                className="relative w-[280px] bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-blue-100/50 hover:border-blue-200/50 transition-all duration-300 hover:shadow-lg group"
              >
                {/* Connecting line with arrow */}
                {i < 2 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-[2px] bg-gradient-to-r from-blue-400 to-indigo-400">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rotate-45 border-t-2 border-r-2 border-indigo-400"></div>
                  </div>
                )}
                
                <div className="relative flex flex-col items-center text-center space-y-4">
                  {/* Step number with gradient border */}
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 flex items-center justify-center">
                          <span className="text-sm font-semibold text-white">{i + 1}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Icon with gradient background */}
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} group-hover:scale-110 transition-all duration-300`}>
                    {feature.icon}
                  </div>
                  
                  <h3 className="font-semibold text-neutral-900 text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
