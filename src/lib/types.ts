export interface User {
  id: number;
  username: string;
  email: string;
}

export interface SocialPlatform {
  id: number;
  userId: number;
  platformName: string;
  isConnected: boolean;
}

export interface SocialContent {
  id: number;
  originalId: string;
  platformId: number;
  userId: number;
  content?: string;
  mediaUrls?: string[];
  authorName?: string;
  authorUsername?: string;
  authorProfileImage?: string;
  platformName: string;
  originalUrl?: string;
  likes: number;
  reposts: number;
  createdAt: Date;
  interactionCount: number;
  remainingTime: number;
  trendingScore?: number;
}

export type InteractionType = "like" | "repost" | "boost";

export interface ContentInteraction {
  id: number;
  userId: number;
  contentId: number;
  type: InteractionType;
  createdAt: Date;
}

export interface PlatformDetails {
  name: string;
  icon: string;
  color: string;
  authUrl: string;
}

export interface ContentAction {
  contentId: number;
  type: InteractionType;
  userId: number;
}
