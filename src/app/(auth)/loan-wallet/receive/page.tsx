"use client";

import React from "react";
import Image from "next/image";
import QRCode from "qrcode.react";
import toast from "react-hot-toast";
import { Copy } from "iconsax-react";
import { InfoIcon, Share } from "lucide-react";
import { useGetUserWallet } from "@/api/linkage";
import BackArrowButton from "@/components/button/back-arrow";
import AddressDisplay from "@/components/wallet/address-display";

const Receive = () => {
  const { data: loanWallet } = useGetUserWallet();
  const loanWalletAddress = loanWallet?.data[1]?.address;

  const handleClick = () => {
    navigator.clipboard
      .writeText(loanWalletAddress as string)
      .then(() => {
        toast.success("address copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Could not copy text");
      });
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-[#0B0228] text-white flex flex-col gap-6">
      <div className="">
        <BackArrowButton stroke="#939393" />
        <div className="flex -mt-10 ml-12 flex-row items-start justify-start text-xl font-semibold">
          Receive
        </div>
      </div>

      <div className="flex flex-row gap-2 text-white p-4 rounded-lg">
        <InfoIcon size={18} />
        <div className="flex flex-col gap-1 text-xs">
          Only send USDC (Base Ethereum L2) assets to this address. Other assets
          will be lost forever.
        </div>
      </div>

      <div className="flex flex-row gap-2 items-center justify-center">
        <Image src="/assets/usdc.png" alt="" width={24} height={24} />
        USDC
      </div>

      <div
        className="flex w-fit flex-col rounded-lg items-center justify-center mx-auto bg-white"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        <QRCode
          value={loanWalletAddress as string}
          size={192}
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          level={"H"}
          className="p-3 rounded-2xl"
        />
        <div className="px-2 py-2 mt-2 text-wrap text-sm flex-wrap text-center text-[#2C2C2C]">
          <AddressDisplay address={loanWalletAddress} />
        </div>
      </div>

      <div className="flex flex-row items-center justify-center gap-6 text-sm">
        <div onClick={handleClick} className="flex flex-col gap-1 items-center">
          <div className="flex items-center px-3 py-3 bg-[#3f3856] rounded-full">
            <Copy size="20" color="#FFFFFF" />
          </div>
          Copy
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="flex items-center px-3 py-3 bg-[#3f3856] rounded-full">
            <Share size={20} color="#FFF" />
          </div>
          Share
        </div>
      </div>
    </div>
  );
};

export default Receive;
