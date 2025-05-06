import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetAuth } from "@/api/auth";
import { apiRequest } from "@/api/query-client";
import {
  STORAGE_KEYS,
  DEFAULT_PLATFORM_FILTER,
  API_ENDPOINTS,
} from "@/lib/values/constants";

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

interface SocialMediaContextProps {
  contents: SocialContent[];
  platforms: SocialPlatform[];
  selectedPlatform: string;
  setSelectedPlatform: (platform: string) => void;
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  addInteraction: (contentId: number, type: InteractionType) => Promise<void>;
  refreshContent: () => Promise<boolean>;
  connectPlatform: (platform: string, code: string) => Promise<void>;
  disconnectPlatform: (platformId: number) => Promise<void>;
}

const SocialMediaContext = createContext<SocialMediaContextProps | undefined>(
  undefined
);

interface SocialMediaProviderProps {
  children: ReactNode;
}

export const SocialMediaProvider: React.FC<SocialMediaProviderProps> = ({
  children,
}) => {
  const queryClient = useQueryClient();
  const { data: user } = useGetAuth({ enabled: true });
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");

  // Allow non-authenticated users to view content, use a default user ID (1) for public timeline
  // App has been redesigned to allow non-authenticated users to view but not earn points
  const userId = user?.id || 1; // Using ID 1 for guest/public viewing

  // Save selected platform to local storage when it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SELECTED_PLATFORM, selectedPlatform);
  }, [selectedPlatform]);

  // Set up WebSocket for real-time updates
  useEffect(() => {
    // Only connect to WebSocket if user is authenticated
    if (!user) {
      console.log("Not connecting WebSocket: No authenticated user");
      return;
    }

    console.log(`Setting up WebSocket connection for user ${user.id}`);

    // WebSocket connection variables
    let ws: WebSocket | null = null;
    let reconnectTimer: number | null = null;
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 10;
    let isManualClose = false;

    // Create and manage WebSocket connection
    function connectWebSocket() {
      // Check if maximum reconnection attempts reached
      if (reconnectAttempts >= maxReconnectAttempts) {
        console.error(
          `Maximum reconnect attempts (${maxReconnectAttempts}) reached, giving up.`
        );
        return;
      }

      // Reset manual close flag when attempting a new connection
      isManualClose = false;

      try {
        // Use a specific path to avoid conflicts with Vite's WebSocket
        const wsUrl =
          window.location.protocol === "https:"
            ? `wss://${window.location.host}/api/socket`
            : `ws://${window.location.host}/api/socket`;

        console.log(
          `Attempting WebSocket connection to ${wsUrl} (attempt ${
            reconnectAttempts + 1
          })`
        );

        // Create WebSocket
        ws = new WebSocket(wsUrl);

        // Set a connection timeout
        const connectionTimeout = setTimeout(() => {
          if (ws && ws.readyState !== WebSocket.OPEN) {
            console.warn("WebSocket connection timeout");
            ws.close();
          }
        }, 10000);

        // Handle successful connection
        ws.onopen = () => {
          console.log("WebSocket connection established successfully");
          clearTimeout(connectionTimeout);
          reconnectAttempts = 0;

          if (reconnectTimer) {
            window.clearTimeout(reconnectTimer);
            reconnectTimer = null;
          }

          // Send auth information after connection is established
          if (user && ws && ws.readyState === WebSocket.OPEN) {
            console.log(`Sending auth info for user ${user.id}`);
            ws.send(
              JSON.stringify({
                type: "AUTH",
                userId: user.id,
                username: user.email,
              })
            );
          }

          // Set up a heartbeat
          const heartbeatInterval = window.setInterval(() => {
            if (ws && ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ type: "PING", timestamp: Date.now() }));
            } else {
              clearInterval(heartbeatInterval);
            }
          }, 30000);

          // Clean up heartbeat when connection closes
          if (ws) {
            ws.addEventListener("close", () => {
              clearInterval(heartbeatInterval);
            });
          }
        };

        // Handle messages
        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);

            switch (data.type) {
              case "NEW_CONTENT":
              case "CONTENT_EXPIRED":
              case "CONTENT_BOOSTED":
              case "CONTENT_INTERACTION":
                queryClient.invalidateQueries({
                  queryKey: [API_ENDPOINTS.CONTENTS],
                });
                break;
              case "ACK":
                // Acknowledgment from server, no action needed
                break;
              default:
                console.log("Received WebSocket event:", data);
            }
          } catch (error) {
            console.error("Error parsing WebSocket message:", error);
          }
        };

        // Handle errors
        ws.onerror = (error) => {
          console.error("WebSocket error:", error);
          clearTimeout(connectionTimeout);
        };

        // Handle connection close
        ws.onclose = (event) => {
          clearTimeout(connectionTimeout);
          console.log(
            `WebSocket connection closed: ${event.code} ${event.reason}`
          );

          // Don't reconnect if this was a manual close or the component is unmounting
          if (!isManualClose) {
            // Exponential backoff for reconnection
            const delay = Math.min(
              1000 * Math.pow(2, reconnectAttempts),
              30000
            );
            reconnectAttempts++;

            console.log(
              `Attempting to reconnect WebSocket in ${
                delay / 1000
              } seconds... (attempt ${reconnectAttempts})`
            );
            reconnectTimer = window.setTimeout(connectWebSocket, delay);
          }
        };
      } catch (error) {
        console.error("Error creating WebSocket connection:", error);
        // Try to reconnect with exponential backoff
        const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000);
        reconnectAttempts++;
        reconnectTimer = window.setTimeout(connectWebSocket, delay);
      }
    }

    // Initial connection
    connectWebSocket();

    // Clean up the WebSocket connection and any pending reconnect timers
    return () => {
      if (reconnectTimer) {
        window.clearTimeout(reconnectTimer);
      }
      if (ws) {
        isManualClose = true;
        ws.close(1000, "Component unmounting");
      }
    };
  }, [queryClient, user]);

  // Fetch connected platforms
  const {
    data: platforms = [],
    isLoading: isPlatformsLoading,
    isError: isPlatformsError,
  } = useQuery({
    queryKey: [API_ENDPOINTS.PLATFORMS, userId],
    queryFn: async () => {
      const response = await fetch(
        `${API_ENDPOINTS.PLATFORMS}?userId=${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch platforms");
      }
      return response.json();
    },
  });

  // Fetch content based on selected platform
  const {
    data: contents = [],
    isLoading: isContentsLoading,
    isError: isContentsError,
  } = useQuery({
    queryKey: [API_ENDPOINTS.CONTENTS, userId, selectedPlatform],
    queryFn: async () => {
      const platformParam =
        selectedPlatform !== DEFAULT_PLATFORM_FILTER
          ? `&platform=${selectedPlatform}`
          : "";

      const response = await fetch(
        `${API_ENDPOINTS.CONTENTS}?userId=${userId}${platformParam}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch content");
      }
      return response.json();
    },
  });

  // Add interaction mutation
  const addInteractionMutation = useMutation({
    mutationFn: async ({
      contentId,
      type,
    }: {
      contentId: number;
      type: InteractionType;
    }) => {
      return apiRequest("POST", API_ENDPOINTS.INTERACTIONS, {
        userId,
        contentId,
        type,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.CONTENTS] });
    },
  });

  // Refresh content mutation with error handling
  const refreshContentMutation = useMutation({
    mutationFn: async () => {
      console.log(`Fetching content for user ${userId}`);
      try {
        return await apiRequest(
          "POST",
          API_ENDPOINTS.FETCH_CONTENT(userId),
          {}
        );
      } catch (error) {
        console.error("Error in refreshContent mutation:", error);
        // Return a default response to avoid crashing
        return new Response(JSON.stringify([]), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
    },
    onSuccess: () => {
      console.log("Content refresh successful, invalidating queries");
      queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.CONTENTS] });
    },
    onError: (error) => {
      console.error("Error refreshing content:", error);
    },
  });

  // Connect platform mutation
  const connectPlatformMutation = useMutation({
    mutationFn: async ({
      platform,
      code,
    }: {
      platform: string;
      code: string;
    }) => {
      return apiRequest("POST", API_ENDPOINTS.AUTH(platform), {
        userId,
        code,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.PLATFORMS] });
    },
  });

  // Disconnect platform mutation
  const disconnectPlatformMutation = useMutation({
    mutationFn: async (platformId: number) => {
      return apiRequest(
        "DELETE",
        `${API_ENDPOINTS.PLATFORMS}/${platformId}/disconnect`,
        {}
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.PLATFORMS] });
    },
  });

  // Public methods
  const addInteraction = async (contentId: number, type: InteractionType) => {
    // Only allow interactions if user is authenticated
    if (!user) {
      console.log("Interaction not allowed: User not authenticated");
      return;
    }
    await addInteractionMutation.mutateAsync({ contentId, type });
  };

  const refreshContent = async () => {
    try {
      console.log("Starting content refresh...");
      await refreshContentMutation.mutateAsync();
      console.log("Content refresh completed");
      return true;
    } catch (error) {
      console.error("Failed to refresh content:", error);
      return false;
    }
  };

  const connectPlatform = async (platform: string, code: string) => {
    // Only allow platform connection if user is authenticated
    if (!user) {
      console.log("Platform connection not allowed: User not authenticated");
      return;
    }
    await connectPlatformMutation.mutateAsync({ platform, code });
  };

  const disconnectPlatform = async (platformId: number) => {
    // Only allow platform disconnection if user is authenticated
    if (!user) {
      console.log("Platform disconnection not allowed: User not authenticated");
      return;
    }
    await disconnectPlatformMutation.mutateAsync(platformId);
  };

  const isLoading = isPlatformsLoading || isContentsLoading;
  const isError = isPlatformsError || isContentsError;

  const value = {
    contents,
    platforms,
    selectedPlatform,
    setSelectedPlatform,
    user: user,
    isLoading,
    isError,
    addInteraction,
    refreshContent,
    connectPlatform,
    disconnectPlatform,
  };

  return (
    <SocialMediaContext.Provider value={value}>
      {children}
    </SocialMediaContext.Provider>
  );
};

export const useSocialMedia = () => {
  const context = useContext(SocialMediaContext);

  if (context === undefined) {
    throw new Error("useSocialMedia must be used within a SocialMediaProvider");
  }

  return context;
};
