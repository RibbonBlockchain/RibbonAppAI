"use client";

import Button from "@/components/button";
import clsx from "clsx";
import {
  ArrowLeft2,
  ArrowRight2,
  Calendar,
  Coin,
  Money3,
  MoneyRecive,
  MoneySend,
  People,
  Refresh,
  Star,
  Star1,
  User,
} from "iconsax-react";
import { Repeat, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

const SavingsPlanDetailsPage = () => {
  const router = useRouter();

  const savingsType = "flexible";

  const isSubmitDisabled = true;
  const handleJoinSavingsPlan = () => {};

  return (
    <main className="w-full min-h-screen text-white bg-[#0B0228] p-4 sm:p-6 pb-20">
      <div className="flex flex-row gap-2 items-center mt-3">
        <ArrowLeft2 onClick={() => router.back()} className="" />
        <p className="text-xl font-bold">xxx</p>
      </div>

      <section className="flex flex-col gap-4 mt-6">
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm font-black">Amount saved</label>
          <p className="text-2xl font-bold">$ 1000</p>
        </div>

        {savingsType ? (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="w-full flex flex-col gap-2">
                <label className="text-sm font-bold">Next contribution</label>
                <p className="text-xl font-bold">Feb 15, 2024</p>
              </div>
              <div className="w-full flex flex-col gap-2">
                <label className="text-sm font-bold">Your number</label>
                <div className="flex flex-row items-center gap-2">
                  <p className="text-xl font-bold">3</p>
                  <span>Cycle 2 of 15</span>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <label className="text-sm font-bold">Next Payout</label>
                <p className="text-xl font-bold">Uzor (2)</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-[13px] font-medium">
              <Image
                src={"/assets/progress.png"}
                alt="line"
                width={100}
                height={2}
                className="w-full"
              />
              <p>2 of 15 payouts completed</p>
            </div>

            <div className="flex flex-row gap-2 border-b border-[#FFFFFF36] pb-4">
              <Button className="bg-[#3e3756] text-white border border-[#FFFFFF36]">
                <MoneySend size={16} /> Add Contribution
              </Button>
              <Button className="bg-[#3e3756] text-white border border-[#FFFFFF36]">
                <MoneyRecive size={16} /> Withdraw Funds
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-row gap-2 border-b border-[#FFFFFF36] pb-4">
            <Button className="bg-[#3e3756] text-white border border-[#FFFFFF36]">
              <MoneySend size={16} /> Add Contribution
            </Button>
            <Button className="bg-[inherit] text-[#F2B4B4] border border-[#F2B4B4]">
              Emergency Withdrawal
            </Button>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium text-[#FFFFFF]">
            About the savings
          </label>

          <div className="py-1 flex flex-row items-center justify-between">
            <div className="text-sm flex flex-row items-center justify-center gap-2 ">
              <People size={16} />
              <p className="font-medium">View all participants</p>
            </div>
            <ArrowRight2 />
          </div>

          <div className="py-1 flex flex-row items-center justify-between">
            <div className="text-[15px] flex flex-row items-center justify-center gap-2 ">
              <Star1 size={16} />
              <p className="font-medium">Ratings & review</p>
            </div>
            <ArrowRight2 />
          </div>

          <p className="text-[15px] font-medium">
            Savings for a group trip to Europe. We’re planning to visit multiple
            countries & experience diverse cultures
          </p>

          {savingsType ? (
            <div className="grid grid-cols-2 gap-4 items-center">
              <div className="p-4 flex flex-col gap-3 rounded-lg border border-[#FFFFFF36]">
                <div className="flex flex-row gap-2 items-center text-[13px] font-medium">
                  <Refresh size={16} />
                  <p>Frequency</p>
                </div>
                <div className="flex flex-col text-lg font-black">
                  <span>Biweekly</span> <span>Contributions</span>
                </div>
              </div>

              <div className="p-4 flex flex-col gap-3 rounded-lg border border-[#FFFFFF36]">
                <div className="flex flex-row gap-2 items-center text-[13px] font-medium">
                  <People size={16} />
                  <p>Participants</p>
                </div>
                <div className="flex flex-col text-lg font-black">
                  <span>15</span> <span>Participants</span>
                </div>{" "}
              </div>

              <div className="p-4 flex flex-col gap-3 rounded-lg border border-[#FFFFFF36]">
                <div className="flex flex-row gap-2 items-center text-[13px] font-medium">
                  <Coin size={16} />
                  <p>Savings type</p>
                </div>
                <div className="flex flex-col text-lg font-black">
                  <span>Flexible </span> <span>Savings</span>
                </div>{" "}
              </div>

              <div className="p-4 flex flex-col gap-3 rounded-lg border border-[#FFFFFF36]">
                <div className="flex flex-row gap-2 items-center text-[13px] font-medium">
                  <Money3 size={16} />
                  <p>Contribution Amt.</p>
                </div>
                <div className="flex flex-col text-lg font-black">
                  <span>500</span> <span>USDC</span>
                </div>{" "}
              </div>

              <div className="p-4 flex flex-col gap-3 rounded-lg border border-[#FFFFFF36]">
                <div className="flex flex-row gap-2 items-center text-[13px] font-medium">
                  <Money3 size={16} />
                  <p>Target</p>
                </div>
                <div className="flex flex-col text-lg font-black">
                  <span>10,000</span> <span>USDC</span>
                </div>{" "}
              </div>

              <div className="p-4 flex flex-col gap-3 rounded-lg border border-[#FFFFFF36]">
                <div className="flex flex-row gap-2 items-center text-[13px] font-medium">
                  <Money3 size={16} />
                  <p>Payout cycle</p>
                </div>
                <div className="flex flex-col text-lg font-black">
                  <span>15</span> <span>cycles</span>
                </div>{" "}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 items-center">
              <div className="p-4 flex flex-col gap-3 rounded-lg border border-[#FFFFFF36]">
                <div className="flex flex-row gap-2 items-center text-[13px] font-medium">
                  <Refresh size={16} />
                  <p>Frequency</p>
                </div>
                <div className="flex flex-col text-lg font-black">
                  <span>Biweekly</span> <span>Contributions</span>
                </div>
              </div>

              <div className="p-4 flex flex-col gap-3 rounded-lg border border-[#FFFFFF36]">
                <div className="flex flex-row gap-2 items-center text-[13px] font-medium">
                  <People size={16} />
                  <p>Participants</p>
                </div>
                <div className="flex flex-col text-lg font-black">
                  <span>15</span> <span>Participants</span>
                </div>{" "}
              </div>

              <div className="p-4 flex flex-col gap-3 rounded-lg border border-[#FFFFFF36]">
                <div className="flex flex-row gap-2 items-center text-[13px] font-medium">
                  <Coin size={16} />
                  <p>Savings type</p>
                </div>
                <div className="flex flex-col text-lg font-black">
                  <span>Fixed </span> <span>Savings</span>
                </div>{" "}
              </div>

              <div className="p-4 flex flex-col gap-3 rounded-lg border border-[#FFFFFF36]">
                <div className="flex flex-row gap-2 items-center text-[13px] font-medium">
                  <Calendar size={16} />
                  <p>Duration</p>
                </div>
                <div className="flex flex-col text-lg font-black">
                  <span>6</span> <span>Months</span>
                </div>{" "}
              </div>

              <div className="p-4 flex flex-col gap-3 rounded-lg border border-[#FFFFFF36]">
                <div className="flex flex-row gap-2 items-center text-[13px] font-medium">
                  <Money3 size={16} />
                  <p>Contribution Amt.</p>
                </div>
                <div className="flex flex-col text-lg font-black">
                  <span>500</span> <span>USDC</span>
                </div>{" "}
              </div>

              <div className="p-4 flex flex-col gap-3 rounded-lg border border-[#FFFFFF36]">
                <div className="flex flex-row gap-2 items-center text-[13px] font-medium">
                  <Money3 size={16} />
                  <p>Target</p>
                </div>
                <div className="flex flex-col text-lg font-black">
                  <span>10,000</span> <span>USDC</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <div className="text-[13px] font-medium">
            <p>Recent Deposits</p>
          </div>

          <div></div>
        </div>

        <button
          disabled={isSubmitDisabled}
          onClick={handleJoinSavingsPlan}
          className={clsx(
            "mt-6 w-full rounded-[8px] py-3 font-bold text-sm",
            isSubmitDisabled
              ? "bg-gray-600 text-white cursor-not-allowed"
              : "bg-white text-[#290064]"
          )}
        >
          Join Savings
        </button>
      </section>
    </main>
  );
};

export default SavingsPlanDetailsPage;
