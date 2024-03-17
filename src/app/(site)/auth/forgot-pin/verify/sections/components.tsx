"use client";

import { useAtomValue } from "jotai";
import { authAtom } from "@/lib/atoms/auth.atom";

export const SubHeading = () => {
  const { phoneNumber } = useAtomValue(authAtom);
  return (
    <p className="text-sm text-slate-600 ">
      To continue, complete this verification step We’ve sent a One Time
      Password (OTP) to the phone number {phoneNumber}.
    </p>
  );
};
