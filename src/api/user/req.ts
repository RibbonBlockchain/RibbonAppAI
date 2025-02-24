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
  TMassWalletTransfer,
  TUserTransactionsBody,
  TBaseClaimBody,
  TBaseNameody,
  TClaimUsdcBody,
  TUserOrderItemBody,
  TRespondBasedAgent,
  TPostCommentBody,
  TSavingsPlanBody,
  TJoinSavingsBody,
  TApproveEmergencyWithdrawalBody,
} from "./types";
import { TResponse, client } from "../api-client";

export const updateProfile = async (body: TUpdateProfileBody) => {
  const res = await client.patch("/user/profile", body);
  return res.data.data;
};

export const getUserSesScore = async () => {
  const res = await client.get<any>("/user/ses");
  return res.data;
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

export const massWalletTransfer = async (body: TMassWalletTransfer) => {
  const res = await client.post("/user/wallet/transfer/mass", body);
  return res.data;
};

export const userBaseTransactions = async (body: TUserTransactionsBody) => {
  const res = await client.post("/user/transactions/base", body);
  return res.data;
};

export const userOptimismTransactions = async (body: TUserTransactionsBody) => {
  const res = await client.post("/user/transactions/optimism", body);
  return res.data;
};

export const baseClaim = async (body: TBaseClaimBody) => {
  const res = await client.post("/user/base-claim", body);
  return res.data;
};

export const claimUsdc = async (body: TClaimUsdcBody) => {
  const res = await client.post("/user/claim/usdc", body);
  return res.data;
};

export const userBaseName = async (body: TBaseNameody) => {
  const res = await client.post("/user/base-name", body);
  return res.data;
};

export const userListTokens = async () => {
  const res = await client.get<TResponse<any>>("/user/wallet/tokens");
  return res.data.data;
};

export const userGetOnramp = async () => {
  const res = await client.get<TResponse<any>>("/user/onramp");
  return res.data.data;
};

// NOTIFICATIONS
export const getUserNotifications = async () => {
  const res = await client.get<TResponse<any>>("/user/notification");
  return res.data.data;
};

export const getNotificationById = async (id: string) => {
  const res = await client.get<TResponse<any>>(`/notification/${id}`);
  return res.data.data;
};

export const getNotificationComments = async (id: string) => {
  const res = await client.get<TResponse<any>>(`/notification/${id}/comments`);
  return res.data.data;
};

export const postComment = async ({
  body,
  id,
}: {
  body: TPostCommentBody;
  id: string;
}) => {
  const res = await client.post(`/notification/${id}/comments`, body);
  return res.data;
};

export const readNotification = async (body: TReadNotificationBody) => {
  const res = await client.post("/notification/read", body);
  return res.data;
};

export const likeNotification = async (id: string) => {
  const res = await client.post(`/notification/${id}/like`);
  return res.data;
};

// USER ORDERS
export const userOrderItems = async (
  body: TUserOrderItemBody,
  linkageId: number
) => {
  const res = await client.post(`user/store/${linkageId}/order`, body);
  return res.data;
};

export const getUserOrders = async () => {
  const res = await client.get<any>("/user/store/orders");
  return res.data;
};

export const getTrendingItems = async () => {
  const res = await client.get<any>("/linkage/store/item/trending");
  return res.data;
};

export const respondBasedAgent = async (body: TRespondBasedAgent) => {
  const res = await client.post("ai/chat", body);
  return res.data;
};

//TOKENS WALLET
export const createUserToken = async (body: { name: string }) => {
  const res = await client.post("user/wallet/create-token", body);
  return res.data;
};

export const buyUserToken = async (body: {
  amount: any;
  token?: string;
  slippage?: number;
}) => {
  const res = await client.post("user/wallet/buy-token", body);
  return res.data;
};

export const sellUserToken = async (body: {
  amount: any;
  token?: string;
  slippage?: number;
}) => {
  const res = await client.post("user/wallet/sell-token", body);
  return res.data;
};

// LEND and BORROW
export const supplyAssets = async (body: { amount: any }) => {
  const res = await client.post("user/wallet/supply-asset", body);
  return res.data;
};

export const withdrawAssets = async (body: { amount: any }) => {
  const res = await client.post("user/wallet/withdraw-asset", body);
  return res.data;
};

export const borrowAssets = async (body: { amount: any }) => {
  const res = await client.post("user/wallet/borrow-asset", body);
  return res.data;
};

export const repayAssets = async (body: { amount: any }) => {
  const res = await client.post("user/wallet/repay-asset", body);
  return res.data;
};

export const getLendBorrowStats = async () => {
  const res = await client.get<any>("/user/wallet/lend-borrow-stats");
  return res.data;
};

// FINANCE
export const createSavingsPlan = async (body: TSavingsPlanBody) => {
  const res = await client.post("finance/savings", body, {
    timeout: 180000,
  });
  return res.data;
};

export const getAllSavingsPlan = async () => {
  const res = await client.get<any>("/finance/savings");
  return res.data;
};

export const getSavingsPlanById = async (id: string) => {
  const res = await client.get<any>(`/finance/savings/${id}`);
  return res.data;
};

export const joinSavingsPlan = async (body: TJoinSavingsBody) => {
  const res = await client.post("finance/savings/join", body, {
    timeout: 180000,
  });
  return res.data;
};

export const getSavingsMember = async (id: string) => {
  const res = await client.get<any>(`/finance/savings/${id}/members`);
  return res.data;
};

export const getCreatedSavingsPlan = async () => {
  const res = await client.get<any>(`/finance/savings/created`);
  return res.data;
};

export const getJoinedSavingsPlan = async () => {
  const res = await client.get<any>(`/finance/savings/joined`);
  return res.data;
};

// emergency withdrawal
export const requestEmergencyWithdrawal = async (body: { id: any }) => {
  const res = await client.post("finance/savings/withdraw-request", body);
  return res.data;
};

export const approveEmergenctyWithdrawal = async (
  body: TApproveEmergencyWithdrawalBody
) => {
  const res = await client.post("finance/savings/withdraw-approve", body);
  return res.data;
};

export const getEmergencyWithdrawalRequests = async (id: string) => {
  const res = await client.get<any>(`/finance/savings/${id}/withdraw-request`);
  return res.data;
};
