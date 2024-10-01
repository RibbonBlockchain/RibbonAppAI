"use client";

import React from "react";
import { ArrowLeft2 } from "iconsax-react";
import { useRouter } from "next/navigation";

const Orders = () => {
  const router = useRouter();
  return (
    <main className="w-full flex flex-col h-screen text-white bg-[#0B0228] p-3 sm:p-6">
      <div className="flex flex-row items-center justify-start gap-4 mt-2">
        <ArrowLeft2
          size="24"
          color="#ffffff"
          className="my-2 cursor-pointer"
          onClick={() => router.back()}
        />
        <p className="text-lg font-semibold">Orders</p>
      </div>

      <section className="flex-1 flex flex-col gap-4 mt-6 w-full overflow-auto">
        Coming soon
      </section>
    </main>
  );
};

export default Orders;
