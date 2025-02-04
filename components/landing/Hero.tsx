"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Bot, Sparkles, ArrowRight, Users, Zap, Trophy } from "lucide-react";
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
            <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
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
            <h1 className="text-[2.75rem] sm:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 leading-[1.1] sm:leading-[1.1] max-w-4xl mx-auto">
              <span className="block mb-3 sm:mb-4">
                Create{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                    Powerful Content
                  </span>
                  <span className="absolute -bottom-2 left-0 right-0 h-3 bg-blue-100/60 -skew-x-6" />
                </span>
              </span>
              <span className="block text-neutral-800/90">
                for LinkedIn{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  with AI
                </span>
              </span>
            </h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto mt-8">
              AI-powered content creation that helps you build your personal brand, engage your network, and drive real results
            </p>
          </motion.div>

          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12"
          >
            {[
              {
                icon: <Users className="w-5 h-5 text-blue-600" />,
                title: "Grow Your Network",
                description: "Connect with professionals through engaging content",
              },
              {
                icon: <Zap className="w-5 h-5 text-indigo-600" />,
                title: "Save Time",
                description: "Generate quality posts in seconds with AI",
              },
              {
                icon: <Trophy className="w-5 h-5 text-blue-600" />,
                title: "Drive Results",
                description: "Increase engagement and generate more leads",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-blue-100/50 hover:border-blue-200/50 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 rounded-xl bg-blue-50 group-hover:bg-blue-100/50 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-neutral-900">{feature.title}</h3>
                  <p className="text-sm text-neutral-600">{feature.description}</p>
                </div>
              </div>
            ))}
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
                <div className="text-3xl font-bold text-blue-600">10K+</div>
                <div className="text-sm mt-1">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">500K+</div>
                <div className="text-sm mt-1">Posts Generated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">85%</div>
                <div className="text-sm mt-1">Engagement Rate</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
