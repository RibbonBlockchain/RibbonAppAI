import React, { useEffect, useState } from "react";

interface SellTimelineTokenModalProps {
  isOpen: boolean;
  isPending: boolean;
  onClose: () => void;
  onSubmit: (data: {
    amount: number;
    slippage: number;
    address: string;
  }) => void;
}

const SellTimelineTokenModal: React.FC<SellTimelineTokenModalProps> = ({
  isOpen,
  isPending,
  onClose,
  onSubmit,
}) => {
  const [amount, setAmount] = useState(0);
  const [slippage, setSlippage] = useState(5);

  useEffect(() => {
    if (isOpen) {
      setAmount(0);
      setSlippage(5);
    }
  }, [isOpen]);

  // useEffect(() => {
  //   setIsValid();
  // }, [amount, slippage]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (isPending) return;
    onSubmit({ amount, slippage, address: "" }); // Address is provided externally
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-[#1E1E1E] text-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Sell Token</h2>
          <button
            onClick={onClose}
            className="text-white text-xl hover:text-gray-400"
            disabled={isPending}
          >
            &times;
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-semibold mb-1 block">
              Amount (Token)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-600 rounded-md bg-[#121212] text-white"
              placeholder="Enter amount"
              min="0"
              disabled={isPending}
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
              disabled={isPending}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={isPending}
            className={`mt-4 w-full py-2 rounded-md flex items-center justify-center ${
              !isPending
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-gray-500 cursor-not-allowed"
            }`}
          >
            {isPending ? (
              <span className="animate-spin border-2 border-t-transparent border-white rounded-full w-5 h-5" />
            ) : (
              "Sell"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellTimelineTokenModal;
