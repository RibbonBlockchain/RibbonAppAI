import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { shorten } from "@/lib/utils/shorten";
import { copyToClipboard } from "@/lib/utils";
import ProgressBar from "@ramonak/react-progress-bar";
import { Copy, Wallet2, ArrowSwapHorizontal } from "iconsax-react";
import { ArrowUp, ArrowDown, ArrowUpDown, Redo2 } from "lucide-react";

export const PointBalanceCard = ({
  points,
  convertedPoints,
  rotateBalance,
  setRotateBalance,
  handleWalletTx,
}: {
  points: number;
  convertedPoints: string;
  rotateBalance: boolean;
  handleWalletTx: any;
  setRotateBalance: (value: boolean) => void;
}) => (
  <div className="bg-[#3f3856] flex flex-col justify-between text-white rounded-2xl w-full min-w-[270px] xxs:min-w-[330px] xs:min-w-full max-w-[452px] h-[210px] p-4 my-2 mt-2 border border-[#D6CBFF4D]">
    <div className="flex flex-row items-start justify-between">
      <div>
        <p className="text-sm font-medium mb-2">Ribbon balance</p>

        {rotateBalance ? (
          <div>
            <div className="-ml-2 flex flex-row items-center gap-1 text-[18px] xxs:text-[24px] font-bold">
              <Image src="/assets/coin.png" alt="coin" height={32} width={32} />
              <p>{points} USDC</p>
            </div>
            <div className="flex flex-row items-center gap-1 text-[12px] font-bold">
              <ArrowSwapHorizontal
                onClick={() => setRotateBalance(!rotateBalance)}
                size="16"
                color="#ffffff"
              />
              {convertedPoints} <span className="text-sm">ribbon</span>
            </div>
          </div>
        ) : (
          <div>
            <div className="-ml-2 flex flex-row items-center gap-1 text-[18px] xxs:text-[24px] font-bold">
              <Image src="/assets/coin.png" alt="coin" height={32} width={32} />
              <p>
                {convertedPoints} <span className="text-sm">ribbon</span>
              </p>
            </div>
            <div className="flex flex-row items-center gap-1 text-[12px] font-bold">
              <ArrowSwapHorizontal
                onClick={() => setRotateBalance(!rotateBalance)}
                size="16"
                color="#ffffff"
              />
              <p>{points} USDC</p>
            </div>
          </div>
        )}
      </div>
      {/* Uncomment if needed */}
      {/* <div className="p-3" onClick={onClick}>
        <Wallet2 size="28" color="#ffffff" variant="Bold" />
      </div> */}
      <p className="flex self-end text-xs font-medium">
        {convertedPoints}/50,000 ribbon
      </p>{" "}
    </div>

    {/* <div className="flex flex-col gap-3 mt-4">
      <p className="flex self-end text-xs font-medium">
        {convertedPoints}/50,000 ribbon
      </p>

      <div style={{ position: "relative", width: "100%" }}>
        <ProgressBar
          height="42px"
          completed={(points * 100) / 50000}
          bgColor="#A166F5"
          labelColor="#A166F5"
          customLabel={"."}
          baseBgColor="#D6CBFF33"
        />

        <Link href="/wallet" className="flex justify-center">
          <p className="absolute top-2 px-6 text-[#F6F1FE] font-semibold">
            Claim ribbon
          </p>
        </Link>
      </div>
    </div> */}
    <div className="w-full pt-4 flex gap-4 items-center justify-between text-xs font-bold">
      <div className="cursor-not-allowed w-full items-center justify-center flex flex-col gap-2">
        <div className="flex items-center p-3 bg-stone-400 justify-center border border-[#D6CBFF] rounded-full ">
          <ArrowUp stroke="#7C56FE" />
        </div>
        Send
      </div>

      <div className="cursor-not-allowed w-full items-center justify-center flex flex-col gap-2">
        <div className="flex items-center p-3 bg-stone-400 justify-center border border-[#D6CBFF] rounded-full ">
          <ArrowDown stroke="#7C56FE" />
        </div>
        Recieve
      </div>

      <div
        onClick={handleWalletTx}
        className="cursor-pointer w-full items-center justify-center flex flex-col gap-2"
      >
        <div className="flex items-center p-3 bg-white justify-center border border-[#D6CBFF] rounded-full ">
          <Redo2 size={24} color="#7C56FE" />
        </div>
        Claim
      </div>
    </div>
  </div>
);

export const WalletBalanceCard = ({
  balance,
  baseName,
  walletAddress,
  handleWalletTx,
  handleReceiveToken,
  onclick,
}: {
  balance: any;
  baseName: any;
  walletAddress: string;
  handleWalletTx: any;
  handleReceiveToken: any;
  onclick: () => void;
}) => (
  <div className="bg-[#3f3856] text-white rounded-2xl w-full min-w-[270px] xxs:min-w-[330px] xs:min-w-full max-w-[452px] h-[210px] p-4 my-2 flex flex-col mt-2 border border-[#D6CBFF4D]">
    <div>
      <div className="flex flex-row w-full items-center justify-between">
        <p className="text-sm font-bold mb-2">Wallet Balance</p>

        <div
          className="flex flex-row items-center justify-center gap-1"
          onClick={onclick}
        >
          <Wallet2 size="24" color="#ffffff" variant="Bold" />
          <p className="text-xs">View all assets</p>
        </div>
      </div>
      <div>
        {baseName ? (
          <div className="flex flex-row items-center gap-2">
            <p className="text-xs">{baseName}</p>
            <div
              className="cursor-pointer"
              onClick={() => {
                copyToClipboard(walletAddress, () =>
                  toast.success("Wallet address copied")
                );
              }}
            >
              <Copy size="18" color="#F6F1FE" variant="Bold" />
            </div>
          </div>
        ) : (
          <div className="flex flex-row items-center gap-2">
            <p className="text-xs">{shorten(walletAddress)}</p>
            <div
              className="cursor-pointer"
              onClick={() => {
                copyToClipboard(walletAddress, () =>
                  toast.success("Wallet address copied")
                );
              }}
            >
              <Copy size="18" color="#F6F1FE" variant="Bold" />
            </div>
          </div>
        )}

        <div className="text-[28px] font-bold">
          <p>$ {balance}</p>
        </div>
      </div>
    </div>

    <div className="w-full pt-4 flex gap-4 items-center justify-between text-xs font-bold">
      <div
        onClick={handleWalletTx}
        className="cursor-pointer w-full items-center justify-center flex flex-col gap-2"
      >
        <div className="flex items-center p-3 bg-white justify-center border border-[#D6CBFF] rounded-full ">
          <ArrowUp stroke="#7C56FE" />
        </div>
        Send
      </div>

      <div
        onClick={handleReceiveToken}
        className="cursor-pointer w-full items-center justify-center flex flex-col gap-2"
      >
        <div className="flex items-center p-3 bg-white justify-center border border-[#D6CBFF] rounded-full ">
          <ArrowDown stroke="#7C56FE" />
        </div>
        Recieve
      </div>

      <div
        onClick={handleWalletTx}
        className="cursor-pointer w-full items-center justify-center flex flex-col gap-2"
      >
        <div className="flex items-center p-3 bg-white justify-center border border-[#D6CBFF] rounded-full ">
          <ArrowUpDown color="#7C56FE" />
        </div>
        Swap
      </div>

      <div
        onClick={handleWalletTx}
        className="cursor-pointer w-full items-center justify-center flex flex-col gap-2"
      >
        <div className="flex items-center p-3 bg-white justify-center border border-[#D6CBFF] rounded-full ">
          <Redo2 size={24} color="#7C56FE" />
        </div>
        Claim
      </div>
    </div>
  </div>
);
