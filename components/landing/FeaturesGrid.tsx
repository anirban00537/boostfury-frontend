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
              gradient: "from-blue-600 via-purple-600 to-indigo-600",
              step: 1
            },
            {
              title: "Quick Viral Post Maker",
              description:
                "Generate viral-worthy content in seconds with our AI-powered generator. Get trending topics and engaging hooks automatically.",
              icon: Zap,
              gradient: "from-purple-600 via-indigo-600 to-blue-600",
              step: 2
            },
            {
              title: "Personal Post Writer",
              description:
                "Create personalized content that matches your brand voice and professional style. Maintain consistency across all your posts.",
              icon: Bot,
              gradient: "from-indigo-600 via-blue-600 to-purple-600",
              step: 3
            },
            {
              title: "Post Scheduler",
              description:
                "Schedule your posts for optimal times to maximize engagement and reach. Never miss the best posting windows for your audience.",
              icon: Calendar,
              gradient: "from-blue-600 via-purple-600 to-indigo-600",
              step: 4
            },
            {
              title: "Queue Shuffle",
              description:
                "Automatically mix up your content queue for a more natural posting pattern. Keep your feed fresh and engaging.",
              icon: Shuffle,
              gradient: "from-purple-600 via-indigo-600 to-blue-600",
              step: 5
            },
            {
              title: "Quick Ai Rewrite Tool",
              description:
                "Rewrite your content with AI to improve its quality and relevance. Get better results in less time.",
              icon: Zap,
              gradient: "from-indigo-600 via-blue-600 to-purple-600",
              step: 6
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group relative"
            >
              {/* Connecting Lines */}
              {index < 5 && (
                <>
                  {/* Horizontal line for same row */}
                  {index % 3 !== 2 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-[2px] bg-gradient-to-r from-blue-400 to-indigo-400">
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rotate-45 border-t-2 border-r-2 border-indigo-400"></div>
                    </div>
                  )}
                  {/* Vertical line for next row */}
                  {index < 3 && (
                    <div className="hidden lg:block absolute left-1/2 -bottom-4 h-8 w-[2px] bg-gradient-to-b from-blue-400 to-indigo-400">
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 border-b-2 border-r-2 border-indigo-400"></div>
                    </div>
                  )}
                </>
              )}

              {/* Card Content */}
              <div className="relative bg-white/50 backdrop-blur-sm rounded-3xl p-8 h-full border border-blue-100/50 hover:shadow-xl transition-all duration-500">
                <div className="flex flex-col h-full">
                  {/* Icon & Title */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 relative">
                      {/* Step number */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white flex items-center justify-center z-10">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 flex items-center justify-center">
                          <span className="text-xs font-medium text-white">{feature.step}</span>
                        </div>
                      </div>
                      {/* Icon Container */}
                      <div className="relative w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm border border-blue-100/50 group-hover:scale-110 transition-transform duration-300">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center`}>
                          <feature.icon className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Title with Gradient Effect */}
                    <h3 className="text-xl font-medium text-neutral-900 pt-2 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-indigo-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {feature.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-neutral-600 leading-relaxed font-light">
                    {feature.description}
                  </p>

                  {/* Hover Indicator */}
                  <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-[1px]">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600" />
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
