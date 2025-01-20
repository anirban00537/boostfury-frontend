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
    <div className="min-h-screen w-full flex">
      {/* Left Side - Design/Branding Section */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-white">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        <div className="relative w-full flex flex-col items-center justify-center p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-md text-center"
          >
            <div
              className="relative mb-8 mx-auto w-20 h-20 cursor-pointer group"
              onClick={() => router.push("/")}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/20 to-primary/0 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative size-20 rounded-xl bg-primary/5 flex items-center justify-center">
                <Image
                  src="/single-logo.svg"
                  height={48}
                  width={48}
                  alt="BoostFury.com"
                  className="transition-transform duration-200 group-hover:scale-105"
                />
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-6 leading-tight text-gray-900">
              Create Professional LinkedIn Content
            </h1>
            <p className="text-lg text-gray-600 mb-12">
              Transform your LinkedIn presence with AI-powered content creation
              tools
            </p>

            <div className="space-y-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 * (index + 1), duration: 0.5 }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 
                           bg-white hover:bg-gray-50/80 transition-colors duration-200"
                >
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/20 to-primary/0 rounded-lg blur-sm" />
                    <div className="relative size-8 rounded-lg bg-primary/5 flex items-center justify-center">
                      <feature.icon className="size-4 text-primary" />
                    </div>
                  </div>
                  <span className="text-gray-700 font-medium">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50/50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8 p-8 sm:p-10"
        >
          {/* Back to Home Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors group mb-8"
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-gray-200/20 to-gray-200/0 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative size-8 rounded-lg bg-white flex items-center justify-center border border-gray-200">
                <ArrowLeft className="size-4" />
              </div>
            </div>
            Back to Home
          </Link>

          <div className="text-center">
            <div className="lg:hidden mb-8">
              <div className="relative w-16 h-16 mx-auto cursor-pointer group">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/20 to-primary/0 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative size-16 rounded-xl bg-primary/5 flex items-center justify-center">
                  <Image
                    src="/logo.svg"
                    height={40}
                    width={40}
                    alt="BoostFury.com"
                    className="transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Welcome Back
            </h2>
            <p className="text-gray-600">
              Sign in to continue to BoostFury.com
            </p>
          </div>

          {/* Login Form Section */}
          <div className="mt-12 space-y-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-full"
            >
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-50/50 text-gray-500">
                    Continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
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
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          <div className="text-center space-y-4 mt-12">
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              By signing in, you agree to our{" "}
              <Link
                href="/terms"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
