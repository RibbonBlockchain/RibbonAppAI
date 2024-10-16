"use client";

import clsx from "clsx";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGetUserOrders } from "@/api/user";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

const Orders = () => {
  const router = useRouter();

  const { data } = useGetUserOrders();

  return (
    <main className="w-full flex flex-col h-screen text-white bg-[#0B0228] p-3 sm:p-6">
      <div className="flex flex-row items-center justify-start gap-4 mt-2">
        <ArrowLeft2
          size="24"
          color="#ffffff"
          className="my-2 cursor-pointer"
          onClick={() => router.push("/dashboard")}
        />
        <p className="text-lg font-semibold">Orders</p>
      </div>

      <section className="flex-1 flex flex-col gap-4 mt-6 w-full overflow-auto">
        {data?.data?.length === 0 ? (
          <p className="text-center">No orders found.</p>
        ) : (
          data?.data?.map((item: any) => (
            <div
              key={item.id}
              className="relative flex flex-row items-center justify-between gap-2 mb-4"
            >
              <div className="flex flex-row items-center gap-2">
                <Image
                  width={68}
                  height={68}
                  alt={item.id}
                  src={""}
                  className="bg-white rounded-md w-[68px] h-[68px]"
                />
                <div className="flex flex-col items-start justify-between py-1">
                  <p className="text-sm font-semibold">
                    ItemId: {item.itemId} / Quantity: {item.quantity}
                  </p>
                  <p
                    className={clsx(
                      "flex text-center items-center justify-center text-xs font-medium text-white px-2 py-[2px] rounded-xl",
                      {
                        "bg-[#2BB48A]": item.status === "DELIVERED",
                        "bg-[#2BB48A80]": item.status === "OUT FOR DELIVERY",
                        "bg-[#F5C193A1]":
                          item.status !== "DELIVERED" &&
                          item.status !== "OUT FOR DELIVERY",
                      }
                    )}
                  >
                    {item.status}
                  </p>
                  <p className="text-xs font-medium text-[#98A2B3] mt-0.5">
                    Price: {item.price}
                  </p>
                </div>
              </div>

              <ArrowRight2
                size="24"
                color="#ffffff"
                className="my-2 cursor-pointer"
              />
            </div>
          ))
        )}
      </section>
    </main>
  );
};

export default Orders;
