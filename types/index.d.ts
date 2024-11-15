export interface Purchase {
  userId: string;
  productId: string;
  checkoutUrl: string;
  status: string;
  createdAt: string;
}
export interface BackgroundColors {
  color1: string; // Background Color
  color2: string; // Text Color
  color3: string; // Tint Color
  color4: string; // Accent Color
}
export interface WordUsage {
  usage: {
    used: number;
    remaining: number;
    total: number;
    isActive: boolean;
    expirationDate: string | null;
  };
  percentage: {
    used: number;
    remaining: number;
  };
}
export interface Subscription {
  userId: string;
  orderId: string;
  status: string;
  createdAt: string;
}

export interface Slide {
  title: string;
  tagline?: string;
  description: string;
  imageUrl?: string | null;
  backgroundImage?: string | null;
  type: "intro" | "slide" | "outro";
  showImage: boolean;
  showTagline: boolean;
  showTitle: boolean;
  showDescription: boolean;
}

export interface IntroSlide {
  tagline: string;
  title: string;
  paragraph: string;
  imageUrl: string | null;
}

export interface TextSettings {
  alignment: "left" | "center" | "right";
  fontSize: number;
  fontStyle: "normal" | "italic";
  fontWeight: "normal" | "bold" | number;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: {
    [key: string]: any;
  };
}

export interface ApiError {
  response?: {
    data?: {
      statusCode?: number;
      message?: string | string[];
      error?: string;
    };
  };
  message?: string;
}

export interface LayoutSettings {
  height: number;
  width: number;
  pattern: number;
  backgroundOpacity: number;
  gradient: boolean;
}

export interface CarouselState {
  name: string;
  slides: Slide[];
  background: BackgroundColors;
  titleTextSettings: TextSettings;
  descriptionTextSettings: TextSettings;
  taglineTextSettings: TextSettings;
  layout: LayoutSettings;
  sharedSelectedElement: {
    id: number;
    opacity: number;
  };
  fontFamily: string;
  createdAt?: string;
  updatedAt?: string;
  globalBackground?: string | null;
}

export interface FirestoreCarouselState extends CarouselState {
  userId: string;
}

export interface ResponseData {
  data: any;
  message: string;
  success: boolean;
}

export interface UserInfo {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  user_name: string;
  unique_code: string;
  phone: string | null;
  photo: string | null;
  country: string | null;
  birth_date: string | null;
  role: number;
  status: number;
  is_subscribed: number;
  email_verified: number;
  phone_verified: number;
  gender: number;
  createdAt: string;
  updatedAt: string;
  login_provider: string;
}

export interface Workspace {
  createdAt: string;
  description: string | null;
  id: string;
  isDefault: boolean;
  name: string;
  updatedAt: string;
}

export interface LinkedInProfile {
  id: number;
  name: string;
  avatarUrl: string;
  type: "linkedin";
  status: "connected" | "disconnected";
}

export interface SubscriptionLimits {
  aiWordsPerMonth: number;
  postsPerMonth: number;
  imageUploads: number;
  workspaces: number;
  linkedInProfiles: number;
  carousels: number;
}

export interface SubscriptionDetails {
  status: "active" | "inactive" | "cancelled";
  productName: string;
  variantName: string;
}

export interface SubscriptionState {
  isActive: boolean;
  subscription: {
    id: string;
    status: string;
    isTrial: boolean;
    startDate: string;
    endDate: string;
    package: {
      name: string;
      type: string;
    };
    features: {
      aiWriting: boolean;
      hasScheduling: boolean;
    };
  } | null;
  usage: {
    words: {
      used: number;
      limit: number;
      nextReset: string;
    };
    linkedin: {
      accountsUsed: number;
      accountsLimit: number;
      postsUsed: number;
      postsLimit: number;
      nextReset: string;
    };
    carousels: {
      used: number;
      limit: number;
      nextReset: string;
    };
  };
}

export interface UserState {
  userinfo: UserInfo | null;
  loggedin: boolean;
  loading: boolean;
  carouselDownloading: boolean;
  currentWorkspace: any;
  linkedinProfiles: LinkedInProfileUI[];
  subscription: SubscriptionState;
}

export interface GenerateLinkedInPostsDTO {
  prompt: string;
  language?: string;
  tone?: string;
  writingStyle?: string;
}
