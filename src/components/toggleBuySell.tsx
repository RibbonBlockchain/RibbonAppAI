import React, { useState } from "react";

type ToggleProps = {
  onChange: (value: "buy" | "sell") => void;
};

const ToggleBuySell: React.FC<ToggleProps> = ({ onChange }) => {
  const [active, setActive] = useState<"buy" | "sell">("buy");

  const handleToggle = (value: "buy" | "sell") => {
    setActive(value);
    onChange(value);
  };

  return (
    <div className="w-fit flex items-center border border-[#D6CBFF79] rounded-full bg-[inherit]">
      <button
        className={`w-[100px] py-2 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out ${
          active === "buy"
            ? "bg-white text-[#2C2C2C]"
            : "bg-transparent text-[#98A2B3] hover:bg-blue-100"
        }`}
        onClick={() => handleToggle("buy")}
      >
        Buy
      </button>
      <button
        className={`w-[100px] py-2 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out ${
          active === "sell"
            ? "bg-white text-[#2C2C2C]"
            : "bg-transparent text-[#98A2B3] hover:bg-blue-100"
        }`}
        onClick={() => handleToggle("sell")}
      >
        Sell
      </button>
    </div>
  );
};

export default ToggleBuySell;
