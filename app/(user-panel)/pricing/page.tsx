"use client";
import React from "react";
import Pricing from "@/components/subscription/Pricing.comp";

const PricingPage = () => {
  return (
    <div className="min-h-screen flex flex-co">
      <main className="flex-grow container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Simple, transparent pricing
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              No hidden fees. No surprises. Choose the plan that works best for
              you.
            </p>
          </div>

          <Pricing />
        </div>
      </main>
    </div>
  );
};

export default PricingPage;
