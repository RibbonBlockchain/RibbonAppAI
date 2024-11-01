import React from "react";
import Image from "next/image";
import Button from "@/components/button";
import { useGetLinkageStoreOrders } from "@/api/linkage";

const UnfulfilledOrders = () => {
  const linkageId = localStorage.getItem("selectedLinkageId");

  const { data } = useGetLinkageStoreOrders(Number(linkageId));

  return (
    <div>
      {data?.data?.length === 0 ? (
        <div className="min-h-[150px] flex items-center justify-center mx-auto text-sm">
          You do not have any items in your store.
        </div>
      ) : (
        <div className="flex flex-col gap-6 mb-10">
          {data?.data?.map((order: any) => (
            <div
              key={order.id}
              className="border border-[#D6CBFF33] p-4 py-6 rounded-[24px]"
            >
              <div className="flex flex-col gap-3 pb-6 border-b border-[#D6CBFF33]">
                {order.items.map((item: any) => (
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

              <div className="mt-4 flex flex-row items-center justify-between">
                <p className="text-xs font-medium text-[#98A2B3]">
                  Order Id: {order.id} | Status: {order.status}
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
