"use client";

import clsx from "clsx";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetUserOrders } from "@/api/user";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { formatOrderDate } from "@/lib/values/format-dateandtime-ago";
import { X } from "lucide-react";

interface OrderItem {
  id: number;
  price: number;
  quantity: number;
  status: string;
  orderId: number;
  userId: number;
  itemId: number;
  linkageId: number;
  createdAt: string;
  updatedAt: string;
}

interface Order {
  id: number;
  status: string;
  userId: number;
  linkageId: number;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

const Orders: React.FC = () => {
  const router = useRouter();
  const [selectedOrderItems, setSelectedOrderItems] = useState<OrderItem[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data } = useGetUserOrders();

  const handleOrderClick = (order: Order) => {
    setSelectedOrderItems(order.items);
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrderItems([]);
    setSelectedOrder(null);
  };

  const totalAmount = selectedOrderItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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
          data?.data?.map((item: Order) => (
            <div
              key={item.id}
              className="relative flex flex-row items-center justify-between gap-2 mb-4"
              onClick={() => handleOrderClick(item)}
            >
              <div className="flex flex-row items-center gap-2">
                <Image
                  width={68}
                  height={68}
                  alt={item.id.toString()}
                  src={""}
                  className="bg-white rounded-md w-[68px] h-[68px]"
                />
                <div className="flex flex-col items-start justify-between py-1">
                  <p className="text-sm font-semibold">Order # - {item.id}</p>
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
                    Supplier id: {item.linkageId}
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

      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg p-4 w-3/4 max-w-md pb-8">
            <div className="flex self-end items-end justify-end">
              <X onClick={closeModal} />
            </div>

            <h2 className="text-lg font-semibold">
              Order # - {selectedOrder.id}
            </h2>

            <p className="text-md font-semibold mt-2">
              Total Amount: ${totalAmount.toFixed(2)}
            </p>

            <div className="p-2 rounded-[24px] mt-4">
              <div className="flex flex-col gap-3 pb-6 border-b border-[#000]">
                {selectedOrderItems.map((item) => (
                  <div
                    key={item.id}
                    className="relative flex flex-row items-center justify-between"
                  >
                    <div className="flex flex-row items-center gap-1">
                      <Image
                        width={68}
                        alt={""}
                        height={68}
                        src={""}
                        className="bg-white rounded-md w-[68px] h-[68px]"
                      />
                      <div className="flex flex-col items-start justify-between py-1">
                        <p className="text-xs">Item info</p>
                        <p className="text-sm font-semibold line-clamp-2">
                          Item Id: {item.itemId}
                        </p>
                        <p className="text-xs font-medium text-[#98A2B3] mt-0.5">
                          {/* Size - {item.size}, Color - {item.color} */}
                        </p>
                      </div>
                    </div>

                    <div className="min-w-fit flex flex-col items-start gap-2 justify-around py-1">
                      <p className="text-base font-bold">
                        {"$"}
                        {item.price}
                      </p>
                      <p className="text-sm font-semibold">
                        {item.quantity} unit(s)
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-row items-center justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-medium text-[#98A2B3]">
                    Order Id: {selectedOrder.id} | Status:{" "}
                    {selectedOrder.status}
                  </p>
                  <p className="text-xs font-medium text-[#98A2B3]">
                    On {formatOrderDate(selectedOrder.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Orders;
