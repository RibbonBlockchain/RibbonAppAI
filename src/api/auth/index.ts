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
  getQuestionnaires,
} from "./req";

import {
  TGetAuth,
  TCheckPhoneBody,
  TPhoneLoginBody,
  TPhoneSignPinUpBody,
  TVerifyPhoneSignUpBody,
  TPhoneSignUpRequestBody,
  TGetQuestionnaires,
} from "./types";

import {
  authAtom,
  logoutAtom,
  prepareRequestHeader,
} from "@/lib/atoms/auth.atom";
import { useAtom, useAtomValue } from "jotai";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { onError, onSuccess } from "../api-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SUCCESS, TOKEN_KEY } from "@/lib/values/constants";

export const useGetAuth = ({ enabled }: TGetAuth = { enabled: false }) => {
  return useQuery({ enabled, queryKey: ["auth"], queryFn: () => getAuth() });
};

export const useGetQuestionnaires = (
  { enabled }: TGetQuestionnaires = { enabled: false }
) => {
  return useQuery({
    enabled,
    queryKey: ["questionnaires"],
    queryFn: () => getQuestionnaires(),
  });
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
