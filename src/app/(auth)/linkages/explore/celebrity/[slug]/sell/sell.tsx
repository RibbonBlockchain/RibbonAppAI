"use client";

import { ArrowLeft2, Edit2 } from "iconsax-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/button";
import { SpinnerIconPurple } from "@/components/icons/spinner";
import ToggleBuySell from "@/components/toggleBuySell";
import {
  useBuyTokenDex,
  useGetLinkageBySlug,
  useGetLinkageTokenBySlug,
  useSellTokenDex,
} from "@/api/linkage";
import toast from "react-hot-toast";
import { editTokenName } from "@/lib/utils/capitalizeLetters";
import SlippageModal from "@/components/slippage-slider";

const Sell = ({ handleButtonClick }: { handleButtonClick: () => void }) => {
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

  const { data: tokenData, refetch } = useGetLinkageTokenBySlug(slug);
  const sellTokenConversion =
    Number(amount) / (tokenData?.data?.token.tokenAmount / Math.pow(10, 18));

  const buyTokenConversion =
    (Number(amount) * tokenData?.data?.token.tokenAmount) / Math.pow(10, 18);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [slippage, setSlippage] = useState<number>(5);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSlippageChange = (newSlippage: number) => {
    setSlippage(newSlippage);
  };

  const { mutate: buyToken, isPending: isBuyPending } = useBuyTokenDex();
  const { mutate: sellToken, isPending: isSellPending } = useSellTokenDex();

  const handleBuyToken = () => {
    buyToken(
      {
        amount: Number(amount),
        token: tokenData?.data?.token?.address,
        slippage,
      },
      {
        onSuccess: () => {
          refetch();
          toast.success(
            `You purchased ${amount}ETH worth of ${tokenData?.data?.token?.name}`
          );
          setAmount("");
        },
      }
    );
  };

  const handleSellToken = () => {
    const amountInWei = (
      BigInt(amount) * BigInt(1000000000000000000)
    ).toString();

    sellToken(
      {
        amount: "99900000000000000000000",
        token: tokenData?.data?.token?.address,
        slippage,
      },
      {
        onSuccess: () => {
          refetch();
          toast.success(`You sold ${amount} ${tokenData?.data?.token?.name}`);
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

      {selectedAction === "sell" ? (
        <>
          <div className="flex flex-col gap-8 w-full mt-10">
            <p className="text-xs  -mt-6 -mb-4">
              {/* You can sell a minimum of 100 {tokenData?.data?.token?.name} */}
            </p>
            <div className="w-full flex flex-row items-center gap-2 relative">
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0"
                className="text-base rounded-[10px] py-3 w-full font-bold pl-2 bg-inherit border border-white max-w-full"
                min="0"
              />
              <div className="absolute right-4 flex flex-row gap-1 items-center">
                <p className="text-base font-medium">
                  {editTokenName(tokenData?.data?.token?.name)}
                </p>
                <Image
                  alt="logo"
                  width={20}
                  height={20}
                  src={tokenData?.data?.token?.logo || ""}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[#98A2B3] text-xs font-semibold">You get</p>

              <div className="w-full flex flex-row items-center gap-2 relative">
                <input
                  type="number"
                  // value={sellTokenConversion.toFixed(8)}
                  value={""}
                  onChange={handleAmountChange}
                  className="text-base rounded-[10px] py-3 w-full font-bold pl-2 bg-inherit border border-white max-w-full"
                  min="0"
                />
                <div className="absolute right-4 flex flex-row gap-1 items-center">
                  <p className="text-base font-medium">ETH</p>
                  <Image
                    alt="logo"
                    width={20}
                    height={20}
                    src={"/assets/ETHEREUM.svg"}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center justify-between">
              <p>Default Slippage: {slippage}%</p>

              <div
                onClick={toggleModal}
                className="flex flex-row gap-1 items-center justify-center"
              >
                <Edit2 color="#fff" size={20} />
              </div>
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
      ) : (
        <>
          <div className="flex flex-col gap-8 w-full mt-10">
            <p className="text-xs -mt-6 -mb-4">
              You can purchase a minimum of 0.00002 ETH
            </p>
            <div className="w-full flex flex-row items-center gap-2 relative">
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0"
                className="text-base rounded-[10px] py-3 w-full font-bold pl-2 bg-inherit border border-white max-w-full"
                min="0"
              />
              <div className="absolute right-4 flex flex-row gap-1 items-center">
                <p className="text-base font-medium">ETH</p>
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
                  // value={buyTokenConversion.toFixed(4)}
                  value={""}
                  onChange={handleAmountChange}
                  placeholder="0"
                  className="text-base rounded-[10px] py-3 w-full font-bold pl-2 bg-inherit border border-white max-w-full"
                  min="0"
                />
                <div className="absolute right-4 flex flex-row gap-1 items-center">
                  <p className="text-base font-medium">
                    {editTokenName(tokenData?.data?.token?.name)}
                  </p>
                  <Image
                    alt="logo"
                    width={20}
                    height={20}
                    src={tokenData?.data?.token?.logo || ""}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center justify-between">
              <p>Default Slippage: {slippage}%</p>

              <div
                onClick={toggleModal}
                className="flex flex-row gap-1 items-center justify-center"
              >
                <Edit2 color="#fff" size={20} />
              </div>
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
      )}

      {isModalOpen && (
        <SlippageModal
          isOpen={isModalOpen}
          onClose={toggleModal}
          onSlippageChange={handleSlippageChange}
        />
      )}
    </main>
  );
};

export default Sell;
