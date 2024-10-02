"use client";

import React from "react";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

const Orders = () => {
  const router = useRouter();

  const orders = [
    {
      id: 1,
      name: "Product A",
      status: "DELIVERED",
      date: "2024-09-28",
      images: ["/path/to/imageA.jpg"],
    },
    {
      id: 2,
      name: "Product B",
      status: "OUT FOR DELIVERY",
      date: "2024-09-27",
      images: ["/path/to/imageB.jpg"],
    },
    {
      id: 3,
      name: "Product C",
      status: "PROCESSING",
      date: "2024-09-26",
      images: ["/path/to/imageC.jpg"],
    },
  ];

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
        {orders.length === 0 ? (
          <p className="text-center">No orders found.</p>
        ) : (
          orders.map((item) => (
            <div
              key={item.id}
              className="relative flex flex-row items-center justify-between gap-2 mb-4"
            >
              <div className="flex flex-row items-center gap-2">
                <Image
                  width={68}
                  height={68}
                  alt={item.name}
                  src={item.images[0]}
                  className="bg-white rounded-md w-[68px] h-[68px]"
                />
                <div className="flex flex-col items-start justify-between py-1">
                  <p className="text-sm font-semibold">{item.name}</p>
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
                    {item.date}
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
