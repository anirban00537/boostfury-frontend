export const POST_STATUS = {
  DRAFT: 0,
  SCHEDULED: 1,
  PUBLISHED: 2,
  FAILED: 3,
};

export const DAYS_OF_WEEK = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
} as const;
export const LINKEDIN_REWRITE_INSTRUCTIONS = {
  IMPROVE: 1, // Improve the overall quality and engagement
  SHORTER: 2, // Make the content more concise
  LONGER: 3, // Expand the content with more details
  PROFESSIONAL: 4, // Make it more formal and professional
  CASUAL: 5, // Make it more conversational and friendly
  SEO_OPTIMIZE: 6, // Optimize for LinkedIn's algorithm
  STORYTELLING: 7, // Convert into a story format
  PERSUASIVE: 8, // Make it more convincing and action-oriented
  IMPROVE_HOOK: 9, // Improve the opening hook to grab attention
} as const;
export const SUBSCRIPTION_STATUS = {
  ACTIVE: "active",
  EXPIRED: "expired",
  CANCELLED: "cancelled",
  PENDING: "pending",
} as const;

export const PACKAGE_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  DEPRECATED: "deprecated",
} as const;

export const PACKAGE_TYPE = {
  TRIAL: "trial",
  MONTHLY: "monthly",
  YEARLY: "yearly",
  LIFETIME: "lifetime",
} as const;

export const WORD_TOKEN_LOG_TYPE = {
  USAGE: "USAGE",
  RESET: "RESET",
} as const;
