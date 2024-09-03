import {
  TChatLinkageBody,
  TCreateLinkageBody,
  TDiscoveryLinkageResponse,
  TUploadLinkageQuestionnaireBody,
  getDiscoveryLinkagesParams,
} from "./types";
import { TResponse, client } from "../api-client";

export const createLinkage = async (body: TCreateLinkageBody) => {
  const res = await client.post("/linkage", body);
  return res.data;
};

export const uploadLinkageFile = async (file: any, id: number) => {
  const res = await client.post(`/linkage/${id}/file`, file);
  return res.data;
};

export const pubishLinkage = async (id: number) => {
  const res = await client.patch(`/linkage/${id}/publish`);
  return res.data;
};

export const chatLinkage = async (slug: string, body: TChatLinkageBody) => {
  const res = await client.post(`linkage/slug/${slug}/chat`, body);
  return res.data;
};

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

export const getLinkagesFiles = async (id: number) => {
  const res = await client.get(`linkage/${id}/file`);
  return res.data;
};

export const initiateWalletTransfer = async (address: string) => {
  const res = await client.post("/linkage/transfer", address);
  return res.data;
};

export const uploadLinkageQuestionnaire = async (
  body: TUploadLinkageQuestionnaireBody
) => {
  const res = await client.post("/linkage/questionnaire", body);
  return res.data;
};

export const getLinkageQuestionnaire = async (linkageId: number) => {
  const res = await client.get(`/linkage/questionnaire/${linkageId}`);
  return res.data;
};
