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

export type TRateQuestionnaireBody = {
  rating: number;
  questionnaireId: number;
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
