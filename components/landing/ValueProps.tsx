"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Clock, Users, Trophy } from "lucide-react";
import { LinkedInCard } from "./LinkedInCard";

export const ValueProps = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
              The smartest way
            </span>{" "}
            to grow on LinkedIn
          </h2>
          <p className="mt-4 text-xl text-neutral-600 max-w-2xl mx-auto">
            Create content that's engineered for maximum engagement and
            professional growth
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Value Props */}
          <div className="space-y-6">
            {[
              {
                title: "Go viral, effortlessly",
                description:
                  "Our AI analyzes thousands of viral LinkedIn posts to understand what works. It's like having an army of content experts working for you 24/7.",
                icon: Sparkles,
                gradient: "from-blue-500 to-indigo-500",
                borderColor: "border-blue-100",
                delay: 0.1,
              },
              {
                title: "Save hours every day",
                description:
                  "Simply input your topic, and our AI handles the rest - from writing and editing to optimizing for engagement. Schedule posts in seconds.",
                icon: Clock,
                gradient: "from-violet-500 to-purple-500",
                borderColor: "border-purple-100",
                delay: 0.2,
              },
              {
                title: "Grow your network faster",
                description:
                  "Our AI-powered content strategy helps you attract the right connections and establish yourself as a thought leader in your industry.",
                icon: Users,
                gradient: "from-emerald-500 to-green-500",
                borderColor: "border-emerald-100",
                delay: 0.3,
              },
              {
                title: "Boost your personal brand",
                description:
                  "Transform your LinkedIn presence with content that showcases your expertise and drives professional opportunities.",
                icon: Trophy,
                gradient: "from-amber-500 to-orange-500",
                borderColor: "border-amber-100",
                delay: 0.4,
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
                  className={`relative overflow-hidden rounded-2xl border ${item.borderColor} bg-white p-6 hover:shadow-lg transition-all duration-500`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.gradient} flex items-center justify-center`}
                      >
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed">
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

          <LinkedInCard />
        </div>
      </div>
    </section>
  );
};
