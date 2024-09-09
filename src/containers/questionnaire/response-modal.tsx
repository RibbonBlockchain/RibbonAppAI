import React from "react";
import { SpinnerIconPurple } from "@/components/icons/spinner";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResponseModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <SpinnerIconPurple />
      </div>
    </div>
  );
};

export default ResponseModal;
