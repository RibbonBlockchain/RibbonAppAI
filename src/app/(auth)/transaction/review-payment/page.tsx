"use client";

import React from "react";
import Image from "next/image";
import { ArrowLeft2 } from "iconsax-react";
import { useRouter } from "next/navigation";

const ReviewPayment = () => {
  const router = useRouter();

  return (
    <main className="relative min-h-screen w-full text-white bg-[#0B0228] p-4 sm:p-6 pb-8">
      <div className="flex flex-row items-center gap-4 mt-2">
        <ArrowLeft2
          size="24"
          color="#ffffff"
          className="my-2"
          onClick={() => router.back()}
        />

        <p className="text-[22px] font-bold">Review Payment</p>
      </div>

      <div className="flex flex-col gap-8 mt-12">
        <div>
          <p className="text-base font-medium mb-[2px]">
            Subscribe to Linkages Pro Subscription
          </p>
          <div className="text-xl font-semibold">
            $39 <span className="text-base">/month</span>
          </div>
        </div>

        <div>
          <div className="flex flex-row items-center justify-between text-base font-bold mb-1">
            Linkages Pro Subscription <p>$39.00</p>
          </div>
          <p className="text-sm font-normal">Billed monthly</p>
        </div>

        <div className="flex flex-grow self-center">
          <Image
            alt="hr"
            height={1}
            width={300}
            className="w-[280px] h-auto"
            src="/assets/horizontal-line.png"
          />
        </div>

        <div>
          <div className="flex flex-row items-center justify-between text-base font-bold mb-1">
            Subtotal <p>$39.00</p>
          </div>
          <div className="flex flex-row items-center justify-between text-sm font-bold">
            Tax <p className="font-medium">$0.00</p>
          </div>
        </div>

        <div className="flex flex-grow self-center">
          <Image
            alt="hr"
            height={1}
            width={300}
            className="w-[280px] h-auto"
            src="/assets/horizontal-line.png"
          />
        </div>

        <div>
          <div className="flex flex-row items-center justify-between text-base font-bold mb-1">
            Total due today <p>$39.00</p>
          </div>
        </div>
      </div>

      <button
        onClick={() => router.push("#")}
        className="mt-16 mb-10 w-full bg-white text-[#290064] rounded-[8px] py-3 font-bold text-sm"
      >
        Checkout
      </button>
    </main>
  );
};

export default ReviewPayment;
