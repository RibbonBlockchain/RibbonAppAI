import {
  trainAIModel,
  createAIModel,
  getTrainingModels,
  uploadTrainingFiles,
} from "./req";
import { onError } from "../api-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TCreateAIModel, TTrainAIModel, TUploadTrainingFile } from "./types";

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
