"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CompleteActivities = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/dashboard")}
      className="bg-[#FFFFFF] my-2 p-2 flex items-center justify-between rounded-md"
    >
      <div className="flex flex-row gap-3 items-center justify-center">
        <Image
          priority
          width={52}
          height={54}
          alt="avatar"
          src="/assets/gift-box.png"
          className="bg-stone-300"
        />
        <div className="flex flex-col">
          <p className="text-base font-semibold">Complete activities</p>
          <p className="text-xs font-medium text-[#626262]">
            Complete more activities and earn more ribbon
          </p>
        </div>
      </div>
      <Image
        priority
        width={37}
        height={35}
        alt="avatar"
        src="/assets/continue.png"
      />
    </div>
  );
};

export default CompleteActivities;
