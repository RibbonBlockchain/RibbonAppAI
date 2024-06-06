"use client";

import React, { useState } from "react";
import Button from "@/components/button";
import Scan from "@/public/ReactSVG/scan";
import { useRouter } from "next/navigation";
import Network from "@/public/ReactSVG/network";
import { Wallets, WorldID } from "@/public/images";
import NetworkModal from "@/components/modal/network-modal";
import BackArrowButton from "@/components/button/back-arrow";

const WalletAddress = () => {
  const router = useRouter();

  const [modal, setModal] = useState(false);

  const closeModal = () => setModal(false);

  return (
    <div className="p-4 sm:p-6 flex flex-col justify-between h-full">
      <div className="flex flex-col gap-10">
        <div className="">
          <BackArrowButton stroke="#583DB4" />
          <div className="flex -mt-10 flex-row items-center justify-center text-lg font-medium">
            Withdraw tokens
          </div>
        </div>

        <div className="flex flex-col gap-6 text-sm">
          <div className="flex flex-col gap-2">
            <p className=" font-normal">Address</p>
            <div className="relative flex flex-row items-center justify-center w-full">
              <input
                placeholder="Long press to paste"
                className="w-full py-3.5 px-2 border-[1px] border-[#F2EEFF] rounded-md"
              />
              <div className="absolute right-3">
                <Scan />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div onClick={() => setModal(true)} className="flex flex-row gap-1">
              <p className="font-normal">Network</p> <Network />
            </div>
            <input
              placeholder="Optimism"
              className="w-full py-3.5 px-2 border-[1px] border-[#F2EEFF] rounded-md"
            />
          </div>
        </div>

        {/* <div className="flex flex-col gap-6 mt-6">
          <div className="flex flex-row text-sm items-center justify-between">
            <div className="flex gap-3 items-center ">
              <Wallets /> <p>My wallets</p>
            </div>
            <button className="border-[1px] border-[#7C56FE] rounded-md px-2 py-1">
              Connect wallet
            </button>
          </div>
          <div className="flex flex-row gap-3 items-center">
            <WorldID />
            <div>
              <p className="text-sm font-semibold">WLD</p>
              <p className="text-xs text-[#8C8C8C]">78 WLD</p>
            </div>
          </div>
        </div> */}
      </div>

      <div className="flex items-center justify-center w-full pb-6">
        <Button
          loading={false}
          onClick={() => router.push("/withdraw/amount")}
          disabled={false}
        >
          Continue
        </Button>
      </div>

      {modal && (
        <NetworkModal
          isOpen={modal}
          closeModal={closeModal}
          handleClick={closeModal}
        />
      )}
    </div>
  );
};

export default WalletAddress;
