"use client";

import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import Image from "next/image";
import React, { useState } from "react";
import Todo from "@/containers/dashboard/todo";
import CoinSVG from "../../../public/images/coin";
import { Bell, EyeOff, Moon } from "lucide-react";
import LinkButton from "@/components/button/link";
import Survey from "@/containers/dashboard/survey";
import { RibbonLight } from "../../../public/images";
import { todo, priorityTask } from "@/lib/values/mockData";
import CountdownTimer from "@/containers/dashboard/countdown-timer";

const Dashboard = () => {
  const [hideBalance, setHideBalance] = useState(false);
  const toggleHideBalance = () => setHideBalance(!hideBalance);

  const [balance, setBalance] = useState(25);
  const [reward, setReward] = useState(true);

  let points = 155;
  let targetTime = new Date().getTime() + 24 * 60 * 60 * 1000;

  return (
    <>
      <div className="w-full h-auto text-[#080808] bg-[#fffefe]">
        <div className="relative p-4 sm:p-6 mx-auto flex flex-col items-center justify-center content-center">
          <div className="w-full flex flex-row mt-2 py-1 items-start justify-between">
            <RibbonLight />
            <div className="flex flex-row items-center justify-center gap-3">
              <Bell
                fill="black"
                stroke="black"
                className="bg-[#EDE8F5] rounded-full p-[2px]"
              />
              <Moon
                fill="black"
                stroke="black"
                className="bg-[#EDE8F5] rounded-full p-[2px]"
              />
            </div>
          </div>

          <div className="bg-[#EDE8F5] rounded-2xl w-full h-auto p-4 my-6 flex flex-col">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col items-start gap-1 text-center">
                <div className="flex flex-row gap-2 items-center text-sm font-medium text-[#434343]">
                  Total Balance
                  {hideBalance ? (
                    <EyeOff onClick={toggleHideBalance} size={16} />
                  ) : (
                    <EyeOff
                      onClick={toggleHideBalance}
                      fill="black"
                      size={16}
                    />
                  )}
                </div>
                <div className="flex flex-row gap-2 items-center justify-center  text-3xl font-bold">
                  <CoinSVG fill="#080808" />
                  {hideBalance ? "*****" : `${balance} WLD`}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-[71px] sm:w-[71px] flex flex-col justify-center mb-2">
                  <CircularProgressbarWithChildren
                    styles={buildStyles({
                      pathColor: `#080808`,
                      trailColor: `#FFF`,
                    })}
                    value={(points / 500) * 100}
                    strokeWidth={8}
                  >
                    <p className="text-black flex flex-col text-lg font-extrabold leading-4">
                      {points}
                    </p>
                  </CircularProgressbarWithChildren>
                </div>
                <p className="text-xs">1000 pts to withdraw</p>
              </div>
            </div>

            <LinkButton href={""} className="bg-black mt-6 text-white">
              Withdraw Tokens
            </LinkButton>
          </div>

          <div className="mx-auto border-[#4B199C] border-1 mb-5 mt-2">
            <div
              className={`w-full gap-2 max-w-[320px] mx-auto flex flex-row items-center justify-between text-[14px] font-semibold py-1.5 px-2 sm:px-3 text-black bg-white border-[#4B199C] border-[2px] rounded-full `}
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
              {reward ? (
                <div
                  onClick={() => {
                    setReward(false), setBalance(balance + 5);
                  }}
                  className="text-[#4B199C] flex flex-row gap-2 items-center justify-center text-[20px] font-bold"
                >
                  <CoinSVG fill="#4B199C" />3 WLD
                </div>
              ) : (
                <CountdownTimer targetTime={targetTime} />
              )}
            </div>
          </div>

          <div className="w-full">
            <p className="text-xs py-3 font-bold">Priority task</p>
            {priorityTask.map((i) => (
              <Todo
                key={i.id}
                icon={i.icon}
                score={i.score}
                reward={i.reward}
                priority={i.priority}
                taskTitle={i.taskTitle}
                approximateTime={i.approximateTime}
              />
            ))}
          </div>

          <div className="w-full">
            <p className="text-xs pt-5 pb-3 font-bold">To do List</p>
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
              />
            ))}
          </div>

          <div className="w-full">
            <p className="text-xs pt-5 pb-3 font-bold">Exclusive Surveys</p>
            <Survey />
            <Survey />
            <Survey />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
