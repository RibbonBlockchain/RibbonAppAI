"use client";

import {
  useBaseClaim,
  useClaimUsdc,
  useSendUsdcToken,
  useUserBaseTransactions,
} from "@/api/user";
import clsx from "clsx";
import Image from "next/image";
import toast from "react-hot-toast";
import { Copy } from "iconsax-react";
import React, { useState } from "react";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { copyToClipboard } from "@/lib/utils";
import { shorten } from "@/lib/utils/shorten";
import { useGetUserWallet } from "@/api/linkage";
import { useCoinDetails } from "@/lib/values/priceAPI";
import { SpinnerIcon } from "@/components/icons/spinner";
import SuccessAnimation from "@/components/success-animation";
import CustomTokenUI from "@/components/wallet/native-token-ui";
import WithdrawUSDCToken from "@/containers/wallet/withdraw-token";
import { ArrowDown, ArrowLeft, ArrowLeftRight, ArrowUp, X } from "lucide-react";
import TransactionHistory from "@/containers/manage-linkage/transaction-history";
import Link from "next/link";

const MainWallet = () => {
  const router = useRouter();
  const baseAbi = require("./base-abi.json");

  const [openTx, setOpenTx] = useState(false);
  const [claimUsdcModal, setClaimUsdcModal] = useState(false);
  const [selectedTxTab, setSelectedTxTab] = useState("tokens");

  const [destinationWallet, setDestinationWallet] = useState("");
  const [amount, setAmount] = useState("");

  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const { mutate, isPending } = useSendUsdcToken();
  const sendUsdcToken = () => {
    mutate(
      { address: destinationWallet, amount: amount },
      {
        onSuccess: () => {
          toast.success("Transaction successfull"),
            setShowSuccessAnimation(true),
            setOpenTx(false),
            refetch();
          handleGetWalletTransaction();
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

  const {
    mutate: getWalletTx,
    data: txHistory,
    isPending: getTxPending,
  } = useUserBaseTransactions();

  const handleGetWalletTransaction = () => {
    getWalletTx({ address: loanWalletDetails?.address });
  };

  const { mutate: claimUsdc, isPending: claimPending } = useClaimUsdc();
  const [claimAmount, setClaimAmount] = useState<number | null>(null);

  const handleClaimUsdc = () => {
    claimUsdc(
      { amount: claimAmount as number },
      {
        onSuccess: () => {
          toast.success("points claim successful"), setClaimUsdcModal(false);
        },
      }
    );
  };

  return (
    <div className="relative min-h-screen w-full text-white bg-[#0B0228] p-4 sm:p-6 pb-24">
      <div className="min-h-screen bg-[inherit] flex flex-col">
        <div className="mt-4 h-[40px] w-full">
          <ArrowLeft
            stroke="#939393"
            onClick={() => router.back()}
            className="flex cursor-pointer"
          />
          <div className="flex flex-row gap-2 items-center justify-center text-white -mt-6 text-base font-semibold">
            <Image alt="coin" width={24} height={24} src="/assets/BASE.svg" />{" "}
            Wallet
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-10 overflow-hidden">
          <div className="flex flex-row items-center justify-center gap-4 mt-4">
            <div className="flex flex-row gap-2 items-center justify-center ">
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

            <Link
              href={"/personalize"}
              className="text-xs font-normal py-1 px-2 border border-[#CBBEF780] rounded-full"
            >
              Personalize
            </Link>
          </div>

          <CustomTokenUI
            wldTokenBalance={loanWalletDetails?.balance.toFixed(2)}
            balanceUSD={(
              Number(loanWalletDetails?.balance) * currentPrice
            ).toFixed(2)}
          />

          <div>
            <button
              onClick={() => setClaimUsdcModal(true)}
              className={clsx(
                "mt-5 w-full bg-[#3f3856] text-center py-3 font-semibold rounded-[12px]"
              )}
            >
              Claim USDC
            </button>
          </div>

          <div className="w-full pt-5 pb-10 flex gap-2 items-center justify-center text-xs font-bold">
            <div
              onClick={() => router.push("/wallet/receive")}
              className="cursor-pointer w-full max-w-[165px] items-center justify-center flex flex-col gap-2"
            >
              <div className="w-full h-[70px] flex flex-col gap-1 items-center p-3 bg-[#3f3856] justify-center rounded-[12px] ">
                <ArrowDown stroke="#fff" />
                Recieve
              </div>
            </div>

            <div
              onClick={() => setOpenTx(true)}
              className="cursor-pointer w-full max-w-[165px] items-center justify-center flex flex-col gap-2"
            >
              <div className="w-full h-[70px] flex flex-col gap-1 items-center p-3 bg-[#3f3856] justify-center rounded-[12px] ">
                <ArrowUp stroke="#fff" />
                Send
              </div>
            </div>

            <div
              onClick={() => {}}
              className="cursor-pointer w-full max-w-[165px] items-center justify-center flex flex-col gap-2"
            >
              <div className="w-full h-[70px] flex flex-col gap-1 items-center p-3 bg-[#3f3856] justify-center rounded-[12px] ">
                <ArrowLeftRight stroke="#fff" />
                Swap
              </div>
            </div>
          </div>

          <div className="w-full px-2 flex flex-row items-center justify-between gap-2 text-center text-sm font-bold rounded-[10px]">
            <p
              onClick={() => {
                setSelectedTxTab("tokens");
              }}
              className="w-full py-2 px-2 text-center cursor-pointer"
            >
              <span
                className={clsx(
                  "inline-block",
                  selectedTxTab === "tokens"
                    ? "text-white border-b-4 pb-2 border-white"
                    : "border-b-4 pb-2 text-stone-500 border-[#0B0228]"
                )}
              >
                Tokens
              </span>
            </p>

            <p
              onClick={() => {
                setSelectedTxTab("history");
                handleGetWalletTransaction();
              }}
              className="w-full py-2 px-2 text-center cursor-pointer"
            >
              <span
                className={clsx(
                  "inline-block",
                  selectedTxTab === "history"
                    ? "text-white border-b-4 pb-2 border-white"
                    : "border-b-4 pb-2 text-stone-500 border-[#0B0228]"
                )}
              >
                History
              </span>
            </p>
          </div>

          <div className="mt-2">
            {selectedTxTab === "tokens" && (
              <div className="flex flex-col gap-2">
                {/* <TokenItem
                    onClick={() => setOpenEthTx(true)}
                    symbol="ETH"
                    name="Ethereum"
                    balance={ethBalance}
                    assetLogo={"/images/ETH.png"}
                  />
                  <TokenItem
                    onClick={() => setOpenWldTx(true)}
                    symbol="WLD"
                    name="World coin"
                    balance={wldBalance}
                    assetLogo={"/images/world-coin.png"}
                  />
                  <TokenItem
                    onClick={() => setOpenLinkTx(true)}
                    symbol="LINK"
                    name="Link"
                    balance={linkBalance}
                    assetLogo={"/images/LINK.png"}
                  /> */}
                List of tokens
              </div>
            )}

            {selectedTxTab === "history" && (
              <div>
                {getTxPending && (
                  <div className="flex items-center justify-center mx-auto h-[120px]">
                    <SpinnerIcon />
                  </div>
                )}

                {txHistory && <TransactionHistory data={txHistory?.data} />}
              </div>
            )}
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

      {claimUsdcModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#0808086B] bg-opacity-50">
          <div className="bg-white backdrop h-auto rounded-lg shadow-lg p-4 mx-1 max-w-[460px] w-full transition-transform transform translate-y-0">
            <div className="py-4 flex flex-col gap-4 bg-white bg-opacity-75 backdrop-blur-sm rounded-md w-full text-black">
              <div className="mb-6 flex flex-row items-center justify-between">
                <div />
                <div className="flex flex-row gap-2 items-center text-lg font-bold">
                  <Image
                    alt="logo"
                    width={24}
                    height={24}
                    src={"/assets/BASE.svg"}
                  />
                  Claim USDC
                </div>
                <X size={20} onClick={() => setClaimUsdcModal(false)} />
              </div>

              <div className="flex flex-col gap-4 text-black">
                <div className="mb-4">
                  <label
                    htmlFor="input"
                    className={`block after:ml-1 text-sm font-bold mb-2`}
                  >
                    Claim amount (10,000 points minimum)
                  </label>
                  <input
                    id="input"
                    type="text"
                    name={"amount"}
                    value={claimAmount as number}
                    onChange={(e: any) => setClaimAmount(e.target.value)}
                    placeholder="Enter amount"
                    className={clsx(
                      "text-xs bg-inherit py-3.5 px-2 leading-tight shadow appearance-none border border-[#D6CBFF79] rounded-[10px] focus:outline-none focus:shadow-outline min-w-full"
                    )}
                  />
                </div>
              </div>
              <Button
                onClick={handleClaimUsdc}
                className="my-6 w-full flex flex-row gap-2 items-center justify-center rounded-[8px] py-3 font-bold text-sm"
                disabled={(claimAmount as number) < 10000 || claimPending}
              >
                {claimPending ? <SpinnerIcon /> : `Claim USDC`}
              </Button>
            </div>
          </div>
        </div>
      )}

      {showSuccessAnimation && <SuccessAnimation />}
    </div>
  );
};

export default MainWallet;
