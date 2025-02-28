export type TUpdateProfileBody = {
  dob?: string;
  email?: string;
  lastName?: string;
  firstName?: string;
  otherNames?: string;
  phone?: string;
  // gender?: "MALE" | "FEMALE" | "OTHER";
  gender?: string;
  socials?: {
    x?: string;
    discord?: string;
    linkedIn?: string;
    instagram?: string;
  };
};

export type TSubmitTaskBody = {
  questionId: number;
  taskId: number;
  optionId: number | string | number[];
};

export type TSubmitSurveyBody = {
  questionId: number;
  surveyId: number;
  optionId: number | string | number[];
};

export type TRateQuestionnaireBody = {
  rating: number;
  questionnaireId: number;
};

export type TRateSurveyBody = {
  rating: number;
  surveyId: number;
};

export type TReadNotificationBody = {
  notificationId: number;
};

export type TClaimSwapPointsBody = {
  amount: string;
  address: string;
};

export type TWithdrawPointsBody = {
  amount: number;
};

export type TSendUsdcToken = {
  amount: string;
  address: string;
  asset?: string;
};

export type TTransfer = {
  amount: string;
  address: string;
  asset?: string;
};

export type TMassWalletTransfer = {
  data: TTransfer[];
};

export type TUserTransactionsBody = {
  address: string;
};

export type TBaseClaimBody = {
  amount: number;
  address: string;
};

export type TClaimUsdcBody = {
  amount: number;
};

export type TBaseNameody = {
  name: string;
};

export type TPostCommentBody = {
  comment: string;
};

// USER ORDERS
interface Item {
  id: number;
  quantity: number;
}

export type TUserOrderItemBody = {
  asset?: string;
  items: Item[];
};

export type TRespondBasedAgent = {
  message?: any;
  type: any;
  questionId?: number;
  taskId?: number;
  optionId?: number | string | number[];
};

// FINANCE
export type TSavingsPlanBody = {
  name: string;
  type: string;
  participant: number;
  frequency: string;
  duration: string;
  cycles: any;
  targetAmount: number;
  individualAmount: number;
  about: string;
  payoutDate?: Date | null;
  payoutNumber?: number;
};

export type TJoinSavingsBody = {
  id: number;
  payoutNumber?: number;
};

export type TApproveEmergencyWithdrawalBody = {
  requestId: number;
  savingsId: number;
  approve: boolean;
};
