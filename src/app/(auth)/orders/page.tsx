"use client";

import React from "react";
import { ArrowLeft } from "iconsax-react";
import { useRouter } from "next/navigation";
import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";

const Orders = () => {
  const router = useRouter();

  return (
    <AuthNavLayout>
      <div className="relative min-h-screen w-full text-white bg-[#0B0228] p-4 sm:p-6 pb-24">
        <ArrowLeft onClick={() => router.back()} />

        <div className="flex-grow flex items-center justify-center mt-20">
          <p className="text-lg">Coming soon</p>
        </div>
      </div>
    </AuthNavLayout>
  );
};

export default Orders;
