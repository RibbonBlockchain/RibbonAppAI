import { TResponse, client } from "../api-client";
import { TCreateAIModel, TTrainAIModel, TUploadTrainingFile } from "./types";

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
