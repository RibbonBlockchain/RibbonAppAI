"use client";

import Image from "next/image";
import Button from "../button";
import { cn } from "@/lib/utils";
import { useGetAuth } from "@/api/auth";
import { useRouter } from "next/navigation";
import { useClaimDailyRewards } from "@/api/user";
import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { Check, X } from "lucide-react";

type Props = {
  isOpen: boolean;
  disabled: boolean;
  closeModal: () => void;
};

const ClaimDailyRewardModal: React.FC<Props> = (props) => {
  const router = useRouter();

  const [claimed, setClaimed] = useState(false);
  const dailyRewardsData = [
    { day: 1, claimed: claimed, reward: "1000 pts" },
    { day: 2, claimed: claimed, reward: "2000 pts" },
    { day: 3, claimed: claimed, reward: "3000 pts" },
    { day: 4, claimed: claimed, reward: "4000 pts" },
    { day: 5, claimed: claimed, reward: "5000 pts" },
    { day: 6, claimed: claimed, reward: "6000 pts" },
    { day: 7, claimed: claimed, reward: "1000 points" },
  ];

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gradient-to-b from-[#000000] to-[#666666] text-white text-left align-middle shadow-xl transition-all">
                  <div className="pt-6 px-4 flex flex-row items-center justify-between gap-4">
                    <X className="text-[#000000]" />
                    <div className="flex flex-col items-center">
                      <p className="font-bold text-lg">Your daily reward</p>
                      <p className="text-sm font-normal text-center">
                        Check back daily to claim your rewards and keep the
                        straek going
                      </p>
                    </div>
                    <X
                      width={38}
                      height={38}
                      className="text-white"
                      onClick={props.closeModal}
                    />
                  </div>

                  <div className="p-4">
                    <ul className="mt-2 flex flex-wrap justify-center place-items-center gap-x-2 gap-y-4 ">
                      {dailyRewardsData?.map(
                        ({ day, reward, claimed }, index) => (
                          <li key={index}>
                            <figure
                              className={cn(
                                "py-2 px-2 rounded-md w-full min-w-16 bg-[#3f3952] border-[#4B199C] border-[2px]",
                                index === step % 7
                                  ? "border border-[#D797D6] drop-shadow-[2px_3px_3px_rgba(168,29,166,0.4)]"
                                  : "opacity-70"
                              )}
                            >
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

                              <div className="flex flex-row items-center">
                                <Image
                                  src="/assets/coin.png"
                                  alt="coin"
                                  height={32}
                                  width={32}
                                  className="w-[32px] h-[32px] -ml-2 -mr-1"
                                />
                                <figcaption
                                  className={cn(
                                    "text-center text-nowrap text-primary font-semibold text-xs",
                                    index === step % 7
                                      ? "text-primary"
                                      : "text-[#939393]"
                                  )}
                                >
                                  {reward}
                                </figcaption>
                              </div>

                              {claimed ? (
                                <div className="flex flex-row items-center gap-1 text-xs">
                                  <p>Claimed</p>
                                  <div className="bg-[#9654F4] flex self-center rounded-full p-[2px]">
                                    <Check size={12} />
                                  </div>
                                </div>
                              ) : (
                                <button
                                  disabled={props.disabled}
                                  onClick={() => {
                                    // claimDailyReward();
                                    setLastClickedTimestamp(Date.now());

                                    setDailyRewardClaimedModal(true);

                                    const nextReward =
                                      (step + 1) % dailyRewardsData.length;
                                    setStep(nextReward);

                                    props.closeModal;
                                  }}
                                  className="flex mx-auto text-[#290064] text-center text-nowrap font-normal text-xs px-2 py-[2px] bg-white shadow shadow-white border rounded-full"
                                >
                                  Claim
                                </button>
                              )}
                            </figure>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* <DailyRewardClaimedPage
        isOpen={dailyRewardClaimedModal}
        closeModal={() => {
          setDailyRewardClaimedModal(false);
          // router.push("/dashboard");
        }}
      /> */}
    </>
  );
};

export default ClaimDailyRewardModal;
