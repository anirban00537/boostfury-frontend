"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Clock, Users, Trophy } from "lucide-react";
import { LinkedInCard } from "./LinkedInCard";

export const ValueProps = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-gradient">
              The smartest way
            </span>{" "}
            <span className="block sm:inline mt-1 sm:mt-0 font-light">to grow on LinkedIn</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto px-4 sm:px-6 font-light leading-relaxed">
            Create content that's engineered for maximum engagement and
            professional growth
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start lg:items-center">
          {/* Left Side - Value Props */}
          <div className="space-y-4 sm:space-y-6">
            {[
              {
                title: "Go viral, effortlessly",
                description:
                  "Our AI analyzes thousands of viral LinkedIn posts to understand what works. It's like having an army of content experts working for you 24/7.",
                icon: Sparkles,
                gradient: "from-blue-600 to-indigo-600",
                borderColor: "border-blue-100",
                delay: 0.1,
                step: 1
              },
              {
                title: "Save hours every day",
                description:
                  "Simply input your topic, and our AI handles the rest - from writing and editing to optimizing for engagement. Schedule posts in seconds.",
                icon: Clock,
                gradient: "from-purple-600 to-violet-600",
                borderColor: "border-purple-100",
                delay: 0.2,
                step: 2
              },
              {
                title: "Grow your network faster",
                description:
                  "Our AI-powered content strategy helps you attract the right connections and establish yourself as a thought leader in your industry.",
                icon: Users,
                gradient: "from-indigo-600 to-blue-600",
                borderColor: "border-indigo-100",
                delay: 0.3,
                step: 3
              },
              {
                title: "Boost your personal brand",
                description:
                  "Transform your LinkedIn presence with content that showcases your expertise and drives professional opportunities.",
                icon: Trophy,
                gradient: "from-blue-600 to-indigo-600",
                borderColor: "border-blue-100",
                delay: 0.4,
                step: 4
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: item.delay }}
                className="relative group"
              >
                <div
                  className={`relative overflow-hidden rounded-xl sm:rounded-2xl border ${item.borderColor} bg-white/50 backdrop-blur-sm p-4 sm:p-6 hover:shadow-lg transition-all duration-500`}
                >
                  {/* Connecting line with arrow */}
                  {index < 3 && (
                    <div className="hidden lg:block absolute -bottom-8 left-1/2 transform -translate-x-1/2 h-8 w-[2px] bg-gradient-to-b from-blue-400 to-indigo-400">
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 border-b-2 border-r-2 border-indigo-400"></div>
                    </div>
                  )}

                  <div className="flex items-start gap-3 sm:gap-4">
                    {/* Step number with gradient border */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white flex items-center justify-center">
                          <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-r ${item.gradient} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                            <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </div>
                        </div>
                        <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-white flex items-center justify-center">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 flex items-center justify-center">
                            <span className="text-xs font-medium text-white">{item.step}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium text-neutral-900 mb-1 sm:mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Side - LinkedIn Card */}
          <div className="lg:sticky lg:top-8">
            <LinkedInCard />
          </div>
        </div>
      </div>
    </section>
  );
};
