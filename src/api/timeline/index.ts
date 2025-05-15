import { useMutation, useQuery } from "@tanstack/react-query";
import { onError } from "../api-client";
import {
  EmbedItem,
  TAddTokenAddress,
  TCreateEmbedBody,
  TCreateTimelineToken,
} from "./types";
import {
  addTokenAddress,
  buyRate,
  buyTimelineToken,
  buyTimelineTokenDex,
  commentEmbed,
  createEmbed,
  createTimelineToken,
  deleteEmbed,
  featuredEmbed,
  getCommentEmbeds,
  getEmbeds,
  getFeaturedEmbeds,
  getLikedEmbeds,
  getMyEmbeds,
  likeEmbed,
  sellRate,
  sellTimelineToken,
  sellTimelineTokenDex,
} from "./req";

export const useCreateEmbed = () => {
  return useMutation({
    onError,
    mutationFn: ({ embedItems }: { embedItems: EmbedItem[] }) =>
      createEmbed({ embedItems }),
  });
};

export const useGetEmbeds = () => {
  return useQuery({
    queryKey: ["get-embeds"],
    queryFn: () => getEmbeds(),
  });
};

export const useGetMyEmbeds = () => {
  return useQuery({
    queryKey: ["get-my-embeds"],
    queryFn: () => getMyEmbeds(),
  });
};

export const useDeleteEmbed = () => {
  return useMutation({
    onError,
    mutationFn: (body: { embedId: string }) => deleteEmbed(body),
  });
};

export const useFeaturedEmbed = () => {
  return useMutation({
    onError,
    mutationFn: ({ embedId }: { embedId: string }) =>
      featuredEmbed({ embedId }),
  });
};

export const useCommentEmbed = () => {
  return useMutation({
    onError,
    mutationFn: ({ embedId, comment }: { embedId: string; comment: string }) =>
      commentEmbed({ embedId, comment }),
  });
};

export const useLikeEmbed = () => {
  return useMutation({
    onError,
    mutationFn: (body: { embedId: string }) => likeEmbed(body),
  });
};

export const useGetCommentEmbeds = ({ embedId }: { embedId: string }) => {
  return useQuery({
    queryKey: ["get-comment-embeds"],
    queryFn: () => getCommentEmbeds({ embedId }),
  });
};

export const useGetLikedEmbeds = ({ embedId }: { embedId: string }) => {
  return useQuery({
    queryKey: ["get-liked-embeds"],
    queryFn: () => getLikedEmbeds({ embedId }),
  });
};

export const useGetFeaturedEmbeds = () => {
  return useQuery({
    queryKey: ["get-featured-embeds"],
    queryFn: () => getFeaturedEmbeds(),
  });
};

export const useCreateTimelineToken = () => {
  return useMutation({
    onError,
    mutationFn: ({ body }: { body: TCreateTimelineToken }) =>
      createTimelineToken({ body }),
  });
};

export const useAddTokenAddress = () => {
  return useMutation({
    onError,
    mutationFn: ({ body }: { body: TAddTokenAddress }) =>
      addTokenAddress({ body }),
  });
};

export const useBuyTimelineTokenDex = () => {
  return useMutation({
    onError,
    mutationFn: (body: { amount: any; token?: string; slippage?: number }) =>
      buyTimelineTokenDex(body),
  });
};

export const useSellTimelineTokenDex = () => {
  return useMutation({
    onError,
    mutationFn: (body: { amount: any; token?: string; slippage?: number }) =>
      sellTimelineTokenDex(body),
  });
};

export const useBuyTimelineToken = () => {
  return useMutation({
    onError,
    mutationFn: (body: { amount: any; token?: string; slippage?: number }) =>
      buyTimelineToken(body),
  });
};

export const useSellTimelineToken = () => {
  return useMutation({
    onError,
    mutationFn: (body: { amount: any; token?: string; slippage?: number }) =>
      sellTimelineToken(body),
  });
};

export const useBuyRate = () => {
  return useMutation({
    onError,
    mutationFn: (body: { amount: any; token?: string }) => buyRate(body),
  });
};

export const useSellRate = () => {
  return useMutation({
    onError,
    mutationFn: (body: { amount: any; token?: string }) => sellRate(body),
  });
};
