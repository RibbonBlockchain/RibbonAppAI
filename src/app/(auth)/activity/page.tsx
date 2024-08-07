"use client";

import Image from "next/image";
import { useGetAuth } from "@/api/auth";
import React, { useEffect } from "react";
import FloatingIcon from "../dashboard/floating-icon";
import InProgress from "@/containers/activity/in-progress";
import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";
import CompletedActivities from "@/containers/activity/completed-tasks";
import { useGetSurveysInProgress, useGetTasksInProgress } from "@/api/user";

const Activity = () => {
  const { data: user } = useGetAuth({ enabled: true });
  const { data: inProgress, isSuccess } = useGetTasksInProgress();
  const { data: surveysInProgress } = useGetSurveysInProgress();

  const totalInPending = surveysInProgress?.length + inProgress?.length;

  const [activeTab, setActiveTab] = React.useState("");
  const [switchBalance, setSwitchBalance] = React.useState(false);
  const pointBalance = user?.wallet.balance * 5000;

  useEffect(() => {
    const status = localStorage.getItem("activeActivityTab");
    if (status === "pending") {
      setActiveTab("pending");
    } else if (status === "completed") {
      setActiveTab("completed");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("activeActivityTab", activeTab);
  }, [activeTab]);

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  return (
    <AuthNavLayout>
      <div className="relative min-h-screen w-full text-white bg-[#0B0228] p-4 sm:p-6 pb-24">
        <FloatingIcon />

        <div className="flex items-center justify-between py-3">
          <h1 className="text-2xl font-extrabold mt-3">Activity</h1>
          <div
            onClick={() => setSwitchBalance(!switchBalance)}
            className="bg-[#FCECF0] text-[#7C56FE] rounded-full flex flex-row px-2 py-2 gap-2 items-center justify-center text-[10px] font-bold cursor-pointer"
          >
            <Image
              alt="coin"
              width={32}
              height={32}
              src="/assets/coin.png"
              className="w-[32px] h-[32px] -ml-2 -mr-2"
            />{" "}
            {switchBalance
              ? `${user?.wallet.balance} WLD`
              : `${pointBalance.toLocaleString()} points`}
          </div>
        </div>

        <div className="flex cursor-pointer mx-auto mt-4 items-center justify-start gap-3">
          <div
            className={
              activeTab === "pending"
                ? "w-[109px] h-[45px] flex flex-row items-center gap-2 text-white font-semibold border border-[#6200EE] bg-gradient-to-r from-[#714EE7] to-[#A81DA6] py-3 px-4 rounded-full text-xs"
                : "w-[109px] h-[45px] flex flex-row items-center gap-2 text-[#080808] font-semibold border border-[#6200EE] bg-[#F2EEFF] py-3 px-4 rounded-full text-xs"
            }
            onClick={() => handleTabClick("pending")}
          >
            Pending
            {activeTab === "pending" && (
              <p className="w-5 h-5 text-xs text-center pt-[2px] bg-white text-[#DF900A] rounded-full">
                {totalInPending}
              </p>
            )}
          </div>
          <div
            className={
              activeTab === "completed"
                ? "h-[45px] text-white font-semibold border border-[#6200EE] bg-gradient-to-r from-[#714EE7] to-[#A81DA6] py-3 px-2 rounded-full text-xs flex items-center text-center"
                : "h-[45px] text-[#080808] font-semibold border border-[#6200EE] bg-[#F2EEFF] py-3 px-2 rounded-full text-xs flex items-center text-center"
            }
            onClick={() => handleTabClick("completed")}
          >
            Completed activities
          </div>
        </div>

        <div className="pb-28">
          {activeTab === "completed" ? <CompletedActivities /> : <InProgress />}
        </div>
      </div>
    </AuthNavLayout>
  );
};

export default Activity;
