"use client";

import Image from "next/image";
import Button from "../button";
import React, { Fragment } from "react";
import { LoveSmileyEmoji } from "@/public/images";
import { Transition, Dialog } from "@headlessui/react";

type Props = {
  isOpen: boolean;
  handleClick: () => void;
  closeModal: () => void;
};

const Claimed: React.FC<Props> = (props) => {
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
          <div className="flex h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full h-full p-4 flex flex-col items-center justify-between max-w-md transform overflow-hidden rounded-2xl bg-white bg-[url('/images/claim_daily_reward_bg.webp')] bg-cover text-left shadow-xl transition-all">
                <div className="flex mt-5 self-end text-primary text-[0.75rem] font-extrabold items-center ">
                  <div className="bg-[#F2EEFF] flex items-center p-2.5 rounded-[32px] gap-1">
                    <Image
                      width={19}
                      height={21}
                      className=""
                      alt="giftbox"
                      src="/images/questionnaire/giftbox.svg"
                    />
                    Win 4 WLD
                  </div>
                </div>

                <div className="flex w-full flex-col items-center justify-center ">
                  <div className="">
                    <Image
                      width={196}
                      height={250}
                      className=""
                      alt="giftbox"
                      src="/images/gift-box.png"
                    />
                  </div>

                  <h3 className="text-2xl flex flex-row gap-2 text-primary font-extrabold mt-10">
                    Reward claimed
                    <Image
                      width={30}
                      height={30}
                      alt="smiley-emoji"
                      src="/images/love-smiley-emoji.png"
                    />
                    {/* <LoveSmileyEmoji /> */}
                  </h3>

                  <div className="text-primary w-full flex items-center justify-between font-bold gap-x-2 mt-5 ">
                    <div className="flex flex-row items-center justify-center gap-1 w-full py-2 rounded-full bg-[#F2eeff]">
                      <Image
                        alt="cup"
                        width={35}
                        height={28}
                        src="/images/questionnaire/coins.png"
                      />
                      <span className=" text-[12px]">5 WLD</span>
                    </div>

                    <div className="flex flex-row items-center justify-center gap-1 w-full py-2 rounded-full bg-[#F2eeff]">
                      <Image
                        alt="cup"
                        width={29}
                        height={31}
                        src="/images/questionnaire/cup.png"
                      />
                      <span className=" text-[12px]">+ 25,000 points</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={props.handleClick}
                  className="rounded-md mt-16 mb-4"
                >
                  Return Home
                  <Image
                    src="/images/questionnaire/coins.png"
                    alt="coins"
                    width={22}
                    height={18}
                  />
                </Button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Claimed;
