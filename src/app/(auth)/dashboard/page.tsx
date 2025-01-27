"use client";

import {
  healthMenu,
  TasksSample,
  financeMenu,
  categoryTabs,
  ecommerceMenu,
  trendingItems,
} from "@/lib/values/constants";
import {
  useGetUncompletedTasks,
  useGetUncompletedSurveys,
  useGetUncompletedQuestionnaires,
} from "@/api/user";
import Link from "next/link";
import Image from "next/image";
import { useGetAuth } from "@/api/auth";
import PageLoader from "@/components/loader";
import React, { useEffect, useState } from "react";
import Topbar from "@/containers/dashboard/top-bar";
import MoodModal from "@/containers/dashboard/mood-modal";
import SwipeCards from "@/containers/dashboard/swipe-cards";
import ActivityButton from "@/components/button/activity-button";
import { serviceList } from "@/components/store/store-component";
import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";
import RewardButton from "../../../containers/dashboard/reward-button";
import { verifyPhoneTask, completeProfileTask } from "@/lib/values/mockData";
import Lend from "./lend/lend";
import Borrow from "./lend/borrow";
import MoneyClubs from "./moneyclubs";

const Dashboard = () => {
  const [priorityTask, setPriorityTask] = React.useState<any>([]);

  const [moodModal, setMoodModal] = useState(false);

  const { data: user } = useGetAuth({ enabled: true });

  const { data: questionnaire, isLoading } = useGetUncompletedQuestionnaires();
  const { data: survey } = useGetUncompletedSurveys();
  const { data: task } = useGetUncompletedTasks();

  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  isLoading && <PageLoader />;

  const [selectedCategoryTab, setSelectedCategoryTab] = useState(() => {
    const savedTab = localStorage.getItem("currentCategoryTab");
    return savedTab ? savedTab : "health";
  });

  const handleCategoryTabClick = (tab: string) => {
    setSelectedCategoryTab(tab);
    localStorage.setItem("currentCategoryTab", tab);
  };

  const [displayMenu, setDisplayMenu] = useState(() => {
    const savedTab = localStorage.getItem("currentMenu");
    return savedTab ? savedTab : "questionnaires";
  });

  const [activeMenu, setActiveMenu] = useState(displayMenu);

  useEffect(() => {
    if (selectedCategoryTab === "health") {
      const newMenu = localStorage.getItem("currentMenu");
      newMenu ? setDisplayMenu(newMenu) : setDisplayMenu("questionnaires");
    } else if (selectedCategoryTab === "finance") {
      const newMenu = localStorage.getItem("currentMenu");
      newMenu ? setDisplayMenu(newMenu) : setDisplayMenu("borrow");
    } else {
      const newMenu = localStorage.getItem("currentMenu");
      newMenu ? setDisplayMenu(newMenu) : setDisplayMenu("shop");
    }
  }, [selectedCategoryTab]);

  useEffect(() => {
    setActiveMenu(displayMenu);
  }, [displayMenu]);

  const handleActiveMenuClick = (menu: string) => {
    setActiveMenu(menu);
    localStorage.setItem("currentMenu", menu);
  };

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
          <Topbar>
            <Image
              src="/assets/ribbon.png"
              alt="coin"
              height={15}
              width={72}
              className="w-[72px] h-[15px]"
            />
          </Topbar>

          <div className="w-full">
            <SwipeCards />
          </div>

          <div className="mt-4 w-full flex flex-row items-center justify-between gap-2">
            <RewardButton />
            <Image
              width={150}
              height={88}
              alt="mood-check"
              className="w-full"
              src={"/assets/mood-check.svg"}
              onClick={() => setMoodModal(true)}
            />
          </div>

          <div className="mt-6 flex flex-row items-start justify-start gap-2 w-full overflow-x-auto scroll-hidden">
            {categoryTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => handleCategoryTabClick(tab.value)}
                className={`${
                  tab.bgColor
                } min-w-fit flex flex-row items-center justify-center gap-1.5 text-[15px] px-3 pt-[7px] pb-[6px] rounded-[32px] ${
                  selectedCategoryTab === tab.value
                    ? `text-white border-[2px] border-[#FFFFFF] font-bold`
                    : `text-[#F2EEFF] border-[2px] border-transparent font-medium`
                }`}
              >
                {tab.name}
                <Image src={tab.emoji} alt="emoji" height={20} width={20} />
              </button>
            ))}
          </div>
        </div>

        {selectedCategoryTab === "health" && (
          <div className="mt-4">
            <div className="flex flex-row items-start justify-start gap-3 border-b border-[#F2EEFF40] w-full overflow-x-auto scroll-hidden">
              {healthMenu.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => handleActiveMenuClick(tab.value)}
                  className={`min-w-fit px-3 py-3 text-sm ${
                    activeMenu === tab.value
                      ? "text-white border-b-2 border-b-white font-bold"
                      : "bg-transparent text-[#F2EEFF] font-medium"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            <div className="pt-4 mb-20 text-sm bg-[#0B0228]">
              {activeMenu === "questionnaires" && (
                <div>
                  {questionnaire?.map((i: any) => (
                    <div key={i.id} className="flex flex-col gap-3">
                      <Link
                        href={`/questionnaire/${i.id}`}
                        className="bg-[#3B3247] rounded-md px-3 py-3 flex flex-row items-center justify-between text-sm text-white"
                      >
                        <div>
                          <p className="font-bold mb-1">{i.name}</p>
                          <div className="flex flex-row items-center gap-1 font-medium">
                            <Image
                              src="/assets/ribbon-points.svg"
                              alt="coin"
                              height={18}
                              width={18}
                            />
                            <p>{i.reward * 5000} ribbon</p>
                          </div>
                        </div>
                        <ActivityButton
                          className={"text-[#290064] bg-white"}
                          text={"Go"}
                        />
                      </Link>

                      <div className="flex self-center mb-3">
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
                    <div key={i.id} className="flex flex-col gap-3">
                      <Link
                        href={`/survey/${i.id}`}
                        className="bg-[#3B3247] rounded-md px-3 py-3 flex flex-row items-center justify-between text-sm text-white"
                      >
                        <div>
                          <p className="font-bold mb-1">{i.name}</p>
                          <div className="flex flex-row items-center gap-1 font-medium">
                            <Image
                              src="/assets/ribbon-points.svg"
                              alt="coin"
                              height={18}
                              width={18}
                            />
                            <p>{i.reward * 5000} ribbon</p>
                          </div>
                        </div>
                        <ActivityButton
                          className={"text-[#290064] bg-white"}
                          text={"Go"}
                        />
                      </Link>

                      <div className="flex self-center mb-3">
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
                    <div key={i.id} className="flex flex-col gap-3">
                      <Link
                        href={`/tasks/${i.id}`}
                        className="bg-[#3B3247] rounded-md px-3 py-3 flex flex-row items-center justify-between text-sm text-white"
                      >
                        <div>
                          <p className="font-bold mb-1">{i.task}</p>
                          <div className="flex flex-row items-center gap-1 font-medium">
                            <Image
                              src="/assets/ribbon-points.svg"
                              alt="coin"
                              height={18}
                              width={18}
                            />
                            <p>{5000} ribbon</p>
                          </div>
                        </div>
                        <ActivityButton
                          className={"text-[#290064] bg-white"}
                          text={"Go"}
                        />
                      </Link>

                      <div className="flex self-center mb-3">
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

              {activeMenu === "learn" && (
                <>
                  <div>No learn entry at the moment</div>
                </>
              )}
            </div>
          </div>
        )}

        {selectedCategoryTab === "finance" && (
          <div className="mt-4">
            <div className="flex flex-row items-start justify-around gap-3 border-b border-[#F2EEFF40] w-full overflow-x-auto scroll-hidden">
              {financeMenu.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => handleActiveMenuClick(tab.value)}
                  className={`min-w-fit px-3 py-3 text-sm ${
                    activeMenu === tab.value
                      ? "text-white border-b-2 border-b-white font-bold"
                      : "bg-transparent text-[#F2EEFF]"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            <div className="pt-4 mb-16 text-sm bg-[#0B0228]">
              {activeMenu === "lend" && <Lend />}

              {activeMenu === "borrow" && <Borrow />}

              {activeMenu === "money-clubs" && <MoneyClubs />}
            </div>
          </div>
        )}

        {selectedCategoryTab === "e-commerce" && (
          <div className="mt-4">
            <div className="flex flex-row items-start justify-start gap-3 border-b border-[#F2EEFF40] w-full overflow-x-auto scroll-hidden">
              {ecommerceMenu.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => handleActiveMenuClick(tab.value)}
                  className={`min-w-fit px-3 py-3 text-sm ${
                    activeMenu === tab.value
                      ? "text-white border-b-2 border-b-white font-bold"
                      : "bg-transparent text-[#F2EEFF]"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            <div className="pt-4 mb-16 text-sm bg-[#0B0228]">
              {activeMenu === "shop" && (
                <div className="h-auto w-[inherit] flex flex-col gap-10 mb-20 overflow-y-auto">
                  <div className="mt-4 grid grid-cols-4 gap-x-4 gap-y-8">
                    {serviceList.map((i) => (
                      <Link
                        href={i.href}
                        key={i.name}
                        className="flex flex-col items-center gap-2"
                      >
                        <div className="bg-[#3f3952] bg-opacity-95 p-3 rounded-full">
                          {i.icon}
                        </div>
                        <p className="text-xs font-semibold">{i.name}</p>
                      </Link>
                    ))}
                  </div>

                  <div>
                    <p className="text-base font-bold mb-2">
                      Trending products
                    </p>

                    <div key={trendingItems.data.id}>
                      <div className="mt-4 grid xxxs:grid-cols-1 xs:grid-cols-2 gap-x-4 gap-y-8 pb-6">
                        {trendingItems.data.items.map((item: any) => (
                          <div
                            key={item.id}
                            className="relative flex flex-row items-center justify-between"
                          >
                            <div className="flex flex-row items-center gap-1">
                              <Image
                                width={68}
                                // alt={item.name}
                                alt={"name"}
                                height={68}
                                src={"/assets/status-circle.png"}
                                className="bg-white rounded-md w-[68px] h-[68px]"
                              />
                              <div className="flex flex-col items-start justify-between py-1">
                                <p className="text-xs">Item info</p>
                                <p className="text-sm font-semibold line-clamp-2">
                                  Item Id: {item.name || item.itemId}
                                </p>

                                <p className="text-sm font-bold">
                                  {item.currency || "$"}
                                  {item.price}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeMenu === "drop-ship" && (
                <div>No drop-ship entry at the moment</div>
              )}

              {activeMenu === "swap" && <div>No swap entry at the moment</div>}
            </div>
          </div>
        )}
      </div>

      {moodModal && (
        <MoodModal isOpen={moodModal} onClose={() => setMoodModal(false)} />
      )}
    </AuthNavLayout>
  );
};

export default Dashboard;
