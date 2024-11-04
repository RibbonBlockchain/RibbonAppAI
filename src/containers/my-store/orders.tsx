import React, { useState } from "react";
import UnfulfilledOrders from "./unfulfilled-orders";
import FulfilledOrders from "./fulfilled-orders";
import DeliveredOrders from "./delivered-orders";

const tabs = [
  { name: "Unfifilled", value: "unfulfilled" },
  { name: "Fulfilled", value: "fulfilled" },
  { name: "Delivered", value: "delivered" },
];

const Orders = () => {
  const [selectedTab, setSelectedTab] = useState("unfulfilled");

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row gap-2 w-[inherit]">
        {tabs.map((tab: any) => (
          <button
            key={tab.value}
            onClick={() => handleTabClick(tab.value)}
            className={`min-w-fit px-2.5 py-1.5 text-white text-xs border border-[#FFFFFF36] rounded-full ${
              selectedTab === tab.value ? "bg-[#8B78C980]" : ""
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>
      {selectedTab === "unfulfilled" && <UnfulfilledOrders />}
      {selectedTab === "fulfilled" && <FulfilledOrders />}
      {selectedTab === "delivered" && <DeliveredOrders />}
    </div>
  );
};

export default Orders;
