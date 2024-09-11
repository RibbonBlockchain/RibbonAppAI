"use client";

import {
  Copy,
  Calendar,
  Document,
  ArrowLeft2,
  WalletMoney,
  DollarCircle,
} from "iconsax-react";
import {
  useGetLinkageById,
  useGetLinkages,
  useGetLinkagesFile,
} from "@/api/linkage";
import Image from "next/image";
import Retrain from "./retrain";
import Activity from "./activity";
import Settings from "./settings";
import toast from "react-hot-toast";
import LinkageWallet from "./wallet";
import { useRouter } from "next/navigation";
import { copyToClipboard } from "@/lib/utils";
import { shorten } from "@/lib/utils/shorten";
import React, { useEffect, useState } from "react";
import UploadQuestionnaire from "./loan-survey";
import { formatLastTrainedDate } from "@/lib/utils/format-date";
import { useCoinDetails } from "@/containers/dashboard/swipe-cards";
import LoanSurvey from "./loan-survey";

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
  { name: "AI Bot", value: "ai-bot" },
  { name: "Retrain", value: "retrain" },
  { name: "Wallet", value: "wallet" },
  { name: "Questionnaires", value: "questionnaires" },
  { name: "Loan Survey", value: "loan" },
  { name: "Activity", value: "activity" },
  { name: "Settings", value: "settings" },
];

const MyLinkageDetails: React.FC = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedAI, setSelectedAI] = useState<AIdata | null>(null);

  const { data: linkagesList } = useGetLinkages();
  const { data } = useGetLinkageById(selectedAI?.id as number);
  const { data: linkageFile } = useGetLinkagesFile(selectedAI?.id as number);

  const { data: coinPrice } = useCoinDetails();
  const currentPrice = coinPrice?.market_data.current_price.usd as number;

  const lastTrainedDate: Date = new Date(
    linkageFile?.data[linkageFile?.data?.length - 1].updatedAt
  );

  const [selectedTab, setSelectedTab] = useState("ai-bot");

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    if (linkagesList?.data && linkagesList.data.length > 0) {
      setSelectedAI(linkagesList.data[0]);
    }
  }, [linkagesList]);

  useEffect(() => {
    if (selectedAI) {
    }
  }, [selectedAI]);

  const handleSelect = (aiData: AIdata) => {
    setSelectedAI(aiData);
    setIsOpen(false);
  };

  return (
    <main className="relative min-h-screen w-full text-white bg-[#0B0228] p-3 sm:p-6 pb-8">
      <div className="flex flex-row items-center justify-between gap-4 mt-2">
        <ArrowLeft2
          size="24"
          color="#ffffff"
          className="my-2 cursor-pointer"
          onClick={() => router.back()}
        />

        <div className="relative text-sm font-bold min-w-fit px-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 border border-gray-300 rounded-md bg-[#0B0228] w-full text-left"
          >
            {selectedAI ? (
              <div className="flex items-center gap-2">
                <Image
                  width={20}
                  height={20}
                  alt={selectedAI.name}
                  className="w-[20px] h-[20px] rounded-full"
                  src={selectedAI.image || "/assets/sample-icon.png"}
                />
                <span>{selectedAI.name}</span>
              </div>
            ) : (
              "Select your bot"
            )}
          </button>

          {isOpen && (
            <div className="absolute left-0 mt-2 w-full border border-gray-300 bg-[#0B0228] rounded-md shadow-lg z-10">
              {linkagesList?.data?.map((aiData: AIdata) => (
                <div
                  key={aiData.id}
                  onClick={() => handleSelect(aiData)}
                  className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-200"
                >
                  <Image
                    width={20}
                    height={20}
                    alt={aiData.name}
                    className="w-[20px] h-[20px] rounded-full"
                    src={aiData.image || "/assets/sample-icon.png"}
                  />
                  <span>{aiData.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 px-1 flex flex-row gap-2 w-[inherit] border-b border-[#F2EEFF40] overflow-x-auto scroll-hidden">
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

      {selectedAI && (
        <div className="mt-10">
          {selectedTab === "ai-bot" && (
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
                    copyToClipboard(data?.data?.walletAddress, () =>
                      toast.success("Wallet address copied")
                    )
                  }
                  className="flex flex-row items-center gap-1 font-semibold text-sm"
                >
                  {shorten(data?.data?.walletAddress)}
                  <Copy size="16" color="#ffffff" variant="Bold" />
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 text-xs font-normal">
                <div className="flex flex-row gap-2 items-center">
                  <DollarCircle size="18" color="#ffffff" />
                  <p className="font-normal text-xs">Balance</p>
                </div>
                <p className="flex flex-row items-center gap-1 font-semibold text-sm">
                  $ {data?.data.wallet?.balance * currentPrice}
                </p>
              </div>
              <div className="flex flex-col items-start gap-2 text-xs font-normal">
                <div className="flex flex-row gap-2 items-center">
                  <Document size="18" color="#ffffff" />
                  <p className="font-normal text-xs">Sources</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="flex flex-row items-center gap-1 font-semibold text-sm">
                    0 Link(s)
                  </p>
                  <p className="flex flex-row items-center gap-1 font-semibold text-sm">
                    {linkageFile?.data.length} File(s)
                  </p>
                  <p className="flex flex-row items-center gap-1 font-semibold text-sm">
                    {data?.data?.prompts.length} conversational starter(s)
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 text-xs font-normal">
                <div className="flex flex-row gap-2 items-center">
                  <Calendar size="18" color="#ffffff" />
                  <p className="font-normal text-xs">Last trained</p>
                </div>
                <p className="flex flex-row items-center gap-1 font-semibold text-sm">
                  {formatLastTrainedDate(lastTrainedDate)}
                </p>
              </div>
            </div>
          )}

          {selectedTab === "retrain" && (
            <Retrain
              id={selectedAI?.id as number}
              slug={selectedAI?.slug as string}
            />
          )}

          {selectedTab === "wallet" && (
            <LinkageWallet
              walletAddress={data?.data?.walletAddress}
              walletBalance={data?.data?.wallet?.balance * currentPrice}
            />
          )}

          {selectedTab === "questionnaires" && (
            <UploadQuestionnaire linkageId={selectedAI?.id} />
          )}

          {selectedTab === "loan" && <LoanSurvey linkageId={selectedAI?.id} />}

          {selectedTab === "activity" && <Activity />}

          {selectedTab === "settings" && <Settings />}
        </div>
      )}
    </main>
  );
};

export default MyLinkageDetails;
