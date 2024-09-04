import { Add, InfoCircle } from "iconsax-react";
import React from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
}

const AddStatusModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onProceed,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-70 bg-black flex items-center justify-center z-50">
      <div className="flex flex-col max-w-[300px] items-center justify-center gap-4 bg-[#3f3952] bg-opacity-75 backdrop-blur-sm p-4 rounded-lg shadow-lg">
        <X onClick={onClose} className="flex self-end text-red-500" />

        <div className="flex relative min-w-[82px] flex-row">
          <Image
            alt="alt"
            width={82}
            height={82}
            src={"/assets/status-circle.png"}
            className="rounded-full w-[82px] h-[82px]"
          />
          <Add
            size="24"
            color="#ffffff"
            className="absolute bottom-0 right-0 bg-[#A166F5] border-[3px] border-[#0B0228] rounded-full"
          />
        </div>

        <div className="flex flex-col items-center text-center justify-center gap-2">
          <p className="text-lg font-semibold">Upload a status for $1</p>
          <p className="text-xs font-medium">
            Upload status to enhance your Linkage visibility and boost
            interaction with your Bots
          </p>
        </div>

        <button
          className="flex justify-center py-2.5 mt-4 text-sm text-start font-medium w-full rounded-[8px] text-[#290064] bg-white"
          onClick={() => {
            onProceed();
            onClose();
          }}
        >
          Proceed
        </button>

        <div className="flex flex-row gap-1 items-center justify-center text-[#F5C193] text-xs font-bold">
          <InfoCircle size={16} />
          <p> $1 will be charged from your USDC wallet</p>
        </div>
      </div>
    </div>
  );
};

export default AddStatusModal;
