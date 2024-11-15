import { POST_STATUS } from "@/lib/core-constants";

// Base Post Types
export interface Post {
  id: number;
  content: string;
  visibility: string;
  postType: PostContentType;
  imageUrls: string[];
  videoUrl: string;
  documentUrl: string;
  hashtags: string[];
  scheduledTime: string | null;
  status: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  publishedId: string | null;
  linkedInApiResponse: any | null;
  mentions: string[];
  fileUrl: string | null;
  publishingError: string | null;
  carouselTitle: string | null;
  videoTitle: string | null;
  publishingErrorCode: string | null;
  userId: number;
  workspaceId: number;
  linkedInProfileId: number;
  statusLabel: string;
  linkedInProfile: LinkedInProfile;
  user: PostUser;
  postLogs: PostLog[];
  workspace: Workspace;
}

export interface PostGroup<T extends Post = Post> {
  date?: string;
  posts: T[];
}

// Post Status Types
export type PostType = typeof POST_STATUS[keyof typeof POST_STATUS];

export enum PostTypeEnum {
  SCHEDULED = "scheduled",
  DRAFT = "draft",
  PUBLISHED = "published",
  FAILED = "failed",
}

export type PostTabId = "scheduled" | "draft" | "published" | "failed";

// UI Configuration Types
export interface PostSectionConfig {
  id: PostTabId;
  status: PostType;
  title: string;
  icon: React.ReactNode;
  count?: number;
  badgeText?: string;
  emptyStateMessage?: string;
}

// API Request Types
export type GetPostsType = {
  page: number;
  pageSize: number;
  status: PostType;
  workspace_id: number;
};

// Draft Creation Types
export type PostContentType = "text" | "image" | "video" | "document";

export interface CreateDraftParams {
  content: string;
  postType?: PostContentType;
  workspaceId?: number;
  linkedInProfileId?: number | null;
  imageUrls?: string[] | null;
  videoUrl?: string | null;
  documentUrl?: string | null;
  hashtags?: string[] | null;
  mentions?: string[] | null;
}

export interface CreateDraftPostType extends Required<Omit<CreateDraftParams, 'postType'>> {
  postType: PostContentType;
  carouselTitle?: string;
  videoTitle?: string;
  id?: string;
}

// API Response Types
export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface PostsResponse {
  success: boolean;
  message: string;
  data: {
    posts: Post[];
    pagination: PaginationState;
  };
}

// Define a simplified LinkedInProfile for UI purposes
export interface LinkedInProfileUI {
  id: number;
  name: string;
  avatarUrl: string;
  type: 'linkedin';
  status: 'connected' | 'disconnected';
}

// Full LinkedIn Profile for API/backend interactions
export interface LinkedInProfile extends LinkedInProfileUI {
  email: string;
  profileId: string;
  accessToken: string;
  clientId: string;
  creatorId: string;
  tokenExpiringAt: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PostUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  user_name: string;
  photo: string | null;
}

export interface PostLog {
  id: number;
  linkedInPostId?: number;
  status: string;
  message: string;
  timestamp: string;
  createdAt: string;
  updatedAt: string;
}

export interface Workspace {
  id: number;
  name: string;
  description: string | null;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export interface SchedulePostType {
  scheduledTime: string;
  timezone: string;
}