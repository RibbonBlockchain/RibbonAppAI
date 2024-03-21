import {
  logout,
  getAuth,
  checkPhone,
  phoneLogin,
  updatePhone,
  phoneSignUpPin,
  verifyPhoneSignUp,
  verifyPhoneUpdate,
  phoneSignUpRequest,
  getTaskByID,
  getTasks,
  getTasksInProgress,
  getUncompletedTasks,
  getCompletedTasks,
  getUserActivities,
  getUserActivityById,
} from "./req";

import {
  TGetAuth,
  TCheckPhoneBody,
  TPhoneLoginBody,
  TPhoneSignPinUpBody,
  TVerifyPhoneSignUpBody,
  TPhoneSignUpRequestBody,
  TGetResponse,
} from "./types";

import {
  authAtom,
  logoutAtom,
  prepareRequestHeader,
} from "@/lib/atoms/auth.atom";
import { useAtom } from "jotai";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { onError, onSuccess } from "../api-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SUCCESS, TOKEN_KEY } from "@/lib/values/constants";

export const useGetAuth = ({ enabled }: TGetAuth = { enabled: false }) => {
  return useQuery({ enabled, queryKey: ["auth"], queryFn: () => getAuth() });
};

export const useLogout = () => {
  const id = "auth";
  const router = useRouter();
  const [_, removeToken] = useAtom(logoutAtom);

  const handleLogout = () => {
    removeToken();
    router.push("/");
  };

  return useMutation({
    mutationFn: logout,
    onError: () => {
      onError(null);
      handleLogout();
    },
    onSuccess: () => {
      onSuccess(id);
      handleLogout();
    },
  });
};

export const useCheckPhone = () => {
  return useMutation({
    onError,
    mutationFn: (body: TCheckPhoneBody) => checkPhone(body),
  });
};

export const usePhoneSignUpRequest = () => {
  return useMutation({
    onError,
    mutationFn: (body: TPhoneSignUpRequestBody) => phoneSignUpRequest(body),
  });
};

export const useVerifyPhoneSignUp = () => {
  return useMutation({
    onError,
    mutationFn: (body: TVerifyPhoneSignUpBody) => verifyPhoneSignUp(body),
  });
};

export const usePhoneSignUpPin = () => {
  const [_, setAuth] = useAtom(authAtom);

  return useMutation({
    onError,
    mutationFn: (body: TPhoneSignPinUpBody) => phoneSignUpPin(body),
    onSuccess: (data) => {
      const msg = data?.message || SUCCESS;
      const token = data?.data?.accessToken;

      toast.success(msg);
      prepareRequestHeader(token);
      setAuth((prev) => ({ ...prev, token }));
      sessionStorage.setItem(TOKEN_KEY, token);
    },
  });
};

export const usePhoneLogin = () => {
  const [_, setAuth] = useAtom(authAtom);

  return useMutation({
    onError,
    mutationFn: (body: TPhoneLoginBody) => phoneLogin(body),
    onSuccess: (data) => {
      const msg = data?.message || SUCCESS;
      const token = data?.data?.accessToken;

      toast.success(msg);
      prepareRequestHeader(token);
      setAuth((prev) => ({ ...prev, token }));
      sessionStorage.setItem(TOKEN_KEY, token);
    },
  });
};

export const useUpdatePhone = () => {
  return useMutation({
    onError,
    mutationFn: (body: TCheckPhoneBody) => updatePhone(body),
  });
};

export const useVerifyPhoneUpdate = () => {
  return useMutation({
    onError,
    mutationFn: (body: TVerifyPhoneSignUpBody) => verifyPhoneUpdate(body),
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

export const useGetUncompletedTasks = (
  { enabled }: TGetResponse = { enabled: true }
) => {
  return useQuery({
    enabled,
    queryKey: ["task-uncompleted"],
    queryFn: () => getUncompletedTasks(),
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
