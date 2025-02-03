"use server";

import { getPackages } from "@/services/subscription.service";

export async function getPackagesAction() {
  try {
    const response = await getPackages();
    return response.data.packages;
  } catch (error) {
    console.error("Error fetching packages:", error);
    return {
      monthly: [],
    };
  }
}
