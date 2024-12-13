"use client";

import { ArrowDown2, ArrowLeft2 } from "iconsax-react";
import { ArrowDownUp } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/button";
import { SpinnerIcon, SpinnerIconPurple } from "@/components/icons/spinner";
import { useBuyUserToken, useSellUserToken } from "@/api/user";
import ToggleBuySell from "@/components/toggleBuySell";
import {
  useBuyTokenDex,
  useGetLinkageBySlug,
  useGetLinkageToken,
  useSellTokenDex,
} from "@/api/linkage";
import toast from "react-hot-toast";

interface BuyProps {
  handleButtonClick: () => void;
}

const Buy = ({ handleButtonClick }: BuyProps) => {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const { data } = useGetLinkageBySlug(slug);
  const id = data?.data?.id;

  const [selectedAction, setSelectedAction] = useState<"buy" | "sell">("buy");

  const handleToggleChange = (value: "buy" | "sell") => {
    setSelectedAction(value);
  };

  const [amount, setAmount] = useState<number | string>("");

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = event.target.value;

    if (!isNaN(Number(newAmount)) || newAmount === "") {
      setAmount(newAmount);
    }
  };

  const { data: tokenData } = useGetLinkageToken(id);

  const { mutate: buyToken, isPending: isBuyPending } = useBuyTokenDex();
  const { mutate: sellToken, isPending: isSellPending } = useSellTokenDex();

  const handleBuyToken = () => {
    buyToken(
      { amount: Number(amount) },
      {
        onSuccess: () => {
          toast.success(
            `You purchased ${amount}ETH worth of ${tokenData?.data?.token?.name}`
          );
          setAmount("");
        },
      }
    );
  };

  const handleSellToken = () => {
    sellToken(
      { amount: Number(amount) },
      {
        onSuccess: () => {
          toast.success(
            `You sold ${amount}ETH worth of ${tokenData?.data?.token?.name}`
          );
          setAmount("");
        },
      }
    );
  };

  return (
    <main className="relative h-auto w-full text-white bg-[#251F2E] p-4 sm:p-6 pb-28">
      <div className="flex flex-row items-center gap-2 mt-4 mb-3">
        <div className="flex flex-row items-center gap-4">
          <ArrowLeft2
            size="24"
            color="#ffffff"
            className="my-2"
            onClick={handleButtonClick}
          />
        </div>

        <ToggleBuySell onChange={handleToggleChange} />
      </div>

      {selectedAction === "buy" ? (
        <>
          <div className="flex flex-col gap-8 w-full mt-10">
            <div className="w-full flex flex-row items-center gap-2 relative">
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                className="text-base rounded-[10px] py-3 w-full font-bold pl-2 bg-inherit border border-white max-w-full"
                min="0"
              />
              <div className="absolute right-4 flex flex-row gap-1 items-center">
                <p className="text-base font-medium">USDC</p>
                <Image
                  alt="logo"
                  width={20}
                  height={20}
                  src={"/assets/ETHEREUM.svg"}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[#98A2B3] text-xs font-semibold">You get</p>

              <div className="w-full flex flex-row items-center gap-2 relative">
                <input
                  type="number"
                  value={""}
                  onChange={handleAmountChange}
                  className="text-base rounded-[10px] py-3 w-full font-bold pl-2 bg-inherit border border-white max-w-full"
                  min="0"
                />
                <div className="absolute right-4 flex flex-row gap-1 items-center">
                  <p className="text-base font-medium">SOL</p>
                  <Image
                    alt="logo"
                    width={20}
                    height={20}
                    src={"/assets/ETHEREUM.svg"}
                  />
                </div>
              </div>
            </div>

            <div>
              <p>Default Slippage: 15%</p>
            </div>
          </div>

          <div className="w-[60%] flex items-center justify-center mx-auto">
            <Button
              disabled={false}
              onClick={handleBuyToken}
              className="rounded-md mt-16 py-3"
            >
              {isBuyPending ? <SpinnerIconPurple /> : "Place Trade (buy)"}
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-8 w-full mt-10">
            <div className="w-full flex flex-row items-center gap-2 relative">
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                className="text-base rounded-[10px] py-3 w-full font-bold pl-2 bg-inherit border border-white max-w-full"
                min="0"
              />
              <div className="absolute right-4 flex flex-row gap-1 items-center">
                <p className="text-base font-medium">USDC</p>
                <Image
                  alt="logo"
                  width={20}
                  height={20}
                  src={"/assets/ETHEREUM.svg"}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[#98A2B3] text-xs font-semibold">You get</p>

              <div className="w-full flex flex-row items-center gap-2 relative">
                <input
                  type="number"
                  value={""}
                  onChange={handleAmountChange}
                  className="text-base rounded-[10px] py-3 w-full font-bold pl-2 bg-inherit border border-white max-w-full"
                  min="0"
                />
                <div className="absolute right-4 flex flex-row gap-1 items-center">
                  <p className="text-base font-medium">SOL</p>
                  <Image
                    alt="logo"
                    width={20}
                    height={20}
                    src={"/assets/ETHEREUM.svg"}
                  />
                </div>
              </div>
            </div>

            <div>
              <p>Default Slippage: 15%</p>
            </div>
          </div>

          <div className="w-[60%] flex items-center justify-center mx-auto">
            <Button
              disabled={false}
              onClick={handleSellToken}
              className="rounded-md mt-16 py-3"
            >
              {isSellPending ? <SpinnerIconPurple /> : "Place Trade (sell)"}
            </Button>
          </div>
        </>
      )}
    </main>
  );
};

export default Buy;
