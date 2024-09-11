"use client";

import clsx from "clsx";
import React from "react";
import toast from "react-hot-toast";
import { Copy } from "iconsax-react";
import { useRouter } from "next/navigation";
import { copyToClipboard } from "@/lib/utils";
import { shorten } from "@/lib/utils/shorten";
import CustomTokenUI from "@/components/wallet/native-token-ui";
import { useCoinDetails } from "@/containers/dashboard/swipe-cards";
import { ArrowDown, ArrowDownUp, ArrowLeft, ArrowUp } from "lucide-react";

const LoanWallet = () => {
  const router = useRouter();
  const loanWalletAddress = "0xEFC3571deb12b1bc658d116751C75c8a29B5Ac812";
  const loanBalance = 0;

  const { data } = useCoinDetails();
  const currentPrice = data?.market_data.current_price.usd as number;

  return (
    <div className="relative min-h-screen w-full text-white bg-[#0B0228] p-4 sm:p-6 pb-24">
      <div className="min-h-screen bg-[inherit] flex flex-col">
        <div className="mt-4">
          <ArrowLeft
            stroke="#939393"
            onClick={() => router.push("/dashboard")}
            className="flex w-[40px] cursor-pointer"
          />

          <div className="flex text-white -mt-6 flex-row items-center justify-center text-base font-semibold">
            Wallet
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-10 overflow-hidden">
          <div className="mt-4">
            <div className="flex flex-row gap-5 items-center justify-center ">
              <p className="text-[16px]">{shorten(loanWalletAddress)}</p>
              <Copy
                size="18"
                color="#F6F1FE"
                variant="Bold"
                className="cursor-pointer"
                onClick={() => {
                  copyToClipboard(loanWalletAddress, () =>
                    toast.success(`Wallet address copied`)
                  );
                }}
              />
            </div>
          </div>

          <CustomTokenUI
            wldTokenBalance={loanBalance}
            balanceUSD={(Number(loanBalance) * currentPrice).toFixed(5)}
          />

          <div className="w-full pt-5 pb-10 flex gap-4 items-center justify-between text-xs font-bold">
            <div
              onClick={() => router.push("/loan-wallet/receive")}
              className="cursor-pointer w-full items-center justify-center flex flex-col gap-2"
            >
              <div className="w-full h-[70px] flex flex-col gap-1 items-center p-3 bg-[#3f3856] justify-center border border-[#D6CBFF] rounded-[12px] ">
                <ArrowDown stroke="#fff" />
                Recieve
              </div>
            </div>

            <div
              onClick={() => console.log("")}
              className="cursor-pointer w-full items-center justify-center flex flex-col gap-2"
            >
              <div className="w-full h-[70px] flex flex-col gap-1 items-center p-3 bg-[#3f3856] justify-center border border-[#D6CBFF] rounded-[12px] ">
                <ArrowUp stroke="#fff" />
                Send
              </div>
            </div>

            <div
              onClick={() => console.log("")}
              className="cursor-pointer w-full items-center justify-center flex flex-col gap-2"
            >
              <div className="w-full h-[70px] flex flex-col gap-1 items-center p-3 bg-[#3f3856] justify-center border border-[#D6CBFF] rounded-[12px] ">
                <ArrowDownUp stroke="#fff" />
                Swap
              </div>
            </div>
          </div>

          <div className="w-full bg-[#F5F5F5] px-2 py-2 flex flex-row items-center justify-between gap-2 rounded-[18px] ">
            <p
              onClick={() => {}}
              className={clsx(
                "w-full text-center py-3 text-black",
                "text-white bg-[#7C56FE] rounded-[16px]"
              )}
            >
              Wallets
            </p>
            <p
              onClick={() => {}}
              className={clsx(
                "w-full text-center py-3 text-black bg-[#7C56FE] rounded-[16px]",
                "text-black bg-[inherit]"
              )}
            >
              History
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanWallet;
