import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight2 } from "iconsax-react";
import LendModal from "./lend-modal";
import toast from "react-hot-toast";
import {
  useGetLendBorrowStats,
  useSupplyAssets,
  useWithdrawAssets,
} from "@/api/user";

const Lend = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    placeholder: "",
  });
  const [modalAction, setModalAction] = useState<"supply" | "withdraw" | null>(
    null
  );

  const openModal = (
    title: string,
    placeholder: string,
    action: "supply" | "withdraw"
  ) => {
    setModalContent({ title, placeholder });
    setModalAction(action);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { data } = useGetLendBorrowStats();

  const { mutate: supplyAssets, isPending: supplyPending } = useSupplyAssets();
  const { mutate: withdrawAssets, isPending: withdrawPending } =
    useWithdrawAssets();

  const handleModalSubmit = (inputValue: string) => {
    if (modalAction === "supply") {
      supplyAssets(
        { amount: inputValue },
        {
          onSuccess: () => {
            toast.success(`Supply: ${inputValue} USDC supplied successfully`);
            closeModal();
          },
        }
      );
    } else if (modalAction === "withdraw") {
      withdrawAssets(
        { amount: inputValue },
        {
          onSuccess: () => {
            toast.success(`Withdraw: ${inputValue} USDC withdrawal successful`);
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
            <span>{data?.data?.totalDeposited} USDC</span>
          </div>
          <div className="flex flex-row gap-5">
            <p className="w-[135px]">Total borrowed:</p>
            <span>{data?.data?.totalDebtBase} USDC</span>
          </div>
          <div className="flex flex-row gap-5">
            <p className="w-[135px]">Available to borrow:</p>
            <span>{data?.data?.availableBorrowsBase} USDC</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Supply assets */}
        <div
          onClick={() =>
            openModal("Supply Assets", "Amount to supply (USDC).", "supply")
          }
          className="flex flex-row items-center justify-between py-2 cursor-pointer"
        >
          <div className="flex flex-row items-center gap-2 text-base font-semibold">
            <Image
              alt="coin"
              width={24}
              height={24}
              src="/assets/money-send.svg"
              className="w-[24px] h-[24px] rounded-full"
            />
            Supply assets
          </div>
          <ArrowRight2 />
        </div>

        {/* Withdraw assets */}
        <div
          onClick={() =>
            openModal(
              "Withdraw Assets",
              "Amount to withdraw (USDC).",
              "withdraw"
            )
          }
          className="flex flex-row items-center justify-between py-2 cursor-pointer"
        >
          <div className="flex flex-row items-center gap-2 text-base font-semibold">
            <Image
              alt="coin"
              width={24}
              height={24}
              src="/assets/money-recive.svg"
              className="w-[24px] h-[24px] rounded-full"
            />
            Withdraw assets
          </div>
          <ArrowRight2 />
        </div>
      </div>

      {/* Conditionally render Modal */}
      {isModalOpen && (
        <LendModal
          title={modalContent.title}
          onClose={closeModal}
          onSubmit={handleModalSubmit}
          placeholder={modalContent.placeholder}
          description={""}
          isPending={supplyPending || withdrawPending}
        />
      )}
    </div>
  );
};

export default Lend;
