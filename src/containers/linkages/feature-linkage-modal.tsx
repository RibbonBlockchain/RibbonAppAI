import Image from "next/image";
import { X } from "lucide-react";
import React, { useState } from "react";
import { InfoCircle } from "iconsax-react";
import { useFeatureLinkage, useGetLinkages } from "@/api/linkage";
import toast from "react-hot-toast";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeatureLinkageModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const { data: linkages } = useGetLinkages();
  const { mutate: featureLinkage } = useFeatureLinkage();

  const handleItemClick = (itemId: number) => {
    setSelectedItem(itemId);

    const selected = linkages?.data.find((item: any) => item.id === itemId);
    if (selected) {
      setSelectedItem(selected?.id);
    }
  };

  const handleFeatureLinkage = () => {
    featureLinkage(
      { linkageId: selectedItem as number },
      {
        onSuccess: () => {
          toast.success("Linkage featured successfully");
          onClose();
        },
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-70 bg-black flex items-center justify-center z-50">
      <div className="flex flex-col max-w-[300px] gap-4 bg-[#3f3952] bg-opacity-75 backdrop-blur-sm p-4 rounded-lg shadow-lg">
        <X onClick={onClose} className="flex self-start cursor-pointer" />

        <div className="flex flex-col items-start gap-2">
          <p className="text-lg font-semibold">Feature your Linkage for $3</p>
          <p className="text-xs font-medium">
            Feature your Linkage to get visibility and boost interaction with
            your Bots
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-2">
          <p className="text-xs font-bold">Select Linkage to feature;</p>

          {linkages?.data.map((item: any) => (
            <div
              key={item.id}
              className="w-full flex flex-row items-center justify-between cursor-pointer"
              onClick={() => handleItemClick(item.id)}
            >
              <div className="flex flex-row items-center gap-1">
                <Image
                  alt="logo"
                  width={44}
                  height={44}
                  src={item.logo || "/assets/sample-icon.png"}
                  className="w-[44px] h-[44px] rounded-full"
                />
                <p className="text-[15px] font-semibold">{item.name}</p>
              </div>
              <input
                readOnly
                type="checkbox"
                className="cursor-pointer"
                checked={selectedItem === item.id}
              />
            </div>
          ))}
        </div>

        <button
          className="flex justify-center py-2.5 mt-4 text-sm text-start font-medium w-full rounded-[8px] text-[#290064] bg-white"
          onClick={handleFeatureLinkage}
        >
          Pay
        </button>

        <div className="flex flex-row gap-1 items-center justify-center text-[#F5C193] text-xs font-bold">
          <InfoCircle size={16} />
          <p> $3 will be charged from your USDC wallet</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureLinkageModal;
