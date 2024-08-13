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
import React from "react";
import Topbar from "@/containers/dashboard/top-bar";
import SwipeCards from "@/containers/dashboard/swipe-cards";
import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";
import Link from "next/link";


const Store = () => {

  const serviceList = [
    { href: "/store/data-purchase", icon: <Wifi />, name: "Data" },
    { href: "/store/airtime", icon: <DocumentText />, name: "Airtime" },
    { href: "/store/electricity", icon: <Electricity />, name: "Electricity" },
    { href: "/store/betting", icon: <Global />, name: "Betting" },
    { href: "/store/shopping", icon: <ShoppingCart />, name: "Shopping" },
    { href: "/store/transports", icon: <Driving />, name: "Transports" },
    { href: "/store/entertainment", icon: <Monitor />, name: "Entertainment" },
    { href: "/store/voucher", icon: <Gift />, name: "Voucher" },
  ];

  return (
    <AuthNavLayout>
      <div className="relative min-h-screen w-full text-white bg-[#0B0228] p-4 sm:p-6 pb-24">
        <div className="relative mx-auto flex flex-col items-center justify-center content-center">
          <Topbar />

          <SwipeCards />
        </div>

        <div className="py-8 mb-8 text-sm">
          <p className="font-bold">Service list</p>
          <div className="mt-4 grid grid-cols-4 gap-8">
            {serviceList.map((i) => (
              <Link href={i.href} key={i.name} className="flex flex-col items-center gap-2">
                <div className="bg-[#3f3952] bg-opacity-95 p-3 rounded-full">
                  {i.icon}
                </div>
                <p className="text-xs font-semibold">{i.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AuthNavLayout>
  );
};

export default Store;
