"use client";

import React, { useState } from "react";
import Button from "@/components/button";
import { WorldID } from "@/public/images";
import { useRouter } from "next/navigation";
import BackArrowButton from "@/components/button/back-arrow";
import WithdrawalProcessing from "@/components/modal/withdrawal-processing";

const Preview = () => {
  const router = useRouter();

  const [modal, setModal] = useState(false);

  const closeModal = () => {
    setModal(false), router.push("/withdraw/success");
  };

  return (
    <div className="p-4 sm:p-6 flex flex-col justify-between h-full ">
      <div className="flex flex-col gap-10">
        <div className="">
          <BackArrowButton stroke="#583DB4" />
          <div className="flex -mt-10 flex-row items-center justify-center text-lg font-medium">
            You are withdrawing
          </div>
        </div>

        <div className="flex items-center justify-between mt-10">
          <div className="flex flex-row gap-3 items-center px-2">
            <WorldID />
            <div>
              <p className="text-xs text-[#8C8C8C]">Value</p>
              <p className="text-sm font-bold">1 WLD</p>
            </div>
          </div>
          <p className="text-[#939393] font-base font-bold">5.520 USD</p>
        </div>

        <div className="flex items-center justify-between px-2  py-1">
          <p className="text-base font-bold">To</p>
          <p className="text-sm font-medium text-[#434343] break-words text-right h-auto w-[250px]">
            Njkmppli26jj89opll221QKHnbjjyyfdgsgh;kjhigpdgetjuuj5jghnpgj
          </p>
        </div>

        <div className="flex items-center justify-between px-2">
          <p className="text-sm font-bold">Network</p>
          <p className="text-sm font-medium text-[#434343]">Optimism</p>
        </div>
      </div>

      <div className="flex items-center justify-center w-full pb-6">
        <Button loading={false} onClick={() => setModal(true)} disabled={false}>
          Withdraw
        </Button>
      </div>

      <WithdrawalProcessing isOpen={modal} closeModal={closeModal} />
    </div>
  );
};

export default Preview;
