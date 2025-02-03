import React from "react";
import { getPackages } from "@/services/subscription.service";
import { PricingClient } from "./PricingClient";



export async function Pricing() {
  const response = await getPackages();
  const packages = response.data.packages;

  return <PricingClient packages={packages} />;
}
