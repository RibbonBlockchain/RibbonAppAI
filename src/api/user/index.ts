import {
  TSubmitTaskBody,
  TUpdateProfileBody,
  TRateQuestionnaireBody,
  TReadNotificationBody,
  TClaimSwapPointsBody,
  TWithdrawPointsBody,
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
import {
  getTasks,
  submitTask,
  getTaskByID,
  updateProfile,
  claimDailyReward,
  getCompletedTasks,
  getUserActivities,
  rateQuestionnaire,
  getTasksInProgress,
  getUserActivityById,
  getCompletedTasksByDate,
  getUserNotifications,
  readNotification,
  claimPoints,
  swapPoints,
  withdrawPoints,
  getUncompletedSurveys,
  getUncompletedQuestionnaires,
  getUncompletedTasks,
  getTasskByID,
  getSurveyByID,
  getSurveysInProgress,
  submitSurvey,
  rateSurvey,
  getCompletedSurveys,
  addWallet,
  sendUsdcToken,
  getWalletTransactions,
  massWalletTransfer,
  userBaseTransactions,
  userOptimismTransactions,
  baseClaim,
  claimUsdc,
  userOrderItems,
  getUserOrders,
  userBaseName,
  userListTokens,
  userGetOnramp,
  respondBasedAgent,
  getUserSesScore,
  createUserToken,
  buyUserToken,
  sellUserToken,
  getNotificationById,
  postComment,
  getNotificationComments,
  likeNotification,
  supplyAssets,
  withdrawAssets,
  borrowAssets,
  repayAssets,
  getLendBorrowStats,
  createSavingsPlan,
  getAllSavingsPlan,
  getSavingsPlanById,
  joinSavingsPlan,
  getSavingsMember,
  getCreatedSavingsPlan,
  getJoinedSavingsPlan,
  requestEmergencyWithdrawal,
  approveEmergenctyWithdrawal,
  getEmergencyWithdrawalRequests,
} from "./req";
import { onError } from "../api-client";
import { TGetResponse } from "../auth/types";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

const initialQuestionnaireState = {
  id: "",
  image: "",
  name: "",
  slug: "",
  description: "",
  type: "",
  reward: 0,
  point: 0,
  duration: 0,
  questions: [] as QuestionsType[],
};

export type OptionType = {
  id: number;
  point: number;
  text: string;
  createdAt: string;
  questionId: number;
};

export type QuestionsType = {
  id: number;
  text: string;
  type: string;
  isFirst: true;
  isLast: false;
  taskId: 15;
  options: OptionType[];
};

export const useUpdateProfile = () => {
  return useMutation({
    onError,
    mutationFn: (body: TUpdateProfileBody) => updateProfile(body),
  });
};

export const useGetUserSesScore = () => {
  return useQuery({
    queryKey: ["user-ses"],
    queryFn: () => getUserSesScore(),
  });
};

export const useSubmitTask = () => {
  return useMutation({
    onError,
    mutationFn: (body: TSubmitTaskBody) => submitTask(body),
  });
};

export const useSubmitSurvey = () => {
  return useMutation({
    onError,
    mutationFn: (body: TSubmitSurveyBody) => submitSurvey(body),
  });
};

// export const useSubmitTassk = () => {
//   return useMutation({
//     onError,
//     mutationFn: (body: TSubmitTaskBody) => submitTassk(body),
//   });
// };

export const useRateQuestionnaire = () => {
  return useMutation({
    onError,
    mutationFn: (body: TRateQuestionnaireBody) => rateQuestionnaire(body),
  });
};

export const useRateSurvey = () => {
  return useMutation({
    onError,
    mutationFn: (body: TRateSurveyBody) => rateSurvey(body),
  });
};

// export const useRateTask = () => {
//   return useMutation({
//     onError,
//     mutationFn: (body: TRateQuestionnaireBody) => rateTask(body),
//   });
// };

export const useClaimDailyRewards = (options = {}) => {
  return useMutation({
    mutationFn: () => claimDailyReward(),

    ...options, // Spread the user-defined options to allow onSuccess
  });
};

export const useGetTasks = ({ enabled }: TGetResponse = { enabled: true }) => {
  return useQuery({
    enabled,
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
  });
};

export const useGetTasksInProgress = (
  { enabled }: TGetResponse = { enabled: true }
) => {
  return useQuery({
    enabled,
    queryKey: ["task-inProgress"],
    queryFn: () => getTasksInProgress(),
  });
};

export const useGetSurveysInProgress = (
  { enabled }: TGetResponse = { enabled: true }
) => {
  return useQuery({
    enabled,
    queryKey: ["survey-inProgress"],
    queryFn: () => getSurveysInProgress(),
  });
};

// export const useGetTassksInProgress = (
//   { enabled }: TGetResponse = { enabled: true }
// ) => {
//   return useQuery({
//     enabled,
//     queryKey: ["task-inProgress"],
//     queryFn: () => getTassksInProgress(),
//   });
// };

export const useGetUncompletedQuestionnaires = () => {
  return useQuery({
    queryKey: ["quetionnaire-uncompleted"],
    queryFn: getUncompletedQuestionnaires,
  });
};

export const useGetUncompletedSurveys = () => {
  return useQuery({
    queryKey: ["survey-uncompleted"],
    queryFn: getUncompletedSurveys,
  });
};

export const useGetUncompletedTasks = () => {
  return useQuery({
    queryKey: ["task-uncompleted"],
    queryFn: getUncompletedTasks,
  });
};

export const useGetCompletedTasks = (
  { enabled }: TGetResponse = { enabled: true }
) => {
  return useQuery({
    enabled,
    queryKey: ["task-completed"],
    queryFn: () => getCompletedTasks(),
  });
};

export const useGetCompletedSurveys = (
  { enabled }: TGetResponse = { enabled: true }
) => {
  return useQuery({
    enabled,
    queryKey: ["survey-completed"],
    queryFn: () => getCompletedSurveys(),
  });
};

export const useGetTaskByID = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["single-task"],
    queryFn: () => getTaskByID(id),
  });
};

export const useGetSurveyByID = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["single-survey"],
    queryFn: () => getSurveyByID(id),
  });
};

export const useGetTasskByID = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["single-tassk"],
    queryFn: () => getTasskByID(id),
  });
};

export const useGetCompletedTasksByDate = (date: string | undefined) => {
  return useQuery({
    queryKey: ["task-completed", date],
    queryFn: () => getCompletedTasksByDate(date),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });
};

export const useGetUserActivities = (
  { enabled }: TGetResponse = { enabled: true }
) => {
  return useQuery({
    enabled,
    queryKey: ["activities"],
    queryFn: () => getUserActivities(),
  });
};

export const useGetUserActivityById = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["single-activity"],
    queryFn: () => getUserActivityById(id),
  });
};

export const useClaimPoints = () => {
  return useMutation({
    onError,
    mutationFn: (body: TClaimSwapPointsBody) => claimPoints(body),
  });
};

export const useSwapPoints = () => {
  return useMutation({
    onError,
    mutationFn: (body: TClaimSwapPointsBody) => swapPoints(body),
  });
};

export const useWithdrawPoints = () => {
  return useMutation({
    onError,
    mutationFn: (body: TWithdrawPointsBody) => withdrawPoints(body),
  });
};

export const useAddWallet = () => {
  return useMutation({
    onError,
    mutationFn: ({ address }: { address: string }) => addWallet(address),
  });
};

export const useSendUsdcToken = () => {
  return useMutation({
    onError,
    mutationFn: (body: TSendUsdcToken) => sendUsdcToken(body),
  });
};

export const useGetWalletTransactions = () => {
  return useQuery({
    queryKey: ["wallet-transaction"],
    queryFn: () => getWalletTransactions(),
  });
};

export const useMassWalletTransfer = () => {
  return useMutation({
    onError,
    mutationFn: (body: TMassWalletTransfer) => massWalletTransfer(body),
  });
};

export const useUserBaseTransactions = () => {
  return useMutation({
    onError,
    mutationFn: (body: TUserTransactionsBody) => userBaseTransactions(body),
  });
};

export const useUserOptimismTransactions = () => {
  return useMutation({
    onError,
    mutationFn: (body: TUserTransactionsBody) => userOptimismTransactions(body),
  });
};

export const useBaseClaim = () => {
  return useMutation({
    onError,
    mutationFn: (body: TBaseClaimBody) => baseClaim(body),
  });
};

export const useClaimUsdc = () => {
  return useMutation({
    onError,
    mutationFn: (body: TClaimUsdcBody) => claimUsdc(body),
  });
};

export const useUserBaseName = () => {
  return useMutation({
    onError,
    mutationFn: (body: TBaseNameody) => userBaseName(body),
  });
};

export const useUserListTokens = () => {
  return useQuery({
    queryKey: ["user-wallet-tokens"],
    queryFn: () => userListTokens(),
  });
};

export const useUserGetOnramp = () => {
  return useQuery({
    queryKey: ["user-onramp"],
    queryFn: () => userGetOnramp(),
  });
};

// NOTIFICATIONS
export const useGetUserNotifications = (
  { enabled }: TGetResponse = { enabled: true }
) => {
  return useQuery({
    enabled,
    queryKey: ["notifications"],
    queryFn: () => getUserNotifications(),
  });
};

export const useGetNotificationById = (id: string) => {
  return useQuery({
    queryKey: ["notification-id"],
    queryFn: () => getNotificationById(id),
  });
};

export const useGetNotificationComments = (id: string) => {
  return useQuery({
    queryKey: ["notification-comments"],
    queryFn: () => getNotificationComments(id),
  });
};

export const usePostComment = () => {
  return useMutation({
    onError,
    mutationFn: ({ body, id }: { body: TPostCommentBody; id: string }) =>
      postComment({ body, id }),
  });
};

export const useLikeNotification = () => {
  return useMutation({
    onError,
    mutationFn: (id: string) => likeNotification(id),
  });
};

export const useReadNotification = () => {
  return useMutation({
    onError,
    mutationFn: (body: TReadNotificationBody) => readNotification(body),
  });
};

// USER ORDERS
export const useUserOrderItems = () => {
  return useMutation({
    onError,
    mutationFn: ({
      body,
      linkageId,
    }: {
      body: TUserOrderItemBody;
      linkageId: number;
    }) => userOrderItems(body, linkageId),
  });
};

export const useGetUserOrders = () => {
  return useQuery({
    queryKey: ["user-orders"],
    queryFn: () => getUserOrders(),
  });
};

export const useRespondBasedAgent = () => {
  return useMutation({
    onError,
    mutationFn: (body: TRespondBasedAgent) => respondBasedAgent(body),
  });
};

// TOKENS WALLET
export const useCreateUserToken = () => {
  return useMutation({
    onError,
    mutationFn: (body: { name: string }) => createUserToken(body),
  });
};

export const useBuyUserToken = () => {
  return useMutation({
    onError,
    mutationFn: (body: { amount: any; token?: string; slippage?: number }) =>
      buyUserToken(body),
  });
};

export const useSellUserToken = () => {
  return useMutation({
    onError,
    mutationFn: (body: { amount: any; token?: string; slippage?: number }) =>
      sellUserToken(body),
  });
};

// LEND and BORROW
export const useSupplyAssets = () => {
  return useMutation({
    onError,
    mutationFn: (body: { amount: any }) => supplyAssets(body),
  });
};

export const useWithdrawAssets = () => {
  return useMutation({
    onError,
    mutationFn: (body: { amount: any }) => withdrawAssets(body),
  });
};

export const useBorrowAssets = () => {
  return useMutation({
    onError,
    mutationFn: (body: { amount: any }) => borrowAssets(body),
  });
};

export const useRepayAssets = () => {
  return useMutation({
    onError,
    mutationFn: (body: { amount: any }) => repayAssets(body),
  });
};

export const useGetLendBorrowStats = () => {
  return useQuery({
    queryKey: ["lendborrow-stats"],
    queryFn: () => getLendBorrowStats(),
  });
};

// FINANCE
export const useCreateSavingsPlan = () => {
  return useMutation({
    onError,
    mutationFn: (body: TSavingsPlanBody) => createSavingsPlan(body),
  });
};

export const useGetAllSavingsPlan = () => {
  return useQuery({
    queryKey: ["savings-plan"],
    queryFn: () => getAllSavingsPlan(),
  });
};

export const useGetSavingsPlanById = (id: string) => {
  return useQuery({
    queryKey: ["savings-plan-id"],
    queryFn: () => getSavingsPlanById(id),
  });
};

export const useJoinSavingsPlan = () => {
  return useMutation({
    onError,
    mutationFn: (body: TJoinSavingsBody) => joinSavingsPlan(body),
  });
};

export const useGetSavingsMembers = (id: string) => {
  return useQuery({
    queryKey: ["savings-members"],
    queryFn: () => getSavingsMember(id),
  });
};

export const useGetCreatedSavingsPlan = () => {
  return useQuery({
    queryKey: ["created-savings"],
    queryFn: () => getCreatedSavingsPlan(),
  });
};

export const useGetJoinedSavingsPlan = () => {
  return useQuery({
    queryKey: ["joined-savings"],
    queryFn: () => getJoinedSavingsPlan(),
  });
};

// emergency withdrawal
export const useRequestEmergencyWithdrawal = () => {
  return useMutation({
    onError,
    mutationFn: (body: { id: any }) => requestEmergencyWithdrawal(body),
  });
};

export const useApproveEmergenctyWithdrawal = () => {
  return useMutation({
    onError,
    mutationFn: (body: TApproveEmergencyWithdrawalBody) =>
      approveEmergenctyWithdrawal(body),
  });
};

export const useGetEmergencyWithdrawalRequests = (id: string) => {
  return useQuery({
    queryKey: ["emergency-withdrawal"],
    queryFn: () => getEmergencyWithdrawalRequests(id),
  });
};
