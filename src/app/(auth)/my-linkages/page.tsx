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
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AIdata } from "@/api/linkage/types";
import { copyToClipboard } from "@/lib/utils";
import { shorten } from "@/lib/utils/shorten";
import React, { useEffect, useState } from "react";
import { useCoinDetails } from "@/lib/values/priceAPI";
import { formatLastTrainedDate } from "@/lib/utils/format-date";
import Retrain from "../../../containers/manage-linkage/retrain";
import MyStore from "../../../containers/manage-linkage/my-store";
import Activity from "../../../containers/manage-linkage/activity";
import Settings from "../../../containers/manage-linkage/settings";
import LoanSurvey from "../../../containers/manage-linkage/loan-survey";
import MassPayment from "../../../containers/manage-linkage/mass-payment";
import LinkageWallet from "../../../containers/manage-linkage/linkage-wallet";
import ManageLinkage from "../../../containers/manage-linkage/manage-linkages";
import UploadQuestionnaire from "../../../containers/manage-linkage/upload-questionnaire";

const tabs = [
  { name: "AI Bot", value: "ai-bot" },
  { name: "Retrain", value: "retrain" },
  { name: "Wallet", value: "wallet" },
  { name: "Mass payment", value: "mass-payment" },
  { name: "Questionnaires", value: "questionnaires" },
  { name: "Create Loan", value: "loan" },
  { name: "My Store", value: "my-store" },
  { name: "Manage Linkage", value: "manage-linkage" },
  { name: "Activity", value: "activity" },
  { name: "Settings", value: "settings" },
];

const MyLinkageDetails: React.FC = () => {
  const router = useRouter();

  const { data: coinPrice } = useCoinDetails();
  const currentPrice = coinPrice?.market_data.current_price.usd as number;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedAI, setSelectedAI] = useState<AIdata | null>(null);
  const { data: linkagesList } = useGetLinkages();
  const { data, refetch } = useGetLinkageById(selectedAI?.id as number);
  const { data: linkageFile } = useGetLinkagesFile(selectedAI?.id as number);

  const walletBalance = data?.data?.wallet?.balance;
  const walletConvertedBalance = data?.data?.wallet?.balance * currentPrice;

  const lastTrainedDate: Date = new Date(
    linkageFile?.data[linkageFile?.data?.length - 1].updatedAt
  );

  const [selectedTab, setSelectedTab] = useState(() => {
    return localStorage.getItem("activeManageLinkageTab");
  });

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    if (selectedTab) {
      localStorage.setItem("activeManageLinkageTab", selectedTab);
    }
  }, [selectedTab]);

  useEffect(() => {
    if (linkagesList?.data && linkagesList.data.length > 0) {
      setSelectedAI(linkagesList.data[0]);
    }
  }, [linkagesList]);

  useEffect(() => {
    if (selectedAI) {
      localStorage.setItem("selectedLinkageId", JSON.stringify(selectedAI?.id));
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
          onClick={() => router.push("/profile")}
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
                  src={selectedAI.logo || "/assets/sample-icon.png"}
                />
                <span>{selectedAI.name}</span>
              </div>
            ) : (
              "Select your linkage"
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

      {!selectedAI && (
        <div className="mt-24 flex flex-col gap-3 items-center justify-center text-center mx-auto">
          <p className="text-xl font-bold">No linkage created yet</p>
          <p className="text-sm font-normal">
            Get started by creating your first Linkage. Engage users and
            automate responses in real time
          </p>
          <Link
            href={"/linkages/create"}
            className="bg-white text-center min-w-fit text-sm font-semibold py-3 px-6 rounded-xl shadow-sm transition-colors duration-100 focus-visible:duration-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 border-solid disabled:cursor-not-allowed text-[#290064] disabled:border-stone-300 disabled:bg-stone-400/50"
          >
            Create Linkage
          </Link>
        </div>
      )}

      {selectedAI && (
        <div className="mt-6">
          {selectedTab === "ai-bot" && (
            <div className="flex flex-col gap-8">
              <div className="flex flex-row gap-4 items-center">
                <Image
                  width={42}
                  height={42}
                  alt="display"
                  className="w-[50px] h-auto"
                  src={selectedAI?.logo || "/assets/sample-icon.png"}
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
              linkageId={selectedAI?.id as number}
              walletBalance={walletBalance}
              walletAddress={data?.data?.walletAddress}
              walletConvertedBalance={walletConvertedBalance?.toFixed(4)}
              refetch={refetch}
              baseName={data?.data?.baseName}
            />
          )}

          {selectedTab === "mass-payment" && (
            <div className="max-w-[inherit]">
              <MassPayment
                walletBalance={walletBalance}
                linkageId={selectedAI?.id as number}
              />
            </div>
          )}

          {selectedTab === "questionnaires" && (
            <UploadQuestionnaire linkageId={selectedAI?.id} />
          )}

          {selectedTab === "loan" && <LoanSurvey linkageId={selectedAI?.id} />}

          {selectedTab === "my-store" && <MyStore />}

          {selectedTab === "manage-linkage" && (
            <ManageLinkage
              linkageId={selectedAI?.id}
              featured={data?.data?.features?.length > 0}
              featuredId={data?.data?.features[0]?.id}
              linkageBalance={data?.data.wallet?.balance}
            />
          )}

          {selectedTab === "activity" && <Activity />}

          {selectedTab === "settings" && <Settings />}
        </div>
      )}
    </main>
  );
};

export default MyLinkageDetails;
