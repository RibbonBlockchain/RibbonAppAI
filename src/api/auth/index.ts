import {
  logout,
  getAuth,
  changePin,
  forgotPin,
  checkPhone,
  phoneLogin,
  updatePhone,
  createNewPin,
  phoneSignUpPin,
  verifyForgotPin,
  verifyPhoneSignUp,
  verifyPhoneUpdate,
  phoneSignUpRequest,
  checkMail,
  verifyEmailSignUp,
  passwordSignUp,
  emailLogin,
  loginPassword,
} from "./req";

import {
  TGetAuth,
  TGetResponse,
  TChangePinBody,
  TCheckPhoneBody,
  TPhoneLoginBody,
  TCreateNewPinBody,
  TPhoneSignPinUpBody,
  TVerifyPhoneSignUpBody,
  TPhoneSignUpRequestBody,
  TCheckEmailody,
  TVerifyEmailSignUpBody,
  TCreateNewPasswordBody,
  TEmailLoginBody,
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
import { getUserNotifications } from "../user/req";
import { SUCCESS, TOKEN_KEY } from "@/lib/values/constants";
import { useMutation, useQuery } from "@tanstack/react-query";

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
      //setAuth((prev) => ({ ...prev, token }));
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

export const useChangePin = () => {
  return useMutation({
    onError,
    mutationFn: (body: TChangePinBody) => changePin(body),
  });
};

// forgot pin
export const useForgotPin = () => {
  return useMutation({
    onError,
    mutationFn: (body: TCheckPhoneBody) => forgotPin(body),
  });
};

export const useVerifyPhoneForgotPassword = () => {
  return useMutation({
    onError,
    mutationFn: (body: TVerifyPhoneSignUpBody) => verifyForgotPin(body),
  });
};

export const useCreateNewPin = () => {
  return useMutation({
    onError,
    mutationFn: (body: TCreateNewPinBody) => createNewPin(body),
  });
};

// Organization email
export const useCheckMail = () => {
  return useMutation({
    onError,
    mutationFn: (body: TCheckEmailody) => checkMail(body),
  });
};

export const useVerifyEmailSignUp = () => {
  return useMutation({
    onError,
    mutationFn: (body: TVerifyEmailSignUpBody) => verifyEmailSignUp(body),
  });
};

export const usePasswordSignUp = () => {
  return useMutation({
    onError,
    mutationFn: (body: TCreateNewPasswordBody) => passwordSignUp(body),
    onSuccess: (data) => {
      const msg = data?.data.message || SUCCESS;
      const token = data?.data?.data?.accessToken;

      toast.success(msg);
      prepareRequestHeader(token);
      //setAuth((prev) => ({ ...prev, token }));
      sessionStorage.setItem(TOKEN_KEY, token);
    },
  });
};

export const useLoginPassword = () => {
  return useMutation({
    onError,
    mutationFn: (body: TEmailLoginBody) => loginPassword(body),
  });
};

export const useEmailLogin = () => {
  return useMutation({
    onError,
    mutationFn: (body: TEmailLoginBody) => emailLogin(body),
    onSuccess: (data) => {
      const msg = data?.message || SUCCESS;
      const token = data?.data?.accessToken;

      toast.success(msg);
      prepareRequestHeader(token);
      //setAuth((prev) => ({ ...prev, token }));
      sessionStorage.setItem(TOKEN_KEY, token);
    },
  });
};
