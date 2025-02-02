"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, AlertCircle } from "lucide-react";
import Image from "next/image";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { useAuth } from "@/hooks/useAuth";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { handleAdminLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await handleAdminLogin(email, password);
    } catch (err: any) {
      setError(err?.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-xl border border-neutral-200/40 overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-8 pb-6">
            <div className="flex justify-center mb-6">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={150}
                height={40}
                priority
              />
            </div>
            <h1 className="text-2xl font-bold text-center text-neutral-900 mb-2">
              Admin Login
            </h1>
            <p className="text-neutral-600 text-center">
              Enter your credentials to access the admin panel
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 pb-8">
            <div className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-colors text-sm"
                    placeholder="admin@example.com"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-colors text-sm"
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-xl">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <ShimmerButton
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl font-medium text-white"
                background="linear-gradient(110deg, #2563eb, #4f46e5)"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </ShimmerButton>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
