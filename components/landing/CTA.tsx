"use client";

import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export const CTA = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-8 py-16 md:p-16">
          <div className="absolute inset-0 bg-grid-white/10" />

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

          <div className="relative">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-blue-100 font-medium">
                  AI-Powered Content Creation
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Create Viral LinkedIn Posts with One Click
              </h2>

              <div className="space-y-6 mb-8">
                <p className="text-xl text-blue-100">
                  Transform your ideas into engaging content that captivates
                  your professional network. Our AI understands what makes posts
                  go viral on LinkedIn.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    "Generate trending topics instantly",
                    "Craft attention-grabbing hooks",
                    "Optimize for maximum engagement",
                    "Schedule at peak times",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                      <span className="text-white text-lg">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <ShimmerButton
                  className="w-full sm:w-auto h-14 px-8 rounded-2xl text-lg font-medium bg-white text-blue-600"
                  background="linear-gradient(110deg, #ffffff, #f3f4f6)"
                >
                  <Link href="/register" className="flex items-center gap-2">
                    Start Creating for Free
                  </Link>
                </ShimmerButton>

                <div className="flex items-center gap-4 text-blue-100">
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-indigo-600 bg-white/10 backdrop-blur-sm"
                      />
                    ))}
                  </div>
                  <span>Join 10,000+ professionals</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
