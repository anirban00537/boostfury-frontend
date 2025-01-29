"use client";
import React, { useEffect, useRef } from "react";
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
} from "lucide-react";
import { getLinkedInAuthUrl } from "@/services/auth";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";

const LoginPage = () => {
  const { handleLinkedInLogin, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasProcessedLogin = useRef(false);

  // LinkedIn login mutation
  const linkedInLoginMutation = useMutation(
    async ({ code, state }: { code: string; state: string }) => {
      return handleLinkedInLogin(code, state);
    },
    {
      onSuccess: () => {
        sessionStorage.removeItem("linkedin_state");
        hasProcessedLogin.current = false;
      },
      onError: (error) => {
        toast.error("Failed to login with LinkedIn");
        console.error("LinkedIn login error:", error);
        router.push("/login");
        hasProcessedLogin.current = false;
      },
    }
  );

  // Handle LinkedIn OAuth callback
  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");

    // Return early if already processing or no code/state
    if (hasProcessedLogin.current || !code || !state) {
      if (error && !hasProcessedLogin.current) {
        toast.error(
          decodeURIComponent(errorDescription || "LinkedIn login failed")
        );
        router.push("/login");
      }
      return;
    }

    // Verify state from sessionStorage
    const storedState = sessionStorage.getItem("linkedin_state");

    // Process the login only once
    if (!linkedInLoginMutation.isLoading && !hasProcessedLogin.current) {
      hasProcessedLogin.current = true;
      linkedInLoginMutation.mutate({ code, state });
    }
  }, [searchParams, router, linkedInLoginMutation]);

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
    { text: "AI-powered content generation", icon: Sparkles },
    { text: "Professional carousel creation", icon: CheckCircle2 },
    { text: "Smart scheduling tools", icon: CheckCircle2 },
    { text: "Analytics and insights", icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-[440px]">
          {/* Welcome Section */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Welcome to BoostFury
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Supercharge your LinkedIn presence with AI-powered automation
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                Sign in to get started
              </h2>
              <p className="text-gray-500">
                Connect your LinkedIn account to unlock all features
              </p>
            </div>

            {/* LinkedIn Login Button */}
            <button
              onClick={handleLinkedInClick}
              className="w-full h-[50px] flex items-center justify-center gap-3 bg-[#0077B5] text-white rounded-lg hover:bg-[#006399] transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
            >
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Sign in with LinkedIn
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <Rocket className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800 mb-1">
                AI Automation
              </h3>
              <p className="text-sm text-gray-600">Smart content generation</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800 mb-1">
                Lead Generation
              </h3>
              <p className="text-sm text-gray-600">Reach targeted prospects</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <BarChart className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800 mb-1">Analytics</h3>
              <p className="text-sm text-gray-600">Track your growth</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <Sparkles className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800 mb-1">Smart Posts</h3>
              <p className="text-sm text-gray-600">Engaging content</p>
            </div>
          </div>

          {/* Footer Links */}
          <div className="text-center">
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              By signing in, you agree to our{" "}
              <Link
                href="/terms"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden lg:block w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 relative overflow-hidden">
        {/* Animated background patterns */}
        <div className="absolute inset-0 bg-[url('/images/wave-pattern.svg')] opacity-10 animate-slow-spin" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />

        {/* Floating circles */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-sky-400/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-sky-400/20 to-blue-400/20 rounded-full blur-3xl animate-blob animation-delay-2000" />

        <div className="relative h-full flex flex-col items-center justify-center p-16 text-white">
          <div className="max-w-md text-center space-y-12">
            {/* Main Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-6xl font-bold leading-tight bg-gradient-to-r from-white via-blue-100 to-sky-200 bg-clip-text text-transparent">
                  Automate Your LinkedIn
                </h2>
                <div className="text-4xl font-bold text-white">
                  Reach 10x More Prospects
                  <span className="ml-2 animate-bounce inline-block">🚀</span>
                </div>
              </div>

              <p className="text-xl text-blue-100 leading-relaxed">
                Smart scheduling that helps you connect with the right people at
                the right time
              </p>
            </div>

            {/* Viral LinkedIn Stats */}
            <div className="relative mt-12">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-sky-500/20 rounded-2xl blur-xl" />
              <div className="relative space-y-6 bg-white/10 rounded-2xl p-8 backdrop-blur-md border border-white/20">
                <div className="grid grid-cols-3 gap-8">
                  <div className="text-center space-y-1">
                    <div className="text-4xl font-bold bg-gradient-to-r from-white to-sky-200 bg-clip-text text-transparent">
                      500+
                    </div>
                    <div className="text-sm text-blue-100">
                      Connections/Week
                    </div>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="text-4xl font-bold bg-gradient-to-r from-white to-sky-200 bg-clip-text text-transparent">
                      24/7
                    </div>
                    <div className="text-sm text-blue-100">Active Growth</div>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="text-4xl font-bold bg-gradient-to-r from-white to-sky-200 bg-clip-text text-transparent">
                      85%
                    </div>
                    <div className="text-sm text-blue-100">Response Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof Badge */}
          <div className="absolute top-8 right-8">
            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-sm font-medium">
                Trusted by LinkedIn Influencers 🌟
              </span>
            </div>
          </div>

          {/* Floating Action Badge */}
          <div className="absolute bottom-8 left-8 animate-pulse">
            <div className="bg-gradient-to-br from-white/90 to-white/70 rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
              <span className="text-2xl">⚡</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
