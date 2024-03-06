"use client";

import React from "react";
import InProgress from "./in-progress";
import CompletedTasks from "./completed-tasks";

const Activity = () => {
  const [activeTab, setActiveTab] = React.useState("in-progress");

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="bg-[#F9F9F9] min-h-screen">
        <div className="bg-white p-4 sm:p-6">
          <h1 className="text-2xl font-extrabold mt-3">Activity</h1>
          <div className="flex mx-auto mt-4 pb-2 items-center justify-center gap-8">
            <div
              className={
                activeTab === "in-progress"
                  ? "text-[#6200EE] font-extrabold flex flex-col items-center justify-center text-sm"
                  : "text-[#939393] font-extrabold flex flex-col items-center justify-center text-sm"
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
                  ? "text-[#6200EE] font-extrabold flex flex-col items-center justify-center text-sm"
                  : "text-[#939393] font-extrabold flex flex-col items-center justify-center text-sm"
              }
              onClick={() => handleTabClick("completed")}
            >
              Completed
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
    </>
  );
};

export default Activity;
