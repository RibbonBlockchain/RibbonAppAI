import { TUpdateProfileBody, TSubmitTaskBody } from "./types";
import { TResponse, client } from "../api-client";

export const updateProfile = async (body: TUpdateProfileBody) => {
  const res = await client.patch("/user/profile", body);
  return res.data.data;
};

export const submitTask = async (body: TSubmitTaskBody) => {
  const res = await client.post<TResponse<any>>("/task/user/respond", body);
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

export const getTasksInProgress = async () => {
  const res = await client.get<TResponse<any>>("/task/user/processing");
  return res.data.data;
};

export const getUncompletedTasks = async () => {
  const res = await client.get<TResponse<any>>("/task/user/uncompleted");
  return res.data.data;
};

export const getCompletedTasks = async () => {
  const res = await client.get<TResponse<any>>("/task/user/completed");
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
