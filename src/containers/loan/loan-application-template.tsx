"use client";

import {
  useCreateWallet,
  useGetUserWallet,
  useDisburseLoan,
} from "@/api/linkage";
import clsx from "clsx";
import Image from "next/image";
import { User } from "iconsax-react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { shortenTransaction } from "@/lib/utils/shorten";
import { SpinnerIcon } from "@/components/icons/spinner";
import React, { useState, useEffect, useRef } from "react";

interface Message {
  sender: "user" | "ai";
  text: string;
  options?: { id: number; value: string }[];
}

interface LoanApplicationProps {
  linkageId: number;
  questions: any[];
}

const LoanApplication: React.FC<LoanApplicationProps> = ({
  linkageId,
  questions,
}) => {
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [loanAmount, setLoanAmount] = useState("0");
  const { mutate: createUserWallet } = useCreateWallet({
    onSuccess: () => setStep(2),
  });

  const { data: loanWallet } = useGetUserWallet();
  const loanWalletDetails = loanWallet?.data?.find(
    (item: any) => item.provider === "COINBASE"
  );

  const { mutate: disburseLoan, isPending } = useDisburseLoan();

  const shortWalletAddress = shortenTransaction(loanWalletDetails?.address);
  const disableInput = false;

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const setStep = (step: number) => {
    if (step === 2 && loanWalletDetails) {
      setMessages([
        ...messages,
        {
          sender: "ai",
          text: questions[1].text.replace(
            "$balance",
            loanWalletDetails?.balance || "0"
          ),
        },
      ]);
    } else if (step === 3) {
      setMessages([
        ...messages,
        {
          sender: "ai",
          text: questions[2].text,
          options: [],
        },
      ]);
    } else if (step === 4) {
      setMessages([
        ...messages,
        {
          sender: "ai",
          text: questions[3].text,
        },
      ]);
    } else if (step === 1) {
      setMessages([
        {
          sender: "ai",
          text: questions[0].text,
          options: questions[0].options,
        },
      ]);
    }
    setCurrentStep(step);
  };

  useEffect(() => {
    if (currentStep === 1) {
      setMessages([
        {
          sender: "ai",
          text: questions[0].text,
          options: questions[0].options,
        },
      ]);
    }
  }, [currentStep]);

  const handleOptionClick = (option: { id: number; value: string }) => {
    if (option.value === "Connect Wallet") {
      createUserWallet();
    } else {
      router.back();
    }
  };

  const handleAmountSubmit = () => {
    disburseLoan(
      { linkageId, body: { amount: Number(loanAmount) } },
      {
        onSuccess: () => {
          setMessages([
            ...messages,
            {
              sender: "ai",
              text: questions[3].text
                .replace("$amount", loanAmount)
                .replace("$address", shortWalletAddress),
            },
          ]);
          setCurrentStep(4); // Optionally handle the next step or end of the process
        },
        onError: () => {
          toast.error("Failed to disburse the loan. Please try again.");
        },
      }
    );
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="relative w-full mt-2 p-4 flex flex-col h-auto overflow-auto scroll-hidden mx-auto rounded-lg shadow-lg bg-aiBackground bg-contain bg-no-repeat">
      <Toaster />

      <div className="flex-1 h-full overflow-y-auto mb-16">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-6 flex flex-row gap-2 items-start ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "ai" && (
              <div className="w-8 h-8 self-end flex-shrink-0">
                <Image alt="AI" width={32} height={32} src="/assets/AI.png" />
              </div>
            )}
            <div
              className={`inline-block px-4 py-2.5 rounded-lg w-auto max-w-[65%] text-sm font-normal ${
                msg.sender === "user"
                  ? "bg-[#3f3952] bg-opacity-95 text-white rounded-l-[12px] rounded-tr-[12px] rounded-br-[4px]"
                  : "bg-[#3f3952] bg-opacity-95 text-white rounded-r-[12px] rounded-tl-[12px] rounded-bl-[4px]"
              }`}
            >
              {msg.text}
              {msg.options && (
                <div className="mt-2 flex flex-col gap-2">
                  {msg.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleOptionClick(option)}
                      className="bg-gradient-to-b from-[#0B0228] to-[#121212] text-white px-4 py-2 rounded-md"
                    >
                      {option.value}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {msg.sender === "user" && (
              <div className="w-8 h-8 self-end flex-shrink-0">
                <User
                  size="32"
                  fill="gray"
                  className="flex bg-white rounded-full"
                />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {currentStep === 2 && (
        <div className="fixed self-center bottom-4 p-4 w-[90%] max-w-[450px]">
          <button
            onClick={() => setStep(3)}
            disabled={disableInput}
            className={clsx(
              "flex justify-center py-2.5 mt-4 text-[15px] text-start font-bold w-full rounded-[8px] ",
              disableInput
                ? "border-stone-300 bg-stone-400/50 text-white"
                : "bg-white text-[#290064]"
            )}
          >
            Proceed to input Loan Amount
          </button>
        </div>
      )}

      {currentStep === 3 && (
        <div className="flex flex-col gap-4 fixed self-center bottom-4 p-4 w-[90%] max-w-[450px]">
          <input
            type="text"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="Enter loan amount"
            className="py-3 px-2 rounded-lg bg-inherit border border-[#E5E7EB] text-sm font-normal text-white placeholder:text-[#98A2B3]"
          />
          <button
            onClick={handleAmountSubmit}
            className={clsx(
              "flex justify-center py-2.5 mt-8 text-[15px] text-start font-bold w-full rounded-[8px] text-[#290064]",
              isPending ? "border-stone-300 bg-stone-400/50" : "bg-white"
            )}
          >
            {isPending ? <SpinnerIcon /> : "Disburse Loan"}
          </button>
        </div>
      )}
    </div>
  );
};

export default LoanApplication;
