"use client";

import React from "react";
import Image from "next/image";
import CoinSVG from "@/public/images/coin";
import { SwapIconGray } from "@/public/images";
import { useGetAuth } from "@/api/auth";
import { useGetCompletedTasks } from "@/api/user";

const BalanceDetails = ({
  text,
  logo,
  value,
}: {
  text: string;
  logo: string;
  value: string | number;
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-3 gap-1">
      <Image
        src={logo}
        alt="trophy"
        width={30}
        height={30}
        className="h-[35px]"
      />
      <p className="text-lg font-bold">{value}</p>
      <p className="text-xs font-medium text-[#626262]">{text}</p>
    </div>
  );
};

const UserBalanceAndPoints = () => {
  const { data: user } = useGetAuth({ enabled: true });
  const pointBalance = user?.wallet.balance * 5000;
  const tokenSpent = user?.wallet.spent || 0;

  const { data: completedTasks } = useGetCompletedTasks();

  return (
    <div className="bg-white rounded-2xl py-6 px-4">
      <div className="flex flex-row gap-2 items-center justify-center text-lg font-bold">
        <CoinSVG fill="#7C56FE" />
        <p className="text-[28px] text-[#7C56FE] font-bold">
          {user?.wallet.balance} WLD
        </p>
      </div>

      <div className="flex flex-row items-center justify-center text-[#626262] gap-1 mt-2 text-xs">
        <SwapIconGray /> <p>{pointBalance.toLocaleString()} points</p>
      </div>

      <div className="grid grid-cols-2 items-center justify-center mt-6">
        <BalanceDetails
          value={pointBalance.toLocaleString()}
          text={"Points earned"}
          logo={"/images/points-earned.png"}
        />
        <BalanceDetails
          value={0}
          text={"Daily rewards claimed"}
          logo={"/images/tokens-spent.png"}
        />
        <BalanceDetails
          value={tokenSpent}
          text={"Tokens spent"}
          logo={"/images/tokens-spent.png"}
        />
        <BalanceDetails
          value={completedTasks?.data.length | 0}
          text={"Completed task"}
          logo={"/images/tasks-completed.png"}
        />
      </div>
    </div>
  );
};

export default UserBalanceAndPoints;
