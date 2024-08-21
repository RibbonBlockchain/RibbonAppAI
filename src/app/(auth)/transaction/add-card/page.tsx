"use client";

import { ArrowLeft2 } from "iconsax-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Input = ({
  label,
  type,
  placeholder,
  maxLength,
}: {
  label: string;
  type: any;
  maxLength?: number;
  placeholder: string;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[13px] font-medium">{label}</label>
      <input
        type={type}
        maxLength={maxLength}
        placeholder={placeholder}
        className="w-full bg-inherit text-[13px] py-3 px-2 rounded-[8px] border border-[#E5E7EB] text-white placeholder:text-[#98A2B3] focus:ring-0 focus:outline-none"
      />
    </div>
  );
};

const AddCard = () => {
  const router = useRouter();

  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const handleCheckboxChangeAdditional = () => {
    setIsAgreed((prev) => !prev);
  };

  return (
    <main className="relative min-h-screen w-full text-white bg-[#0B0228] p-4 sm:p-6 pb-8">
      <div className="flex flex-row items-center gap-4 mt-2">
        <ArrowLeft2
          size="24"
          color="#ffffff"
          className="my-2"
          onClick={() => router.back()}
        />

        <p className="text-[22px] font-bold">Add a card</p>
      </div>

      <div className="flex flex-col gap-8 mt-8">
        <div className="flex flex-col gap-4">
          <Input
            type={"text"}
            label={"Card number"}
            placeholder={"1234 1234 1234 1234"}
            maxLength={16}
          />

          <div className="flex flex-row items-center justify-between gap-4">
            <Input
              type={"number"}
              placeholder={"MM/YY"}
              label={"Expiry (MM/YY)"}
              maxLength={4}
            />
            <Input
              label={"CVV"}
              placeholder={"CVV"}
              type={"number"}
              maxLength={3}
            />
          </div>

          <Input
            type={"text"}
            label={"Card holder's name"}
            placeholder={"Card holder's name"}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Input
            type={"text"}
            label={"Billing address"}
            placeholder={"South Africa"}
          />
          <Input
            type={"text"}
            label={"Address line 1"}
            placeholder={"Address line 1"}
          />
          <Input
            type={"text"}
            label={"Address line 2"}
            placeholder={"Address line 2 (optional)"}
          />

          <div className="flex flex-row items-center justify-between gap-4">
            <Input type={"text"} placeholder={"City"} label={"City"} />
            <Input
              type={"text"}
              label={"Postal Code"}
              placeholder={"Postal code"}
              maxLength={6}
            />
          </div>

          <Input type={"text"} label={"State"} placeholder={"State"} />
        </div>

        <div className="flex items-start rounded-lg text-sm">
          <input
            type="checkbox"
            checked={isAgreed}
            onChange={handleCheckboxChangeAdditional}
            className="form-checkbox h-4 w-4 mt-[3px]"
          />
          <span className="pl-2 text-white">
            Securely save my information for 1-click checkout{" "}
          </span>
        </div>
      </div>

      <button
        onClick={() => router.push(`/transaction/review-payment`)}
        className="mt-16 mb-10 w-full bg-white text-[#290064] rounded-[8px] py-3 font-bold text-sm"
      >
        Checkout
      </button>
    </main>
  );
};

export default AddCard;
