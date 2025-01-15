import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight2 } from "iconsax-react";
import LendModal from "./lend-modal";
import toast from "react-hot-toast";
import { useBorrowAssets, useRepayAssets } from "@/api/user";

const Borrow = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    placeholder: "",
  });
  const [modalAction, setModalAction] = useState<"borrow" | "repay" | null>(
    null
  );

  const openModal = (
    title: string,
    placeholder: string,
    action: "borrow" | "repay"
  ) => {
    setModalContent({ title, placeholder });
    setModalAction(action);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { mutate: borrowAssets, isPending: borrowPending } = useBorrowAssets();
  const { mutate: repayAssets, isPending: repayPending } = useRepayAssets();

  const handleModalSubmit = (inputValue: string) => {
    if (modalAction === "borrow") {
      borrowAssets(
        { amount: inputValue },
        {
          onSuccess: () => {
            toast.success(`Borrow: You borrowed ${inputValue} USDC`);
            closeModal();
          },
        }
      );
    } else if (modalAction === "repay") {
      repayAssets(
        { amount: inputValue },
        {
          onSuccess: () => {
            toast.success(`Repay: You have repayed ${inputValue} USDC`);
            closeModal();
          },
        }
      );
    }
  };

  return (
    <div className="pb-16 flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-base font-semibold">Account Overview</h1>
          <p className="px-3 py-1 rounded-full border border-[#F2EEFF40]">
            View history
          </p>
        </div>
        <div className="flex flex-col gap-1 text-sm font-normal text-[#FFFFFF]">
          <div className="flex flex-row gap-5">
            <p className="w-[135px]">Total supplied:</p>
            <span>xx.xx USDC</span>
          </div>
          <div className="flex flex-row gap-5">
            <p className="w-[135px]">Total borrowed:</p>
            <span>xx.xx USDC</span>
          </div>
          <div className="flex flex-row gap-5">
            <p className="w-[135px]">Available to borrow:</p>
            <span>xx.xx USDC</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Borrow assets */}
        <div
          onClick={() =>
            openModal("Borrow Assets", "Amount to borrow (USDC).", "borrow")
          }
          className="flex flex-row items-center justify-between py-2 cursor-pointer"
        >
          <div className="flex flex-row items-center gap-2 text-base font-semibold">
            <Image
              alt="coin"
              width={24}
              height={24}
              src="/assets/coin-hand.svg"
              className="w-[24px] h-[24px] rounded-full"
            />
            Borrow assets
          </div>
          <ArrowRight2 />
        </div>

        {/* Repay assets */}
        <div
          onClick={() =>
            openModal("Repay Assets", "Amount to repay (USDC).", "repay")
          }
          className="flex flex-row items-center justify-between py-2 cursor-pointer"
        >
          <div className="flex flex-row items-center gap-2 text-base font-semibold">
            <Image
              alt="coin"
              width={24}
              height={24}
              src="/assets/convert-card.svg"
              className="w-[24px] h-[24px] rounded-full"
            />
            Repay assets
          </div>
          <ArrowRight2 />
        </div>
      </div>

      {isModalOpen && (
        <LendModal
          title={modalContent.title}
          onClose={closeModal}
          onSubmit={handleModalSubmit}
          placeholder={modalContent.placeholder}
          description={""}
          isPending={borrowPending || repayPending}
        />
      )}
    </div>
  );
};

export default Borrow;
