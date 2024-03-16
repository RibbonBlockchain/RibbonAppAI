import {
  phoneLogin,
  checkPhone,
  verifyPhoneSignUp,
  phoneSignUpRequest,
  phoneSignUpPin,
} from "./req";

import {
  TCheckPhoneBody,
  TPhoneLoginBody,
  TVerifyPhoneSignUpBody,
  TPhoneSignUpRequestBody,
  TPhoneSignPinUpBody,
} from "./types";

import { useAtom } from "jotai";
import toast from "react-hot-toast";
import { onError } from "../api-client";
import { useMutation } from "@tanstack/react-query";
import { SUCCESS, TOKEN_KEY } from "@/lib/values/constants";

import { authAtom, prepareRequestHeader } from "@/lib/atoms/auth.atom";

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
