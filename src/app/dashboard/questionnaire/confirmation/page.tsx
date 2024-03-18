"use client";

import React from "react";

import Link from "next/link";
import { BackArrow } from "@/containers/auth/signup/verify/sections/components";
import Image from "next/image";

export default function Confirmation() {
  return (
    <div className="px-5 relative min-h-screen">
      <div className="h-full">
        <BackArrow />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <div>
            <Image
              src="/images/questionnaire/success.svg"
              alt="success"
              width={80}
              height={80}
            />
          </div>
          <div className="mt-2">
            <h1 className="text-[1.76rem] font-bold">You are all set</h1>
            <p>Pin created Successfully</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#714EE7] to-[#A81DA6] text-white text-center py-3.5 font-semibold rounded-lg fixed bottom-4 left-0 right-0 mx-4">
        <Link
          href={"/dashboard/questionnaire/claim"}
          className="flex items-center justify-center gap-2"
        >
          Claim your reward
          <Image
            src="/images/questionnaire/coins.png"
            alt="coins"
            width={22}
            height={18}
          />
        </Link>
      </div>
    </div>
  );
}
