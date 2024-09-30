"use client";

import React from "react";
import Image from "next/image";
import Button from "@/components/button";
import { Add, ArrowLeft2, InfoCircle, Minus } from "iconsax-react";
import { useParams, useRouter } from "next/navigation";
import { SpinnerIcon } from "@/components/icons/spinner";
import { useCart } from "@/provider/cart-context-provider";
import { Plus } from "lucide-react";

const ConfirmOrder = () => {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug;

  const isPending = false;

  const { cartItems } = useCart();

  // Calculate subtotal
  const subtotal = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.item.price * cartItem.quantity;
  }, 0);

  const deliveryFee = 5;

  const totalFee = subtotal + deliveryFee;

  return (
    <main className="w-full flex flex-col h-screen text-white bg-[#0B0228] p-3 sm:p-6">
      <div className="flex flex-row items-center justify-start gap-4 mt-2">
        <ArrowLeft2
          size="24"
          color="#ffffff"
          className="my-2 cursor-pointer"
          onClick={() => router.back()}
        />
        <p className="text-lg font-semibold">Confirm Order</p>
      </div>

      <section className="flex-1 flex flex-col gap-6 mt-6 w-full overflow-auto">
        <p className="mb-2">Order Summary</p>

        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between">
            <p>{cartItems.length} items</p>
            <p>{subtotal.toFixed(2)} usdc</p>
          </div>

          <div className="flex flex-row items-center justify-between">
            <p>Delivery fees</p>
            <p>{deliveryFee.toFixed(2)} usdc</p>
          </div>

          <div className="flex flex-row items-center justify-between">
            <p>Total</p>
            <p>{totalFee.toFixed(2)} usdc</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between">
            <p>Delivery address</p>
            <button
              onClick={() => {}}
              className="flex flex-row flex-end items-center justify-end gap-2 py-2 mt-2 text-sm text-start text-[#DFCBFB] font-medium"
            >
              <div className="p-[3px] rounded-full border border-[#FFFFFF36]">
                <Plus size={14} />
              </div>{" "}
              Add
            </button>
          </div>
          <div className="border border-[#FFFFFF36] rounded-[12px] p-4">
            Toluwase Adebayo
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-row gap-1 items-center justify-center text-[#F5C193] text-xs font-bold">
          <InfoCircle size={16} />
          <p> {totalFee.toFixed(2)} will be charged from your USDC wallet</p>
        </div>
        <Button
          onClick={() => console.log("exectuer payment")}
          disabled={isPending}
        >
          {isPending ? <SpinnerIcon /> : "Confirm and Pay"}
        </Button>
      </div>
    </main>
  );
};

export default ConfirmOrder;
