"use client";

import Image from "next/image";
import Button from "../button";
import { cn } from "@/lib/utils";
import { useGetAuth } from "@/api/auth";
import { useRouter } from "next/navigation";
import Coin from "@/public/images/coin.webp";
import { useClaimDailyRewards } from "@/api/user";
import GiftBox from "@/public/images/gift_box.webp";
import { Transition, Dialog } from "@headlessui/react";
import DailyRewardClaimedPage from "./daily-reward-claimed";
import React, { Fragment, useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  disabled: boolean;
  closeModal: () => void;
};

const dailyRewardsData = [
  { day: 1, reward: "100 points" },
  { day: 2, reward: "100 points" },
  { day: 3, reward: "100 points" },
  { day: 4, reward: "100 points" },
  { day: 5, reward: "100 points" },
  { day: 6, reward: "100 points" },
  { day: 7, reward: "100 points" },
];

const ClaimDailyRewardModal: React.FC<Props> = (props) => {
  const router = useRouter();

  const { data: user } = useGetAuth();
  const { mutate: claimDailyReward } = useClaimDailyRewards();

  const [dailyRewardClaimedModal, setDailyRewardClaimedModal] = useState(false);

  const [step, setStep] = useState(user?.numberOfClaims);
  const [lastClickedTimestamp, setLastClickedTimestamp] = useState(
    user?.lastClaimTime
  );

  useEffect(() => {
    if (
      lastClickedTimestamp &&
      Date.now() - lastClickedTimestamp >= 12 * 60 * 60 * 1000
    ) {
      setStep(step);
    }
  }, [lastClickedTimestamp]);

  return (
    <>
      <Transition appear show={props.isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={props.closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70 dark:bg-black/85" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-[#1B1B1B] bg-[url('/images/claim_daily_reward_bg.webp')] bg-cover text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className={cn(
                      "text-base text-center px-6 py-4 font-medium text-white flex items-center justify-center",
                      "bg-gradient-to-r from-[#7C56FE] to-[#A81DA6]"
                    )}
                  >
                    Daily rewards
                  </Dialog.Title>

                  <div className="mt-2 p-4">
                    <figure className="space-y-4">
                      <figcaption className="text-center text-primary dark:text-white font-bold">
                        Use the app every day to claim daily rewards
                      </figcaption>

                      <Image
                        src={GiftBox}
                        alt="gift box"
                        className="max-w-20 mx-auto"
                      />
                    </figure>

                    <ul className="mt-6 flex flex-wrap justify-center place-items-center gap-x-2 gap-y-4">
                      {dailyRewardsData?.map(({ day, reward }, index) => (
                        <li key={index}>
                          <figure
                            className={cn(
                              "bg-primary-50 py-4 px-2 space-y-4 rounded-md min-w-16",
                              index === step % 7
                                ? "border border-[#D797D6] dark:bg-[#7C56FE] drop-shadow-[2px_3px_3px_rgba(168,29,166,0.4)]"
                                : "opacity-70 "
                            )}
                          >
                            <Image
                              src={Coin}
                              alt="coin"
                              className="max-w-8 mx-auto"
                            />
                            <figcaption
                              className={cn(
                                "text-center text-nowrap text-primary font-semibold text-xs",
                                index === step % 7
                                  ? "text-primary dark:text-white"
                                  : "text-[#939393]"
                              )}
                            >
                              {reward}
                            </figcaption>
                          </figure>

                          <p
                            className={cn(
                              "text-center w-full mt-2 text-sm font-medium",
                              index === step % 7
                                ? "text-primary"
                                : "text-[#939393]"
                            )}
                          >
                            Day {day}
                          </p>
                        </li>
                      ))}
                    </ul>

                    <Button
                      disabled={props.disabled}
                      onClick={() => {
                        claimDailyReward();
                        setLastClickedTimestamp(Date.now());

                        setDailyRewardClaimedModal(true);

                        const nextReward = (step + 1) % dailyRewardsData.length;
                        setStep(nextReward);

                        props.closeModal;
                      }}
                      className="rounded-full mt-6 mb-4"
                    >
                      Claim
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <DailyRewardClaimedPage
        isOpen={dailyRewardClaimedModal}
        closeModal={() => {
          setDailyRewardClaimedModal(false);
          // router.push("/dashboard");
        }}
      />
    </>
  );
};

export default ClaimDailyRewardModal;
