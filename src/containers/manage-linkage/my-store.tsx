import toast from "react-hot-toast";
import React, { useState } from "react";
import MyItems from "@/containers/my-store/my-items";
import Orders from "@/containers/my-store/orders";

const tabs = [
  { name: "My items", value: "my-items" },
  { name: "Orders", value: "orders" },
];

const MyStore = () => {
  const [selectedTab, setSelectedTab] = useState("my-items");

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <section className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-2 pb-3">
        <p className="text-lg font-bold">My Store</p>
        <p className="text-sm font-normal">
          Sell items directly with your Linkage{" "}
        </p>
      </div>

      <div className="px-1 flex flex-row justify-around gap-2 w-[inherit] border-b border-[#F2EEFF40]">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleTabClick(tab.value)}
            className={`min-w-fit px-3 py-3 ${
              selectedTab === tab.value
                ? "text-white border-b-2 border-b-white"
                : "bg-transparent text-[#F2EEFF]"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {selectedTab === "my-items" && <MyItems />}
      {selectedTab === "orders" && <Orders />}
    </section>
  );
};

export default MyStore;
