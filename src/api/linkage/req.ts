import {
  TAddLinkageStoreItemBody,
  TChatLinkageBody,
  TCreateLinkageBody,
  TDisburseLoanBody,
  TDiscoveryLinkageResponse,
  TSubmitLinkageQuestionnaireAnswer,
  TUpdateLinkageStoreItem,
  TUploadLinkageQuestionnaireBody,
  TUploadLinkageStatusBody,
  getDiscoveryLinkagesParams,
  getLinkageStoreItemsParams,
  getPageandSizeParams,
} from "./types";
import { TResponse, client } from "../api-client";
import {
  TBaseNameody,
  TMassWalletTransfer,
  TSendUsdcToken,
} from "../user/types";

export const createLinkage = async (body: TCreateLinkageBody) => {
  const res = await client.post("/linkage", body);
  return res.data;
};

export const editLinkage = async (
  body: TCreateLinkageBody,
  linkageId: number
) => {
  const res = await client.patch(`/linkage/${linkageId}`, body);
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

export const getLinkages = async () => {
  const res = await client.get("/linkage");
  return res.data;
};

export const deleteLinkage = async (id: number) => {
  const res = await client.delete(`/linkage/${id}`);
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

export const getDiscoverFeaturedLinkages = async ({
  params,
}: {
  params: getPageandSizeParams;
}) => {
  const { page, pageSize } = params;
  const res = await client.get<TResponse<TDiscoveryLinkageResponse>>(
    `/linkage/discover/featured?page=${page}&pageSize=${pageSize}`
  );
  return res.data;
};

export const getDiscoveryLinkageStatus = async ({
  params,
}: {
  params: getPageandSizeParams;
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

// CHATS
export const chatLinkage = async (slug: string, body: TChatLinkageBody) => {
  const res = await client.post(`linkage/slug/${slug}/chat`, body);
  return res.data;
};

export const getChatHistory = async (slug: string) => {
  const res = await client.get(`/linkage/slug/${slug}/chat/history`);
  return res.data;
};

//LINKAGE QUESTIONNAIRES
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

// STATUS
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

export const deleteLinkageStatus = async ({
  linkageId,
  statusId,
}: {
  linkageId: number;
  statusId: number;
}) => {
  const res = await client.delete(`linkage/${linkageId}/status/${statusId}`);
  return res.data;
};

// FEATURED LINKAGE
export const featureLinkage = async (linkageId: number) => {
  const res = await client.post(`/linkage/${linkageId}/feature`);
  return res.data;
};

export const deleteFeaturedLinkage = async ({
  linkageId,
  featuredId,
}: {
  linkageId: number;
  featuredId: number;
}) => {
  const res = await client.delete(`linkage/${linkageId}/feature/${featuredId}`);
  return res.data;
};

// LOAN
export const disburseLoan = async ({
  linkageId,
  body,
}: {
  body: TDisburseLoanBody;
  linkageId: number;
}) => {
  const res = await client.post(`linkage/${linkageId}/loan`, body);
  return res.data;
};

export const createWallet = async () => {
  const res = await client.post(`user/wallet/create`, {
    provider: "COINBASE",
  });
  return res.data;
};

export const getUserWallet = async () => {
  const res = await client.get(`user/wallet`);
  return res.data;
};

export const linkageBaseName = async (body: TBaseNameody, id: number) => {
  const res = await client.post(`/linkage/${id}/base-name`, body);
  return res.data;
};

// TRANSACTIONS
export const linkageSendUsdcToken = async (
  body: TSendUsdcToken,
  id: number
) => {
  const res = await client.post(`/linkage/${id}/wallet/transfer`, body);
  return res.data;
};

export const linkageMassWalletTransfer = async (
  body: TMassWalletTransfer,
  id: number
) => {
  const res = await client.post(`/linkage/${id}/wallet/transfer/mass`, body);
  return res.data;
};

export const getLinkageWalletTransactions = async (id: number) => {
  const res = await client.post<any>(`/linkage/${id}/wallet/history`);
  return res.data;
};

// STORE
export const addLinkageStoreItem = async (
  linkageId: number,
  body: TAddLinkageStoreItemBody
) => {
  const res = await client.post<any>(`/linkage/${linkageId}/store/item`, body);
  return res.data;
};

export const archiveLinkageStoreItem = async ({
  linkageId,
  itemId,
}: {
  linkageId: number;
  itemId: number;
}) => {
  const res = await client.post<any>(
    `linkage/${linkageId}/store/item/${itemId}/archive`
  );
  return res.data;
};

export const updateLinkageStoreItem = async ({
  linkageId,
  itemId,
  body,
}: {
  linkageId: number;
  itemId: number;
  body: TUpdateLinkageStoreItem;
}) => {
  const res = await client.put<any>(
    `linkage/${linkageId}/store/item/${itemId}`,
    body
  );
  return res.data;
};

export const deleteLinkageStoreItem = async ({
  linkageId,
  itemId,
}: {
  linkageId: number;
  itemId: number;
}) => {
  const res = await client.delete<any>(
    `linkage/${linkageId}/store/item/${itemId}`
  );
  return res.data;
};

export const getLinkageStoreItems = async ({
  params,
  linkageId,
}: {
  params: getLinkageStoreItemsParams;
  linkageId: number;
}) => {
  const { page, perPage } = params;

  const res = await client.get(
    `linkage/${linkageId}/store/item?page=${page}&perpage=${perPage}`
  );
  return res.data;
};

export const getLinkageStoreItemBySlug = async (slug: string) => {
  const res = await client.get(
    `/linkage/slug/${slug}/store/item?page=1&perpage=10`
  );
  return res.data;
};

// ORDERS
export const getLinkageStoreOrders = async (linkageId: number) => {
  const res = await client.get<any>(`/linkage/${linkageId}/store/orders`);
  return res.data;
};
