export const SUCCESS = "Success";
export const TOKEN_KEY = "ribbon-token";
export const DEFAULT_ERROR_MESSAGE = "An error occurred!";

export const TasksSample = [
  { id: 1, task: "Follow us on twitter (X)", rewardPoints: 5000 },
];

export const categoryTabs = [
  {
    name: "Health",
    value: "health",
    bgColor: "bg-[#2F0C02]",
    emoji: "/assets/heart.svg",
  },
  {
    name: "Finance",
    value: "finance",
    bgColor: "bg-[#2E203A]",
    emoji: "/assets/card.svg",
  },
  {
    name: "Ecommerce",
    value: "e-commerce",
    bgColor: "bg-[#332A25]",
    emoji: "/assets/shopping-cart.svg",
  },
];

export const healthMenu = [
  { name: "Questionnaires", value: "questionnaires" },
  { name: "Surveys", value: "surveys" },
  { name: "Tasks", value: "tasks" },
  { name: "Learn", value: "learn" },
];

export const financeMenu = [
  { name: "Borrow", value: "borrow" },
  { name: "Lend", value: "lend" },
  { name: "Money clubs", value: "money-clubs" },
];

export const ecommerceMenu = [
  { name: "Shop", value: "shop" },
  { name: "Drop Ship", value: "drop-ship" },
  { name: "Swap", value: "swap" },
];

/// new
// Timer constants
export const CONTENT_DEFAULT_TIME = 15; // seconds
export const TIMER_UPDATE_INTERVAL = 100; // milliseconds
export const TIMER_DECREMENT_AMOUNT = 0.1; // seconds

// API endpoints
export const API_ENDPOINTS = {
  USERS: "/api/users",
  PLATFORMS: "/api/platforms",
  CONTENTS: "/api/contents",
  INTERACTIONS: "/api/interactions",
  TIMER: (id: number) => `/api/contents/${id}/timer`,
  RESET_TIMER: (id: number) => `/api/contents/${id}/reset`,
  BOOST: (id: number) => `/api/contents/${id}/boost`,
  FETCH_CONTENT: (userId: number | undefined) =>
    userId ? `/api/fetch-content/${userId}` : "/api/fetch-content",
  AUTH: (platform: string) => `/api/auth/${platform}`,
  USER_POINTS: (id: number | undefined) =>
    id ? `/api/users/${id}/points` : "/api/user/points",
  USER_POINTS_HISTORY: (id: number | undefined) =>
    id ? `/api/users/${id}/points/history` : "/api/user/points/history",
};

// WebSocket events
export const WS_EVENTS = {
  NEW_CONTENT: "NEW_CONTENT",
  CONTENT_EXPIRED: "CONTENT_EXPIRED",
  CONTENT_BOOSTED: "CONTENT_BOOSTED",
  CONTENT_INTERACTION: "CONTENT_INTERACTION",
};

// Local storage keys
export const STORAGE_KEYS = {
  USER_ID: "timeline_user_id",
  SELECTED_PLATFORM: "timeline_selected_platform",
};

// No longer using mock users - proper authentication is implemented

// Default platform filter
export const DEFAULT_PLATFORM_FILTER = "all";

// Time display formatting
export const formatTimeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y ago";

  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "mo ago";

  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d ago";

  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h ago";

  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m ago";

  return Math.floor(seconds) + "s ago";
};
