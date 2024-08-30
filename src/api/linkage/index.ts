import {
  getLinkages,
  chatLinkage,
  createLinkage,
  pubishLinkage,
  getLinkageById,
  getLinkageBySlug,
  getLinkagesFiles,
  uploadLinkageFile,
  getDiscoverLinkages,
  initiateWalletTransfer,
} from "./req";
import {
  TChatLinkageBody,
  TCreateLinkageBody,
  getDiscoveryLinkagesParams,
} from "./types";
import { onError } from "../api-client";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateLinkage = () => {
  return useMutation({
    onError,
    mutationFn: (body: TCreateLinkageBody) => createLinkage(body),
  });
};

export const useUploadLinkageFile = () => {
  return useMutation({
    onError,
    mutationFn: ({ file, id }: { file: any; id: number }) =>
      uploadLinkageFile(file, id),
  });
};

export const usePublishLinkage = () => {
  return useMutation({
    onError,
    mutationFn: (id: number) => pubishLinkage(id),
  });
};

export const useChatLinkage = () => {
  return useMutation({
    onError,
    mutationFn: ({ slug, body }: { slug: string; body: TChatLinkageBody }) =>
      chatLinkage(slug, body),
  });
};

export const useGetLinkages = () => {
  return useQuery({
    enabled: true,
    queryKey: ["linkages"],
    queryFn: () => getLinkages(),
  });
};

export const useGetLinkageById = (id: number) => {
  return useQuery({
    enabled: !!id,
    queryKey: ["linkage-id", id],
    queryFn: () => getLinkageById(id),
  });
};

export const useGetLinkageBySlug = (slug: string) => {
  return useQuery({
    enabled: !!slug,
    queryKey: ["linkage-slug", slug],
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

export const useGetLinkagesFile = (id: number) => {
  return useQuery({
    enabled: !!id,
    queryKey: ["linkage-file", id],
    queryFn: () => getLinkagesFiles(id),
  });
};

export const useInitiateWalletTransfer = () => {
  return useMutation({
    onError,
    mutationFn: ({ address }: { address: string }) =>
      initiateWalletTransfer(address),
  });
};
