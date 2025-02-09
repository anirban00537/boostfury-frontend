"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Bot,
  Sparkles,
  ArrowRight,
  Users,
  Zap,
  Trophy,
  Clock,
  Shapes,
} from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export const Hero = () => {
  return (
    <section className="relative min-h-[85vh] bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/80 overflow-hidden">
      {/* Enhanced background with multiple layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-blue-100/30 via-indigo-100/20 to-transparent blur-[120px]" />

        {/* Decorative orbs */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="text-center space-y-10">
          {/* Enhanced highlight badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-xl px-6 py-3 rounded-full border border-slate-200/60 shadow-lg hover:shadow-xl hover:border-slate-200/80 transition-all duration-300"
          >
            <Sparkles className="w-5 h-5 text-blue-500 animate-pulse" />
            <span className="text-sm font-medium bg-gradient-to-r from-slate-800 to-slate-900 bg-clip-text text-transparent">
              Start for Free - No Credit Card Required
            </span>
          </motion.div>

          {/* Enhanced title styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6 relative"
          >
            <h1 className="text-[2.75rem] sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] sm:leading-[1.1] max-w-4xl mx-auto">
              <div className="space-y-2">
                <div className="inline-flex items-baseline gap-2">
                  <span>Supercharge Your</span>
                  <span className="relative z-10 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    LinkedIn
                  </span>
                </div>
                <div className="inline-flex items-baseline gap-2">
                  <span>Presence with</span>
                  <span className="relative z-10 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    AI
                  </span>
                </div>
              </div>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Smart Content Creation for LinkedIn Professionals —
              <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Create, Schedule, and Grow Effortlessly
              </span>
            </p>
          </motion.div>

          {/* Compact CTA section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 space-y-6"
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <Link href="/dashboard">
                <ShimmerButton
                  className="h-14 px-8 rounded-xl text-lg font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02]"
                  background="linear-gradient(110deg, #2563eb, #4f46e5, #2563eb)"
                >
                  <div className="flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    <span>Start Creating - It's Free</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </ShimmerButton>
              </Link>
              <span className="text-sm text-neutral-500">
                No credit card required
              </span>
            </div>

            {/* Compact Stats section */}
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-slate-600 mt-12">
              {[
                { number: "5K+", label: "Active Users" },
                { number: "100K+", label: "Posts Generated" },
                { number: "85%", label: "Engagement Rate" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl font-bold text-slate-900">
                    {stat.number}
                  </div>
                  <div className="text-sm mt-2 font-medium text-slate-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Compact Feature cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center items-stretch gap-6 max-w-6xl mx-auto mt-16"
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
                className="relative w-[280px] bg-white/70 backdrop-blur-xl p-6 rounded-xl border border-slate-100 hover:border-slate-200 transition-all duration-300 hover:shadow-lg group"
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
                          <span className="text-sm font-semibold text-white">
                            {i + 1}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Icon with gradient background */}
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-br ${feature.color} group-hover:scale-105 transition-all duration-300`}
                  >
                    {feature.icon}
                  </div>

                  <h3 className="font-semibold text-slate-900 text-base">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};
