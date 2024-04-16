"use client";

import Image from "next/image";
import Button from "../button";
import { cn } from "@/lib/utils";
import { useGetAuth } from "@/api/auth";
import Coin from "@/public/images/coin.webp";
import { useClaimDailyRewards } from "@/api/user";
import GiftBox from "@/public/images/gift_box.webp";
import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  disabled: boolean;
  closeModal: () => void;
};

const dailyRewardsData = [
  { day: 1, reward: "100 points" },
  { day: 2, reward: "200 points" },
  { day: 3, reward: "300 points" },
  { day: 4, reward: "400 points" },
  { day: 5, reward: "500 points" },
  { day: 6, reward: "600 points" },
  { day: 7, reward: "700 points" },
];

const ClaimDailyRewardModal: React.FC<Props> = (props) => {
  const { data: user } = useGetAuth();
  const { mutate: claimDailyReward } = useClaimDailyRewards();

  const [step, setStep] = useState(0);
  const [lastClickedTimestamp, setLastClickedTimestamp] = useState(
    user?.lastClaimTime
  );

  useEffect(() => {
    if (
      lastClickedTimestamp &&
      Date.now() - lastClickedTimestamp >= 12 * 60 * 60 * 1000
    ) {
      setStep(0);
    }
  }, [lastClickedTimestamp]);

  return (
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
          <div className="fixed inset-0 bg-black/25" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white bg-[url('/images/claim_daily_reward_bg.webp')] bg-cover  text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className={cn(
                    "text-base text-center px-6 py-4 font-medium  text-white flex items-center justify-center",
                    "bg-gradient-to-r from-[#7C56FE] to-[#A81DA6]"
                  )}
                >
                  Daily rewards
                </Dialog.Title>

                <div className="mt-2 p-4">
                  <figure className="space-y-4">
                    <figcaption className="text-center text-primary font-bold">
                      Use the app every day to claim daily rewards
                    </figcaption>

                    <Image
                      src={GiftBox}
                      alt="gift box"
                      className="max-w-20 mx-auto"
                    />
                  </figure>

                  <ul className="mt-6 flex flex-wrap justify-center place-items-center gap-x-2 gap-y-4">
                    {dailyRewardsData?.map((item, index) => (
                      <li key={index}>
                        <figure
                          className={cn(
                            "bg-primary-50 py-4 px-2 space-y-4 rounded-md min-w-16",
                            item.day === step + 1
                              ? "border border-[#D797D6] drop-shadow-[0_2px_1px_rgba(168,29,166,0.4)]"
                              : ""
                          )}
                        >
                          <Image
                            src={Coin}
                            alt="coin"
                            className="max-w-8 mx-auto"
                          />
                          <figcaption className="text-center text-nowrap text-primary font-semibold text-xs">
                            {item.reward}
                          </figcaption>
                        </figure>

                        <p
                          className={cn(
                            "text-center w-full mt-2 text-sm font-medium",
                            item.day === step + 1
                              ? "text-primary"
                              : "text-[#939393]"
                          )}
                        >
                          Day {item.day}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <Button
                    disabled={props.disabled}
                    onClick={() => {
                      props.closeModal;
                      claimDailyReward();
                      setLastClickedTimestamp(Date.now());
                      setStep(
                        (prevStep) => (prevStep + 1) % dailyRewardsData?.length
                      );
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
  );
};

export default ClaimDailyRewardModal;
