"use client";

import {
  useRequestLoan,
  useGetUserWallet,
  useLinkageGetLoanById,
} from "@/api/linkage";
import clsx from "clsx";
import Image from "next/image";
import { User } from "iconsax-react";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { SpinnerIcon } from "@/components/icons/spinner";
import React, { useState, useEffect, useRef } from "react";
import { shorten, shortenTransaction } from "@/lib/utils/shorten";

interface Message {
  sender: "user" | "ai";
  text: string;
  options?: { id: number; value: string }[];
}

const LoanApplication = () => {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const loanId = Number(params.id);

  const { data: loanService, refetch } = useLinkageGetLoanById({
    slug,
    loanId,
  });
  const loanData = loanService?.data;

  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [installmentAmount, setInstallmentAmount] = useState(0);

  const { data: loanWallet } = useGetUserWallet();
  const loanWalletDetails = loanWallet?.data?.find(
    (item: any) => item.provider === "COINBASE"
  );

  const { mutate: requestLoan, isPending } = useRequestLoan();

  const interestRate =
    loanData?.interest !== undefined ? loanData.interest : "";

  const loanOffer = loanData?.amount !== undefined ? loanData.amount : "";

  const timeline = loanData?.timeline !== undefined ? loanData.timeline : "";

  const frequencies = ["", "daily", "weekly", "monthly", "yearly"];
  const frequencyDays = ["", "day(s)", "week(s)", "month(s)", "year(s)"];

  const period =
    loanData?.period !== undefined ? frequencies[loanData.period] : "";

  const periodDays =
    loanData?.period !== undefined ? frequencyDays[loanData.period] : "";

  const calculateInstallment = () => {
    if (
      loanData?.amount <= 0 ||
      loanData?.interest < 0 ||
      loanData?.timeline <= 0
    ) {
      setInstallmentAmount(0);
      return;
    }

    let rate, n;

    switch (loanData?.period) {
      case 1: // Daily
        rate = loanData?.interest / 100 / 365;
        n = loanData?.timeline; // Number of days
        break;
      case 2: // Weekly
        rate = loanData?.interest / 100 / 52;
        n = loanData?.timeline; // Number of weeks
        break;
      case 3: // Monthly
        rate = loanData?.interest / 100 / 12;
        n = loanData?.timeline; // Number of months
        break;
      case 4: // Yearly
        rate = loanData?.interest / 100;
        n = loanData?.timeline; // Number of years
        break;
      default:
        return;
    }

    const M = (loanData?.amount * rate) / (1 - Math.pow(1 + rate, -n));
    setInstallmentAmount(M);
  };

  useEffect(() => {
    calculateInstallment();
  }, [
    loanData?.amount,
    loanData?.interest,
    loanData?.timeline,
    loanData?.period,
  ]);

  useEffect(() => {
    if (currentStep === 1) {
      const updatedMessage = `
      <div class="loan-details">
      <p>Welcome! You are about to take a loan! Here are the details:</p> 
      <br />
      <p>- <strong>Loan offer</strong>: ${loanOffer}</p>
      <p>- <strong>Interest Rate</strong>: ${interestRate}%</p>
      <p>- <strong>Loan Duration</strong>: ${timeline} ${periodDays}</p>
      <p>- <strong>Installment amount</strong>: $${installmentAmount.toFixed(
        2
      )}</p>
     <p>- <strong>Repayment schedule</strong>: ${period}<p/>
              <br/>
              <p>
               ${period} repayment of $${installmentAmount.toFixed(
        2
      )} will be automatically deducted from your wallet.</p>
            <p>
            <br />
      Do you agree to proceed with the loan application?</p>
      <br />
    </div>`;

      // Check if there are any messages before updating
      setMessages((prev) => {
        const newMessages = prev.slice();
        if (newMessages.length > 0) {
          newMessages[0].text = updatedMessage; // Update the first message if it exists
        } else {
          // If no messages exist, add a new message
          newMessages.push({
            sender: "ai",
            text: updatedMessage,
            options: [
              { id: 1, value: "Proceed" },
              { id: 2, value: "Come back later" },
            ],
          });
        }
        return newMessages;
      });
    }
  }, [installmentAmount, currentStep]);

  const shortWalletAddress = shortenTransaction(loanWalletDetails?.address);
  const disableInput = false;
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const setStep = (step: number) => {
    if (step === 1) {
      setMessages([
        {
          sender: "ai",
          text: `
          <div class="loan-details">
            <p>Welcome! You are about to take a loan! Here are the details:</p> 
            <br />
            <p>- <strong>Loan offer</strong>: ${loanOffer}</p>
            <p>- <strong>Interest Rate</strong>: ${interestRate}%</p>
            <p>- <strong>Loan Duration</strong>: ${timeline} ${periodDays}</p>
            <p>- <strong>Installment amount</strong>: $${installmentAmount.toFixed(
              2
            )}</p>
             <p>- <strong>Repayment schedule</strong>:<p/>
              <br/>
              <p>
               ${period} repayment of $${installmentAmount.toFixed(
            2
          )} will be automatically deducted from your wallet.</p>
            <p>
            <br />
            Do you agree to proceed with the loan application?</p> 
            <br/>
          </div>`,
          options: [
            { id: 1, value: "Proceed" },
            { id: 2, value: "Come back later" },
          ],
        },
      ]);
    } else if (step === 2 && loanWalletDetails) {
      setMessages([
        {
          sender: "ai",
          text: `
          <div class="wallet-balance">
            <p>Your wallet currently has a balance of $${
              loanWalletDetails?.balance || "0"
            } USDC.</p>
            <br />
             <p>Your wallet address is ${
               shorten(loanWalletDetails?.address) || "0"
             }.</p>
          </div>
        `,
        },
      ]);
    } else if (step === 3) {
      setMessages([
        {
          sender: "ai",
          text: `
          <div class="loan-application">
            <p>Below are the details of your loan application:</p> 
            <br />
            <p>- <strong>Loan amount</strong>: ${loanOffer}</p>
            <p>- <strong>Loan Duration</strong>: ${timeline} ${periodDays}</p>
            <p>- <strong>Installment amount</strong>: $${installmentAmount.toFixed(
              2
            )}</p>
             <p>- <strong>Repayment amount</strong>:
             <br/>
             $${installmentAmount.toFixed(
               2
             )} will be automatically deducted from your wallet ${period}.</p>
            <p>
            <br />
            
          </div>`,
        },
      ]);
    } else if (step === 4) {
      setMessages([
        {
          sender: "ai",
          text: "Your loan has been successfully disbursed.",
        },
      ]);
    }
    setCurrentStep(step);
  };

  useEffect(() => {
    if (currentStep === 1) {
      setStep(1);
    }
  }, [currentStep]);

  const handleOptionClick = (option: { id: number; value: string }) => {
    if (option.value === "Proceed") {
      setStep(2);
    } else {
      router.back();
    }
  };

  const handleAmountSubmit = () => {
    requestLoan(
      { slug, body: { id: loanId } },
      {
        onSuccess: () => {
          setMessages([
            ...messages,
            {
              sender: "ai",
              text: `Your loan of ${loanData?.amount} has been successfully disbursed to ${shortWalletAddress}.`,
            },
          ]);
          setCurrentStep(4);
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
              <div dangerouslySetInnerHTML={{ __html: msg.text }} />
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
              "flex justify-center py-2.5 mt-4 text-[15px] text-start font-bold w-full rounded-[8px]",
              disableInput
                ? "border-stone-300 bg-stone-400/50 text-white"
                : "bg-white text-[#290064]"
            )}
          >
            Confirm and Proceed
          </button>
        </div>
      )}

      {currentStep === 3 && (
        <div className="flex flex-col gap-4 fixed self-center bottom-4 p-4 w-[90%] max-w-[450px]">
          <button
            onClick={handleAmountSubmit}
            className={clsx(
              "flex justify-center py-2.5 mt-8 text-[15px] text-start font-bold w-full rounded-[8px] text-[#290064]",
              isPending ? "border-stone-300 bg-stone-400/50" : "bg-white"
            )}
          >
            {isPending ? <SpinnerIcon /> : "Request Loan"}
          </button>
        </div>
      )}

      {currentStep === 4 && (
        <div className="flex flex-col gap-4 fixed self-center bottom-4 p-4 w-[90%] max-w-[450px]">
          <button
            onClick={() => router.back()}
            className={clsx(
              "flex justify-center py-2.5 mt-8 text-[15px] text-start font-bold w-full rounded-[8px] text-[#290064]",
              isPending ? "border-stone-300 bg-stone-400/50" : "bg-white"
            )}
          >
            Exit
          </button>
        </div>
      )}
    </div>
  );
};

export default LoanApplication;
