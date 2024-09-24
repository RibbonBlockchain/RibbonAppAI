import React, { useState } from "react";
import ActiveItems from "./active-items";
import ArchivedItems from "./archived-items";

const tabs = [
  { name: "Active", value: "active" },
  { name: "Archived", value: "archived" },
];

const MyItems = () => {
  const [selectedTab, setSelectedTab] = useState("active");

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
      {selectedTab === "active" && <ActiveItems />}
      {selectedTab === "archived" && <ArchivedItems />}
    </div>
  );
};

export default MyItems;
