"use client";

import clsx from "clsx";
import Image from "next/image";
import toast from "react-hot-toast";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { copyToClipboard } from "@/lib/utils";
import { shorten } from "@/lib/utils/shorten";
import { useGetUserWallet } from "@/api/linkage";
import { ClipboardText, Copy } from "iconsax-react";
import { useCoinDetails } from "@/lib/values/priceAPI";
import { SpinnerIcon } from "@/components/icons/spinner";
import { ArrowDown, ArrowLeft, ArrowUp, X } from "lucide-react";
import SuccessAnimation from "@/components/success-animation";
import CustomTokenUI from "@/components/wallet/native-token-ui";
import WithdrawUSDCToken from "@/containers/wallet/withdraw-token";
import {
  useBaseClaim,
  useSendUsdcToken,
  useUserBaseTransactions,
} from "@/api/user";
import TransactionHistory from "@/containers/manage-linkage/transaction-history";
import InputBox from "@/components/questionnarie/input-box";
import Button from "@/components/button";
import { convertPoints18decimal } from "@/lib/utils/convertPoint";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useCapabilities, useWriteContracts } from "wagmi/experimental";

const MainWallet = () => {
  const router = useRouter();
  const baseAbi = require("./base-abi.json");

  const [openTx, setOpenTx] = useState(false);
  const [claimUsdcModal, setClaimUsdcModal] = useState(false);

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
          // refetchTransactionHistory();
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
    getWalletTx({ address: loanWallet?.data[1]?.address });
  };

  const account = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: writeData, writeContract } = useWriteContract();
  const { data: receipt } = useWaitForTransactionReceipt({ hash: writeData });

  const [id, setId] = useState<string | undefined>(undefined);
  const { writeContracts } = useWriteContracts({
    mutation: { onSuccess: (id) => setId(id) },
  });

  console.log(account?.address, "address from contract");

  const { data: availableCapabilities } = useCapabilities({
    account: account.address,
  });

  const capabilities = useMemo(() => {
    if (!availableCapabilities || !account.chainId) return {};
    const capabilitiesForChain = availableCapabilities[account.chainId];
    if (
      capabilitiesForChain["paymasterService"] &&
      capabilitiesForChain["paymasterService"].supported
    ) {
      return {
        paymasterService: {
          url: "https://api.developer.coinbase.com/rpc/v1/base-sepolia/NjBxwkYP6cs5Y0Tomg9xnR5JnBoZHiEo",
        },
      };
    }
    return {};
  }, [availableCapabilities, account.chainId]);

  const { mutate: claimBase } = useBaseClaim();
  const [claimAmount, setClaimAmount] = useState<number | null>(null);

  const handleBaseClaim = () => {
    claimBase(
      {
        address: loanWallet?.address as string,
        amount: claimAmount as number,
      },
      {
        onSuccess: (data) => {
          writeContracts(
            {
              contracts: [
                {
                  address: "0x95Cff63E43A13c9DC97aC85D2f02327aD01dB560",
                  abi: baseAbi,
                  functionName: "permitSwapToPaymentCoin",
                  args: [
                    loanWallet?.address,
                    Number(convertPoints18decimal(claimAmount as number)),
                    data?.data?.deadline,
                    data?.data?.v,
                    data?.data?.r,
                    data?.data?.s,
                  ],
                },
              ],
              capabilities,
            },
            {
              onSuccess: () => {
                setClaimUsdcModal(false);
                // refetchUsdcBalance();
              },
            }
          );
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
            ).toFixed(2)}
          />

          {/* <div>
            <button
              onClick={() => setClaimUsdcModal(true)}
              className={clsx(
                "mt-5 w-full text-center py-3 font-semibold border border-[#D6CBFF] rounded-[16px]"
              )}
            >
              Claim USDC
            </button>
          </div> */}

          <div className="w-full pt-5 pb-10 flex gap-4 items-center justify-center text-xs font-bold">
            <div
              onClick={() => router.push("/wallet/receive")}
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
              onClick={() => handleGetWalletTransaction()}
              className="cursor-pointer w-full items-center justify-center flex flex-col gap-2"
            >
              <div className="w-full h-[70px] flex flex-col gap-1 items-center p-3 bg-[#3f3856] justify-center border border-[#D6CBFF] rounded-[12px] ">
                <ClipboardText size={24} />
                History
              </div>
            </div>
          </div>

          <div>
            {getTxPending && (
              <div className="flex items-center justify-center mx-auto h-[120px]">
                <SpinnerIcon />
              </div>
            )}

            {txHistory && <TransactionHistory data={txHistory?.data} />}
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
        <div className="fixed inset-0 flex items-end justify-center z-50 bg-[#0808086B] bg-opacity-50">
          <div className="bg-white backdrop h-auto rounded-t-lg shadow-lg p-4 mx-1 max-w-[460px] w-full transition-transform transform translate-y-0">
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
                <InputBox
                  placeholder="Enter amount"
                  value={claimAmount as number}
                  onChange={(e) => setAmount(e.target.value)}
                  name={"amount"}
                  label={"Claim amount (10,000 points minimum)"}
                  required={false}
                />
              </div>
              <Button
                onClick={handleBaseClaim}
                className="my-6 w-full flex flex-row gap-2 items-center justify-center rounded-[8px] py-3 font-bold text-sm"
                disabled={(claimAmount as number) < 10000}
              >
                {`Claim USDC`}
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
