"use client";

import clsx from "clsx";
import toast from "react-hot-toast";
import { Copy } from "iconsax-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { copyToClipboard } from "@/lib/utils";
import { shorten } from "@/lib/utils/shorten";
import { useSendUsdcToken } from "@/api/user";
import { useGetUserWallet } from "@/api/linkage";
import { useCoinDetails } from "@/lib/values/priceAPI";
import CustomTokenUI from "@/components/wallet/native-token-ui";
import WithdrawUSDCToken from "@/containers/wallet/withdraw-token";
import { ArrowDown, ArrowDownUp, ArrowLeft, ArrowUp } from "lucide-react";

const LoanWallet = () => {
  const router = useRouter();

  const [openTx, setOpenTx] = useState(false);

  const [destinationWallet, setDestinationWallet] = useState("");
  const [amount, setAmount] = useState("");

  const { mutate, isPending } = useSendUsdcToken();
  const sendUsdcToken = () => {
    mutate(
      { address: destinationWallet, amount: amount },
      {
        onSuccess: () => {
          toast.success("Transaction successfull"), setOpenTx(false), refetch();
        },
      }
    );
  };

  const { data } = useCoinDetails();
  const currentPrice = data?.market_data.current_price.usd as number;

  const { data: loanWallet, refetch } = useGetUserWallet();
  const loanWalletDetails = loanWallet?.data?.find(
    (item: any) => item.provider === "COINBASE"
  );

  return (
    <div className="relative min-h-screen w-full text-white bg-[#0B0228] p-4 sm:p-6 pb-24">
      <div className="min-h-screen bg-[inherit] flex flex-col">
        <div className="mt-4 h-[40px] w-full">
          <ArrowLeft
            stroke="#939393"
            onClick={() => router.back()}
            className="flex cursor-pointer"
          />
          <div className="flex text-white -mt-6 flex-row items-center justify-center text-base font-semibold">
            Wallet
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-10 overflow-hidden">
          <div className="mt-4">
            <div className="flex flex-row gap-5 items-center justify-center ">
              <p className="text-[16px]">
                {shorten(loanWalletDetails?.address)}
              </p>
              <Copy
                size="18"
                color="#F6F1FE"
                variant="Bold"
                className="cursor-pointer"
                onClick={() => {
                  copyToClipboard(loanWalletDetails?.address, () =>
                    toast.success(`Wallet address copied`)
                  );
                }}
              />
            </div>
          </div>

          <CustomTokenUI
            wldTokenBalance={loanWalletDetails?.balance.toFixed(2)}
            balanceUSD={(
              Number(loanWalletDetails?.balance) * currentPrice
            ).toFixed(5)}
          />

          <div className="w-full pt-5 pb-10 flex gap-4 items-center justify-center text-xs font-bold">
            <div
              onClick={() => router.push("/loan-wallet/receive")}
              className="cursor-pointer w-full max-w-[165px] items-center justify-center flex flex-col gap-2"
            >
              <div className="w-full h-[70px] flex flex-col gap-1 items-center p-3 bg-[#3f3856] justify-center border border-[#D6CBFF] rounded-[12px] ">
                <ArrowDown stroke="#fff" />
                Recieve
              </div>
            </div>

            <div
              onClick={() => setOpenTx(true)}
              className="cursor-pointer w-full max-w-[165px] items-center justify-center flex flex-col gap-2"
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

          <div className="w-full bg-[#F5F5F5] p-1 flex flex-row items-center justify-between gap-2 rounded-[18px] ">
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

      {openTx && (
        <WithdrawUSDCToken
          isOpen={openTx}
          closeModal={() => setOpenTx(false)}
          handleClick={sendUsdcToken}
          destination={destinationWallet}
          handleDestinationInput={(e) => setDestinationWallet(e.target.value)}
          amount={amount}
          handleAmountInput={(e) => setAmount(e.target.value)}
          isPending={isPending}
          usdcTokenBalance={loanWalletDetails?.balance}
          USDvalue={Number(amount) * currentPrice}
        />
      )}
    </div>
  );
};

export default LoanWallet;
