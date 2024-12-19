"use client";

import { ArrowLeft2, Edit2 } from "iconsax-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/button";
import { SpinnerIcon } from "@/components/icons/spinner";
import { useSellUserToken } from "@/api/user";
import SlippageModal from "@/components/slippage-slider";

const Swap = ({ handleButtonClick }: { handleButtonClick: () => void }) => {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [amount, setAmount] = useState<number>();

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = event.target.value;

    if (!isNaN(Number(newAmount))) {
      setAmount(Number(newAmount));
    }
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [slippage, setSlippage] = useState<number>(5);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSlippageChange = (newSlippage: number) => {
    setSlippage(newSlippage);
  };

  const { mutate: sellToken, isPending: isSellPending } = useSellUserToken();

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

        <p className="font-bold">Swap</p>
      </div>

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
              value={amount}
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
          onClick={() => {}}
          className="rounded-md mt-16 py-3"
        >
          {isSellPending ? <SpinnerIcon /> : "Place Trade"}
        </Button>
      </div>

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

export default Swap;
