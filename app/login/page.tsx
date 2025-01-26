"use client";
import React, { useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, CheckCircle2, ArrowLeft } from "lucide-react";

const LoginPage = () => {
  const { handleGoogleLogin, isLoading } = useAuth();
  const router = useRouter();

  const features = [
    { text: "AI-powered content generation", icon: Sparkles },
    { text: "Professional carousel creation", icon: CheckCircle2 },
    { text: "Smart scheduling tools", icon: CheckCircle2 },
    { text: "Analytics and insights", icon: CheckCircle2 },
  ];

  const onLoginSuccess = useCallback(
    (credentialResponse: CredentialResponse) => {
      handleGoogleLogin(credentialResponse)
        .then(() => {
          router.push("/studio");
        })
        .catch((error) => {
          console.error("Login failed:", error);
        });
    },
    [handleGoogleLogin, router]
  );

  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-[440px]">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold mb-2 flex items-center gap-2">
              Login{" "}
              <span role="img" aria-label="wave" className="text-2xl">
                ✌️
              </span>
            </h1>
            <p className="text-gray-500 text-sm">
              How do I get started lorem ipsum dolor sit?
            </p>
          </div>

          <div className="space-y-4">
            {/* Google Login Button */}
            <div className="transform hover:scale-[1.02] transition-transform duration-200">
              <GoogleLogin
                onSuccess={onLoginSuccess}
                onError={() => {
                  console.error("Google Login Failed");
                }}
                shape="rectangular"
                width={300}
                theme="filled_blue"
                text="signin_with"
                size="large"
              />
            </div>

            {/* Footer Links */}
            <div className="text-center space-y-4 mt-12">
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                By signing in, you agree to our{" "}
                <Link
                  href="/terms"
                  className="text-blue-600 hover:text-blue-700"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-blue-600 hover:text-blue-700"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
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
