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
  uploadLinkageQuestionnaire,
  getLinkageQuestionnaire,
  getLinkageQuestionnaireById,
  submitLinkageQuestionnaireAnswer,
  uploadLinkageStatus,
  getDiscoveryLinkageStatus,
  featureLinkage,
  getDiscoverFeaturedLinkages,
  createWallet,
  getUserWallet,
  disburseLoan,
  deleteLinkage,
  deleteLinkageStatus,
  deleteFeaturedLinkage,
  editLinkage,
} from "./req";
import {
  TChatLinkageBody,
  TCreateLinkageBody,
  TDisburseLoanBody,
  TSubmitLinkageQuestionnaireAnswer,
  TUploadLinkageQuestionnaireBody,
  TUploadLinkageStatusBody,
  getDiscoveryLinkagesParams,
  getPageandSizeParams,
} from "./types";
import { onError } from "../api-client";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateLinkage = () => {
  return useMutation({
    onError,
    mutationFn: (body: TCreateLinkageBody) => createLinkage(body),
  });
};

export const useEditLinkage = () => {
  return useMutation({
    onError,
    mutationFn: ({
      body,
      linkageId,
    }: {
      body: TCreateLinkageBody;
      linkageId: number;
    }) => editLinkage(body, linkageId),
  });
};

export const useDeleteLinkage = () => {
  return useMutation({
    onError,
    mutationFn: (id: number) => deleteLinkage(id),
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

export const useGetDiscoveryFeaturedLinkages = ({
  params,
}: {
  params: getPageandSizeParams;
}) => {
  const { page, pageSize } = params;

  return useQuery({
    queryKey: ["discovery-featured-linkages"],
    queryFn: () => getDiscoverFeaturedLinkages({ params }),
  });
};

export const useGetDiscoveryLinkageStatus = ({
  params,
}: {
  params: getPageandSizeParams;
}) => {
  const { page, pageSize } = params;

  return useQuery({
    queryKey: ["discovery-linkages-status"],
    queryFn: () => getDiscoveryLinkageStatus({ params }),
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

//LINKAGE QUESTIONNAIRES
export const useUploadLinkageQuestionnaire = () => {
  return useMutation({
    onError,
    mutationFn: ({
      body,
      linkageId,
    }: {
      body: TUploadLinkageQuestionnaireBody;
      linkageId: number;
    }) => uploadLinkageQuestionnaire({ body, linkageId }),
  });
};

export const useGetLinkageQuestionnaire = ({
  linkageId,
}: {
  linkageId: number;
}) => {
  return useQuery({
    enabled: !!linkageId,
    queryKey: ["linkage-questionniare", linkageId],
    queryFn: () => getLinkageQuestionnaire(linkageId),
  });
};

export const useGetLinkageQuestionnaireById = ({
  linkageId,
  questionnaireId,
}: {
  linkageId: number;
  questionnaireId: number;
}) => {
  return useQuery({
    enabled: !!linkageId,
    queryKey: ["linkage-questionniare-id", linkageId],
    queryFn: () => getLinkageQuestionnaireById(linkageId, questionnaireId),
  });
};

export const useSubmitLinkageQuestionnaireAnswer = () => {
  return useMutation({
    onError,
    mutationFn: ({
      body,
      linkageId,
      questionnaireId,
    }: {
      body: TSubmitLinkageQuestionnaireAnswer;
      linkageId: number;
      questionnaireId: number;
    }) =>
      submitLinkageQuestionnaireAnswer({ body, linkageId, questionnaireId }),
  });
};

// STATUS
export const useUploadLinkageStatus = () => {
  return useMutation({
    onError,
    mutationFn: ({
      body,
      linkageId,
    }: {
      body: TUploadLinkageStatusBody;
      linkageId: number;
    }) => uploadLinkageStatus({ body, linkageId }),
  });
};

export const useDeleteLinkageStatus = () => {
  return useMutation({
    onError,
    mutationFn: ({
      linkageId,
      statusId,
    }: {
      linkageId: number;
      statusId: number;
    }) => deleteLinkageStatus({ linkageId, statusId }),
  });
};

// FEATURED LINKAGE
export const useFeatureLinkage = () => {
  return useMutation({
    onError,
    mutationFn: ({ linkageId }: { linkageId: number }) =>
      featureLinkage(linkageId),
  });
};

export const useDeleteFeaturedLinkage = () => {
  return useMutation({
    onError,
    mutationFn: ({
      linkageId,
      featuredId,
    }: {
      linkageId: number;
      featuredId: number;
    }) => deleteFeaturedLinkage({ linkageId, featuredId }),
  });
};

/// LOAN
export const useDisburseLoan = () => {
  return useMutation({
    onError,
    mutationFn: ({
      body,
      linkageId,
    }: {
      body: TDisburseLoanBody;
      linkageId: number;
    }) => disburseLoan({ body, linkageId }),
  });
};

export const useCreateWallet = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    onError,
    mutationFn: () => createWallet(),
    onSuccess: onSuccess,
  });
};

export const useGetUserWallet = () => {
  return useQuery({
    queryKey: ["user-wallet"],
    queryFn: () => getUserWallet(),
  });
};
