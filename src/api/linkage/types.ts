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

export interface getPageandSizeParams {
  page: number;
  pageSize: number;
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
  questions: LinkageQuestion[];
  type: string;
};

export type QuestionType =
  | "BOOLEAN"
  | "MULTICHOICE"
  | "MULTISELECT"
  | "SHORT_ANSWER"
  | "LONG_ANSWER"
  | "CHECKBOX"
  | "ROUND_BOX"
  | "BUBBLE"
  | "DATE"
  | "TIME"
  | "SINGLE_CHOICE"
  | "MULTIPLE_CHOICE"
  | "IMAGES";

interface LinkageQuestion {
  text: string;
  type: QuestionType;
  options: Options[];
}

interface Options {
  value: string;
  label?: string;
}

export type TSubmitLinkageQuestionnaireAnswer = {
  optionId: number;
  questionId: number;
};

export type TUploadLinkageStatusBody = { file: any; caption: string };

export type TDisburseLoanBody = { amount: number };
