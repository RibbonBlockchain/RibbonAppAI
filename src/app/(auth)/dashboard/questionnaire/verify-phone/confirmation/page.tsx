"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BackArrow } from "@/containers/auth/signup/verify/sections/components";

export default function Confirmation() {
  return (
    <div className="p-4 sm:p-6 min-h-screen flex flex-col w-full items-center justify-between ">
      <div className="h-full flex  self-start justify-start">
        <BackArrow />
      </div>

      <div className="flex items-center justify-center">
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
            <p>Phone number verified Successfully</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#714EE7] to-[#A81DA6] w-full mb-4 text-white text-center py-3.5 font-semibold rounded-lg">
        <Link
          href={"/dashboard/questionnaire/verify-phone/claim"}
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
