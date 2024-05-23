"use client";

import { SwapIcon, WalletMoney } from "../../../../public/images";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";
import { ArrowRight, EyeOff } from "lucide-react";
import { useGetAuth } from "@/api/auth";
import PageLoader from "@/components/loader";
import { useSession } from "next-auth/react";
import Todo from "@/containers/dashboard/todo";
import LinkButton from "@/components/button/link";
import React, { useEffect, useState } from "react";
import Topbar from "@/containers/dashboard/top-bar";
import { useGetUncompletedTasks } from "@/api/user";
import CoinSVG from "../../../../public/images/coin";
import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";
import ClaimDailyRewardModal from "@/components/modal/claim_daily_reward";
import CountdownTimer from "@/containers/dashboard/simple-countdown-timer";
import { UserWalkthrough } from "@/containers/user-walkthrough/walkthrough";
import { verifyPhoneTask, completeProfileTask } from "@/lib/values/mockData";

const Dashboard = () => {
  const session = useSession();
  console.log(session);

  const [priorityTask, setPriorityTask] = React.useState<any>([]);
  const [showDailyRewardModal, setShowDailyRewardModal] = useState(false);

  const { data: user } = useGetAuth({ enabled: true });
  const pointBalance = user?.wallet.balance * 5000;

  const [hideBalance, setHideBalance] = useState(false);
  const toggleHideBalance = () => setHideBalance(!hideBalance);

  const [swapBalance, setSwapBalance] = useState(false);
  const handleSwapBalance = () => setSwapBalance(!swapBalance);

  const { data: questionnaire, isLoading } = useGetUncompletedTasks();
  const survey: any[] = [];
  const task: any[] = [];

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

  useEffect(() => {
    if (user) {
      const isNew = !localStorage.getItem(`walkthroughCompleted_${user?.id}`);
      setIsNewUser(isNew);
    }
  }, []);

  isLoading && <PageLoader />;

  return (
    <AuthNavLayout>
      <div className="w-full h-auto text-[#080808] dark:bg-[#1B1B1B] bg-[#fffefe] p-4 sm:p-6">
        <div className="relative mx-auto flex flex-col items-center justify-center content-center">
          {isNewUser && user && <UserWalkthrough />}

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
                <div
                  onClick={handleSwapBalance}
                  className="flex flex-row gap-2 items-center justify-center text-lg font-bold cursor-pointer"
                >
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
                  <div
                    onClick={handleSwapBalance}
                    className="flex flex-row items-center justify-center gap-2 text-xs cursor-pointer"
                  >
                    <div>
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
                    value={(pointBalance / 10000) * 100}
                    strokeWidth={8}
                  >
                    <p className="flex flex-col text-xs font-extrabold leading-4">
                      {0 ||
                        (pointBalance > 10000
                          ? 10000
                          : Math.floor(pointBalance))}
                    </p>
                  </CircularProgressbarWithChildren>
                </div>
                <p className="text-xs font-medium">10,000 pts to withdraw</p>
              </div>
            </div>

            <div className="flex flex-row items-center justify-between w-full gap-3">
              <Link
                href={"/wallet"}
                className="w-full flex flex-row gap-3 items-center justify-center bg-white py-3 rounded-xl text-center mt-6 text-[#080808] font-semibold"
              >
                Wallet
                <WalletMoney />
              </Link>

              <Link
                href={"/withdraw"}
                className="w-full flex flex-row gap-3 items-center justify-center bg-white py-3 rounded-xl text-center mt-6 text-[#080808] font-semibold"
              >
                Withdraw Tokens
                <ArrowRight stroke="#7C56FE" size={20} />
              </Link>
            </div>
          </div>

          <button
            onClick={() => setShowDailyRewardModal(true)}
            className="mx-auto border-[#4B199C] border-1 mb-5 mt-2"
          >
            <span
              className={`w-full gap-2 max-w-[350px] mx-auto flex flex-row items-center justify-between text-[14px] font-semibold py-1.5 px-2 sm:px-3 text-gradient dark:text-white bg-[inherit] border-[#4B199C] border-[2px] rounded-full `}
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
              {remainingTime > 0 ? (
                <CountdownTimer />
              ) : (
                <div
                  className={clsx(
                    "text-gradient flex flex-row gap-2 items-center justify-center text-[20px] font-bold"
                  )}
                >
                  <CoinSVG fill="#4B199C" />
                  0.02 WLD
                </div>
              )}
            </span>
          </button>

          <div className="w-full mb-4">
            {priorityTask?.length >= 1 && (
              <p className="text-[#34246B] dark:text-white text-xs py-3 font-bold">
                Priority activity
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

          <div className="w-full mb-4">
            <div className="bg-[#F2EEFF] mb-2 flex flex-row items-center justify-between text-[#A81DA6] text-xs px-3 py-1 font-bold rounded-md">
              <p>Questionnaire</p>
              <Image
                width={40}
                height={40}
                alt="questionnaires"
                src="/images/questionnaires.png"
              />
            </div>
            {questionnaire?.map((i: any) => (
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
                href={`/dashboard/activity/${i.id}`}
              />
            ))}
          </div>

          <div className="w-full mb-4">
            <div className="bg-[#F2EEFF] mb-2 flex flex-row items-center justify-between text-[#A81DA6] text-xs px-3 py-1 font-bold rounded-md">
              <p>Surveys</p>
              <Image
                width={40}
                height={40}
                alt="surveys"
                src="/images/surveys.png"
              />
            </div>
            {/* <Survey /> */}

            {survey?.map((i: any) => (
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
                href={`/dashboard/activity/${i.id}`}
              />
            ))}
          </div>

          <div className="w-full mb-4">
            <div className="bg-[#F2EEFF] mb-2 flex flex-row items-center justify-between text-[#A81DA6] text-xs px-3 py-1 font-bold rounded-md">
              <p>Tasks</p>
              <Image
                width={40}
                alt="tasks"
                height={40}
                src="/images/tasks.png"
              />
            </div>
            {task?.map((i: any) => (
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
                href={`/dashboard/activity/${i.id}`}
              />
            ))}
          </div>
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
