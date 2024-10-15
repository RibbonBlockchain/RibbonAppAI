"use client";

import { useAtom } from "jotai";
import { useAtomValue } from "jotai";
import { authAtom } from "@/lib/atoms/auth.atom";
import BackArrowButton from "@/components/button/back-arrow";

export const SubHeading = () => {
  const { phoneNumber } = useAtomValue(authAtom);
  return <p className="text-sm">A code has been sent to {phoneNumber}</p>;
};

export const BackArrow = ({ stroke }: { stroke?: string }) => {
  const [_, setState] = useAtom(authAtom);

  const handleClick = () => {
    setState((prev) => ({ ...prev, code: "" }));
  };

  return <BackArrowButton stroke={stroke} onClick={handleClick} />;
};
