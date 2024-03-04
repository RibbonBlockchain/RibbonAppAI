"use client";

import Link from "next/link";
import Image from "next/image";
import Todo from "@/components/todo";
import { Coins, EyeOff } from "lucide-react";
import { data } from "../lib/values/mockData";
import styles from "../ui/border.module.scss";
import React, { Fragment, useState } from "react";
import DashboardLayout from "../dashboard-layout";
import { Dialog, Transition } from "@headlessui/react";
import backgroundImage from "../../../public/images/background-1.svg";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <DashboardLayout>
      <div className="w-full h-auto text-white bg-[#F5F5F5]">
        <Image
          src={backgroundImage}
          alt="Picture of the author"
          className="absolute z-0 w-full max-w-[500px]"
        />
        <div className="relative p-4 sm:p-6 mx-auto flex flex-col items-center justify-center content-center">
          <div className="flex flex-col items-center gap-1 text-center py-1 mt-2 mb-10">
            <div className="flex flex-row gap-2 items-center text-sm font-medium  ">
              Total Balance <EyeOff size={16} />{" "}
            </div>
            <div className="flex flex-row gap-2 items-center text-3xl font-bold">
              <Coins size={16} /> 25 WLD
            </div>
          </div>
          <div className="w-full flex flex-row gap-3">
            <Link
              href={`/`}
              className="text-[#A81DA6] bg-white border-white w-full py-3.5 flex flex-row self-center items-center justify-center text-center text-base font-semibold gap-3 rounded-xl border-2"
            >
              <Image
                width={24}
                height={24}
                alt="world-coin"
                src="/images/world-coin-purple.svg"
              />
              Link WorldID
            </Link>
            <Link
              href="/dashboard"
              className="w-full text-white bg-[#4285F4] border-[#4285F4] py-3.5 flex flex-row self-center items-center justify-center text-center text-base font-semibold gap-3 rounded-xl border-2"
            >
              Connect Wallet
            </Link>
          </div>
          <div className="w-full flex flex-row gap-3 mt-6">
            <div className="bg-white border-white w-full py-5 flex flex-col self-center items-center justify-center text-center text-base font-semibold gap-3 rounded-xl border-2">
              <Image
                width={81}
                height={81}
                alt="progressive-bar"
                src="/images/circle.svg"
              />
              <p className="text-center text-sm font-semibold text-[#939393] flex flex-col gap-1">
                Next token <span>reward 10 WLD</span>
              </p>
            </div>

            <div className="bg-white border-white w-full h-[181px] py-5 flex flex-col self-center items-center justify-center text-center font-semibold rounded-xl border-2">
              <p className=" text-lg text-[#A81DA6]">Withdraw</p>
              <p className="text-[#939393] ">Spend tokens</p>
            </div>
          </div>

          <div className="w-full mt-5 mb-10 px-2 sm:px-12">
            <div
              className={`w-full flex flex-row items-center justify-between text-sm font-semibold px-2 py-2 text-black  ${styles["border"]} `}
            >
              Claim daily reward
              <div className="flex flex-row gap-1 items-center justify-center ">
                <p
                  className={`text-xs font-normal text-black p-2  ${styles["border"]}`}
                >
                  23
                </p>
                :
                <p
                  className={`text-xs font-normal text-black p-2  ${styles["border"]}`}
                >
                  23
                </p>
                :
                <p
                  className={`text-xs font-normal text-black p-2  ${styles["border"]}`}
                >
                  23
                </p>
              </div>
            </div>
          </div>

          <>
            {data.map((i) => (
              <Todo
                key={i.id}
                score={i.score}
                reward={i.reward}
                bgColor={i.bgColor}
                taskTitle={i.taskTitle}
                approximateTime={i.approximateTime}
                ratings={i.ratings}
                ratingsLevel={i.ratingsLevel}
              />
            ))}
          </>
        </div>

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <div className="fixed inset-0 overflow-y-auto bg-black bg-opacity-70">
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
                  <Dialog.Panel className="w-full max-w-[370px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Image
                      width={120}
                      height={100}
                      alt="adobe-stock"
                      src="/images/adobe-stock.svg"
                      className="m-auto"
                    />

                    <Dialog.Title
                      as="h3"
                      className="text-xl font-bold text-center py-3"
                    >
                      Link your World ID to continue using Ribbon Protocol{" "}
                    </Dialog.Title>

                    <div onClick={closeModal} className="py-4">
                      <button
                        type="submit"
                        className="w-full text-sm font-semibold text-center p-4 rounded-xl border-solid border-blue-500 border-2 transition-colors duration-100 focus-visible:duration-0 bg-blue-500 text-white hover:bg-blue-600 focus-visible:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-gray-300"
                      >
                        Link your World ID now
                      </button>
                    </div>

                    <div className="flex flex-row gap-2 mt-4">
                      <Image
                        alt="info"
                        width={27}
                        height={27}
                        src="/images/info-logo.svg"
                      />
                      <p className="text-[#FF8C05] text-sm ">
                        You will earn A 5.00 for completing your phone number
                        verification
                      </p>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
