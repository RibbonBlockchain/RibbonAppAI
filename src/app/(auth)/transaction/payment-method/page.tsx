"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CheckIcon } from "lucide-react";
import { ArrowLeft2 } from "iconsax-react";
import { useRouter } from "next/navigation";

const SelectableCard = ({
  imageSrc,
  text,
  isSelected,
  onClick,
}: {
  imageSrc: string;
  text: string;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <div
    className={`p-3 flex flex-row items-center justify-between border rounded-[12px] cursor-pointer ${
      isSelected ? "border-blue-500" : "border-gray-300"
    }`}
    onClick={onClick}
  >
    <div className="flex flex-row gap-4 items-center">
      <Image
        src={imageSrc}
        alt={text}
        width={55}
        height={55}
        className="bg-white rounded-[8px]"
      />
      <p className="text-sm font-medium">{text}</p>
    </div>
    {isSelected && (
      <div className="flex bg-white rounded-full items-center justify-center w-[24px] h-[24px]">
        <CheckIcon className="text-[#6200EE] w-4 h-4" />
      </div>
    )}
  </div>
);

const PaymentMethod = () => {
  const router = useRouter();

  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card: any) => {
    setSelectedCard(card);
  };

  const cards = [
    {
      id: "debit",
      text: "Debit Card",
      link: "/transaction/add-card",
      imageSrc: "/assets/debit-card.png",
    },
    {
      id: "crypto",
      text: "Crypto",
      link: "/transaction/add-card",
      imageSrc: "/assets/crypto.png",
    },
    {
      id: "paypal",
      text: "Paypal",
      link: "/transaction/add-card",
      imageSrc: "/assets/paypal.png",
    },
    {
      id: "bank-transfer",
      text: "Bank transfer",
      link: "/transaction/add-card",
      imageSrc: "/assets/bank-transfer.png",
    },
    {
      id: "apple-pay",
      text: "Apple Pay",
      link: "/transaction/add-card",
      imageSrc: "/assets/apple-pay.png",
    },
  ];

  return (
    <main className="relative min-h-screen w-full text-white bg-[#0B0228] p-4 sm:p-6 pb-16">
      <div className="flex flex-col items-start gap-4 mt-2">
        <ArrowLeft2
          size="24"
          color="#ffffff"
          className="my-2"
          onClick={() => router.back()}
        />
        <div>
          <p className="text-[24px] font-bold">Choose a payment method</p>
          <p>All Transactions are safe & secured</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-10">
        {cards.map((card) => (
          <SelectableCard
            key={card.id}
            imageSrc={card.imageSrc}
            text={card.text}
            isSelected={selectedCard === card.id}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>

      <button
        onClick={() => router.push(`/transaction/add-card`)}
        className="mt-16 mb-10 w-full bg-white text-[#290064] rounded-[8px] py-3 font-bold text-sm"
      >
        Proceed to paymnet
      </button>
    </main>
  );
};

export default PaymentMethod;
