"use client";
import React, { useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, CheckCircle2 } from 'lucide-react';

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
          router.push("/");
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
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-primary via-primary/90 to-primary/80">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-black/20"></div>
        <div className="relative w-full flex flex-col items-center justify-center p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-md text-center"
          >
            <div className="relative mb-8 mx-auto w-20 h-20">
              <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse"></div>
              <Image
                src="/logo-white.svg"
                height={80}
                width={80}
                alt="BoostFury.com"
                className="relative"
              />
            </div>
            
            <h1 className="text-4xl font-bold mb-6 leading-tight">
              Create Professional LinkedIn Content
            </h1>
            <p className="text-lg text-white/90 mb-12">
              Transform your LinkedIn presence with AI-powered content creation tools
            </p>
            
            {/* Enhanced Feature List */}
            <div className="space-y-6 text-left">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 * (index + 1), duration: 0.5 }}
                  className="flex items-center gap-4 bg-white/10 rounded-xl p-4 backdrop-blur-sm"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-white to-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8 p-8 sm:p-10"
        >
          <div className="text-center">
            <div className="lg:hidden mb-8">
              <Link href="/" className="flex justify-center">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse"></div>
                  <Image
                    src="/logo.svg"
                    height={64}
                    width={64}
                    alt="BoostFury.com"
                    className="relative"
                  />
                </div>
              </Link>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
              Welcome Back
            </h2>
            <p className="text-gray-600">
              Sign in to continue to BoostFury.com
            </p>
          </div>

          {/* Enhanced Login Form Section */}
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
                  <span className="px-4 bg-gradient-to-br from-white to-gray-50 text-gray-500">
                    Continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <div className="transform hover:scale-105 transition-transform duration-200">
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

          {/* Enhanced Footer Links */}
          <div className="text-center space-y-4 mt-12">
            <Link 
              href="/" 
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              Back to Home
            </Link>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              By signing in, you agree to our{' '}
              <Link href="/terms" className="text-primary hover:text-primary/80 underline decoration-primary/20 hover:decoration-primary/40">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-primary hover:text-primary/80 underline decoration-primary/20 hover:decoration-primary/40">
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
