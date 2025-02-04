"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wand2, Zap, Bot, Calendar, Shuffle } from "lucide-react";

export const FeaturesGrid = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-slate-50/50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Advanced AI Editor",
              description:
                "Professional editing tools powered by AI to perfect your LinkedIn content with ease. Create engaging posts that resonate with your audience.",
              icon: Wand2,
              color: "text-blue-600",
            },
            {
              title: "Quick Viral Post Maker",
              description:
                "Generate viral-worthy content in seconds with our AI-powered generator. Get trending topics and engaging hooks automatically.",
              icon: Zap,
              color: "text-indigo-600",
            },
            {
              title: "Personal Post Writer",
              description:
                "Create personalized content that matches your brand voice and professional style. Maintain consistency across all your posts.",
              icon: Bot,
              color: "text-violet-600",
            },
            {
              title: "Post Scheduler",
              description:
                "Schedule your posts for optimal times to maximize engagement and reach. Never miss the best posting windows for your audience.",
              icon: Calendar,
              color: "text-blue-600",
            },
            {
              title: "Queue Shuffle",
              description:
                "Automatically mix up your content queue for a more natural posting pattern. Keep your feed fresh and engaging.",
              icon: Shuffle,
              color: "text-indigo-600",
            },
            {
              title: "Quick Ai Rewrite Tool",
              description:
                "Rewrite your content with AI to improve its quality and relevance. Get better results in less time.",
              icon: Zap,
              color: "text-blue-600",
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group relative"
            >
              {/* Fancy Border Gradient */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700" />

              {/* Card Content */}
              <div className="relative bg-white rounded-3xl p-8 h-full border border-neutral-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-500">
                <div className="flex flex-col h-full">
                  {/* Icon & Title */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 relative">
                      {/* Icon Background Glow */}
                      <div className="absolute -inset-1.5 bg-gradient-to-br from-neutral-100 to-neutral-50 rounded-2xl blur-sm" />
                      {/* Icon Container */}
                      <div className="relative w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-neutral-200/60">
                        <feature.icon className={`w-6 h-6 ${feature.color}`} />
                      </div>
                    </div>

                    {/* Title with Hover Effect */}
                    <h3 className="text-xl font-semibold text-neutral-900 pt-2 group-hover:text-blue-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover Indicator */}
                  <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
