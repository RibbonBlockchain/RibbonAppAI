import { useMutation, useQuery } from "@tanstack/react-query";
import { onError } from "../api-client";
import { EmbedItem, TCreateEmbedBody, TCreateTimelineToken } from "./types";
import {
  buyRate,
  buyTimelineToken,
  buyTimelineTokenDex,
  createEmbed,
  createTimelineToken,
  deleteEmbed,
  featuredEmbed,
  getEmbeds,
  getFeaturedEmbeds,
  getMyEmbeds,
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
    mutationFn: (body: { embedId: string }) => featuredEmbed(body),
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
