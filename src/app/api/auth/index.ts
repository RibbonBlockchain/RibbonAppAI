import { useMutation } from "@tanstack/react-query";
import { onboardOTPRequest, onboardOTPVerify } from "./req";
import { TOnboardOTPRequest, TOnboardOTPVerify } from "./types";

export const useOnboardOTPRequest = () => {
  return useMutation({
    mutationFn: (body: TOnboardOTPRequest) => onboardOTPRequest(body),
  });
};

export const useOnboardOTPVerify = () => {
  return useMutation({
    mutationFn: (body: TOnboardOTPVerify) => onboardOTPVerify(body),
  });
};
