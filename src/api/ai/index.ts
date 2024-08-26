import {
  getLinkages,
  trainAIModel,
  createAIModel,
  createLinkage,
  getLinkagesAI,
  getLinkageById,
  trainLinkageAI,
  createLinkageAI,
  getLinkageAIById,
  getLinkageBySlug,
  getTrainingModels,
  getLinkagesAIFiles,
  getLinkageAIBySlug,
  uploadTrainingFiles,
  getDiscoverLinkages,
  uploadLinkageAIFile,
} from "./req";
import {
  TTrainAIModel,
  TCreateAIModel,
  TTrainLinkageAI,
  TCreateLinkageBody,
  TUploadTrainingFile,
  TCreateLinkageAIBody,
  getDiscoveryLinkagesParams,
} from "./types";
import { onError } from "../api-client";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetTrainingModels = (id: number) => {
  return useQuery({
    queryKey: ["ai-training-model"],
    queryFn: () => getTrainingModels(id),
  });
};

export const useCreateAIModel = () => {
  return useMutation({
    onError,
    mutationFn: (body: TCreateAIModel) => createAIModel(body),
  });
};

export const useUploadTrainingFiles = () => {
  return useMutation({
    onError,
    mutationFn: ({ body, id }: { body: TUploadTrainingFile; id: number }) =>
      uploadTrainingFiles(body, id),
  });
};

export const useTrainAIModel = () => {
  return useMutation({
    onError,
    mutationFn: ({ body, id }: { body: TTrainAIModel; id: number }) =>
      trainAIModel(body, id),
  });
};

// LINKAGES
export const useGetLinkages = () => {
  return useQuery({
    queryKey: ["linkages"],
    queryFn: () => getLinkages(),
  });
};

export const useGetLinkageById = (id: number) => {
  return useQuery({
    queryKey: ["linkage-id"],
    queryFn: () => getLinkageById(id),
  });
};

export const useGetLinkageBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["linkage-slug"],
    queryFn: () => getLinkageBySlug(slug),
  });
};

export const useGetDiscoveryLinkages = ({
  params,
}: {
  params: getDiscoveryLinkagesParams;
}) => {
  const { page, pageSize, query } = params;

  return useQuery({
    queryKey: ["discovery-linkages"],
    queryFn: () => getDiscoverLinkages({ params }),
  });
};

export const useGetLinkagesAI = (id: number) => {
  return useQuery({
    queryKey: ["linkage-ai"],
    queryFn: () => getLinkagesAI(id),
  });
};

export const useGetLinkageAIById = ({
  linkageId,
  AiId,
}: {
  linkageId: number;
  AiId: number;
}) => {
  return useQuery({
    queryKey: ["linkage-ai-id"],
    queryFn: () => getLinkageAIById({ linkageId, AiId }),
  });
};

export const useGetLinkageAIBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["linkage-ai-slug"],
    queryFn: () => getLinkageAIBySlug(slug),
  });
};

export const useGetLinkagesAIFile = (id: number) => {
  return useQuery({
    queryKey: ["linkage-ai-file"],
    queryFn: () => getLinkagesAIFiles(id),
  });
};

export const useCreateLinkage = () => {
  return useMutation({
    onError,
    mutationFn: (body: TCreateLinkageBody) => createLinkage(body),
  });
};

export const useCreateLinkageAI = () => {
  return useMutation({
    onError,
    mutationFn: ({ id, body }: { id: number; body: TCreateLinkageAIBody }) =>
      createLinkageAI(id, body),
  });
};

export const useUploadLinkageAIFile = () => {
  return useMutation({
    onError,
    mutationFn: ({ file, id }: { file: any; id: number }) =>
      uploadLinkageAIFile(file, id),
  });
};

export const useTrainLinkageAI = () => {
  return useMutation({
    onError,
    mutationFn: ({
      body,
      id,
      linkageId,
    }: {
      body: TTrainLinkageAI;
      id: number;
      linkageId: number;
    }) => trainLinkageAI(body, id, linkageId),
  });
};
