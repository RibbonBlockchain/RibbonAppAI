"use client";

import { useAtomValue } from "jotai";
import { phoneAuthAtom } from "@/lib/atoms/auth.atom";

export const SubHeading = () => {
  const { phoneNumber } = useAtomValue(phoneAuthAtom);
  return (
    <p className="text-sm text-slate-600">
      A code has been sent to {phoneNumber}
    </p>
  );
};
