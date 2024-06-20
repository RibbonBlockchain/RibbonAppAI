import {
  TSubmitTaskBody,
  TUpdateProfileBody,
  TRateQuestionnaireBody,
  TReadNotificationBody,
  TClaimSwapPointsBody,
  TWithdrawPointsBody,
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

export const useRateQuestionnaire = () => {
  return useMutation({
    onError,
    mutationFn: (body: TRateQuestionnaireBody) => rateQuestionnaire(body),
  });
};

export const useClaimDailyRewards = () => {
  return useMutation({
    onError,
    mutationFn: () => claimDailyReward(),
    onSuccess: () => {
      window.location.reload();
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

export const useGetTaskByID = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["single-task"],
    queryFn: () => getTaskByID(id),
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
