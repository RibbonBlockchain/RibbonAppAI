"use client";

import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import Image from "next/image";
import { EyeOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import Todo from "@/containers/dashboard/todo";
import LinkButton from "@/components/button/link";
import Topbar from "@/containers/dashboard/top-bar";
import CoinSVG from "../../../../public/images/coin";
import { todo, priorityTask } from "@/lib/values/mockData";
import CountdownTimer from "@/containers/dashboard/countdown-timer";
import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";
import { useGetQuestionnaires } from "@/api/auth";
// import { UserWalkthrough } from "@/containers/user-walkthrough/walkthrough";

const Dashboard = () => {
  const [hideBalance, setHideBalance] = useState(false);
  const toggleHideBalance = () => setHideBalance(!hideBalance);

  const [balance, setBalance] = useState(0);
  // const [reward, setReward] = useState(true);

  const is_walkthrough_open = true;
  let points = 155;
  let dailyReward = 3;
  let targetTime = new Date().getTime() + 24 * 60 * 60 * 1000;

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const lastClickedTimestamp = localStorage.getItem("lastClickedTimestamp");
    if (lastClickedTimestamp) {
      const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000;
      const currentTime = new Date().getTime();
      if (
        currentTime - Number(lastClickedTimestamp) <
        twentyFourHoursInMilliseconds
      ) {
        setDisabled(true);
      }
    }
  }, []);

  const handleClick = () => {
    setBalance(balance + dailyReward);
    localStorage.setItem(
      "lastClickedTimestamp",
      new Date().getTime().toLocaleString()
    );
    setDisabled(true);
  };

  return (
    <AuthNavLayout>
      <div className="w-full h-auto text-[#080808] bg-[#fffefe] p-4 sm:p-6">
        <div className="relative mx-auto flex flex-col items-center justify-center content-center">
          {/* {is_walkthrough_open && <UserWalkthrough />} */}

          <Topbar />
          <div className="bg-gradient-to-br from-[#442F8C] to-[#951E93] text-white rounded-2xl w-full h-auto p-4 my-6 flex flex-col">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col items-start gap-1 text-center">
                <div className="flex flex-row gap-2 items-center text-sm font-medium">
                  Total Balance
                  {hideBalance ? (
                    <EyeOff onClick={toggleHideBalance} size={16} />
                  ) : (
                    <EyeOff
                      onClick={toggleHideBalance}
                      fill="white"
                      size={16}
                    />
                  )}
                </div>
                <div className="flex flex-row gap-2 items-center justify-center text-3xl font-bold">
                  <CoinSVG />
                  {hideBalance ? "*****" : `${balance} WLD`}
                </div>
              </div>
              <div
                id="withdraw-tokens"
                className="flex flex-col items-center justify-center"
              >
                <div className="w-[71px] sm:w-[71px] flex flex-col justify-center mb-2">
                  <CircularProgressbarWithChildren
                    styles={buildStyles({
                      pathColor: `#FFF`,
                      trailColor: `#F6C4D0`,
                    })}
                    value={(points / 500) * 100}
                    strokeWidth={8}
                  >
                    <p className="flex flex-col text-lg font-extrabold leading-4">
                      {points}
                    </p>
                  </CircularProgressbarWithChildren>
                </div>
                <p className="text-xs font-medium">1000 pts to withdraw</p>
              </div>
            </div>

            <LinkButton
              href={""}
              className="bg-white mt-6 text-[#080808] font-semibold"
            >
              Withdraw Tokens
            </LinkButton>
          </div>

          <div className="mx-auto border-[#4B199C] border-1 mb-5 mt-2">
            <div
              className={`w-full gap-2 max-w-[320px] mx-auto flex flex-row items-center justify-between text-[14px] font-semibold py-1.5 px-2 sm:px-3 text-gradient bg-white border-[#4B199C] border-[2px] rounded-full `}
            >
              Claim daily reward
              <Image
                width={24}
                height={24}
                alt="trophy"
                className=""
                loading="lazy"
                src="/images/trophy.gif"
              />
              {/* {reward ? (
                <div
                  onClick={() => {
                    setReward(false), setBalance(balance + 5);
                  }}
                  className="text-gradient flex flex-row gap-2 items-center justify-center text-[20px] font-bold"
                >
                  <CoinSVG fill="#4B199C" />3 WLD
                </div>
              ) : (
                <CountdownTimer targetTime={targetTime} />
              )} */}
              <button
                onClick={handleClick}
                disabled={disabled}
                className="text-gradient flex flex-row gap-2 items-center justify-center text-[20px] font-bold"
              >
                <CoinSVG fill="#4B199C" />
                {dailyReward} WLD
              </button>
            </div>
          </div>

          <div className="w-full">
            <p className="text-[#34246B] text-xs py-3 font-bold">
              Priority task
            </p>
            {priorityTask.map((i) => (
              <Todo
                key={i.id}
                icon={i.icon}
                score={i.score}
                reward={i.reward}
                priority={i.priority}
                taskTitle={i.taskTitle}
                approximateTime={i.approximateTime}
                id={i.id}
                href={i.href}
              />
            ))}
          </div>

          <div className="w-full">
            <p className="text-[#34246B] text-xs pt-5 pb-3 font-bold">
              To do List
            </p>
            {todo.map((i) => (
              <Todo
                key={i.id}
                score={i.score}
                icon={undefined}
                reward={i.reward}
                taskTitle={i.taskTitle}
                approximateTime={i.approximateTime}
                ratings={i.ratings}
                ratingsLevel={i.ratingsLevel}
                id={i.id}
                href={"#"}
              />
            ))}
          </div>

          {/* <div className="w-full">
            <p className="text-[#34246B] text-xs pt-5 pb-3 font-bold">
              Exclusive Surveys
            </p>
            <Survey />
            <Survey />
            <Survey />
          </div> */}
        </div>
      </div>
    </AuthNavLayout>
  );
};

export default Dashboard;
