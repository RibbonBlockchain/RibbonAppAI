"use client";

import { useGetAllSavingsPlan } from "@/api/user";
import { ArrowRight2 } from "iconsax-react";
import { useRouter } from "next/navigation";
import React from "react";

const MoneyClubs = () => {
  const router = useRouter();
  const { data } = useGetAllSavingsPlan();

  const savingsPlans = Array.isArray(data?.data) ? data?.data : [];

  return (
    <div className="pb-16 flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between">
          <p
            onClick={() => router.push("/dashboard/moneyclubs/create-plan")}
            className="px-4 py-1.5 rounded-full border border-[#F2EEFF40]"
          >
            Start a savings plan
          </p>
        </div>

        <div className="flex flex-col gap-4 text-sm font-normal text-[#FFFFFF]">
          {savingsPlans.map((i: any) => (
            <div
              key={i.id}
              onClick={() => router.push(`/dashboard/moneyclubs/${i.id}`)}
              className="bg-[#3e3854] rounded-lg p-3 flex flex-row items-center justify-between"
            >
              <div className="text-xs flex flex-col gap-2 ">
                <p className="font-black">{i.name}</p>
                <p className="font-medium">
                  ${i.individualAmount} x {i.duration} months
                </p>
              </div>
              <ArrowRight2 />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoneyClubs;
