import { updateProfile } from "./req";
import { onError } from "../api-client";
import { TUpdateProfileBody } from "./types";
import { useMutation } from "@tanstack/react-query";

export const useUpdateProfile = () => {
  return useMutation({
    onError,
    mutationFn: (body: TUpdateProfileBody) => updateProfile(body),
  });
};
