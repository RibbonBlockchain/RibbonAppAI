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
