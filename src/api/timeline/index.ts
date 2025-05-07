import { useMutation, useQuery } from "@tanstack/react-query";
import { onError } from "../api-client";
import { EmbedItem, TCreateEmbedBody, TCreateTimelineToken } from "./types";
import {
  buyTimelineTokenDex,
  createEmbed,
  createTimelineToken,
  getEmbeds,
  getMyEmbeds,
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
