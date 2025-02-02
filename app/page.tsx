"use client";
import React from "react";
import { motion } from "framer-motion";
import { GradientButton } from "@/components/ui/gradient-button";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 bg-grid-neutral-100/20 [mask-image:radial-gradient(white,transparent)] pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 h-[80px] bg-white/70 backdrop-blur-xl border-b border-blue-100/50">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
            <Image
              src="/logo.svg"
              alt="Logo"
              width={180}
              height={80}
              priority
              className="relative"
            />
          </Link>

          {/* Right Navigation */}
          <div className="flex items-center gap-4">
            <Link href="/login">
              <GradientButton
                variant="outline"
                size="sm"
                className="h-10 px-5 rounded-xl text-sm font-medium whitespace-nowrap bg-white hover:bg-blue-50/50 border border-blue-100/50 shadow-sm hover:shadow transition-all duration-300"
              >
                Sign In
              </GradientButton>
            </Link>
            <Link href="/register">
              <GradientButton
                variant="primary"
                size="sm"
                className="h-10 px-5 rounded-xl text-sm font-medium whitespace-nowrap shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                Get Started
              </GradientButton>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-[80px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16 text-center lg:pt-28">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-10"
          >
            <span className="inline-flex items-center gap-3 px-6 py-2.5 rounded-xl bg-blue-50/80 border border-blue-100/50 text-blue-600 text-sm font-medium shadow-sm">
              <span className="flex items-center justify-center size-5 rounded-lg bg-blue-500/10">
                <span className="size-2 rounded-full bg-blue-500 animate-pulse"></span>
              </span>
              <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent font-semibold tracking-wide">
                AI-Powered LinkedIn Growth
              </span>
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <h1 className="relative mx-auto max-w-4xl font-bold tracking-tight text-4xl lg:text-6xl">
              <span className="inline-block mb-4 text-neutral-800">
                Build Your Personal Brand on
              </span>{" "}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10 bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                  LinkedIn
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-blue-100/50 -skew-x-6" />
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-10 max-w-2xl text-lg text-neutral-600/90 leading-relaxed"
          >
            Generate engaging LinkedIn posts with AI. Build your audience,
            showcase your expertise, and grow your professional network.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/dashboard" className="w-full sm:w-auto">
              <GradientButton
                variant="primary"
                size="lg"
                className="w-full sm:w-auto h-12 px-8 rounded-xl text-base font-semibold whitespace-nowrap shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                <span className="text-white">Start Creating Posts</span>
                <span className="ml-2 text-lg">→</span>
              </GradientButton>
            </Link>
            <span className="text-neutral-400 font-medium">or</span>
            <Link href="/pricing" className="w-full sm:w-auto">
              <GradientButton
                variant="outline"
                size="lg"
                className="w-full sm:w-auto h-12 px-8 rounded-xl text-base font-semibold whitespace-nowrap bg-white hover:bg-blue-50/50 border border-blue-100/50 shadow-md hover:shadow-lg transition-all duration-300"
              >
                View Pricing
              </GradientButton>
            </Link>
          </motion.div>

          {/* Stats or Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 flex flex-wrap justify-center gap-8 text-center"
          >
            {[
              { number: "10,000+", label: "Posts Generated" },
              { number: "5,000+", label: "Happy Users" },
              { number: "98%", label: "Satisfaction Rate" },
            ].map((stat, index) => (
              <div key={index} className="group relative">
                <div className="relative bg-white px-8 py-4 rounded-xl border border-blue-100/50 shadow-sm hover:shadow transition-all duration-300">
                  <span className="text-sm text-neutral-600">
                    <span className="block text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent mb-1">
                      {stat.number}
                    </span>
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-24 max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 place-items-center">
              {[
                {
                  title: "Advanced AI Editor",
                  description:
                    "Professional editing tools powered by AI to perfect your LinkedIn content with ease.",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  ),
                  gradient: "from-blue-500 to-blue-600",
                },
                {
                  title: "Quick Viral Post Maker",
                  description:
                    "Generate viral-worthy content in seconds with our AI-powered viral post generator.",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  ),
                  gradient: "from-indigo-500 to-blue-600",
                },
                {
                  title: "Personal Post Writer",
                  description:
                    "Create personalized content that matches your brand voice and professional style.",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  ),
                  gradient: "from-blue-600 to-indigo-600",
                },
                {
                  title: "Post Scheduler",
                  description:
                    "Schedule your posts for optimal times to maximize engagement and reach.",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  ),
                  gradient: "from-indigo-600 to-blue-500",
                },
                {
                  title: "Queue Shuffle",
                  description:
                    "Automatically mix up your content queue for a more natural posting pattern.",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  ),
                  gradient: "from-blue-500 to-indigo-500",
                },
              ].map((feature, index) => (
                <div key={index} className="group relative w-full max-w-sm">
                  <div
                    className={`absolute -inset-px bg-gradient-to-r ${feature.gradient} rounded-xl opacity-0 group-hover:opacity-100 blur transition-all duration-500`}
                  />
                  <div className="relative bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-blue-100/50">
                    <div className="relative">
                      {/* Icon Container */}
                      <div className="relative mb-6">
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-10 rounded-xl blur-lg group-hover:opacity-20 transition-all duration-500`}
                        />
                        <div className="relative size-14 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50/50 flex items-center justify-center">
                          <svg
                            className={`size-7 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            {feature.icon}
                          </svg>
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-lg font-semibold text-neutral-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-neutral-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Page;
