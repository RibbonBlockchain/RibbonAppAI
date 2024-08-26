export type TCreateAIModel = {
  name: string;
};

export type TUploadTrainingFile = {
  file: any;
};

export type TTrainAIModel = {
  fileId: string;
};

export type TCreateLinkageBody = {
  name: string;
  description: string;
  phone: string;
  email: string;
  location: string;
  category: string;
};

export type TCreateLinkageAIBody = {
  name: string;
  description: string;
  instruction: string;
  prompts: string;
  prompts1?: string;
  prompts2?: string;
};

export type TTrainLinkageAI = {
  name: string;
  description: string;
  instruction: string;
  prompts: string;
  prompts1?: string;
  prompts2?: string;
};

export interface getDiscoveryLinkagesParams {
  page: number;
  pageSize: number;
  query: string;
}

interface Pagination {
  pageSize: number;
  endIndex: number;
  totalPages: number;
  startIndex: number;
  currentPage: number;
  hasNextPage: boolean;
  totalDataSize: number;
  hasPreviousPage: boolean;
}

interface DiscoveryLinkageData {
  title: string;
  image: string;
  description: string;
  author: string;
}

export type TDiscoveryLinkageResponse = {
  status: number;
  message: string;
  timestamp: string;
  data: DiscoveryLinkageData[];
  pagination: Pagination;
};
