import {
  getTasks,
  submitTask,
  getTaskByID,
  updateProfile,
  getCompletedTasks,
  getUserActivities,
  getTasksInProgress,
  getUncompletedTasks,
  getUserActivityById,
} from "./req";
import { onError } from "../api-client";
import { TGetResponse } from "../auth/types";
import { TSubmitTaskBody, TUpdateProfileBody } from "./types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useUpdateProfile = () => {
  return useMutation({
    onError,
    mutationFn: (body: TUpdateProfileBody) => updateProfile(body),
  });
};

export const useSubmitTask = () => {
  return useMutation({
    onError,
    mutationFn: (body: TSubmitTaskBody) => submitTask(body),
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
