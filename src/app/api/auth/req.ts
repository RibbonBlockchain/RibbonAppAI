import { client } from "../api-client";
import { TOnboardOTPRequest, TOnboardOTPVerify } from "./types";

export const onboardOTPRequest = async (body: TOnboardOTPRequest) => {
  const res = await client.post("/auth/onboard/otp/request", body);
  return res.data;
};

export const onboardOTPVerify = async (body: TOnboardOTPVerify) => {
  const res = await client.post("/auth/onboard/otp/verify", body);
  return res.data;
};
