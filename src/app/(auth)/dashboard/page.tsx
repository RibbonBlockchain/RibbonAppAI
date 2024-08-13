"use client";

import {
  useGetUncompletedTasks,
  useGetUncompletedSurveys,
  useGetUncompletedQuestionnaires,
} from "@/api/user";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { useGetAuth } from "@/api/auth";
import PageLoader from "@/components/loader";
import React, { useEffect, useState } from "react";
import Topbar from "@/containers/dashboard/top-bar";
import SwipeCards from "@/containers/dashboard/swipe-cards";
import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";
import ClaimDailyRewardModal from "@/components/modal/claim-daily-reward";
import { verifyPhoneTask, completeProfileTask } from "@/lib/values/mockData";

const TasksSample = [
  { id: 1, task: "Follow us on twitter (X)", rewardPoints: 5000 },
  { id: 2, task: "Subscribe to our telegram channel", rewardPoints: 5000 },
  { id: 3, task: "Follow us on twitter (X)", rewardPoints: 5000 },
  { id: 4, task: "Subscribe to our telegram channel", rewardPoints: 5000 },
  { id: 5, task: "Follow us on twitter (X)", rewardPoints: 5000 },
];

const Dashboard = () => {
  const [priorityTask, setPriorityTask] = React.useState<any>([]);

  const { data: user } = useGetAuth({ enabled: true });

  const [hideBalance, setHideBalance] = useState(false);
  const [showDailyRewardModal, setShowDailyRewardModal] = useState(false);

  const { data: questionnaire, isLoading } = useGetUncompletedQuestionnaires();
  const { data: survey } = useGetUncompletedSurveys();
  const { data: task } = useGetUncompletedTasks();

  // lastclickTime, currentTime, twelveHoursLater, remainingTime
  const clickedTime = new Date(user?.lastClaimTime);
  const twelveHoursLater = new Date(
    clickedTime.getTime() + 12 * 60 * 60 * 1000
  );

  const currentTime = new Date();
  const remainingTime = Math.max(
    Math.floor((twelveHoursLater.getTime() - currentTime.getTime()) / 1000),
    0
  );

  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  isLoading && <PageLoader />;

  const [activeMenu, setActiveMenu] = useState("questionnaires");

  React.useEffect(() => {
    if (user?.id && !user?.phone) {
      setPriorityTask((prev: any) => {
        const newState = [...prev];
        const found = newState.findIndex((t: any) => t.id === "verify-phone");

        if (found === -1) newState.push(verifyPhoneTask as any);
        return newState;
      });
    }

    if (user?.id && !user?.email) {
      setPriorityTask((prev: any) => {
        const newState = [...prev];
        const found = priorityTask.findIndex(
          (t: any) => t.id === "complete-profile"
        );

        if (found === -1) newState.push(completeProfileTask as any);
        return newState;
      });
    }
  }, [user?.id, user?.email]);

  useEffect(() => {
    if (user) {
      const isNew = !localStorage.getItem(`walkthroughCompleted_${user?.id}`);
      setIsNewUser(isNew);
    }
  }, []);

  return (
    <AuthNavLayout>
      <div className="w-full text-white bg-[#0B0228] p-4 sm:p-6">
        <div className="relative mx-auto flex flex-col items-center justify-center content-center">
          <Topbar />

          <SwipeCards />

          <div className="my-6 w-full gap-1 xxs:gap-2 max-w-[350px] mx-auto flex flex-row items-center justify-between text-xs font-semibold py-1.5 px-3 text-white bg-[#3f3952] border-[#4B199C] border-[2px] rounded-full">
            <p>Claim daily reward</p>
            <div className="flex flex-row items-center">
              <Image
                src="/assets/coin.png"
                alt="coin"
                height={32}
                width={32}
                className="w-[32px] h-[32px]"
              />
              <p>5000 pts</p>
            </div>
            <p
              onClick={() => setShowDailyRewardModal(true)}
              className="px-2 py-1 text-[#290064] bg-white shadow shadow-white border rounded-full"
            >
              Claim
            </p>
          </div>

          <div className="w-full flex flex-row items-center justify-between text-sm">
            <div className="flex flex-row gap-2">
              <div
                onClick={() => setActiveMenu("questionnaires")}
                className={clsx(
                  "h-[32px] flex text-center items-center px-[9px] rounded-[20px] border border-[#EFE6FD]",
                  activeMenu === "questionnaires"
                    ? "bg-white text-[#290064] font-bold"
                    : "bg-[inherit] text-white font-medium"
                )}
              >
                Questionnarie
              </div>

              <div
                onClick={() => setActiveMenu("surveys")}
                className={clsx(
                  "h-[32px] flex text-center items-center px-[9px] rounded-[20px] border border-[#EFE6FD]",
                  activeMenu === "surveys"
                    ? "bg-white text-[#290064] font-bold"
                    : "bg-[inherit] text-white font-medium"
                )}
              >
                Surveys
              </div>

              <div
                onClick={() => setActiveMenu("tasks")}
                className={clsx(
                  "h-[32px] flex text-center items-center px-[9px] rounded-[20px] border border-[#EFE6FD]",
                  activeMenu === "tasks"
                    ? "bg-white text-[#290064] font-bold"
                    : "bg-[inherit] text-white font-medium"
                )}
              >
                Tasks
              </div>
            </div>
          </div>
        </div>

        <div className="py-10 mb-8 text-sm bg-[#0B0228]">
          {activeMenu === "questionnaires" && (
            <div>
              {questionnaire?.map((i: any) => (
                <div key={i.id} className="flex flex-col gap-2">
                  <Link
                    href={`/questionnaire/${i.id}`}
                    className="flex flex-row items-center justify-between text-sm text-white"
                  >
                    <div>
                      <p className="font-bold mb-1">{i.name}</p>
                      <div className="-ml-2 flex flex-row items-center font-medium">
                        <Image
                          src="/assets/coin.png"
                          alt="coin"
                          height={32}
                          width={32}
                        />
                        <p>{i.reward * 5000} points</p>
                      </div>
                    </div>
                    <button className="py-2 px-6 font-bold bg-[#A166F5] rounded-full">
                      Go
                    </button>
                  </Link>

                  <div className="flex self-center mb-6">
                    <Image
                      alt="hr"
                      height={1}
                      width={240}
                      className="w-auto h-auto"
                      src="/assets/horizontal-line.png"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeMenu === "surveys" && (
            <div>
              {survey?.map((i: any) => (
                <div key={i.id} className="flex flex-col gap-2">
                  <Link
                    href={`/survey/${i.id}`}
                    className="flex flex-row items-center justify-between text-sm text-white"
                  >
                    <div>
                      <p className="font-bold mb-1">{i.name}</p>
                      <div className="-ml-2 flex flex-row items-center font-medium">
                        <Image
                          src="/assets/coin.png"
                          alt="coin"
                          height={32}
                          width={32}
                        />
                        <p>{i.reward * 5000} points</p>
                      </div>
                    </div>
                    <button className="py-2 px-6 font-bold bg-[#A166F5] rounded-full">
                      Go
                    </button>
                  </Link>

                  <div className="flex self-center mb-6">
                    <Image
                      alt="hr"
                      height={1}
                      width={240}
                      className="w-auto h-auto"
                      src="/assets/horizontal-line.png"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeMenu === "tasks" && (
            <div>
              {TasksSample?.map((i: any) => (
                <div key={i.id} className="flex flex-col gap-2">
                  <Link
                    href={`/tasks/${i.id}`}
                    className="flex flex-row items-center justify-between text-sm text-white"
                  >
                    <div>
                      <p className="font-bold mb-1">{i.task}</p>
                      <div className="-ml-2 flex flex-row items-center font-medium">
                        <Image
                          src="/assets/coin.png"
                          alt="coin"
                          height={32}
                          width={32}
                        />
                        <p>{i.rewardPoints} points</p>
                      </div>
                    </div>
                    <button className="py-2 px-6 font-bold bg-[#A166F5] rounded-full">
                      Go
                    </button>
                  </Link>

                  <div className="flex self-center mb-6">
                    <Image
                      alt="hr"
                      height={1}
                      width={240}
                      className="w-auto h-auto"
                      src="/assets/horizontal-line.png"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ClaimDailyRewardModal
        closeModal={() => {
          setShowDailyRewardModal(false);
        }}
        disabled={remainingTime > 0}
        isOpen={showDailyRewardModal}
      />
    </AuthNavLayout>
  );
};

export default Dashboard;
