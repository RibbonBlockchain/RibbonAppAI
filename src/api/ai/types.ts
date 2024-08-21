export type TCreateAIModel = {
  name: string;
};

export type TUploadTrainingFile = {
  file: [] | File[];
};

export type TTrainAIModel = {
  fileId: string;
};
