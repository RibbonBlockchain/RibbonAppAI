"use client";

import { useAtomValue } from "jotai";
import { mobileOnboardAtom } from "@/app/lib/atoms";

export const SubHeading = () => {
  const { phoneNumber } = useAtomValue(mobileOnboardAtom);
  return (
    <p className="text-sm text-slate-600">
      A code has been sent to {phoneNumber}
    </p>
  );
};
