import { X } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";

interface ModalProps {
  title: string;
  description: string;
  placeholder: string;
  onClose: () => void;
  onSubmit: (inputValue: string) => void;
  isPending: boolean;
}

const LendModal: React.FC<ModalProps> = ({
  title,
  description,
  placeholder,
  onClose,
  onSubmit,
  isPending,
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

  const isButtonDisabled =
    !inputValue || isNaN(Number(inputValue)) || isPending;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#FFF] z-20 py-6 px-4 rounded-lg w-full max-w-[350px] mx-3">
        <div className="flex justify-end items-center">
          <X onClick={onClose} color="#000" size={24} />
        </div>

        <h2 className="text-lg font-semibold text-black">{title}</h2>

        {isPending ? (
          <div className="my-6 flex flex-col gap-1 items-center justify-center text-center text-black">
            <p>Processing your request...</p>
            <div className="w-[50px] h-[50px] justify-center items-center self-center flex rounded-full bg-gray-300">
              <Image
                alt="coin"
                width={19}
                height={28}
                src="/assets/loading.svg"
                className="w-[19px] h-[28px]"
              />
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default LendModal;
