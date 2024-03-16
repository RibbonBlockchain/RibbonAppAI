import {
  TPhoneLoginBody,
  TCheckPhoneBody,
  TCheckPhoneResponse,
  TPhoneLoginResponse,
  TVerifyPhoneSignUpBody,
  TPhoneSignUpRequestBody,
  TPhoneSignUpRequestResponse,
  TPhoneSignPinUpBody,
} from "./types";
import { TResponse, client } from "../api-client";

export const checkPhone = async (body: TCheckPhoneBody) => {
  const res = await client.post<TResponse<TCheckPhoneResponse>>(
    "/auth/phone/check",
    body
  );
  return res.data.data;
};

export const phoneLogin = async (body: TPhoneLoginBody) => {
  const res = await client.post<TResponse<TPhoneLoginResponse>>(
    "/auth/login/phone",
    body
  );
  return res.data;
};

export const phoneSignUpRequest = async (body: TPhoneSignUpRequestBody) => {
  const res = await client.post<TResponse<TPhoneSignUpRequestResponse>>(
    "/auth/signup/phone/request",
    body
  );
  return res.data.data;
};

export const verifyPhoneSignUp = async (body: TVerifyPhoneSignUpBody) => {
  const res = await client.post("/auth/signup/phone/verify", body);
  return res.data;
};

export const phoneSignUpPin = async (body: TPhoneSignPinUpBody) => {
  const res = await client.post("/auth/signup/phone/pin", body);
  return res.data;
};
