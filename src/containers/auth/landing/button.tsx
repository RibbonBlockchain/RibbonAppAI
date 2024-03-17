"use client";

import React from "react";
import Image from "next/image";
import Button from "@/components/button";
import { signIn } from "next-auth/react";

type Props = { children?: React.ReactNode };

export const WorldIdButton = ({ children }: Props) => {
  const handleClick = () => signIn("worldcoin");

  return (
    <Button
      onClick={handleClick}
      className="bg-gray-900 border-gray-900 flex flex-row items-center justify-center text-center text-base font-semibold gap-3 rounded-xl border-2"
    >
      <span>{children}</span>
      <Image
        width={24}
        height={24}
        alt="world-coin"
        src="/images/world-coin.svg"
      />
    </Button>
  );
};
