"use client";

import { ArrowDown2, ArrowLeft2 } from "iconsax-react";
import { ArrowDownUp } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/button";
import { SpinnerIcon } from "@/components/icons/spinner";
import { useBuyUserToken, useSellUserToken } from "@/api/user";
import ToggleBuySell from "@/components/toggleBuySell";

const Sell = () => {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [selectedAction, setSelectedAction] = useState<"buy" | "sell">("sell");

  const handleToggleChange = (value: "buy" | "sell") => {
    setSelectedAction(value);
  };

  const { mutate: buyToken, isPending: isBuyPending } = useBuyUserToken();
  const { mutate: sellToken, isPending: isSellPending } = useSellUserToken();

  return (
    <main className="relative min-h-screen w-full text-white bg-[#0B0228] p-4 sm:p-6 pb-16">
      <div className="flex flex-row items-center gap-4 mt-2">
        <ArrowLeft2
          size="24"
          color="#ffffff"
          className="my-2"
          onClick={() => router.back()}
        />
      </div>

      <ToggleBuySell onChange={handleToggleChange} />

      {selectedAction === "sell" ? (
        <>
          <div className="flex flex-col gap-6 w-full">
            <div className="">
              <p className="text-[#98A2B3] text-base font-semibold">Amount</p>
              <div className="flex flex-row items-center gap-2">
                <p className="text-[40px] font-bold">50</p>
                <p className="text-base font-medium">USDC</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <ArrowDownUp
                  size={20}
                  stroke="#fff"
                  className="self-center flex"
                />
                <div className="flex flex-row gap-[2px] items-center text-[15px] font-medium">
                  <p>0.2</p> <p>ETH</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[#98A2B3] text-base font-semibold">Balance</p>
              <div className="flex flex-row items-center gap-1">
                <Image
                  alt="logo"
                  width={20}
                  height={20}
                  src={"/assets/ETHEREUM.svg"}
                />
                <div className="flex flex-row gap-[2px] items-center text-[15px] font-medium">
                  <p>20</p> <p>ETH</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[60%] flex items-center justify-center mx-auto mt-2">
            <Button
              disabled={false}
              onClick={() => {}}
              className="rounded-md mt-16 py-3"
            >
              {isSellPending ? <SpinnerIcon /> : "Sell"}
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-6 w-full">
            <div className="">
              <p className="text-[#98A2B3] text-base font-semibold">Amount</p>
              <div className="flex flex-row items-center gap-2">
                <p className="text-[40px] font-bold">50</p>
                <p className="text-base font-medium">USDC</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[#98A2B3] text-xs font-semibold">You get</p>
              <div className="flex flex-row items-center gap-2">
                <ArrowDownUp
                  size={20}
                  stroke="#fff"
                  className="self-center flex"
                />
                <div className="flex flex-row gap-[2px] items-center text-[15px] font-medium">
                  <p>0.2</p> <p>ETH</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[#98A2B3] text-base font-semibold">Pay with</p>
              <p>Select Payment method</p>
            </div>
          </div>

          <div className="w-[60%] flex items-center justify-center mx-auto mt-2">
            <Button
              disabled={false}
              onClick={() => {}}
              className="rounded-md mt-16 py-3"
            >
              {isBuyPending ? <SpinnerIcon /> : "Buy"}
            </Button>
          </div>
        </>
      )}
    </main>
  );
};

export default Sell;
