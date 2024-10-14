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
import RewardButton from "../../../containers/dashboard/reward-button";
import { verifyPhoneTask, completeProfileTask } from "@/lib/values/mockData";
import MoodModal from "@/containers/dashboard/mood-modal";

const TasksSample = [
  { id: 1, task: "Follow us on twitter (X)", rewardPoints: 5000 },
  { id: 2, task: "Subscribe to our telegram channel", rewardPoints: 5000 },
  { id: 3, task: "Follow us on twitter (X)", rewardPoints: 5000 },
  { id: 4, task: "Subscribe to our telegram channel", rewardPoints: 5000 },
  { id: 5, task: "Follow us on twitter (X)", rewardPoints: 5000 },
];

const Dashboard = () => {
  const [priorityTask, setPriorityTask] = React.useState<any>([]);

  const [moodModal, setMoodModal] = useState(false);

  const { data: user } = useGetAuth({ enabled: true });

  const [hideBalance, setHideBalance] = useState(false);

  const { data: questionnaire, isLoading } = useGetUncompletedQuestionnaires();
  const { data: survey } = useGetUncompletedSurveys();
  const { data: task } = useGetUncompletedTasks();

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
      <div className="w-full min-h-screen text-white bg-[#0B0228] p-4 sm:p-6">
        <div className="relative mx-auto flex flex-col items-center justify-center content-center">
          <Topbar />

          <SwipeCards />

          <RewardButton />
          <div
            onClick={() => setMoodModal(true)}
            className="mb-6 w-full  max-w-[350px] flex items-center text-center justify-center self-center text-xs font-semibold py-1.5 px-3 text-white bg-[#3f3952] border-[#4B199C] border-[2px] rounded-full h-[40px]"
          >
            Mood check
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
                        <p>{i.reward * 5000} ribbon</p>
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
                        <p>{i.reward * 5000} ribbon</p>
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
                        <p>{i.rewardPoints} ribbon</p>
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

      {moodModal && (
        <MoodModal isOpen={moodModal} onClose={() => setMoodModal(false)} />
      )}
    </AuthNavLayout>
  );
};

export default Dashboard;
