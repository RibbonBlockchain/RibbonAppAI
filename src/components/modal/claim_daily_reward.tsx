"use client";

import Image from "next/image";
import Button from "../button";
import React, { Fragment, useState } from "react";
import Coin from "@/public/images/coin.webp";
import GiftBox from "@/public/images/gift_box.webp";
import { cn, getOrdinalIndicator } from "@/lib/utils";
import { Transition, Dialog } from "@headlessui/react";
import DailyRewards from "./my-daily-reward";

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
  { day: 8, reward: "800 points" },
  { day: 9, reward: "900 points" },
  { day: 10, reward: "1,000 points" },
  { day: 11, reward: "100 points" },
  { day: 12, reward: "200 points" },
  { day: 13, reward: "300 points" },
  { day: 14, reward: "400 points" },
  { day: 15, reward: "500 points" },
  { day: 16, reward: "600 points" },
  { day: 17, reward: "700 points" },
  { day: 18, reward: "800 points" },
  { day: 19, reward: "900 points" },
  { day: 20, reward: "1,000 points" },
  { day: 21, reward: "100 points" },
];

const ClaimDailyRewardModal: React.FC<Props> = (props) => {
  const [step, setStep] = useState(1);

  const [page, setPage] = useState(1);

  const startIndex = (page - 1) * 7;
  const endIndex = Math.min(page * 7, dailyRewardsData.length);
  const currentPageData = dailyRewardsData.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

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
                    "text-base text-center px-6 py-4 font-medium  text-white flex items-center justify-between",
                    "bg-gradient-to-r from-[#7C56FE] to-[#A81DA6]"
                  )}
                >
                  {page > 1 && <button onClick={handlePrevPage}>Prev</button>}
                  {page === 1 && <p className="text-[#7C56FE]">Prev</p>}
                  Daily rewards
                  <button disabled={page === 3} onClick={handleNextPage}>
                    Next
                  </button>
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
                    {currentPageData?.map((item, index) => (
                      <li key={index}>
                        <figure
                          onClick={() => {
                            console.log(`claim ${item.reward} `);
                            // setDay(i);
                          }}
                          className={cn(
                            "bg-primary-50 py-4 px-2 space-y-4 rounded-md min-w-16",
                            item.day === step
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
                            item.day === step
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
                      props.closeModal, setStep((prevStep) => prevStep + 1);
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
