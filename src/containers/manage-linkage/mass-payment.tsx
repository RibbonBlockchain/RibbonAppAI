import toast from "react-hot-toast";
import Button from "@/components/button";
import { useMassWalletTransfer } from "@/api/user";
import React, { ChangeEvent, useState } from "react";
import { Add, GalleryAdd, Minus } from "iconsax-react";
import { SpinnerIcon } from "@/components/icons/spinner";
import InputBox from "@/components/questionnarie/input-box";
import SuccessAnimation from "@/components/success-animation";
import { useLinkageMassWalletTransfer } from "@/api/linkage";

const MassPayment = ({
  walletBalance,
  linkageId,
}: {
  walletBalance: string;
  linkageId: number;
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [recipients, setRecipients] = useState<
    { address: string; amount: string }[]
  >([{ address: "", amount: "" }]);

  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
  };

  const handleChange = (
    index: number,
    field: "address" | "amount",
    value: string
  ) => {
    const updatedRecipients = [...recipients];
    updatedRecipients[index][field] = value;
    setRecipients(updatedRecipients);
  };

  const addRecipient = () => {
    setRecipients([...recipients, { address: "", amount: "" }]);
  };

  const removeRecipient = (index: number) => {
    setRecipients(recipients.filter((_, i) => i !== index));
  };

  const { mutate, isPending } = useLinkageMassWalletTransfer();

  const handleMassWalletTransfer = () => {
    mutate(
      { body: { data: recipients }, id: linkageId },
      {
        onSuccess: () => {
          toast.success("Transaction completed");
          setShowSuccessAnimation(true);
          setRecipients([{ address: "", amount: "" }]);
        },
      }
    );
  };

  const isSubmitDisabled =
    isPending ||
    recipients[0]?.address.length === 0 ||
    recipients[0]?.amount.length === 0;

  return (
    <section className="w-full flex flex-col gap-4">
      <p className="text-2xl font-bold">Mass payment</p>
      <div className="flex flex-col gap-[2px] pb-3">
        <p className="text-sm font-normal text-[#98A2B3]">Wallet balance</p>
        <p className="text-sm font-semibold">{walletBalance} usdc</p>
      </div>
      <div className="flex flex-row items-center justify-center mx-auto gap-1 mt-1 border-dashed border border-white p-4 rounded-[10px]">
        <label className="cursor-pointer text-sm font-medium flex flex-col items-center justify-center text-center gap-2">
          <GalleryAdd size="24" color="#ffffff" />
          <span className="text-xs font-semibold">Upload CSV files</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      </div>
      <p className="text-[#98A2B3] text-center text-sm my-4">Or</p>
      <div className="flex flex-col gap-6 mb-8">
        <p className="text-base font-semibold">Enter Recipients & Amounts</p>

        {recipients.map((recipient, index) => (
          <div key={index} className="flex flex-row items-center">
            <div className="flex flex-row gap-2">
              <InputBox
                name={`address-${index}`}
                value={recipient.address}
                label={"Wallet Address"}
                required={false}
                onChange={(e) => handleChange(index, "address", e.target.value)}
                placeholder="Enter wallet address"
                className="w-full"
              />
              <InputBox
                name={`amount-${index}`}
                value={recipient.amount}
                label={"USDC"}
                required={false}
                onChange={(e) => handleChange(index, "amount", e.target.value)}
                placeholder="Enter amount"
                className="max-w-[100px]"
              />
            </div>

            <div
              className="flex mx-auto items-center justify-center h-[25px] w-[25px] border border-white rounded-full"
              onClick={() => removeRecipient(index)}
            >
              <Minus size={20} />
            </div>
          </div>
        ))}

        <div className="flex flex-row gap-4 self-end items-end justify-end">
          <div
            className="p-[2px] border border-white rounded-full"
            onClick={addRecipient}
          >
            <Add size={20} />
          </div>
        </div>
      </div>
      <Button
        className="mb-6"
        disabled={isSubmitDisabled}
        onClick={handleMassWalletTransfer}
      >
        {isPending ? <SpinnerIcon /> : "Pay"}
      </Button>
      {showSuccessAnimation && <SuccessAnimation />}
    </section>
  );
};

export default MassPayment;
