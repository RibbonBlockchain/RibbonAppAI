"use client";

import React from "react";
import Image from "next/image";
import QRCode from "qrcode.react";
import toast from "react-hot-toast";
import { Copy } from "iconsax-react";
import { InfoIcon, Share } from "lucide-react";
import BackArrowButton from "@/components/button/back-arrow";
import AddressDisplay from "@/components/wallet/address-display";

const Receive = () => {
  const walletAddress = localStorage.getItem("address");

  const handleClick = () => {
    navigator.clipboard
      .writeText(walletAddress as string)
      .then(() => {
        toast.success("address copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Could not copy text");
      });
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-white flex flex-col gap-6">
      <div className="">
        <BackArrowButton stroke="#939393" />
        <div className="flex -mt-10 text-black  flex-row items-center justify-center text-base font-semibold">
          Receive
        </div>
      </div>

      <div className="flex flex-row gap-2 border p-4 rounded-lg bg-gray-100">
        <InfoIcon size={18} />
        <div className="flex flex-col gap-1 text-xs text-[#434343]">
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
          value={walletAddress as string}
          size={192}
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          level={"H"}
          className="p-3 rounded-2xl"
        />
        <div className="px-2 py-2 mt-2 text-wrap text-sm flex-wrap text-center text-[#434343]">
          <AddressDisplay address={walletAddress} />
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
