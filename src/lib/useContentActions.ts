import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InteractionType, ContentAction } from "@/lib/types";
import { useGetAuth } from "@/api/auth";
import { apiRequest } from "@/api/query-client";
import { API_ENDPOINTS } from "./values/constants";

export function useContentActions() {
  const queryClient = useQueryClient();
  const { data: authUser } = useGetAuth({ enabled: true });
  const userId = authUser?.id || 1; // Fallback for type safety

  // Create interaction mutation
  const interactionMutation = useMutation({
    mutationFn: async (action: ContentAction) => {
      return apiRequest("POST", API_ENDPOINTS.INTERACTIONS, {
        userId: action.userId,
        contentId: action.contentId,
        type: action.type,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.CONTENTS] });
    },
  });

  // Reset timer mutation (used when extending content time)
  const resetTimerMutation = useMutation({
    mutationFn: async (contentId: number) => {
      return apiRequest("PATCH", API_ENDPOINTS.RESET_TIMER(contentId), {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.CONTENTS] });
    },
  });

  // Like a content
  const likeContent = useCallback(
    async (contentId: number) => {
      await interactionMutation.mutateAsync({
        contentId,
        type: "like",
        userId,
      });

      // Reset the timer when user likes content
      await resetTimerMutation.mutateAsync(contentId);
    },
    [interactionMutation, resetTimerMutation, userId]
  );

  // Repost a content
  const repostContent = useCallback(
    async (contentId: number) => {
      await interactionMutation.mutateAsync({
        contentId,
        type: "repost",
        userId,
      });

      // Reset the timer when user reposts content
      await resetTimerMutation.mutateAsync(contentId);
    },
    [interactionMutation, resetTimerMutation, userId]
  );

  // Boost a content - uses dedicated boost endpoint
  const boostMutation = useMutation({
    mutationFn: async (contentId: number) => {
      return apiRequest("PATCH", API_ENDPOINTS.BOOST(contentId), {
        userId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.CONTENTS] });
    },
  });

  // Boost a content
  const boostContent = useCallback(
    async (contentId: number) => {
      // Use the dedicated boost endpoint that adds 5 seconds and records points
      const result = await boostMutation.mutateAsync(contentId);
      return result;
    },
    [boostMutation, userId]
  );

  // Share a content
  const shareContent = useCallback((contentUrl: string) => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this content",
          url: contentUrl,
        })
        .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      window.open(contentUrl, "_blank");
    }
  }, []);

  return {
    likeContent,
    repostContent,
    boostContent,
    shareContent,
    isPending:
      interactionMutation.isPending ||
      resetTimerMutation.isPending ||
      boostMutation.isPending,
  };
}
