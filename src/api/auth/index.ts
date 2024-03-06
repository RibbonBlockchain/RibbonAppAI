import {
  TPhoneAuthBody,
  TPhoneOnboardBody,
  TVerifyAuthPinBody,
  TVerifyPhoneAuthBody,
} from "./types";
import { useAtom } from "jotai";
import toast from "react-hot-toast";
import { onError } from "../api-client";
import { useMutation } from "@tanstack/react-query";
import { SUCCESS, TOKEN_KEY } from "@/lib/values/constants";
import { phoneAuth, phoneOnboard, verifyAuthPin, verifyPhoneAuth } from "./req";
import { authAtom, prepareRequestHeader } from "@/lib/atoms/auth.atom";

export const usePhoneAuth = () => {
  return useMutation({
    onError,
    mutationFn: (body: TPhoneAuthBody) => phoneAuth(body),
  });
};

export const useOnboardOTPVerify = () => {
  return useMutation({
    onError,
    mutationFn: (body: TVerifyPhoneAuthBody) => verifyPhoneAuth(body),
  });
};

export const useVerifyAuthPin = () => {
  const [_, setAuth] = useAtom(authAtom);

  return useMutation({
    onError,
    mutationFn: (body: TVerifyAuthPinBody) => verifyAuthPin(body),
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

export const usePhoneOnboard = () => {
  const [_, setAuth] = useAtom(authAtom);

  return useMutation({
    onError,
    mutationFn: (body: TPhoneOnboardBody) => phoneOnboard(body),
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
