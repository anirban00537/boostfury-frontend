export type PlanId = "starter" | "pro";

export interface PricingPlan {
  id: PlanId;
  name: string;
  description: string;
  price: number;
  limits: {
    aiWordsPerMonth: number;
    postsPerMonth: number;
    imageUploads: number;
    linkedInProfiles: number;
    carousels: number;
  };
  features: {
    scheduling: boolean;
    analytics: boolean;
    customBranding: boolean;
    bulkUpload: boolean;
    prioritySupport: boolean;
    aiAssistant: boolean;
    teamCollaboration: boolean;
  };
  featureTexts: string[];
  variants: {
    monthly: string;
    yearly: string;
  };
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for getting started",
    price: 9,
    limits: {
      aiWordsPerMonth: 10000,
      postsPerMonth: 30,
      imageUploads: 5,
      linkedInProfiles: 1,
      carousels: 10,
    },
    features: {
      scheduling: true,
      analytics: false,
      customBranding: false,
      bulkUpload: false,
      prioritySupport: false,
      aiAssistant: true,
      teamCollaboration: false,
    },
    featureTexts: [
      "10,000 AI words per month",
      "30 posts per month",
      "5 image uploads",
      "1 LinkedIn profile",
      "10 carousels",
      "Basic post scheduling",
      "Basic AI assistant",
      "Standard support",
      "Single user",
    ],
    variants: {
      monthly: "525061",
      yearly: "525062",
    },
  },
  {
    id: "pro",
    name: "Pro",
    description: "For power users",
    price: 29,
    limits: {
      aiWordsPerMonth: 50000,
      postsPerMonth: -1, // Unlimited
      imageUploads: -1, // Unlimited
      linkedInProfiles: -1, // Unlimited
      carousels: -1, // Unlimited
    },
    features: {
      scheduling: true,
      analytics: true,
      customBranding: true,
      bulkUpload: true,
      prioritySupport: true,
      aiAssistant: true,
      teamCollaboration: true,
    },
    featureTexts: [
      "50,000 AI words per month",
      "Unlimited posts",
      "Unlimited image uploads",
      "Unlimited LinkedIn profiles",
      "Unlimited carousels",
      "Advanced post scheduling",
      "Advanced analytics",
      "Custom branding",
      "Bulk upload capability",
      "Priority support",
      "Advanced AI assistant",
      "Team collaboration tools",
    ],
    variants: {
      monthly: "585057",
      yearly: "585058",
    },
  },
];
