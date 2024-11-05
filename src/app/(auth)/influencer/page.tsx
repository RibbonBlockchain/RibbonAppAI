"use client";

import Image from "next/image";
import React, { useState } from "react";
import Button from "@/components/button";
import { ArrowLeft2 } from "iconsax-react";
import { useRouter } from "next/navigation";
import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";

const tabs = [
  {
    name: "Tyla AI",
    value: "ai",
  },
  {
    name: "$Token",
    value: "token",
  },
  {
    name: "Store",
    value: "store",
  },
  {
    name: "LIVE",
    value: "live",
  },
];

const Influencer = () => {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState("ai");
  const handleTabCLick = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <AuthNavLayout>
      <div className="w-full min-h-screen text-white bg-[#2c2151]">
        <div className="p-4 sm:p-6">
          <div className="flex flex-row items-center gap-4 mt-2">
            <ArrowLeft2
              size="24"
              color="#ffffff"
              className="my-2"
              onClick={() => router.back()}
            />
            <p className="text-[20px] font-bold">Tyla AI</p>
          </div>

          <div className="bg-[#5e5482] mt-4 flex flex-col justify-between text-white rounded-2xl w-full min-w-[270px] xxs:min-w-[330px] xs:min-w-full max-w-[452px] h-auto p-4 my-2 border border-[#D6CBFF4D]">
            <div className="flex flex-row items-start justify-between">
              <div className="flex flex-row gap-2 items-center">
                <Image
                  width={64}
                  height={64}
                  alt="avatar"
                  className="bg-white rounded-full"
                  src={""}
                />
                <div className="flex flex-col text-xs font-medium gap-1">
                  <div className="flex flex-row gap-1 text-base font-bold">
                    <p>TYLA</p>
                    <p>B</p>
                  </div>
                  <p>amapiano music</p>
                  <p className="text-[#DFCBFB] text-underline">audio link</p>
                  <p>
                    <span className="font-extrabold">92.5M</span> followers
                  </p>
                </div>
              </div>
              <Button className="self-end max-w-fit px-3 py-0.5">Follow</Button>
            </div>
          </div>

          <div className="mt-6 flex flex-row items-start justify-between w-full overflow-x-auto scroll-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => handleTabCLick(tab.value)}
                className={`min-w-fit border-[1px] border-[#FFFFFF] text-center text-[13px] px-3 pt-[7px] pb-[6px] rounded-[32px] ${
                  selectedTab === tab.value
                    ? `text-white bg-[#D6CBFF4D] font-bold`
                    : `text-[#F2EEFF] font-medium`
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          {selectedTab === "ai" && (
            <div className="p-4 rounded-xl flex-1 h-full bg-[#251F2E] text-white flex flex-col">
              <div className="h-auto py-4 border-b border-[#C3B1FF1A] flex flex-row items-center justify-between">
                <p>Tyla AI Chat</p>
                <div className="flex flex-col justify-center">
                  <p>Balance</p>
                  <div className="flex flex-row items-center gap-1">
                    <Image
                      src={""}
                      alt=""
                      width={16}
                      height={16}
                      className="bg-white max-h-4 max-w-4"
                    />
                    <p>20 $Tyla</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-auto">
                {/* Your AI chat or content goes here */}
              </div>
            </div>
          )}

          {selectedTab === "token" && (
            <div className="p-4 rounded-xl flex-1 h-full bg-[#251F2E] text-white flex flex-col">
              Display token page
            </div>
          )}

          {selectedTab === "store" && (
            <div className="p-4 rounded-xl flex-1 h-full bg-[#251F2E] text-white flex flex-col">
              Display store page
            </div>
          )}

          {selectedTab === "live" && (
            <div className="p-4 rounded-xl flex-1 h-full bg-[#251F2E] text-white flex flex-col">
              Display live page
            </div>
          )}
        </div>
      </div>
    </AuthNavLayout>
  );
};

export default Influencer;
