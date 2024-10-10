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
  userTransactions,
} from "./req";
import { onError } from "../api-client";
import { TGetResponse } from "../auth/types";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

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

export const useGetUserNotifications = (
  { enabled }: TGetResponse = { enabled: true }
) => {
  return useQuery({
    enabled,
    queryKey: ["notifications"],
    queryFn: () => getUserNotifications(),
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

export const useClaimDailyRewards = () => {
  return useMutation({
    onError,
    mutationFn: () => claimDailyReward(),
    onSuccess: () => {
      // window.location.reload();
      toast.success("Daily reward claimed");
    },
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

export const useReadNotification = () => {
  return useMutation({
    onError,
    mutationFn: (body: TReadNotificationBody) => readNotification(body),
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

export const useUserTransactions = () => {
  return useMutation({
    onError,
    mutationFn: (body: TUserTransactionsBody) => userTransactions(body),
  });
};
