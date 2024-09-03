"use client";

import React from "react";
import Image from "next/image";
import { useGetAuth } from "@/api/auth";
import ProgressBar from "@ramonak/react-progress-bar";
import BackArrowButton from "@/components/button/back-arrow";
import InviteFriends from "@/containers/account/invite-friends";
import CompleteActivities from "@/containers/account/complete-tasks";
import UserBalanceAndPoints from "@/containers/account/user-balance&points";

const BalanceAndPoints = () => {
  const { data: user } = useGetAuth({ enabled: true });

  const balance = user?.wallet.balance;

  return (
    <div className="p-4 sm:p-6 bg-[#F7F5FF] h-auto flex flex-col">
      <div className="mb-6">
        <BackArrowButton stroke="#583DB4" />
        <div className="flex -mt-10  flex-row items-center justify-center text-base font-semibold">
          Balance & Points
        </div>
      </div>

      <UserBalanceAndPoints />

      <div className="bg-white rounded-2xl p-3 flex flex-row gap-2 items-center justify-center my-5">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-bold">Unlock Withdrawals</p>
          <div className="flex flex-col gap-1">
            <p className="text-[#626262]">
              <span className="text-xl text-black font-bold">
                {balance.toFixed(2) * 5000}
              </span>{" "}
              /10,000 ribbon
            </p>
            <div className="w-full">
              <ProgressBar
                height="3px"
                labelSize="10px"
                maxCompleted={10000}
                isLabelVisible={false}
                completed={balance.toFixed(2) * 5000}
              />
            </div>
          </div>
          <p className="text-xs font-medium">
            Complete more activities and unlock token withdrawals
          </p>
        </div>
        <div>
          <Image
            alt=""
            width={100}
            height={136}
            src="/images/unlock-more.png"
          />
        </div>
      </div>

      <div className="mb-12">
        <p className="text-[#080808] text-[14px]">Earn more ribbon</p>
        <InviteFriends className="bg-[#FFFFFF]" />
        <CompleteActivities />
      </div>
    </div>
  );
};

export default BalanceAndPoints;
