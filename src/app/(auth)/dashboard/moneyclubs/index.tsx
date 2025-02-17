"use client";

import {
  useGetAllSavingsPlan,
  useGetCreatedSavingsPlan,
  useGetJoinedSavingsPlan,
} from "@/api/user";
import { ArrowRight2 } from "iconsax-react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const MoneyClubs = () => {
  const router = useRouter();
  const { data } = useGetAllSavingsPlan();
  const { data: createdSavingsPlan } = useGetCreatedSavingsPlan();
  const { data: joinedSavingsPlan } = useGetJoinedSavingsPlan();

  const savingsPlans = Array.isArray(data?.data) ? data?.data : [];

  const [activeTab, setActiveTab] = useState("all");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const emptyData: any[] = [];

  return (
    <div className="pb-16 flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={() => handleTabClick("all")}
              className={`cursor-pointer px-2.5 py-1.5 rounded-full border ${
                activeTab === "all"
                  ? "bg-[#413f4a] text-white"
                  : "border-[#F2EEFF40]"
              }`}
            >
              All
            </p>
            <p
              onClick={() => handleTabClick("joined")}
              className={`cursor-pointer px-2.5 py-1.5 rounded-full border ${
                activeTab === "joined"
                  ? "bg-[#413f4a] text-white"
                  : "border-[#F2EEFF40]"
              }`}
            >
              Joined
            </p>
            <p
              onClick={() => handleTabClick("created")}
              className={`cursor-pointer px-2.5 py-1.5 rounded-full border ${
                activeTab === "created"
                  ? "bg-[#413f4a] text-white"
                  : "border-[#F2EEFF40]"
              }`}
            >
              Created
            </p>
          </div>
          <p
            onClick={() => router.push("/dashboard/moneyclubs/create-plan")}
            className="flex cursor-pointer flex-row items-center gap-1 px-4 py-1.5 rounded-full border border-[#F2EEFF40] text-[#290064] bg-white"
          >
            Create <Plus size={16} />
          </p>
        </div>

        {activeTab === "all" && (
          <div className="flex flex-col gap-4 text-sm font-normal text-[#FFFFFF]">
            {savingsPlans.map((i: any) => (
              <div
                key={i.id}
                onClick={() => router.push(`/dashboard/moneyclubs/${i.id}`)}
                className="bg-[#3e3854] rounded-lg p-3 flex flex-row items-center justify-between cursor-pointer"
              >
                <div className="text-xs flex flex-col gap-2 ">
                  <p className="font-black">{i.name}</p>
                  <p className="font-medium">
                    ${i.individualAmount} x {i.duration} {i.frequency}
                  </p>
                </div>
                <ArrowRight2 />
              </div>
            ))}

            {savingsPlans?.length === 0 && (
              <div className="mt-5 text-center">
                There are no savings plans at the moment
              </div>
            )}
          </div>
        )}

        {activeTab === "joined" && (
          <div className="flex flex-col gap-4 text-sm font-normal text-[#FFFFFF]">
            {joinedSavingsPlan?.data.map((i: any) => (
              <div
                key={i.id}
                onClick={() => router.push(`/dashboard/moneyclubs/${i.id}`)}
                className="bg-[#3e3854] rounded-lg p-3 flex flex-row items-center justify-between cursor-pointer"
              >
                <div className="text-xs flex flex-col gap-2 ">
                  <p className="font-black">{i.name}</p>
                  <p className="font-medium">
                    ${i.individualAmount} x {i.duration} {i.frequency}
                  </p>
                </div>
                <ArrowRight2 />
              </div>
            ))}

            {joinedSavingsPlan?.data.length === 0 && (
              <div className="mt-5 text-center">
                You have not joined any savings plan
              </div>
            )}
          </div>
        )}

        {activeTab === "created" && (
          <div className="flex flex-col gap-4 text-sm font-normal text-[#FFFFFF]">
            {createdSavingsPlan?.data.map((i: any) => (
              <div
                key={i.id}
                onClick={() => router.push(`/dashboard/moneyclubs/${i.id}`)}
                className="bg-[#3e3854] rounded-lg p-3 flex flex-row items-center justify-between cursor-pointer"
              >
                <div className="text-xs flex flex-col gap-2 ">
                  <p className="font-black">{i.name}</p>
                  <p className="font-medium">
                    ${i.individualAmount} x {i.duration} {i.frequency}
                  </p>
                </div>
                <ArrowRight2 />
              </div>
            ))}

            {createdSavingsPlan?.data.length === 0 && (
              <div className="mt-5 text-center">
                You have not created any savings plan
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoneyClubs;
