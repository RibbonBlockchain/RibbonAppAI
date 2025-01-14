import { X } from "lucide-react";
import React, { useState } from "react";

interface ModalProps {
  title: string;
  description: string;
  placeholder: string;
  onClose: () => void;
  onSubmit: (inputValue: string) => void;
}

const LendModal: React.FC<ModalProps> = ({
  title,
  description,
  placeholder,
  onClose,
  onSubmit,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inputValue);
    setInputValue("");
  };

  const isButtonDisabled = !inputValue || isNaN(Number(inputValue));

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#FFF] z-20 py-6 px-4 rounded-lg w-full max-w-[350px] mx-3">
        <div className="flex justify-end items-center">
          <X onClick={onClose} color="#000" size={24} />
        </div>

        <h2 className="text-lg font-semibold text-black">{title}</h2>

        {/* Input Field and Button */}
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md text-black"
          />
          <button
            type="submit"
            disabled={isButtonDisabled}
            className={`w-full mt-3 p-2 rounded-md text-white ${
              isButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {title}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LendModal;
