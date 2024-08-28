"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import {
  ArrowLeft2,
  Calendar,
  Copy,
  Document,
  DollarCircle,
  Monero,
  WalletMoney,
} from "iconsax-react";
import { useParams, useRouter } from "next/navigation";
import {
  useGetLinkageAIById,
  useGetLinkageAIBySlug,
  useGetLinkageBySlug,
  useGetLinkagesAI,
} from "@/api/ai";
import { copyToClipboard } from "@/lib/utils";
import toast from "react-hot-toast";
import { shorten } from "@/lib/utils/shorten";
import Image from "next/image";

interface AIdata {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  prompts: string;
  assistantId: string;
  description: string;
  instruction: string;
  linkageId: number;
  createdAt: string;
  updatedAt: string;
}

const tabs = [
  { name: "AI Bot", value: "aibot" },
  { name: "Retrain", value: "retrain" },
  { name: "Questionnaires", value: "questionnaires" },
  { name: "Activity", value: "activity" },
  { name: "Settings", value: "settings" },
];

const MyLinkageDetails = () => {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [selectedAI, setSelectedAI] = useState<AIdata | null>(null);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedLinkageId = parseInt(event.target.value);
    const selectedObject = listLinkagesAI.data.find(
      (i: any) => i.linkageId === selectedLinkageId
    );
    setSelectedAI(selectedObject || null);
  };

  const [selectedTab, setSelectedTab] = useState("chat-bot");
  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  const { data } = useGetLinkageBySlug(slug);
  const { data: listLinkagesAI } = useGetLinkagesAI(data?.data.id);

  const { data: linkageAIdata } = useGetLinkageAIById({
    AiId: selectedAI?.id as number,
    linkageId: selectedAI?.linkageId as number,
  });

  const [count, setCount] = useState(0);
  useEffect(() => {
    if (linkageAIdata?.data && linkageAIdata?.data?.prompts) {
      setCount(count + 1);
    }
  }, [data, selectedAI, linkageAIdata]);

  return (
    <main className="relative min-h-screen w-full text-white bg-[#0B0228] p-3 sm:p-6 pb-8">
      <div className="flex flex-row items-center justify-between gap-4 mt-2">
        <ArrowLeft2
          size="24"
          color="#ffffff"
          className="my-2 cursor-pointer"
          onClick={() => router.back()}
        />

        <div className="text-sm font-bold flex flex-col gap-2">
          <select
            value={selectedAI?.linkageId || ""}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md bg-inherit"
          >
            <option value="" disabled>
              Select your bot
            </option>
            {listLinkagesAI.data.map((i: any) => (
              <option key={i.id} value={i.linkageId} className="bg-inherit ">
                <div className="flex flex-row gap-1">
                  <Image
                    width={20}
                    height={20}
                    alt="display"
                    className="w-[20px] h-[20px] rounded-full"
                    src={i.image || "/assets/sample-icon.png"}
                  />
                  <p>{i.name}</p>
                </div>
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 px-1 flex flex-row gap-6 w-[inherit] border-b border-[#F2EEFF40] overflow-x-auto overflow-hidden">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleTabClick(tab.value)}
            className={`min-w-fit px-3 py-3 ${
              selectedTab === tab.value
                ? "text-white border-b-2 border-b-white"
                : "bg-transparent text-[#F2EEFF]"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="mt-10">
        {selectedTab === "aibot" && (
          <div className="flex flex-col gap-8">
            <div className="flex flex-row gap-4 items-center">
              <Image
                width={42}
                height={42}
                alt="display"
                className="w-[50px] h-auto"
                src={selectedAI?.image || "/assets/sample-icon.png"}
              />
              <p className="flex flex-grow text-lg font-bold py-3 border-b border-[#C3B1FF4D]">
                {selectedAI?.name}
              </p>
            </div>
            <div className="flex flex-col items-start gap-2 text-xs font-normal">
              <div className="flex flex-row gap-2 items-center">
                <WalletMoney size="18" color="#ffffff" />
                <p className="font-normal text-xs">Wallet address</p>
              </div>
              <div
                onClick={() =>
                  copyToClipboard(data?.data?.walletAddress?.addressId, () =>
                    toast.success("Wallet address copied")
                  )
                }
                className="flex flex-row items-center gap-1 font-semibold text-sm"
              >
                {shorten(data?.data?.walletAddress?.addressId)}
                <Copy size="16" color="#ffffff" variant="Bold" />
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 text-xs font-normal">
              <div className="flex flex-row gap-2 items-center">
                <DollarCircle size="18" color="#ffffff" />
                <p className="font-normal text-xs">Balance</p>
              </div>
              <p className="flex flex-row items-center gap-1 font-semibold text-sm">
                $ xxx
              </p>
            </div>
            <div className="flex flex-col items-start gap-2 text-xs font-normal">
              <div className="flex flex-row gap-2 items-center">
                <Document size="18" color="#ffffff" />
                <p className="font-normal text-xs">Sources</p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="flex flex-row items-center gap-1 font-semibold text-sm">
                  0 Link
                </p>
                <p className="flex flex-row items-center gap-1 font-semibold text-sm">
                  0 File
                </p>
                <p className="flex flex-row items-center gap-1 font-semibold text-sm">
                  {count} conversational starters
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 text-xs font-normal">
              <div className="flex flex-row gap-2 items-center">
                <Calendar size="18" color="#ffffff" />
                <p className="font-normal text-xs">Last trained</p>
              </div>
              <p className="flex flex-row items-center gap-1 font-semibold text-sm">
                xxxx
              </p>
            </div>
          </div>
        )}
        {selectedTab === "retrain" && <div>Retrain AI</div>}
        {selectedTab === "questionnaires" && <div>Manage Questionnaire</div>}
        {selectedTab === "activity" && <div>Activity </div>}
        {selectedTab === "settings" && <div>Settings </div>}
      </div>
    </main>
  );
};

export default MyLinkageDetails;
