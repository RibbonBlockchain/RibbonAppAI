"use client";

import React from "react";
import QRCode from "qrcode.react";
import toast from "react-hot-toast";
import { InfoIcon, Share } from "lucide-react";
import BackArrowButton from "@/components/button/back-arrow";
import AddressDisplay from "@/components/wallet/address-display";
import { Copy } from "iconsax-react";

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
          <p>
            Only send Worldcoin{" "}
            <span className="capitalize font-semibold">(OPTIMISM)</span> assets
            to this address.
          </p>
          <p> Other assets will be lost forever.</p>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center gap-1 font-semibold ">
        WLD
        <p className="px-3 py-1 text-sm font-semibold ml-3 border rounded-lg bg-gray-200 text-[#434343]">
          OP Mainnet
        </p>
      </div>

      <div
        className="py-6 px-4 flex w-fit flex-col border rounded-lg border-gray-300 items-center justify-center mx-auto"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        <QRCode
          value={walletAddress as string}
          size={182}
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          level={"H"}
          className="p-3"
        />
        <p
          onClick={handleClick}
          className="mt-2 text-wrap text-sm flex-wrap text-center text-[#434343]"
        >
          <AddressDisplay address={walletAddress} />
        </p>
      </div>

      <div className="flex flex-row items-center justify-center gap-6 text-sm">
        <div onClick={handleClick} className="flex flex-col gap-1 items-center">
          <div className="flex items-center px-3 py-3 bg-gray-300 rounded-full">
            <Copy size="20" color="#000000" variant="Bold" />
          </div>
          Copy
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="flex items-center px-3 py-3 bg-gray-300 rounded-full">
            <Share size={20} />
          </div>
          Share
        </div>
      </div>
    </div>
  );
};

export default Receive;
