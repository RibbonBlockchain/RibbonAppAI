"use client";

import { ArrowDown2, ArrowLeft2 } from "iconsax-react";
import { ArrowDownUp } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import Button from "@/components/button";
import { SpinnerIcon } from "@/components/icons/spinner";
import { useBuyUserToken } from "@/api/user";

const Swap = () => {
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
        <p className="text-[20px] font-bold">Swap</p>
      </div>

      <div className="flex flex-col gap-6 w-full">
        <p>From</p>
        <div className="border border-[#D6CBFF79] rounded-md p-4">
          <div className="flex mb-4 flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-center gap-2">
              <div className="w-[35px] h-[35px] flex items-center ">
                <Image
                  width={35}
                  height={35}
                  src={"/assets/ribbon.svg"}
                  alt="coin logo"
                  className="rounded-full"
                />
              </div>
              <div>
                <p className="text-base font-normal">Ribbon</p>
                <p className="text-xs text-[#626262]">{} Ribbons</p>
              </div>
            </div>
            <ArrowDown2 size={20} stroke="#7C56FE" />
          </div>

          <hr className="h-[1px] border-t border-[#D6CBFF79]" />

          <div className="flex mt-4 flex-row items-center justify-between">
            <div className="flex flex-col gap-1">
              <input
                type="number"
                value={""}
                onChange={() => {}}
                className="border-[#D6CBFF79] border py-2 px-3 rounded-md w-[90%] bg-[inherit]"
                placeholder="0"
              />
            </div>
            <button onClick={() => {}} className="font-bold text-sm">
              Max
            </button>{" "}
          </div>
        </div>
        <ArrowDownUp stroke="#fff" className="self-center flex" />
        <p>To</p>{" "}
        <div className="border border-[#D6CBFF79] rounded-md p-4">
          <div className="flex mb-4 flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-center gap-2">
              <div className="w-[35px] h-[35px] flex items-center ">
                <Image
                  width={35}
                  height={35}
                  src={"/assets/usdc.png"}
                  alt="coin logo"
                  className="rounded-full"
                />
              </div>
              <div>
                <p className="text-base font-normal">USDC</p>
                <p className="text-xs text-[#626262]">{} USDC</p>
              </div>
            </div>
            <ArrowDown2 size={20} stroke="#7C56FE" />
          </div>

          <hr className="h-[1px] border-t border-[#D6CBFF79]" />

          <div className="flex mt-4 flex-row items-center justify-between">
            <div className="flex flex-col gap-1">
              <p>{} USDC</p>
              <p>$ {}</p>
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
          {isPending ? <SpinnerIcon /> : "Swap"}
        </Button>
      </div>
    </main>
  );
};

export default Swap;
