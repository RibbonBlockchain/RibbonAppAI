import { useBuyRate } from "@/api/timeline/index";
import React, { useState, useEffect } from "react";

interface BuyTimeLineTokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPending: boolean;
  contractAddress: string;
  onSubmit: (data: {
    amount: number;
    slippage: number;
    address: string;
  }) => void;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

const BuyTimelineTokenModal: React.FC<BuyTimeLineTokenModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isPending,
  contractAddress,
}) => {
  const [amount, setAmount] = useState(0);
  const debouncedAmount = useDebounce(amount, 500); // <--- Debounced amount
  const [slippage, setSlippage] = useState(5);
  const [isValid, setIsValid] = useState(false);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setAmount(0);
      setSlippage(5);
      setConvertedAmount(null);
    }
  }, [isOpen]);

  // Validate inputs
  useEffect(() => {
    setIsValid(amount > 0.000019 && slippage >= 0 && slippage <= 100);
  }, [amount, slippage]);

  const handleSubmit = () => {
    if (!isValid || isPending) return;
    onSubmit({ amount, slippage, address: contractAddress });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-[#1E1E1E] text-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Buy Token</h2>
          <button
            onClick={onClose}
            className="text-white text-xl hover:text-gray-400"
            disabled={isPending}
          >
            &times;
          </button>
        </div>

        <p className="text-xs mb-2">
          You can purchase a minimum of 0.00002 ETH
        </p>

        <div className="flex flex-col gap-4">
          {/* Amount Input */}
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
              disabled={isPending}
            />
            {amount > 0 && amount <= 0.000019 && (
              <p className="text-red-500 text-xs mt-1">
                Must be greater than 0.00002 ETH
              </p>
            )}
            {convertedAmount !== null && (
              <p className="text-green-400 text-xs mt-1">
                You will receive approx. {convertedAmount.toFixed(4)} tokens
              </p>
            )}
          </div>

          {/* Slippage Input */}
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

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!isValid || isPending}
            className={`mt-4 w-full py-2 rounded-md flex items-center justify-center ${
              isValid && !isPending
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-gray-500 cursor-not-allowed"
            }`}
          >
            {isPending ? (
              <span className="animate-spin border-2 border-t-transparent border-white rounded-full w-5 h-5" />
            ) : (
              "Buy"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyTimelineTokenModal;
