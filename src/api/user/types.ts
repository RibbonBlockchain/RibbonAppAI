export type TUpdateProfileBody = {
  dob?: string;
  email?: string;
  lastName?: string;
  firstName?: string;
  otherNames?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
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
  optionId: number;
};
