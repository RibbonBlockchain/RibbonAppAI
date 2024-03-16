"use client";

import React from "react";
import InProgress from "@/containers/activity/in-progress";
import CompletedTasks from "@/containers/activity/completed-tasks";
import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";

const Activity = () => {
  const [activeTab, setActiveTab] = React.useState("in-progress");

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  return (
    <AuthNavLayout>
      <div className="bg-[#F9F9F9] min-h-screen">
        <div className="bg-white  p-4 sm:p-6">
          <h1 className="text-2xl font-extrabold mt-3">Activity</h1>
          <div className="flex mx-auto mt-4 items-center justify-center gap-8">
            <div
              className={
                activeTab === "in-progress"
                  ? "text-[#6200EE] font-bold flex flex-col items-center justify-center text-sm"
                  : "text-[#939393] font-bold flex flex-col items-center justify-center text-sm"
              }
              onClick={() => handleTabClick("in-progress")}
            >
              In-progress
              {activeTab === "in-progress" ? (
                <hr className="h-[5px] rounded-full bg-[#6200EE] w-[40px] mt-2 align-middle"></hr>
              ) : (
                <hr className="h-[5px] rounded-full bg-[#939393] w-[40px] mt-2 align-middle"></hr>
              )}
            </div>
            <div
              className={
                activeTab === "completed"
                  ? "text-[#6200EE] font-bold flex flex-col items-center justify-center text-sm"
                  : "text-[#939393] font-bold flex flex-col items-center justify-center text-sm"
              }
              onClick={() => handleTabClick("completed")}
            >
              Completed tasks
              {activeTab === "completed" ? (
                <hr className="h-[5px] rounded-full bg-[#6200EE] w-[40px] mt-[6px] align-middle"></hr>
              ) : (
                <hr className="h-[5px] rounded-full bg-[#939393] w-[40px] mt-[6px] align-middle"></hr>
              )}
            </div>
          </div>
        </div>

        {activeTab === "completed" ? <CompletedTasks /> : <InProgress />}
      </div>
    </AuthNavLayout>
  );
};

export default Activity;
