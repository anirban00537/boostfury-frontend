"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Bot, Sparkles, ArrowRight } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { LinkedInCard } from "./LinkedInCard";

const floatKeyframes = `
  @keyframes float {
    0% {
      transform: translateY(0) rotate(0);
      opacity: 0.3;
    }
    50% {
      transform: translateY(-20px) rotate(5deg);
      opacity: 0.6;
    }
    100% {
      transform: translateY(0) rotate(0);
      opacity: 0.3;
    }
  }
`;

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden">
      <style>{floatKeyframes}</style>

      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/50 to-indigo-50/50" />

      {/* Radial Gradients */}
      <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-blue-100/30 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-100/30 rounded-full blur-3xl opacity-30 animate-pulse" />

      {/* Animated Elements */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: i % 2 === 0 ? "#3b82f6" : "#6366f1",
              animation: `float ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center lg:text-left lg:max-w-2xl order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 text-sm font-medium mb-8 group hover:shadow-md transition-shadow duration-300"
            >
              <Sparkles className="w-4 h-4" />
              <span>10X Your LinkedIn Growth</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 tracking-tight mb-8 leading-[1.1]"
            >
              Create{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 animate-gradient">
                Viral LinkedIn Posts
              </span>{" "}
              and grow Audience
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-xl text-neutral-600 mb-12 leading-relaxed"
            >
              Stop spending hours on content creation. Our AI writes engaging
              posts that attract high-value connections, generate leads, and
              build your personal brand.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex items-center gap-4 justify-center lg:justify-start"
            >
              <Link href="/dashboard">
                <ShimmerButton
                  className="h-14 px-8 rounded-2xl text-lg font-medium shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-shadow duration-300"
                  background="linear-gradient(110deg, #2563eb, #4f46e5, #2563eb)"
                >
                  <div className="flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    Start Creating for Free
                  </div>
                </ShimmerButton>
              </Link>
            </motion.div>
          </motion.div>

          {/* LinkedIn Card Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="order-1 lg:order-2"
          >
            <LinkedInCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
