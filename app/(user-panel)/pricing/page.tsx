"use client";
import React from "react";
import Pricing from "@/components/subscription/Pricing.comp";

const PricingPage = () => {
  return (
    <div className="min-h-screen flex flex-co">
      <main className="flex-grow container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Pricing />
        </div>
      </main>
    </div>
  );
};

export default PricingPage;
