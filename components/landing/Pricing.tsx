import React from "react";
import { getPackages } from "@/services/subscription.service";
import { PricingClient } from "./PricingClient";

interface PricingProps {
  packages: {
    monthly: Array<{
      id: string;
      name: string;
      description: string;
      price: number;
      variantId: string;
      features: {
        wordGeneration: {
          limit: number;
          description: string;
        };
        features: string[];
      };
    }>;
  };
}

export async function Pricing({ packages }: PricingProps) {
  return <PricingClient packages={packages} />;
}
