export type TCreateLinkageBody = {
  name: string;
  description: string;
  phone: string;
  email: string;
  location: string;
  category: string;
  image: string;
  instruction: string;
  prompts: string;
  prompts1?: string;
};

export type TTrainLinkage = {
  name: string;
  description: string;
  instruction: string;
  prompts: string;
  prompts1?: string;
  prompts2?: string;
};

export type TChatLinkageBody = {
  message: string;
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

export type TUploadLinkageQuestionnaireBody = {
  name: string;
  linkageId: number;
  questions: LinkageQuestion[];
};
type QuestionType = "BOOLEAN" | "MULTIPLE_CHOICE" | "TEXT";

interface LinkageQuestion {
  text: string;
  type: QuestionType;
  options: Options[];
}

interface Options {
  value: string;
  label: string;
}
