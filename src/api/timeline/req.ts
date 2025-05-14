import { client, TResponse } from "../api-client";
import { EmbedItem, TCreateEmbedBody, TCreateTimelineToken } from "./types";

// EMBEDS
export const createEmbed = async ({
  embedItems,
}: {
  embedItems: EmbedItem[];
}) => {
  const body: TCreateEmbedBody = {
    embed: JSON.stringify(embedItems),
  };

  const res = await client.post(`timeline/embed`, body);
  return res.data;
};

export const getEmbeds = async () => {
  const res = await client.get<TResponse<any>>(`/timeline/embed/all`);
  return res.data.data;
};

export const getMyEmbeds = async () => {
  const res = await client.get<TResponse<any>>(`/timeline/embed`);
  return res.data.data;
};

export const deleteEmbed = async (body: { embedId: string }) => {
  const res = await client.delete(`timeline/embed`, { data: body });
  return res.data;
};

export const featuredEmbed = async ({ embedId }: { embedId: string }) => {
  const res = await client.post(`timeline/embed/featured`, { embedId });
  return res.data;
};

export const getFeaturedEmbeds = async () => {
  const res = await client.get<TResponse<any>>(`/timeline/embed/featured`);
  return res.data.data;
};

export const commentEmbed = async ({
  embedId,
  comment,
}: {
  embedId: string;
  comment: string;
}) => {
  const res = await client.post(`timeline/embed/${embedId}/comments`, {
    comment,
  });
  return res.data;
};

export const likeEmbed = async ({ embedId }: { embedId: string }) => {
  const res = await client.post(`timeline/embed/${embedId}/like`);
  return res.data;
};

export const getCommentEmbeds = async ({ embedId }: { embedId: string }) => {
  const res = await client.get<TResponse<any>>(
    `/timeline/embed/${embedId}/comments`
  );
  return res.data.data;
};

export const getLikedEmbeds = async ({ embedId }: { embedId: string }) => {
  const res = await client.get<TResponse<any>>(
    `/timeline/embed/${embedId}/like`
  );
  return res.data.data;
};

//TIMELINE TOKEN
export const createTimelineToken = async ({
  body,
}: {
  body: TCreateTimelineToken;
}) => {
  const res = await client.post(`timeline/create-token`, body);
  return res.data;
};

export const buyTimelineTokenDex = async (body: {
  amount: any;
  token?: string;
  slippage?: number;
}) => {
  const res = await client.post("timeline/buy-token-dex", body);
  return res.data;
};

export const sellTimelineTokenDex = async (body: {
  amount: any;
  token?: string;
  slippage?: number;
}) => {
  const res = await client.post("timeline/sell-token-dex", body);
  return res.data;
};

export const buyTimelineToken = async (body: {
  amount: any;
  token?: string;
  slippage?: number;
}) => {
  const res = await client.post("timeline/buy-token", body);
  return res.data;
};

export const sellTimelineToken = async (body: {
  amount: any;
  token?: string;
  slippage?: number;
}) => {
  const res = await client.post("timeline/sell-token", body);
  return res.data;
};

export const sellRate = async (body: { amount: any; token?: string }) => {
  const res = await client.post("timeline/sell-rate", body);
  return res.data;
};

export const buyRate = async (body: { amount: any; token?: string }) => {
  const res = await client.post("timeline/buy-rate", body);
  return res.data;
};
