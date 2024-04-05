"use client";

import {
  verifyPhoneTask,
  verifyIdentityTask,
  completeProfileTask,
} from "@/lib/values/mockData";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import Image from "next/image";
import { EyeOff } from "lucide-react";
import { useGetAuth } from "@/api/auth";
import PageLoader from "@/components/loader";
import { useSession } from "next-auth/react";
import Todo from "@/containers/dashboard/todo";
import LinkButton from "@/components/button/link";
import React, { useEffect, useState } from "react";
import Topbar from "@/containers/dashboard/top-bar";
import CoinSVG from "../../../../public/images/coin";
import { SwapIcon } from "../../../../public/images";
import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";
import { useClaimDailyRewards, useGetUncompletedTasks } from "@/api/user";
import ClaimDailyRewardModal from "@/components/modal/claim_daily_reward";
import CountdownTimer from "@/containers/dashboard/countdown-timer";
// import { UserWalkthrough } from "@/containers/user-walkthrough/walkthrough";

const Dashboard = () => {
  const session = useSession();
  console.log(session);

  const [priorityTask, setPriorityTask] = React.useState<any>([]);
  const [showDailyRewardModal, setShowDailyRewardModal] = useState(false);

  const { mutate: claimDailyReward } = useClaimDailyRewards();

  const { data: user } = useGetAuth({ enabled: true });
  const [balance, setBalance] = useState(user?.wallet.balance);
  const pointBalance = user?.wallet.balance * 5000;

  const [hideBalance, setHideBalance] = useState(false);
  const toggleHideBalance = () => setHideBalance(!hideBalance);

  const [swapBalance, setSwapBalance] = useState(false);

  const { data: todo, isLoading } = useGetUncompletedTasks();

  let points = 155;
  let dailyReward = 3;

  const [disabled, setDisabled] = useState(false);

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

    if (user?.id && !user?.email) {
      setPriorityTask((prev: any) => {
        const newState = [...prev];
        const found = priorityTask.findIndex(
          (t: any) => t.id === "verify-identity"
        );

        if (found === -1) newState.push(verifyIdentityTask as any);
        return newState;
      });
    }
  }, [user?.id, user?.email]);

  useEffect(() => {
    const lastClickTime = localStorage.getItem("lastClickTime");
    if (lastClickTime) {
      const twelveHoursAgo = Date.now() - 12 * 60 * 60 * 1000;
      if (parseInt(lastClickTime, 10) > twelveHoursAgo) {
        setDisabled(true);
      }
    }
  }, []);

  const targetTime = Date.now() - 12 * 60 * 60 * 1000;

  const handleClick = () => {
    setDisabled(true);
    claimDailyReward(), setShowDailyRewardModal(false);

    localStorage.setItem("lastClickTime", Date.now().toString());
  };

  isLoading && <PageLoader />;

  return (
    <AuthNavLayout>
      <div className="w-full h-auto text-[#080808] bg-[#fffefe] p-4 sm:p-6">
        <div className="relative mx-auto flex flex-col items-center justify-center content-center">
          {/* {is_walkthrough_open && <UserWalkthrough />} */}

          <Topbar />
          <div className="bg-gradient-to-br from-[#442F8C] to-[#951E93] text-white rounded-2xl w-full h-auto p-4 my-2 flex flex-col">
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
                <div className="flex flex-row gap-2 items-center justify-center text-lg font-bold">
                  <CoinSVG />
                  {hideBalance ? (
                    <p>***</p>
                  ) : (
                    <>
                      {swapBalance ? (
                        <p> {pointBalance.toLocaleString()} Points</p>
                      ) : (
                        <p> {user?.wallet.balance} WLD</p>
                      )}
                    </>
                  )}
                </div>

                {
                  <div className="flex flex-row items-center justify-center gap-2 text-xs">
                    <div onClick={() => setSwapBalance(!swapBalance)}>
                      <SwapIcon />
                    </div>{" "}
                    {hideBalance ? (
                      <p>***</p>
                    ) : (
                      <>
                        {swapBalance ? (
                          <p> {user?.wallet.balance} WLD</p>
                        ) : (
                          <p> {pointBalance.toLocaleString()} Points</p>
                        )}
                      </>
                    )}
                  </div>
                }
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

          <button
            disabled={disabled}
            onClick={() => setShowDailyRewardModal(true)}
            className="mx-auto border-[#4B199C] border-1 mb-5 mt-2"
          >
            <span
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
                
              )} */}
              <button
                // onClick={handleClick}
                // disabled={disabled}
                className="text-gradient flex flex-row gap-2 items-center justify-center text-[20px] font-bold"
              >
                <CoinSVG fill="#4B199C" />
                {dailyReward} WLD
              </button>
            </span>
          </button>

          <div className="w-full">
            {priorityTask?.length >= 1 && (
              <p className="text-[#34246B] text-xs py-3 font-bold">
                Priority task
              </p>
            )}

            {priorityTask.map((i: any) => (
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
            {todo?.map((i: any) => (
              <Todo
                key={i.id}
                ratings={675}
                score={i.point}
                icon={undefined}
                reward={i.reward}
                taskTitle={i.name}
                approximateTime={i.duration / 60}
                ratingsLevel="/images/ratings.svg"
                id={i.id}
                href={`/dashboard/task/${i.id}`}
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

      <ClaimDailyRewardModal
        disabled={disabled}
        closeModal={handleClick}
        isOpen={showDailyRewardModal}
      />
    </AuthNavLayout>
  );
};

export default Dashboard;
