import { onboardOTPRequest } from "./req";
import { TOnboardOTPRequest } from "./types";
import { useMutation } from "@tanstack/react-query";

export const useOnboardOTPRequest = () => {
  return useMutation({
    mutationFn: (body: TOnboardOTPRequest) => onboardOTPRequest(body),
  });
};
