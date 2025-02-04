"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  Rocket,
  Target,
  BarChart,
  Shuffle,
  Zap,
} from "lucide-react";
import { getLinkedInAuthUrl } from "@/services/auth";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";

const LoginPage = () => {
  const { handleLinkedInLogin, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle LinkedIn OAuth callback
  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");
    const storedState = sessionStorage.getItem("linkedin_state");
    const loginProcessId = localStorage.getItem("login_process_id");

    // Generate a unique ID for this login attempt
    const currentLoginId = code && state ? `${code}-${state}` : null;

    // If no code/state, or already processed this specific login attempt, don't proceed
    if (
      !currentLoginId ||
      loginProcessId === currentLoginId ||
      !code ||
      !state
    ) {
      return;
    }

    const processLogin = async () => {
      // Store the current login attempt ID immediately
      localStorage.setItem("login_process_id", currentLoginId);

      if (error) {
        toast.error(
          decodeURIComponent(errorDescription || "LinkedIn login failed")
        );
        router.push("/login");
        return;
      }

      // Ensure we have valid state before proceeding
      if (state === storedState && code) {
        try {
          await handleLinkedInLogin(code, state);
          sessionStorage.removeItem("linkedin_state");
          localStorage.removeItem("login_process_id");
        } catch (error) {
          toast.error("Failed to login with LinkedIn");
          console.error("LinkedIn login error:", error);
          router.push("/login");
          localStorage.removeItem("login_process_id"); // Clean up on error too
        }
      } else {
        toast.error("Invalid state parameter");
        router.push("/login");
        localStorage.removeItem("login_process_id");
      }
    };

    processLogin();
  }, []);

  // LinkedIn auth URL mutation
  const linkedInAuthMutation = useMutation(
    async () => {
      return await getLinkedInAuthUrl();
    },
    {
      onSuccess: (response) => {
        if (response.success && response.data.url) {
          sessionStorage.setItem("linkedin_state", response.data.state);
          window.location.href = response.data.url;
        } else {
          toast.error(response.message || "Failed to initiate LinkedIn login");
        }
      },
      onError: (error) => {
        console.error("Failed to get LinkedIn auth URL:", error);
        toast.error("Failed to initiate LinkedIn login");
      },
    }
  );

  const handleLinkedInClick = () => {
    if (!linkedInAuthMutation.isLoading) {
      linkedInAuthMutation.mutate();
    }
  };

  const features = [
    {
      icon: Sparkles,
      title: "Advanced AI Editor",
      description: "Professional editing tools powered by AI",
    },
    {
      icon: Rocket,
      title: "Viral Post Maker",
      description: "Generate viral-worthy content instantly",
    },
    {
      icon: Target,
      title: "Personal Post Writer",
      description: "Create content matching your brand voice",
    },
    {
      icon: BarChart,
      title: "Post Scheduler",
      description: "Schedule posts for optimal engagement",
    },
    {
      icon: Shuffle,
      title: "Queue Shuffle",
      description: "Mix up content for natural posting flow",
    },
    {
      icon: Zap,
      title: "Quick AI Rewrite",
      description: "Enhance content quality instantly",
    },
  ];

  return (
    <div className="min-h-screen w-full flex bg-slate-50">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-20">
        <div className="w-full max-w-[440px] space-y-12">
          {/* Logo & Welcome */}
          <div className="space-y-6">
            <Link href={"/"}>
              <Image
                src="/logo.svg"
                alt="BoostFury Logo"
                width={140}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <div className="space-y-2">
              <h1 className="text-2xl font-medium text-neutral-900">
                Welcome to BoostFury
              </h1>
              <p className="text-neutral-500">
                Sign in with LinkedIn to get started
              </p>
            </div>
          </div>

          {/* Login Button */}
          <div className="space-y-6">
            <button
              onClick={handleLinkedInClick}
              className="w-full group relative flex items-center justify-center gap-3 bg-white text-neutral-700 hover:text-blue-600 rounded-xl p-4 hover:shadow-lg transition-all duration-200 border border-neutral-200/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 via-blue-50/25 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-all duration-500" />
              <svg
                className="w-5 h-5 fill-current text-[#0077B5]"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="font-medium">Continue with LinkedIn</span>
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 text-neutral-500 bg-slate-50">
                  By continuing you agree to our Terms and Privacy Policy
                </span>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-neutral-200/50 bg-white/50 hover:bg-white/80 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-50">
                    <feature.icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="font-medium text-sm text-neutral-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-xs text-neutral-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden lg:block w-1/2 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 relative overflow-hidden">
        {/* Enhanced gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/50 via-transparent to-blue-500/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-blue-700/30" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Radial gradient accent */}
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute -bottom-8 -right-24 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

        {/* Content wrapper with glass effect */}
        <div className="relative h-full flex flex-col items-center justify-center p-20">
          <div className="relative max-w-lg space-y-8 text-center">
            {/* Decorative top line */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

            <h2 className="text-4xl font-medium text-white">
              Supercharge your LinkedIn presence
            </h2>
            <p className="text-lg text-blue-100">
              Automate your content creation and reach more prospects with
              AI-powered tools
            </p>

            {/* Stats with enhanced styling */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative space-y-2">
                  <div className="text-3xl font-semibold text-white">500+</div>
                  <div className="text-sm text-blue-100">
                    Weekly Connections
                  </div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative space-y-2">
                  <div className="text-3xl font-semibold text-white">24/7</div>
                  <div className="text-sm text-blue-100">Active Growth</div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative space-y-2">
                  <div className="text-3xl font-semibold text-white">85%</div>
                  <div className="text-sm text-blue-100">Response Rate</div>
                </div>
              </div>
            </div>

            {/* Decorative bottom line */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
