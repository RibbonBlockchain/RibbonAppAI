"use client";

import Button from "@/components/button";
import clsx from "clsx";
import {
  ArrowLeft2,
  ArrowRight2,
  Calendar,
  Coin,
  InfoCircle,
  Money3,
  MoneyRecive,
  MoneySend,
  People,
  Refresh,
  Star1,
} from "iconsax-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import { useGetSavingsPlanById } from "@/api/user";
import { formatDate } from "react-datepicker/dist/date_utils";
import { formatDateTime } from "@/lib/values/format-dateandtime-ago";
import InputBox from "@/components/questionnarie/input-box";

const JoinSavingsPlan = () => {
  const router = useRouter();
  const params = useParams();

  const { data } = useGetSavingsPlanById(params.id as any);

  const [walletAddress, setWalletAddress] = useState("");

  const [selectedPayoutNumber, setSelectedPayoutNumber] = useState(0);
  const handleClick = (number: any) => {
    setSelectedPayoutNumber(number);
  };

  const numbers = [...Array(data?.data.participant)].map((_, index) => (
    <p
      key={index}
      className={`border border-[#FFFFFF36] flex items-center justify-center text-center w-[40px] h-[40px] rounded-lg cursor-pointer ${
        selectedPayoutNumber === index + 1 ? "bg-blue-500 text-white" : ""
      }`}
      onClick={() => handleClick(index + 1)}
    >
      {index + 1}
    </p>
  ));

  const isSubmitDisabled = false;
  const handleJoinSavingsPlan = () => {};

  return (
    <main className="w-full min-h-screen text-white bg-[#0B0228] p-4 sm:p-6 pb-20">
      <div className="flex flex-row gap-2 items-center mt-3">
        <ArrowLeft2 onClick={() => router.back()} className="" />
        <p className="text-xl font-bold">Join {data?.data.name}</p>
      </div>

      <section className="flex flex-col gap-4 mt-6">
        <p className="text-[15px] font-medium">
          You&apos;re about to join the savings group {data?.data.name}. Confirm
          your initial contribution to start participating in this cycle
        </p>

        {data?.data.type === "fixed" ? (
          <div className="mb-2 flex flex-col gap-8">
            <div className="flex flex-row items-center gap-2">
              <div className="min-w-[130px] flex flex-row gap-2 items-center text-[13px] font-medium">
                <Refresh size={16} />
                <p>Frequency</p>
              </div>
              <p>{data?.data.frequency} contribution</p>
            </div>

            <div className="flex flex-row items-center gap-2">
              <div className="min-w-[130px] flex flex-row gap-2 items-center text-[13px] font-medium">
                <People size={16} />
                <p>Participants</p>
              </div>
              <p>{data?.data.participant} participants</p>
            </div>

            <div className="flex flex-row items-center gap-2">
              <div className="min-w-[130px] flex flex-row gap-2 items-center text-[13px] font-medium">
                <Coin size={16} />
                <p>Savings type</p>
              </div>
              <p>{data?.data.type} Savings</p>
            </div>

            <div className="flex flex-row items-center gap-2">
              <div className="min-w-[130px] flex flex-row gap-2 items-center text-[13px] font-medium">
                <Calendar size={16} />
                <p>Duration</p>
              </div>
              <p className="flex flex-row items-center gap-1">
                <span>{data?.data.duration}</span>{" "}
                <span>
                  {data?.data.frequency === "weekly"
                    ? "Weeks"
                    : data?.data.frequency === "biweekly"
                    ? "Biweeks"
                    : data?.data.frequency === "monthly"
                    ? "Months"
                    : ""}
                </span>
              </p>
            </div>

            <div className="flex flex-row items-center gap-2">
              <div className="min-w-[130px] flex flex-row gap-2 items-center text-[13px] font-medium">
                <Money3 size={16} />
                <p>Contribution Amt.</p>
              </div>
              <p>{data?.data.individualAmount} USDC</p>
            </div>

            <div className="flex flex-row items-center gap-2">
              <div className="min-w-[130px] flex flex-row gap-2 items-center text-[13px] font-medium">
                <Money3 size={16} />
                <p>Target</p>
              </div>
              <p>{data?.data.targetAmount} USDC</p>
            </div>
          </div>
        ) : (
          <div className="mb-2 flex flex-col gap-8">
            <div className="flex flex-row items-center gap-2">
              <div className="min-w-[130px] flex flex-row gap-2 items-center text-[13px] font-medium">
                <Refresh size={16} />
                <p>Frequency</p>
              </div>
              <p>{data?.data.frequency} contribution</p>
            </div>

            <div className="flex flex-row items-center gap-2">
              <div className="min-w-[130px] flex flex-row gap-2 items-center text-[13px] font-medium">
                <People size={16} />
                <p>Participants</p>
              </div>
              <p>{data?.data.participant} participants</p>
            </div>

            <div className="flex flex-row items-center gap-2">
              <div className="min-w-[130px] flex flex-row gap-2 items-center text-[13px] font-medium">
                <Coin size={16} />
                <p>Savings type</p>
              </div>
              <p>{data?.data.type} Savings</p>
            </div>

            <div className="flex flex-row items-center gap-2">
              <div className="min-w-[130px] flex flex-row gap-2 items-center text-[13px] font-medium">
                <Money3 size={16} />
                <p>Contribution Amt.</p>
              </div>
              <p>{data?.data.individualAmount} USDC</p>
            </div>

            <div className="flex flex-row items-center gap-2">
              <div className="min-w-[130px] flex flex-row gap-2 items-center text-[13px] font-medium">
                <Money3 size={16} />
                <p>Payout cycle.</p>
              </div>
              <p>{data?.data.participant} cycles</p>
            </div>

            <div className="flex flex-row items-center gap-2">
              <div className="min-w-[130px] flex flex-row gap-2 items-center text-[13px] font-medium">
                <Money3 size={16} />
                <p>Target</p>
              </div>
              <p>{data?.data.targetAmount} USDC</p>
            </div>
          </div>
        )}

        {data?.data.type === "flexible" && (
          <div className="flex flex-col gap-1 mb-2">
            <label className="text-sm font-bold">
              Select your payout priority number
            </label>

            <p className="text-xs font-medium">
              Our payout priority determines when you’ll receive funds. Lower
              numbers get paid earlier
            </p>

            <div className="flex flex-wrap gap-2 mt-2">{numbers}</div>
          </div>
        )}

        <InputBox
          name={"walletaddress"}
          label={"Your wallet address"}
          placeholder="e.g Xyusdf...."
          required={false}
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
        />

        <div className="w-full flex flex-col gap-2">
          <label className="text-sm font-bold">Amount to pay now</label>
          <p className="text-3xl font-bold">${data?.data.individualAmount}</p>
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
          Pay & Join
        </button>
        <div className="flex flex-row gap-1 items-center justify-center text-[#F5C193] text-xs font-bold">
          <InfoCircle size={16} />
          <p>
            ${data?.data.individualAmount} will be charged from your USDC wallet
          </p>
        </div>
      </section>
    </main>
  );
};

export default JoinSavingsPlan;
