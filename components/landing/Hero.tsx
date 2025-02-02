"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Bot, Sparkles } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";

const floatKeyframes = `
  @keyframes float {
    0% {
      transform: translateY(0) scale(1);
      opacity: 0.1;
    }
    50% {
      transform: translateY(-20px) scale(1.5);
      opacity: 0.3;
    }
    100% {
      transform: translateY(0) scale(1);
      opacity: 0.1;
    }
  }
`;

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-16 px-4 overflow-hidden">
      <style>{floatKeyframes}</style>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-white/70 to-indigo-50/90" />

      {/* Radial Gradients */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-100/60 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-100/60 rounded-full blur-3xl opacity-30" />

      {/* Animated Dots */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-blue-600/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${3 + i}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            10X Your LinkedIn Growth
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 tracking-tight mb-8">
            Craft{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Viral LinkedIn Posts
            </span>{" "}
            in Seconds
          </h1>

          <p className="text-xl text-neutral-600 mb-12 max-w-2xl mx-auto">
            Stop spending hours on content creation. Our AI writes engaging
            posts that attract high-value connections, generate leads, and build
            your personal brand.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ShimmerButton
              className="w-full sm:w-auto h-14 px-8 rounded-2xl text-lg font-medium"
              background="linear-gradient(110deg, #2563eb, #4f46e5)"
            >
              <Link href="/dashboard" className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                Start Creating for Free
              </Link>
            </ShimmerButton>
          </div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 relative"
        >
          <HeroVideoDialog
            videoSrc="https://www.youtube.com/embed/your-video-id"
            thumbnailSrc="/demo.png"
            thumbnailAlt="BoostFury AI Demo"
            animationStyle="from-bottom"
            className="w-full max-w-5xl mx-auto"
          />
        </motion.div>
      </div>
    </section>
  );
};
