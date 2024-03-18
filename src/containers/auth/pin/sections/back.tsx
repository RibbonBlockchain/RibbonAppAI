"use client";

import { useAtom } from "jotai";
import { authAtom } from "@/lib/atoms/auth.atom";
import BackArrowButton from "@/components/button/back-arrow";

const BackArrow = () => {
  const [_, setState] = useAtom(authAtom);

  const handleClick = () => {
    setState((prev) => ({ ...prev, pin: "" }));
  };

  return <BackArrowButton onClick={handleClick} />;
};

export default BackArrow;
