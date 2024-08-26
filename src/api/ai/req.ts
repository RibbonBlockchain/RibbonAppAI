import {
  TTrainAIModel,
  TCreateAIModel,
  TTrainLinkageAI,
  TCreateLinkageBody,
  TUploadTrainingFile,
  TCreateLinkageAIBody,
  getDiscoveryLinkagesParams,
  TDiscoveryLinkageResponse,
} from "./types";
import { TResponse, client } from "../api-client";

export const getTrainingModels = async (id: number) => {
  const res = await client.get<TResponse<any>>(`/ai/model/${id}/file`);
  return res.data.data;
};

export const createAIModel = async (body: TCreateAIModel) => {
  const res = await client.post("/ai/model", body);
  return res.data;
};

export const uploadTrainingFiles = async (
  body: TUploadTrainingFile,
  id: number
) => {
  const res = await client.post(`/ai/model/${id}/file`, body);
  return res.data;
};

export const trainAIModel = async (body: TTrainAIModel, id: number) => {
  const res = await client.post(`/ai/model/${id}/train`, body);
  return res.data;
};

// LINKAGES
export const getLinkages = async () => {
  const res = await client.get("/linkage");
  return res.data;
};

export const getLinkageById = async (id: number) => {
  const res = await client.get(`/linkage/${id}`);
  return res.data;
};

export const getLinkageBySlug = async (slug: string) => {
  const res = await client.get(`/linkage/slug/${slug}`);
  return res.data;
};

export const getDiscoverLinkages = async ({
  params,
}: {
  params: getDiscoveryLinkagesParams;
}) => {
  const { page, pageSize, query } = params;
  const res = await client.get<TResponse<TDiscoveryLinkageResponse>>(
    `/linkage/discover?page=${page}&pageSize=${pageSize}&q=${query}`
  );
  return res.data;
};

export const getLinkagesAI = async (id: number) => {
  const res = await client.get(`/linkage/${id}/ai`);
  return res.data;
};

export const getLinkageAIById = async ({
  linkageId,
  AiId,
}: {
  linkageId: number;
  AiId: number;
}) => {
  const res = await client.get(`linkage/${linkageId}/ai/${AiId}`);
  return res.data;
};
export const getLinkageAIBySlug = async (slug: string) => {
  const res = await client.get(`/linkage/ai/slug/${slug}`);
  return res.data;
};

export const getLinkagesAIFiles = async (id: number) => {
  const res = await client.get(`linkage/${id}}/ai/file`);
  return res.data;
};

export const createLinkage = async (body: TCreateLinkageBody) => {
  const res = await client.post("/linkage", body);
  return res.data;
};

export const createLinkageAI = async (
  id: number,
  body: TCreateLinkageAIBody
) => {
  const res = await client.post(`/linkage/${id}/ai`, body);
  return res.data;
};

export const uploadLinkageAIFile = async (file: any, id: number) => {
  const res = await client.post(`/linkage/${id}/ai/file`, file);
  return res.data;
};

export const trainLinkageAI = async (
  body: TTrainLinkageAI,
  id: number,
  linkageId: number
) => {
  const res = await client.post(`/linkage/${linkageId}/ai/${id}/train`, body);
  return res.data;
};
