import React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Check, TruckTime } from "iconsax-react";
import { Toaster } from "react-hot-toast";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentOrderSuccessful: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-70 bg-black p-4 sm:p-6  flex items-center justify-center z-50">
      <Toaster />
      <div className="flex flex-col items-center justify-center w-full max-w-[370px] px-4 sm:px-6 py-8 gap-8 bg-[#3f3952] bg-opacity-75 backdrop-blur-sm rounded-lg shadow-lg">
        <div className="flex self-end w-fit">
          <X onClick={onClose} />
        </div>

        <div className="p-[22px] border border-white rounded-full -mt-6">
          <Check width={26} height={16} />
        </div>

        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-lg font-semibold">Payment Successful</p>
          <p className="text-[12px]">
            Your payment has been received. You can track the progress of your
            order on the orders page.
          </p>
        </div>

        <Link
          href={"/orders"}
          className="w-full flex items-center text-center justify-center gap-2 py-3 px-2 sm:px-4 bg-white rounded-[8px] border border-white text-[#290064] text-sm font-semibold"
        >
          Track your order <TruckTime size={20} />
        </Link>
      </div>
    </div>
  );
};

export default PaymentOrderSuccessful;
