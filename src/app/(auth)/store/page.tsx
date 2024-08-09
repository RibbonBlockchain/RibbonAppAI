"use client";

import {
  Gift,
  Wifi,
  Global,
  Driving,
  Monitor,
  Electricity,
  DocumentText,
  ShoppingCart,
} from "iconsax-react";
import clsx from "clsx";
import React, { useState } from "react";
import { useGetAuth } from "@/api/auth";
import { useRouter } from "next/navigation";
import Topbar from "@/containers/dashboard/top-bar";
import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";
import {
  PointBalanceCard,
  WalletBalanceCard,
} from "@/containers/dashboard/cards";

const Store = () => {
  const router = useRouter();

  const [activeCard, setActiveCard] = useState("point");

  const { data: user } = useGetAuth({ enabled: true });

  const points = user?.wallet?.balance;

  const serviceList = [
    { icon: <Wifi />, name: "Data" },
    { icon: <DocumentText />, name: "Airtime" },
    { icon: <Electricity />, name: "Electricity" },
    { icon: <Global />, name: "Betting" },
    { icon: <ShoppingCart />, name: "Shopping" },
    { icon: <Driving />, name: "Transports" },
    { icon: <Monitor />, name: "Entertainment" },
    { icon: <Gift />, name: "Voucher" },
  ];

  return (
    <AuthNavLayout>
      <div className="relative min-h-screen w-full text-white bg-[#0B0228] p-4 sm:p-6 pb-24">
        <div className="relative mx-auto flex flex-col items-center justify-center content-center">
          <Topbar />

          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row gap-2 w-full overflow-auto">
              {activeCard === "point" && (
                <PointBalanceCard
                  points={points.toFixed(2)}
                  onclick={() => router.push("/wallet")}
                />
              )}
              {activeCard === "wallet" && <WalletBalanceCard />}
            </div>
            <div className="flex flex-row gap-4 mt-3">
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
        </div>

        <div className="py-8 mb-8 text-sm">
          <p className="font-bold">Service list</p>
          <div className="mt-4 grid grid-cols-4 gap-8">
            {serviceList.map((i) => (
              <div key={i.name} className="flex flex-col items-center gap-2">
                <div className="bg-[#3f3952] bg-opacity-95 p-3 rounded-full">
                  {i.icon}
                </div>
                <p className="text-xs font-semibold">{i.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AuthNavLayout>
  );
};

export default Store;
