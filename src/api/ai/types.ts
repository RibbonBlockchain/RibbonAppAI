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
