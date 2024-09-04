import {
  TChatLinkageBody,
  TCreateLinkageBody,
  TDiscoveryLinkageResponse,
  TSubmitLinkageQuestionnaireAnswer,
  TUploadLinkageQuestionnaireBody,
  TUploadLinkageStatusBody,
  getDiscoveryLinkagesParams,
  getDiscoveryLinkagesStatusParams,
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

export const getDiscoveryLinkageStatus = async ({
  params,
}: {
  params: getDiscoveryLinkagesStatusParams;
}) => {
  const { page, pageSize } = params;

  const res = await client.get(
    `/linkage/discover/status?page=${page}&pageSize=${pageSize}`
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

export const uploadLinkageQuestionnaire = async ({
  linkageId,
  body,
}: {
  body: TUploadLinkageQuestionnaireBody;
  linkageId: number;
}) => {
  const res = await client.post(`linkage/${linkageId}/questionnaire`, body);
  return res.data;
};

export const getLinkageQuestionnaire = async (linkageId: number) => {
  const res = await client.get(`/linkage/${linkageId}/questionnaire`);
  return res.data;
};

export const getLinkageQuestionnaireById = async (
  linkageId: number,
  questionnaireId: number
) => {
  const res = await client.get(
    `/linkage/${linkageId}/questionnaire/${questionnaireId}`
  );
  return res.data;
};

export const submitLinkageQuestionnaireAnswer = async ({
  linkageId,
  questionnaireId,
  body,
}: {
  linkageId: number;
  questionnaireId: number;
  body: TSubmitLinkageQuestionnaireAnswer;
}) => {
  const res = await client.post(
    `linkage/${linkageId}/questionnaire/${questionnaireId}/respond`,
    body
  );
  return res.data;
};

export const uploadLinkageStatus = async ({
  linkageId,
  body,
}: {
  body: TUploadLinkageStatusBody;
  linkageId: number;
}) => {
  const res = await client.post(`linkage/${linkageId}/status`, body);
  return res.data;
};
