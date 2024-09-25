import {
  TSubmitTaskBody,
  TUpdateProfileBody,
  TWithdrawPointsBody,
  TClaimSwapPointsBody,
  TReadNotificationBody,
  TRateQuestionnaireBody,
  TSubmitSurveyBody,
  TRateSurveyBody,
  TSendUsdcToken,
} from "./types";
import { TResponse, client } from "../api-client";

export const updateProfile = async (body: TUpdateProfileBody) => {
  const res = await client.patch("/user/profile", body);
  return res.data.data;
};

export const submitTask = async (body: TSubmitTaskBody) => {
  const res = await client.post<TResponse<any>>("/task/user/respond", body);
  return res.data;
};

export const submitSurvey = async (body: TSubmitSurveyBody) => {
  const res = await client.post<TResponse<any>>("/survey/respond", body);
  return res.data;
};

// export const submitTassk = async (body: TSubmitTaskBody) => {
//   const res = await client.post<TResponse<any>>("/tassk/respond", body);
//   return res.data;
// };

export const rateQuestionnaire = async (body: TRateQuestionnaireBody) => {
  const res = await client.post<TResponse<any>>("/questionnaire/rate", body);
  return res.data;
};

export const rateSurvey = async (body: TRateSurveyBody) => {
  const res = await client.post<TResponse<any>>("/survey/rate", body);
  return res.data;
};

// export const rateTask = async (body: TRateQuestionnaireBody) => {
//   const res = await client.post<TResponse<any>>("/task/rate", body);
//   return res.data;
// };

export const claimDailyReward = async () => {
  const res = await client.post<TResponse<any>>("/user/claim");
  return res.data;
};

export const getTasks = async () => {
  const res = await client.get<TResponse<any>>("/task");
  return res.data;
};

export const getTaskByID = async (id: string) => {
  const res = await client.get<TResponse<any>>(`/task/${id}`);
  return res.data.data;
};

export const getSurveyByID = async (id: string) => {
  const res = await client.get<TResponse<any>>(`/survey/${id}`);
  return res.data.data;
};

export const getTasskByID = async (id: string) => {
  const res = await client.get<TResponse<any>>(`/tassk/${id}`);
  return res.data.data;
};

export const getTasksInProgress = async () => {
  const res = await client.get<TResponse<any>>("/task/user/processing");
  return res.data.data;
};

export const getSurveysInProgress = async () => {
  const res = await client.get<TResponse<any>>("/survey/processing");
  return res.data.data;
};

// export const getTassksInProgress = async () => {
//   const res = await client.get<TResponse<any>>("/task/user/processing");
//   return res.data.data;
// };

export const getUncompletedQuestionnaires = async () => {
  const res = await client.get<TResponse<any>>("/task/user/uncompleted");
  return res.data.data;
};

export const getUncompletedSurveys = async () => {
  const res = await client.get<TResponse<any>>("/survey/uncompleted");
  return res.data.data;
};

export const getUncompletedTasks = async () => {
  const res = await client.get<TResponse<any>>("/tassk/uncompleted");
  return res.data.data;
};

export const getCompletedTasks = async () => {
  const res = await client.get<TResponse<any>>(`/task/user/completed`);
  return res.data;
};

export const getCompletedSurveys = async () => {
  const res = await client.get<TResponse<any>>(`/survey/completed`);
  return res.data;
};

// export const getCompletedTassks = async () => {
//   const res = await client.get<TResponse<any>>(`/task/user/completed`);
//   return res.data;
// };

export const getCompletedTasksByDate = async (date?: any) => {
  const res = await client.get<TResponse<any>>(
    `/task/user/completed?completedDate=${date}`
  );
  return res.data;
};

export const getUserActivities = async () => {
  const res = await client.get<TResponse<any>>("/task/user/activity");
  return res.data;
};

export const getUserActivityById = async (id: string) => {
  const res = await client.get<TResponse<any>>(`/task/user/activity/${id}`);
  return res.data;
};

export const getUserNotifications = async () => {
  const res = await client.get<TResponse<any>>("/user/notification");
  return res.data.data;
};

export const readNotification = async (body: TReadNotificationBody) => {
  const res = await client.post("/notification/read", body);
  return res.data;
};

export const claimPoints = async (body: TClaimSwapPointsBody) => {
  const res = await client.post("/user/claim-point", body);
  return res.data;
};

export const swapPoints = async (body: TClaimSwapPointsBody) => {
  const res = await client.post("/user/swap-point", body);
  return res.data;
};

export const withdrawPoints = async (body: TWithdrawPointsBody) => {
  const res = await client.post("/user/withdraw-point", body);
  return res.data;
};

export const addWallet = async (address: string) => {
  const res = await client.post("/user/wallet", { address });
  return res.data;
};

export const sendUsdcToken = async (body: TSendUsdcToken) => {
  const res = await client.post("/user/wallet/transfer", body);
  return res.data;
};

export const getWalletTransactions = async () => {
  const res = await client.get<any>("/user/wallet/history");
  return res.data;
};
