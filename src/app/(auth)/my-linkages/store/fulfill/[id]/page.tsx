"use client";

import React from "react";
import Image from "next/image";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { Phone, Pin, User } from "lucide-react";
import { ArrowLeft2, ShoppingCart } from "iconsax-react";
import { formatOrderDate } from "@/lib/values/format-dateandtime-ago";

const FulfillOrder = () => {
  const router = useRouter();

  const data = {
    data: {
      id: 36,
      status: "PROCESSING",
      userId: 34,
      linkageId: 25,
      createdAt: "2024-10-22T10:15:38.893Z",
      updatedAt: "2024-10-22T10:15:38.893Z",
      items: [
        {
          id: 3,
          price: 100,
          quantity: 2,
          status: "PROCESSING",
          orderId: 36,
          userId: 34,
          itemId: 6,
          linkageId: 25,
          createdAt: "2024-10-22T10:15:38.893Z",
          updatedAt: "2024-10-22T10:15:38.893Z",
        },
        {
          id: 4,
          price: 15,
          quantity: 1,
          status: "PROCESSING",
          orderId: 36,
          userId: 34,
          itemId: 9,
          linkageId: 25,
          createdAt: "2024-10-22T10:15:38.893Z",
          updatedAt: "2024-10-22T10:15:38.893Z",
        },
        {
          id: 5,
          price: 26,
          quantity: 2,
          status: "PROCESSING",
          orderId: 36,
          userId: 34,
          itemId: 10,
          linkageId: 25,
          createdAt: "2024-10-22T10:15:38.893Z",
          updatedAt: "2024-10-22T10:15:38.893Z",
        },
      ],
    },
  };

  return (
    <main className="w-full flex flex-col h-auto text-white bg-[#0B0228] p-3 sm:p-6">
      <div className="flex flex-row items-center justify-start gap-4 mt-2">
        <ArrowLeft2
          size="24"
          color="#ffffff"
          className="my-2 cursor-pointer"
          onClick={() => router.back()}
        />
        <p className="text-lg font-semibold">Fulfill order</p>
      </div>

      <section className="p-2 flex flex-col gap-4 mt-2">
        <p className="text-base font-semibold">Order # - {data.data.id}</p>

        <p className="text-base font-semibold">
          Item details{" "}
          <span className="text-xs text-[#98A2B3] font-normal ml-[2px]">
            (Ordered on {formatOrderDate(data.data.createdAt)})
          </span>
        </p>

        <div className="flex flex-col gap-6 mb-6">
          <div key={data.data.id}>
            <div className="flex flex-col gap-3 pb-6 border-b border-[#D6CBFF33]">
              {data.data.items.map((item: any) => (
                <div
                  key={item.id}
                  className="relative flex flex-row items-center justify-between"
                >
                  <div className="flex flex-row items-center gap-1">
                    <Image
                      width={68}
                      alt={item.name}
                      height={68}
                      src={""}
                      className="bg-white rounded-md w-[68px] h-[68px]"
                    />
                    <div className="flex flex-col items-start justify-between py-1">
                      <p className="text-xs">Item info</p>
                      <p className="text-sm font-semibold line-clamp-2">
                        Item Id: {item.name || item.itemId}
                      </p>
                      <p className="text-xs font-medium text-[#98A2B3] mt-0.5">
                        {/* Size - {item.size}, Color - {item.color} */}
                      </p>
                    </div>
                  </div>

                  <div className="min-w-fit flex flex-col items-start gap-2 justify-around py-1">
                    <p className="text-base font-bold">
                      {item.currency || "$"}
                      {item.price}
                    </p>
                    <p className="text-sm font-semibold">
                      {item.quantity} unit(s)
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4 pb-6 border-b border-[#D6CBFF33]">
        <p className="text-base font-semibold">Customer details</p>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-row items-center gap-1 text-sm font-medium text-[#98A2B3]">
              <User
                size={14}
                className="rounded-full border border-[#98A2B3]"
              />{" "}
              Name
            </div>
            <p className="text-sm font-bold">Mark Essien</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex flex-row items-center gap-1 text-sm font-medium text-[#98A2B3]">
              <ShoppingCart size={14} /> Orders
            </div>
            <p className="text-sm font-bold">4 items</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex flex-row items-center gap-1 text-sm font-medium text-[#98A2B3]">
              <Phone size={14} /> Contact information
            </div>
            <p className="text-sm font-bold">+234 900909090</p>
            <p className="text-sm font-bold">qabc@gmail.com</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex flex-row items-center gap-1 text-sm font-medium text-[#98A2B3]">
              <Pin size={14} /> Delivery address
            </div>
            <p className="text-sm font-bold">Mark Essien</p>
            <p className="text-sm font-bold">Address line 1</p>
            <p className="text-sm font-bold">Address line 2</p>
          </div>
        </div>
      </section>

      <section className="p-2 flex flex-col gap-4 mt-2 pb-4 border-b border-[#D6CBFF33]">
        <p className="text-base font-semibold">Amount paid</p>

        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center justify-between">
            <p className="text-sm font-normal">4 items</p>
            <p className="text-sm font-medium">$120</p>
          </div>
          <div className="flex flex-row items-center justify-between">
            <p className="text-sm font-normal">Delivery fees</p>
            <p className="text-sm font-medium">$5</p>
          </div>
        </div>
      </section>
      <div className="p-2 mt-2 flex flex-row items-center justify-between">
        <p className="text-sm font-normal">Total</p>
        <p className="text-base font-bold">$125</p>
      </div>

      <Button
        onClick={() => router.push("/my-linkages")}
        className="h-[44px] mt-12 mb-20"
      >
        Fulfill Order
      </Button>
    </main>
  );
};

export default FulfillOrder;
