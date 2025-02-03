export enum PackageType {
  TRIAL = "trial",
  MONTHLY = "monthly",
  YEARLY = "yearly",
  LIFETIME = "lifetime",
}

export enum PackageStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  DEPRECATED = "deprecated",
}

export enum PackageFeatures {
  VIRAL_POST_GENERATION = 1,
  AI_STUDIO = 2,
  POST_IDEA_GENERATOR = 3,
}

export interface BasePackage {
  id: string;
  name: string;
  description: string;
  type: PackageType;
  status: PackageStatus;
  price: number;
  currency: string;
  variantId: string;
  productId: string;
  monthlyWordLimit: number;
  featuresList: string[];
  features: PackageFeatures[];
  trial_duration_days?: number;
  is_trial_package?: boolean;
}

export interface Package extends BasePackage {
  createdAt: string;
  updatedAt: string;
  _count: {
    subscriptions: number;
  };
  activeSubscriptions: number;
}

export type PackageFormData = Omit<BasePackage, "id">;
