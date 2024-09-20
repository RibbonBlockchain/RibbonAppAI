import {
  Copy,
  Share,
  ArrowUp,
  ArrowDown,
  InfoCircle,
  ClipboardText,
} from "iconsax-react";
import clsx from "clsx";
import Image from "next/image";
import QRCode from "qrcode.react";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { copyToClipboard } from "@/lib/utils";
import { shortenTransaction } from "@/lib/utils/shorten";
import AddressDisplay from "@/components/wallet/address-display";
import WithdrawUSDCToken from "@/containers/wallet/withdraw-token";

const LinkageWallet = ({
  walletAddress,
  walletBalance,
  walletConvertedBalance,
}: {
  walletAddress: string;
  walletBalance: string;
  walletConvertedBalance: any;
}) => {
  const [selected, setSelected] = useState("deposit");

  const [openTx, setOpenTx] = useState(false);

  const handleClick = () => {
    navigator.clipboard
      .writeText(walletAddress as string)
      .then(() => {
        toast.success("address copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Could not copy text");
      });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center justify-center">
        <div
          onClick={() =>
            copyToClipboard(walletAddress, () =>
              toast.success("Wallet address copied")
            )
          }
          className="flex flex-row items-center gap-1 font-normal text-sm"
        >
          {shortenTransaction(walletAddress)}
          <Copy size="16" color="#ffffff" variant="Bold" />
        </div>

        <p className="text-[28px] font-bold">$ {walletConvertedBalance}</p>
      </div>

      <div className="flex flex-row items-center justify-around font-bold border-b border-[#FFFFFF36] pb-4">
        <div
          onClick={() => {
            setSelected("send"), setOpenTx(true);
          }}
          className={clsx(
            "flex flex-col items-center justify-center gap-3 text-sm text-center py-1 rounded-full"
          )}
        >
          <div className="bg-[#3f3856] p-3 rounded-full">
            <ArrowUp size={20} />
          </div>
          Send
        </div>

        <div
          onClick={() => setSelected("deposit")}
          className={clsx(
            "flex flex-col items-center justify-center gap-3 text-sm text-center py-1 rounded-full"
          )}
        >
          <div className="bg-[#3f3856] p-3 rounded-full">
            <ArrowDown size={20} />
          </div>
          Deposit
        </div>

        <div
          onClick={() => setSelected("history")}
          className={clsx(
            "flex flex-col items-center justify-center gap-3 text-sm text-center py-1 rounded-full"
          )}
        >
          <div className="bg-[#3f3856] p-3 rounded-full">
            <ClipboardText size={20} />
          </div>
          History
        </div>
      </div>

      <div className="mt-2">
        {selected === "send" && (
          <div className="w-full min-h-[300px] flex items-center justify-center text-sm">
            You can send txs here
          </div>
        )}

        {selected === "deposit" && (
          <div className="flex flex-col gap-4 items-center justify-center mx-auto">
            <div className="px-2 flex flex-row gap-2 text-[11px] text-[#98A2B3] max-w-[351px]">
              <InfoCircle size="16" color="#ffffff" />
              Only send USDC (Base Ethereum L2) assets to this address. Other
              assets will be lost forever.
            </div>

            <div className="flex flex-row gap-2 items-center justify-center">
              <Image src="/assets/usdc.png" alt="" width={24} height={24} />
              USDC
            </div>

            <div
              className="flex w-fit flex-col rounded-lg items-center justify-center mx-auto bg-white"
              onClick={handleClick}
              style={{ cursor: "pointer" }}
            >
              <QRCode
                value={walletAddress as string}
                size={192}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"H"}
                className="p-3 rounded-2xl"
              />
              <div className="px-2 py-2 mt-2 text-wrap text-sm flex-wrap text-center text-[#434343]">
                <AddressDisplay address={walletAddress} />
              </div>
            </div>

            <div className="flex flex-row items-center justify-center gap-6 text-sm">
              <div
                onClick={handleClick}
                className="flex flex-col gap-1 items-center"
              >
                <div className="flex items-center px-3 py-3 bg-[#3f3856] rounded-full">
                  <Copy size="20" color="#FFFFFF" />
                </div>
                Copy
              </div>
              <div className="flex flex-col gap-1 items-center">
                <div className="flex items-center px-3 py-3 bg-[#3f3856] rounded-full">
                  <Share size={20} />
                </div>
                Share
              </div>
            </div>
          </div>
        )}

        {selected === "history" && (
          <div className="w-full min-h-[300px] flex items-center justify-center text-sm">
            Your transaction history will be displayed here
          </div>
        )}
      </div>

      {openTx && (
        <WithdrawUSDCToken
          isOpen={openTx}
          closeModal={() => setOpenTx(false)}
          handleClick={() => console.log("clicked")}
          destination={"destination"}
          handleDestinationInput={() => {}}
          amount={""}
          handleAmountInput={() => {}}
          isPending={false}
          usdcTokenBalance={walletBalance}
          USDvalue={""}
        />
      )}
    </div>
  );
};

export default LinkageWallet;
