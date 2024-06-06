"use client";

import React from "react";
import QRCode from "qrcode.react";
import toast from "react-hot-toast";
import BackArrowButton from "@/components/button/back-arrow";

const Receive = () => {
  const walletAddress = localStorage.getItem("address");

  const handleClick = () => {
    navigator.clipboard
      .writeText(walletAddress as string)
      .then(() => {
        toast.success("address copied to clipboard!");
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-white flex flex-col">
      <div className="mb-6">
        <BackArrowButton stroke="#939393" />
        <div className="flex -mt-10 text-black  flex-row items-center justify-center text-base font-semibold">
          Deposit token
        </div>
      </div>

      <div
        className="py-6 flex items-center justify-center mx-auto"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        <QRCode
          value={walletAddress as string}
          size={220}
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          level={"H"}
        />
      </div>

      <div className="flex flex-col gap-1 border border-gray-200 rounded-2xl p-6 mt-6">
        <p className="text-sm font-normal text-gray-500">Deposit Address </p>
        <div className="flex flex-col gap-2">
          <p className="max-w-[85%] text-wrap flex-wrap">{walletAddress}</p>
          <button
            className="cursor-pointer flex self-end text-sm bg-gray-400 p-2 w-fit rounded-md "
            onClick={handleClick}
          >
            Copy address
          </button>
        </div>
      </div>
    </div>
  );
};

export default Receive;
