"use client";

import { ArrowDown2, ArrowLeft2 } from "iconsax-react";
import { ArrowDownUp } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import Button from "@/components/button";
import { SpinnerIcon } from "@/components/icons/spinner";
import { useBuyUserToken } from "@/api/user";

const Buy = () => {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const { mutate, isPending } = useBuyUserToken();

  return (
    <main className="relative min-h-screen w-full text-white bg-[#0B0228] p-4 sm:p-6 pb-16">
      <div className="flex flex-row items-center gap-4 mt-2 mb-6">
        <ArrowLeft2
          size="24"
          color="#ffffff"
          className="my-2"
          onClick={() => router.back()}
        />
      </div>

      <div>Buy/Sell</div>

      <div className="flex flex-col gap-4 w-full">
        <p className="text-[#98A2B3]">Amount</p>

        <div>
          <p>50</p>
          <p>USDC</p>
        </div>

        <p className="text-[#98A2B3]">You get</p>
        <div>
          <ArrowDownUp size={20} stroke="#fff" className="self-center flex" />
          <div>
            <p>50</p>
            <p>USDC</p>
          </div>
        </div>

        <p className="text-[#98A2B3]">You get</p>
        <p>Select Payment method</p>
      </div>

      <div className="w-[60%] flex items-center justify-center mx-auto mt-2">
        <Button
          disabled={false}
          onClick={() => {}}
          className="rounded-md mt-16 py-3"
        >
          {isPending ? <SpinnerIcon /> : "Buy"}
        </Button>
      </div>
    </main>
  );
};

export default Buy;
