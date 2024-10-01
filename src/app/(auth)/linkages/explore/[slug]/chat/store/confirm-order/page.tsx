"use client";

import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/button";
import { Add, ArrowLeft2, Icon, InfoCircle, Minus } from "iconsax-react";
import { useParams, useRouter } from "next/navigation";
import { SpinnerIcon } from "@/components/icons/spinner";
import { useCart } from "@/provider/cart-context-provider";
import { Plus } from "lucide-react";
import PaymentOrderSuccessful from "@/containers/linkages/payment-successful-modal";

const ConfirmOrder = () => {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug;

  const { cartItems } = useCart();

  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const handlePayment = () => {
    setOpenSuccessModal(true);
  };

  const isPending = false;

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

      <section className="flex-1 flex flex-col gap-4 mt-6 w-full overflow-auto">
        <p className="text-base font-semibold mb-2">Order Summary</p>

        <div className="flex flex-col gap-2 text-sm">
          <div className="flex flex-row items-center justify-between">
            <p className="font-normal text-[#F6F1FE]">
              {cartItems.length} items
            </p>
            <p className="font-semibold">{subtotal.toFixed(2)} usdc</p>
          </div>

          <div className="flex flex-row items-center justify-between">
            <p className="font-normal text-[#F6F1FE]">Delivery fees</p>
            <p className="font-semibold">{deliveryFee.toFixed(2)} usdc</p>
          </div>

          <div className="flex flex-row items-center justify-between">
            <p className="font-normal text-[#F6F1FE]">Total</p>
            <p className="font-semibold text-base">
              {totalFee.toFixed(2)} usdc
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <div className="flex flex-row items-center justify-between text-[#DFCBFB]">
            <p className="text-base font-semibold">Delivery address</p>
            <button
              onClick={() => {}}
              className="flex flex-row flex-end items-center justify-end gap-2 py-2 mt-2 text-sm text-start text-[#DFCBFB] font-medium"
            >
              <div className="p-[3px] rounded-full border border-[#FFFFFF36]">
                <Plus size={14} />
              </div>
              Add
            </button>
          </div>

          <div className="flex flex-row items-start gap-1.5 border border-[#FFFFFF36] rounded-[12px] p-4">
            <div>
              <Icon />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[15px] font-medium">Toluwase Adebayo</p>
              <p className="text-[13px] font-normal text-[#E5E7EB]">
                No 25, Ribbon Street, three way junction, Ikeja, Lagos
              </p>
            </div>

            <div className="flex items-end self-end ml-4 text-sm font-medium">
              <button>Edit</button>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-row gap-1 items-center justify-center text-[#F5C193] text-xs font-bold">
          <InfoCircle size={16} />
          <p> {totalFee.toFixed(2)} will be charged from your USDC wallet</p>
        </div>
        <Button onClick={handlePayment} disabled={isPending}>
          {isPending ? <SpinnerIcon /> : "Confirm and Pay"}
        </Button>
      </div>

      {openSuccessModal && (
        <PaymentOrderSuccessful
          isOpen={openSuccessModal}
          onClose={() => setOpenSuccessModal(false)}
        />
      )}
    </main>
  );
};

export default ConfirmOrder;
