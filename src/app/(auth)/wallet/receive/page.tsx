"use client";

import React from "react";
import QRCode from "qrcode.react";
import toast from "react-hot-toast";
import BackArrowButton from "@/components/button/back-arrow";

const Receive = () => {
  const walletAddress = "0x9cB42686Df4b4F1dbaa5cA4002e171b7030229E3";

  const handleClick = () => {
    navigator.clipboard
      .writeText(walletAddress)
      .then(() => {
        toast.success("Wallet address copied to clipboard!");
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
          Wallet
        </div>
      </div>

      <p>Copy your wallet address to send transactions to the wallet</p>
      <div className="py-6" onClick={handleClick} style={{ cursor: "pointer" }}>
        <QRCode
          value={walletAddress}
          size={220}
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          level={"H"}
        />
      </div>
      <p>{walletAddress}</p>
    </div>
  );
};

export default Receive;
