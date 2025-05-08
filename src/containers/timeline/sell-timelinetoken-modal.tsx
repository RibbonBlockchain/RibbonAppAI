import React, { useState } from "react";

interface SellTimelineTokenModal {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    amount: number;
    slippage: number;
    address: string;
  }) => void;
}

const SellTimelineTokenModal: React.FC<SellTimelineTokenModal> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [amount, setAmount] = useState(0);
  const [slippage, setSlippage] = useState(5);
  const [address, setAddress] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit({ amount, slippage, address });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-[#1E1E1E] text-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Sell Token</h2>
          <button
            onClick={onClose}
            className="text-white text-xl hover:text-gray-400"
          >
            &times;
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-semibold mb-1 block">
              Amount (ETH)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-600 rounded-md bg-[#121212] text-white"
              placeholder="Enter amount"
              min="0"
            />
          </div>

          <div>
            <label className="text-sm font-semibold mb-1 block">
              Slippage (%)
            </label>
            <input
              type="number"
              value={slippage}
              onChange={(e) => setSlippage(parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-600 rounded-md bg-[#121212] text-white"
              placeholder="Enter slippage"
              min="0"
              max="100"
              step="0.1"
            />
          </div>

          <div>
            <label className="text-sm font-semibold mb-1 block">
              Recipient Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 rounded-md bg-[#121212] text-white"
              placeholder="0x..."
            />
          </div>

          <button
            onClick={handleSubmit}
            className="mt-4 w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md"
          >
            Sell
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellTimelineTokenModal;
