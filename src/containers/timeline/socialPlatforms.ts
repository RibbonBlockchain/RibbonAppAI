import { PlatformDetails } from "../../lib/types";

export const platforms: Record<string, PlatformDetails> = {
  twitter: {
    name: "X",
    icon: "ri-twitter-x-line",
    color: "#1DA1F2",
    authUrl: "/api/auth/twitter",
  },
  instagram: {
    name: "Instagram",
    icon: "ri-instagram-line",
    color: "#E1306C",
    authUrl: "/api/auth/instagram",
  },
  facebook: {
    name: "Facebook",
    icon: "ri-facebook-circle-fill",
    color: "#4267B2",
    authUrl: "/api/auth/facebook",
  },
  tiktok: {
    name: "TikTok",
    icon: "ri-tiktok-line",
    color: "#000000",
    authUrl: "/api/auth/tiktok",
  },
  snapchat: {
    name: "Snapchat",
    icon: "ri-snapchat-line",
    color: "#FFFC00",
    authUrl: "/api/auth/snapchat",
  },
  youtube: {
    name: "YouTube",
    icon: "ri-youtube-line",
    color: "#FF0000",
    authUrl: "/api/auth/youtube",
  },
  warpcast: {
    name: "Warpcast",
    icon: "ri-broadcast-line",
    color: "#9C63F2",
    authUrl: "/api/auth/warpcast",
  },
  zora: {
    name: "Zora",
    icon: "ri-nft-line",
    color: "#FDBD39",
    authUrl: "/api/auth/zora",
  },
};

export const getPlatformIcon = (platformName: string): string => {
  return platforms[platformName]?.icon || "ri-question-mark";
};

export const getPlatformColor = (platformName: string): string => {
  return platforms[platformName]?.color || "#777777";
};

export const getPlatformName = (platformName: string): string => {
  return platforms[platformName]?.name || platformName;
};

export const getPlatformAuthUrl = (platformName: string): string => {
  return platforms[platformName]?.authUrl || "";
};

export const isValidPlatform = (platformName: string): boolean => {
  return Object.keys(platforms).includes(platformName);
};
