"use client";

import Button from "@/components/button";
import clsx from "clsx";
import {
  ArrowDown2,
  ArrowLeft2,
  ArrowRight2,
  Calendar,
  Coin,
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
import { useGetSavingsMembers, useGetSavingsPlanById } from "@/api/user";
import { formatDate } from "react-datepicker/dist/date_utils";
import { formatDateTime } from "@/lib/values/format-dateandtime-ago";
import { shorten, shortenTransaction } from "@/lib/utils/shorten";
import { Minus, Plus } from "lucide-react";

const SavingsPlanDetailsPage = () => {
  const router = useRouter();
  const params = useParams();

  const { data } = useGetSavingsPlanById(params.id as any);
  const { data: savingsMembers } = useGetSavingsMembers(params.id as any);

  const netDeposit = data?.data?.transactions?.reduce(
    (total: any, transaction: any) => {
      if (transaction.type === "deposit") {
        return total + transaction.amount;
      } else if (transaction.type === "withdraw") {
        return total - transaction.amount;
      }
      return total;
    },
    0
  );

  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const isSubmitDisabled = false;

  return (
    <main className="w-full min-h-screen text-white bg-[#0B0228] p-4 sm:p-6 pb-20">
      <div className="flex flex-row gap-2 items-center mt-3">
        <ArrowLeft2 onClick={() => router.back()} className="" />
        <p className="text-xl font-bold">{data?.data.name}</p>
      </div>

      <section className="flex flex-col gap-4 mt-6">
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm font-black">Amount saved</label>
          <p className="text-2xl font-bold">{netDeposit} USDC</p>
        </div>

        <div className="w-full flex flex-row gap-2">
          <label className="text-sm font-black">Wallet Address:</label>
          <p className="text-sm">{shorten(data?.data.walletAddress)}</p>
        </div>

        {data?.data.type === "flexible" ? (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="w-full flex flex-col gap-2">
                <label className="text-sm font-bold">Next contribution</label>
                <p className="text-xl font-bold">
                  {formatDateTime(data?.data.payoutDate).date}
                </p>
              </div>
              <div className="w-full flex flex-col gap-2">
                <label className="text-sm font-bold">Your number</label>
                <div className="flex flex-row items-center gap-2">
                  <p className="text-xl font-bold">{data?.data.payoutNumber}</p>
                  <span>Cycle xx of {data?.data.participant}</span>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <label className="text-sm font-bold">Next Payout</label>
                <p className="text-xl font-bold">Uzor (xx)</p>
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
              <p>xx of {data?.data.participant} payouts completed</p>
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

          <p className="text-[15px] font-medium">{data?.data.about}</p>

          <div>
            <div
              className="py-1 flex flex-row items-center justify-between cursor-pointer"
              onClick={handleToggleDropdown}
            >
              <div className="text-sm flex flex-row items-center justify-center gap-2">
                <People size={16} />
                <p className="font-medium">View all participants</p>
              </div>

              {isOpen ? <ArrowDown2 /> : <ArrowRight2 />}
            </div>

            {isOpen && (
              <div className="shadow-lg rounded-lg p-4">
                <ul>
                  {savingsMembers?.data.map((member: any) => (
                    <li
                      key={member.id}
                      className="py-2 flex items-center border-b border-[#FFFFFF36]"
                    >
                      {member.user.avatar ? (
                        <img
                          src={member.user.avatar}
                          alt={`${member.user.firstName} ${member.user.lastName}`}
                          className="w-8 h-8 rounded-full mr-3"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-300 mr-3" />
                      )}
                      <span className="font-medium">user {member.user.id}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="py-1 flex flex-row items-center justify-between">
            <div className="text-[15px] flex flex-row items-center justify-center gap-2 ">
              <Star1 size={16} />
              <p className="font-medium">Ratings & review</p>
            </div>
            <ArrowRight2 />
          </div>

          {data?.data?.type === "flexible" ? (
            <div className="grid grid-cols-2 gap-4 items-center">
              <div className="p-4 flex flex-col gap-3 rounded-lg border border-[#FFFFFF36]">
                <div className="flex flex-row gap-2 items-center text-[13px] font-medium">
                  <Refresh size={16} />
                  <p>Frequency</p>
                </div>
                <div className="flex flex-col text-lg font-black">
                  <span>{data?.data.frequency}</span> <span>Contributions</span>
                </div>
              </div>

              <div className="p-4 flex flex-col gap-3 rounded-lg border border-[#FFFFFF36]">
                <div className="flex flex-row gap-2 items-center text-[13px] font-medium">
                  <People size={16} />
                  <p>Participants</p>
                </div>
                <div className="flex flex-col text-lg font-black">
                  <span>
                    {savingsMembers?.data.length} of {data?.data.participant}
                  </span>{" "}
                  <span>Participants</span>
                </div>{" "}
              </div>

              <div className="p-4 flex flex-col gap-3 rounded-lg border border-[#FFFFFF36]">
                <div className="flex flex-row gap-2 items-center text-[13px] font-medium">
                  <Coin size={16} />
                  <p>Savings type</p>
                </div>
                <div className="flex flex-col text-lg font-black">
                  <span>{data?.data.type}</span> <span>Savings</span>
                </div>{" "}
              </div>

              <div className="p-4 flex flex-col gap-3 rounded-lg border border-[#FFFFFF36]">
                <div className="flex flex-row gap-2 items-center text-[13px] font-medium">
                  <Money3 size={16} />
                  <p>Contribution Amt.</p>
                </div>
                <div className="flex flex-col text-lg font-black">
                  <span>{data?.data.individualAmount}</span> <span>USDC</span>
                </div>{" "}
              </div>

              <div className="p-4 flex flex-col gap-3 rounded-lg border border-[#FFFFFF36]">
                <div className="flex flex-row gap-2 items-center text-[13px] font-medium">
                  <Money3 size={16} />
                  <p>Target</p>
                </div>
                <div className="flex flex-col text-lg font-black">
                  <span>{data?.data.targetAmount}</span> <span>USDC</span>
                </div>{" "}
              </div>

              <div className="p-4 flex flex-col gap-3 rounded-lg border border-[#FFFFFF36]">
                <div className="flex flex-row gap-2 items-center text-[13px] font-medium">
                  <Money3 size={16} />
                  <p>Payout cycle</p>
                </div>
                <div className="flex flex-col text-lg font-black">
                  <span>{data?.data.participant}</span> <span>cycles</span>
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
                  <span>{data?.data?.frequency}</span>{" "}
                  <span>Contributions</span>
                </div>
              </div>

              <div className="p-4 flex flex-col gap-3 rounded-lg border border-[#FFFFFF36]">
                <div className="flex flex-row gap-2 items-center text-[13px] font-medium">
                  <People size={16} />
                  <p>Participants</p>
                </div>
                <div className="flex flex-col text-lg font-black">
                  {savingsMembers?.data.length} of {data?.data.participant}
                  <span>Participants</span>
                </div>{" "}
              </div>

              <div className="p-4 flex flex-col gap-3 rounded-lg border border-[#FFFFFF36]">
                <div className="flex flex-row gap-2 items-center text-[13px] font-medium">
                  <Coin size={16} />
                  <p>Savings type</p>
                </div>
                <div className="flex flex-col text-lg font-black">
                  <span>{data?.data?.type}</span> <span>Savings</span>
                </div>{" "}
              </div>

              <div className="p-4 flex flex-col gap-3 rounded-lg border border-[#FFFFFF36]">
                <div className="flex flex-row gap-2 items-center text-[13px] font-medium">
                  <Calendar size={16} />
                  <p>Duration</p>
                </div>
                <div className="flex flex-col text-lg font-black">
                  <span>{data?.data?.duration}</span>{" "}
                  <span>
                    {data?.data.frequency === "weekly"
                      ? "Weeks"
                      : data?.data.frequency === "biweekly"
                      ? "Biweeks"
                      : data?.data.frequency === "monthly"
                      ? "Months"
                      : ""}
                  </span>
                </div>{" "}
              </div>

              <div className="p-4 flex flex-col gap-3 rounded-lg border border-[#FFFFFF36]">
                <div className="flex flex-row gap-2 items-center text-[13px] font-medium">
                  <Money3 size={16} />
                  <p>Contribution Amt.</p>
                </div>
                <div className="flex flex-col text-lg font-black">
                  <span>{data?.data.individualAmount}</span> <span>USDC</span>
                </div>{" "}
              </div>

              <div className="p-4 flex flex-col gap-3 rounded-lg border border-[#FFFFFF36]">
                <div className="flex flex-row gap-2 items-center text-[13px] font-medium">
                  <Money3 size={16} />
                  <p>Target</p>
                </div>
                <div className="flex flex-col text-lg font-black">
                  <span>{data?.data.targetAmount}</span> <span>USDC</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <div className="text-[13px] font-medium">
            <p>Recent Deposits</p>
          </div>

          <div>
            <ul>
              {data?.data?.transactions?.map((transaction: any) => {
                return (
                  <li key={transaction.id} className="py-2">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col items-start">
                        <span className="text-sm text-gray-500">
                          {transaction.type}
                        </span>
                        <span>{transaction.userId}</span>
                      </div>
                      <div className="text-sm">
                        <span className="flex flex-row items-center gap-1 font-medium">
                          {transaction.type === "deposit" ? (
                            <Plus size={14} color="green" />
                          ) : (
                            <Minus size={14} color="red" />
                          )}{" "}
                          {transaction.amount}USDC
                        </span>
                        <div className="text-xs text-gray-400">
                          {new Date(transaction.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <button
          disabled={isSubmitDisabled}
          onClick={() =>
            router.push(`/dashboard/moneyclubs/${params.id}/join-savings`)
          }
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
