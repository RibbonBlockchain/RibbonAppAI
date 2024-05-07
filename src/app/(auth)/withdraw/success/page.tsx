"use client";

import React from "react";
import Image from "next/image";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { WithdrawalSuccessfulSVG } from "@/public/images";

const WithdrawalSuccessful = () => {
  const router = useRouter();

  return (
    <div className="p-4 sm:p-6 flex flex-col justify-between h-full ">
      <Image
        alt=""
        width={100}
        height={100}
        className="w-full max-h-[30%]"
        src="/images/withdrawal-successful1.png"
      />

      <div className="flex flex-col items-center text-center gap-4 -mt-10">
        <WithdrawalSuccessfulSVG />
        <p className="text-lg font-bold">Withdrawal successful</p>
        <p className="text-[28px] font-bold">1 WLD</p>
        <p className="text-[#939393] font-base font-bold">5.520 USD</p>
      </div>

      <div className="flex flex-col gap-8 items-center justify-center w-full pb-6">
        <Button
          loading={false}
          onClick={() => router.push("/dashboard")}
          disabled={false}
        >
          Done
        </Button>

        <p className="text-base font-semibold">View details</p>
      </div>
    </div>
  );
};

export default WithdrawalSuccessful;
