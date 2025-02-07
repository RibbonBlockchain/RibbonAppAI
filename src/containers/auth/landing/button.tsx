"use client";

import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

type Props = { children?: React.ReactNode };

export const WorldIdButton = ({ children }: Props) => {
  const handleClick = () => signIn("worldcoin");

  return (
    <button
      // onClick={handleClick}
      className="
      flex flex-row gap-3 items-center justify-center w-full text-sm font-semibold text-center px-4 py-3 rounded-xl border-2 shadow-sm transition-colors duration-100 disabled:cursor-not-allowed bg-[#DFCBFB] text-black disabled:border-stone-300 disabled:bg-stone-400/50"
    >
      <span>{children}</span>
      <Image
        width={24}
        height={24}
        alt="world-coin"
        src="/assets/world-black.svg"
      />
    </button>
  );
};
