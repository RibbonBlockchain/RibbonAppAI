"use client";

import React, { useEffect } from "react";
import { useGetAuth } from "@/api/auth";
import { useGetTasksInProgress } from "@/api/user";
import CoinSVG from "../../../../public/images/coin";
import InProgress from "@/containers/activity/in-progress";
import CompletedTasks from "@/containers/activity/completed-tasks";
import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";

const Activity = () => {
  const { data: user } = useGetAuth({ enabled: true });
  const { data, isSuccess } = useGetTasksInProgress();

  const [activeTab, setActiveTab] = React.useState("");

  useEffect(() => {
    const pending = localStorage.getItem("activeActivityTab");
    if (pending === "pending") {
      setActiveTab("pending");
    } else if (pending === "completed") {
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
      <div className="bg-[#F9F9F9] min-h-screen">
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between py-3">
            <h1 className="text-2xl font-extrabold mt-3">Activity</h1>
            <div className="bg-[#FCECF0] text-[#7C56FE] rounded-full flex flex-row px-2 py-2 gap-2 items-center justify-center text-[10px] font-bold">
              <CoinSVG width={12} height={12} fill="#6200EE" />
              {user?.wallet.balance} WLD
            </div>
          </div>

          <div className="flex mx-auto mt-4 items-center justify-start gap-4">
            <div
              className={
                activeTab === "pending"
                  ? "flex flex-row items-center gap-2 text-white font-semibold border border-[#6200EE] bg-gradient-to-r from-[#714EE7] to-[#A81DA6] py-3 px-4 rounded-full text-sm"
                  : "flex flex-row items-center gap-2 text-[#080808] font-semibold border border-[#6200EE] bg-[#F2EEFF] py-3 px-4 rounded-full text-sm"
              }
              onClick={() => handleTabClick("pending")}
            >
              Pending
              {activeTab === "pending" && (
                <p className="w-5 h-5 text-xs text-center pt-[2px] bg-white text-[#DF900A] rounded-full">
                  {data?.length}
                </p>
              )}
            </div>
            <div
              className={
                activeTab === "completed"
                  ? "text-white font-semibold border border-[#6200EE] bg-gradient-to-r from-[#714EE7] to-[#A81DA6] py-3 px-4 rounded-full text-sm"
                  : "text-[#080808] font-semibold border border-[#6200EE] bg-[#F2EEFF] py-3 px-4 rounded-full text-sm"
              }
              onClick={() => handleTabClick("completed")}
            >
              Completed tasks
            </div>
          </div>
        </div>

        {activeTab === "completed" ? <CompletedTasks /> : <InProgress />}
      </div>
    </AuthNavLayout>
  );
};

export default Activity;
