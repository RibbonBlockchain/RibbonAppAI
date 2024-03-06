import {
  TPhoneAuthBody,
  TVerifyAuthPinBody,
  TPhoneAuthResponse,
  TVerifyPhoneAuthBody,
  TVerifyAuthPinResponse,
  TPhoneOnboardBody,
} from "./types";
import { TResponse, client } from "../api-client";

export const phoneAuth = async (body: TPhoneAuthBody) => {
  const res = await client.post<TResponse<TPhoneAuthResponse>>(
    "/auth/phone",
    body
  );
  return res.data.data;
};

export const verifyPhoneAuth = async (body: TVerifyPhoneAuthBody) => {
  const res = await client.post("/auth/phone/verify", body);
  return res.data;
};

export const verifyAuthPin = async (body: TVerifyAuthPinBody) => {
  const res = await client.post<TResponse<TVerifyAuthPinResponse>>(
    "/auth/pin/verify",
    body
  );
  return res.data;
};

export const phoneOnboard = async (body: TPhoneOnboardBody) => {
  const res = await client.post<TResponse<TVerifyAuthPinResponse>>(
    "/auth/phone/onboard",
    body
  );
  return res.data;
};
