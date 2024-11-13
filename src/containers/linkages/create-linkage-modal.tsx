import React from "react";
import { X } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateLinkageTypeModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-opacity-70 bg-black flex items-center justify-center z-50">
      <Toaster />
      <div className="flex flex-col max-w-[300px] gap-4 bg-[#3f3952] bg-opacity-75 backdrop-blur-sm p-4 rounded-lg shadow-lg">
        <X onClick={onClose} className="flex self-end cursor-pointer" />

        <div className="flex flex-col items-start gap-2">
          <p className="text-lg text-center font-semibold">
            What type of linkage do you want to create?
          </p>
          <p className="text-xs font-medium">Select a type to proceed</p>
        </div>

        <div className="mb-8 flex flex-col gap-4 font-semibold text-base">
          <p
            onClick={() => router.push("/linkages/create/business")}
            className="py-2 px-3 bg-[#4f4866] rounded-[8px]"
          >
            Business Linkage
          </p>
          <p
            onClick={() => router.push("/linkages/create/celebrity")}
            className="py-2 px-3 bg-[#4f4866] rounded-[8px]"
          >
            Celebrity Linkage
          </p>
          <p
            onClick={() => router.push("/linkages/create")}
            className="py-2 px-3 bg-[#4f4866] rounded-[8px]"
          >
            Personal Linkage
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateLinkageTypeModal;
