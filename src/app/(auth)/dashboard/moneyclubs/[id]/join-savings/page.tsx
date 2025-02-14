"use client";

import clsx from "clsx";
import {
  ArrowLeft2,
  Calendar,
  Coin,
  InfoCircle,
  Money3,
  People,
  Refresh,
} from "iconsax-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  useGetSavingsMembers,
  useGetSavingsPlanById,
  useJoinSavingsPlan,
} from "@/api/user";
import InputBox from "@/components/questionnarie/input-box";
import { useGetUserWallet } from "@/api/linkage";
import toast from "react-hot-toast";
import { SpinnerIconPurple } from "@/components/icons/spinner";

const JoinSavingsPlan = () => {
  const router = useRouter();
  const params = useParams();

  const { data: walletDetails } = useGetUserWallet();
  const { data } = useGetSavingsPlanById(params.id as any);
  const { data: savingsMembers } = useGetSavingsMembers(params.id as any);

  const [walletAddress, setWalletAddress] = useState("");

  const [selectedPayoutNumber, setSelectedPayoutNumber] = useState(0);
  const handleClick = (number: any) => {
    setSelectedPayoutNumber(number);
  };

  const payoutNumbers = savingsMembers?.data?.map(
    (item: any) => item.payoutNumber
  );
  const uniquePayoutNumbers = [...new Set(payoutNumbers)];

  const numbers = [...Array(data?.data.participant)].map((_, index) => (
    <p
      key={index}
      className={`border border-[#FFFFFF36] flex items-center justify-center text-center w-[40px] h-[40px] rounded-lg cursor-pointer ${
        selectedPayoutNumber === index + 1 ? "bg-blue-500 text-white" : ""
      } ${
        uniquePayoutNumbers.includes(index + 1)
          ? "text-gray-500 cursor-not-allowed"
          : "text-white"
      }`}
      onClick={() => {
        if (!uniquePayoutNumbers.includes(index + 1)) {
          handleClick(index + 1);
        }
      }}
    >
      {index + 1}
    </p>
  ));

  const { mutate, isPending } = useJoinSavingsPlan();
  const handleJoinSavingsPlan = () => {
    mutate(
      { id: params.id as any, payoutNumber: selectedPayoutNumber },
      {
        onSuccess: () =>
          toast.success("You have successfully joined the savings club"),
      }
    );
  };

  const isSubmitDisabled = isPending || !walletDetails;

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
              <p>
                {savingsMembers?.data.length} of {data?.data.participant}{" "}
                participants
              </p>
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
                    : data?.data.frequency === "hourly"
                    ? "Hours"
                    : data?.data.frequency === "minutes"
                    ? "Minutes"
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
          value={walletDetails?.data[0].address}
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
            "mt-6 w-full rounded-[8px] py-3 font-bold text-sm flex items-center justify-center",
            isSubmitDisabled
              ? "bg-gray-600 text-white cursor-not-allowed"
              : "bg-white text-[#290064]"
          )}
        >
          {isPending ? <SpinnerIconPurple /> : "Pay & Join"}
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
