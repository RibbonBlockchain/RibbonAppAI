import React from "react";
import Image from "next/image";
import Button from "@/components/button";

const items: any[] = [{}, {}];
const orders: any[] = [{}, {}, {}];

const UnfulfilledOrders = () => {
  return (
    <div>
      {orders.length === 0 ? (
        <div className="min-h-[150px] flex items-center justify-center mx-auto text-sm">
          You do not have any item in your store
        </div>
      ) : (
        <div className="flex flex-col gap-6 mb-10">
          {orders.map((order: any) => (
            <div
              key={order.id}
              className="border border-[#D6CBFF33] p-4 py-6 rounded-[24px]"
            >
              <div className="flex flex-col gap-3 pb-6 border-b border-[#D6CBFF33]">
                {items?.map((item: any) => (
                  <div
                    key={item.id}
                    className="relative flex flex-row items-center justify-between"
                  >
                    <div className="flex flex-row items-center gap-1">
                      <Image
                        width={68}
                        alt="image"
                        height={68}
                        src={item.image || ""}
                        className="bg-white rounded-md w-[68px] h-[68px]"
                      />
                      <div className="flex flex-col items-start justify-between py-1">
                        <p className="text-sm font-semibold line-clamp-2">
                          {item.name} Polo Ralph
                        </p>

                        <p className="text-xs font-medium text-[#98A2B3] mt-0.5">
                          Size - {item.size}, {item.color} 44 white
                        </p>
                      </div>
                    </div>

                    <div className="min-w-fit flex flex-col items-start gap-2 justify-around py-1">
                      <p className="text-base font-bold">
                        {item.currency} {item.price} $ 20
                      </p>
                      <p className="text-sm font-semibold">
                        Qty - {item.quantity} 1
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-row items-center justify-between">
                <p className="text-xs font-medium text-[#98A2B3]">
                  {order.date} On Sept 19, 2024 at 13:59pm
                </p>

                <Button className="max-w-fit px-4 rounded-full py-1.5">
                  <p className="text-sm font-medium">Fulfill Order</p>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UnfulfilledOrders;
