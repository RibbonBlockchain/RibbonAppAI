import clsx from "clsx";
import React, { useState } from "react";
import { useGetAuth } from "@/api/auth";
import { useRouter } from "next/navigation";
import { useGetUserWallet } from "@/api/linkage";
import { useUsdcCoinDetails } from "@/lib/values/priceAPI";
import { PointBalanceCard, WalletBalanceCard } from "./cards";

const SwipeCards = () => {
  const router = useRouter();
  const [activeCard, setActiveCard] = useState("point");

  const { data: user } = useGetAuth({ enabled: true });

  const points = user?.wallet?.balance;
  const convertedPoints = (Number(points) * 5000) as number;

  const { data } = useUsdcCoinDetails();
  const currentPrice = data?.market_data.current_price.usd as number;

  const { data: wallet } = useGetUserWallet();

  const loanWallet = wallet?.data?.find(
    (item: any) => item.provider === "COINBASE"
  );

  const priceUsd = loanWallet?.balance * currentPrice;
  const formattedPriceUsdc = priceUsd ? priceUsd.toFixed(2) : "0.00";

  // Swipe detection logic
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e: any) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: any) => {
    touchEndX = e.changedTouches[0].clientX;
    const diffX = touchEndX - touchStartX;
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        setActiveCard("point");
      } else {
        setActiveCard("wallet");
      }
    }
  };

  const [rotateBalance, setRotateBalance] = useState(false);

  return (
    <div
      className="flex flex-col items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex flex-row gap-2 w-full overflow-auto scroll-hidden">
        {activeCard === "point" && (
          <PointBalanceCard
            points={points.toFixed(2)}
            convertedPoints={convertedPoints.toFixed(2)}
            rotateBalance={rotateBalance}
            setRotateBalance={setRotateBalance}
            handleWalletTx={() => router.push("/wallet")}
          />
        )}

        {activeCard === "wallet" && (
          <WalletBalanceCard
            baseName={loanWallet?.baseName}
            balance={formattedPriceUsdc}
            walletAddress={loanWallet?.address}
            onclick={() => router.push("/wallet")}
            handleWalletTx={() => router.push("/wallet")}
            handleReceiveToken={() => router.push("/wallet/receive")}
          />
        )}
      </div>

      <div className="flex flex-row gap-4 mt-1">
        <button
          className={clsx(
            "p-1 rounded-full transition ring-2 ring-white",
            activeCard === "point" ? "bg-white" : "bg-inherit"
          )}
          onClick={() => setActiveCard("point")}
        ></button>

        <button
          className={clsx(
            "p-1 rounded-full transition ring-2 ring-white",
            activeCard === "wallet" ? "bg-white" : "bg-inherit"
          )}
          onClick={() => setActiveCard("wallet")}
        ></button>
      </div>
    </div>
  );
};

export default SwipeCards;
