import { client } from "../api-client";
import { TOnboardOTPRequest } from "./types";

export const onboardOTPRequest = async (body: TOnboardOTPRequest) => {
  const res = await client.post("/auth/onboard/otp/request", body);
  return res.data;
};
