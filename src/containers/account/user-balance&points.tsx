"use client";

import React from "react";
import Image from "next/image";
import { useGetAuth } from "@/api/auth";
import { ArrowSwapHorizontal } from "iconsax-react";
import { useGetCompletedSurveys, useGetCompletedTasks } from "@/api/user";

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
        width={35}
        height={35}
        className="h-[35px] w-[35px]"
      />
      <p className="text-lg font-bold">{value}</p>
      <p className="text-xs font-medium text-center text-[#626262]">{text}</p>
    </div>
  );
};

const UserBalanceAndPoints = () => {
  const { data: user } = useGetAuth({ enabled: true });

  const balance = user?.wallet.balance;
  const pointBalance = user?.wallet.balance * 5000;
  const tokenSpent = user?.wallet.spent || 0;

  const { data: questionnaires } = useGetCompletedTasks();
  const filterQuestionnaires = questionnaires?.data.filter(
    (item: { type: string }) => item.type === "QUESTIONNAIRE"
  );

  const { data: completedSurveys } = useGetCompletedSurveys();

  return (
    <div className="bg-white rounded-2xl py-6 px-4">
      <div className="flex flex-row gap-2 items-center justify-center text-lg font-bold">
        <Image
          alt="coin"
          width={32}
          height={32}
          src="/assets/coin.png"
          className="w-[32px] h-[32px]"
        />{" "}
        <p className="text-[28px] text-[#7C56FE] font-bold">
          {balance.toFixed(2)} USDC
        </p>
      </div>

      <div className="flex flex-row items-center justify-center text-[#626262] gap-1 mt-2 text-xs">
        <ArrowSwapHorizontal /> <p>{pointBalance.toLocaleString()} ribbon</p>
      </div>

      <div className="grid grid-cols-2 items-center justify-center mt-6">
        <BalanceDetails
          value={pointBalance.toLocaleString()}
          text={"Ribbon earned"}
          logo={"/assets/points-earned.png"}
        />
        <BalanceDetails
          value={user?.numberOfClaims}
          text={"Daily rewards claimed"}
          logo={"/assets/daily-rewards-claimed.png"}
        />
        <BalanceDetails
          value={tokenSpent}
          text={"Tokens spent"}
          logo={"/assets/tokens-spent.png"}
        />
        <BalanceDetails
          value={filterQuestionnaires?.length | 0}
          text={"Completed questionnaires"}
          logo={"/assets/tasks-completed.png"}
        />
        <BalanceDetails
          value={0}
          text={"Completed tasks"}
          logo={"/assets/tasks-completed.png"}
        />
        <BalanceDetails
          value={completedSurveys?.data.length | 0}
          text={"Completed surveys"}
          logo={"/assets/tasks-completed.png"}
        />
      </div>
    </div>
  );
};

export default UserBalanceAndPoints;
