"use client";

import { useAtom } from "jotai";
import { authAtom } from "@/lib/atoms/auth.atom";
import BackArrowButton from "@/components/button/back-arrow";

const BackArrow = ({ stroke }: { stroke?: string }) => {
  const [_, setState] = useAtom(authAtom);

  const handleClick = () => {
    setState((prev) => ({ ...prev, phoneNumber: "" }));
  };

  return <BackArrowButton stroke={stroke} onClick={handleClick} />;
};

export default BackArrow;
