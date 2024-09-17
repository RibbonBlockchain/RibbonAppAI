import { X } from "lucide-react";
import React from "react";
import { Toaster } from "react-hot-toast";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeleteLinkage: () => void;
}

const DeleteLinkageModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onDeleteLinkage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-70 bg-black p-4 sm:p-6  flex items-center justify-center z-50">
      <Toaster />
      <div className="flex flex-col w-full max-w-[370px] px-4 sm:px-6 py-6 gap-8 bg-[#3f3952] bg-opacity-75 backdrop-blur-sm rounded-lg shadow-lg">
        <div className="w-full flex flex-col items-start gap-2">
          <div className="w-full flex flex-row items-center justify-between">
            <p className="text-lg font-semibold">Delete your Linkage</p>
            <X onClick={onClose} />
          </div>

          <p className="text-xs font-medium">
            Deleting will permanently remove your Linkage and all associated
            data. This action cannot be undone
          </p>
        </div>

        <div className="w-full flex flex-row items-center justify-center gap-2">
          <button
            onClick={onClose}
            className="w-full flex items-center text-center justify-center py-3 px-2 sm:px-4 bg-inherit rounded-full border border-white text-white text-sm font-semibold"
          >
            No, don’t delete
          </button>
          <button
            onClick={onDeleteLinkage}
            className="w-full flex items-center text-center justify-center py-3 px-2 sm:px-4 bg-white rounded-full border border-white text-[#6200EE] text-sm font-semibold"
          >
            Yes, delete now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteLinkageModal;
