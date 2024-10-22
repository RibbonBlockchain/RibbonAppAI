"use client";

import clsx from "clsx";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetUserOrders } from "@/api/user";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data } = useGetUserOrders();

  const handleOrderClick = (items: OrderItem[]) => {
    setSelectedOrderItems(items);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrderItems([]);
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
          data?.data?.map((item: any) => (
            <div
              key={item.id}
              className="relative flex flex-row items-center justify-between gap-2 mb-4"
              onClick={() => handleOrderClick(item.items)}
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
                  <p className="text-sm font-semibold">Order Id: {item.id}</p>
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg p-4 w-3/4 max-w-md">
            <h2 className="text-lg font-semibold">Order Items</h2>

            <p className="text-md font-semibold mt-2">
              Total Amount: ${totalAmount.toFixed(2)}
            </p>

            <ul className="mt-2">
              {selectedOrderItems.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between py-2 border-b"
                >
                  <span>{`Item ID: ${item.itemId}`}</span>
                  <span>{`Quantity: ${item.quantity}`}</span>
                  <span>{`Price: $${item.price}`}</span>
                </li>
              ))}
            </ul>

            <></>

            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Orders;
