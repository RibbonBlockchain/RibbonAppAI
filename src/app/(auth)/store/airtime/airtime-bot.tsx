"use client";

import Image from "next/image";
import { Send, User } from "iconsax-react";
import { usePurchaseAirtime } from "@/api/bills";
import { useState, KeyboardEvent, useRef, useEffect } from "react";

type ServiceProvider = "mtn" | "glo" | "airtel" | "etisalat";

interface Message {
  sender: "user" | "ai";
  text: string;
}

const AirtimeBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [selectedProvider, setSelectedProvider] =
    useState<ServiceProvider | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [amount, setAmount] = useState<number | null>(null);
  const [isPhoneInputEnabled, setIsPhoneInputEnabled] =
    useState<boolean>(false);
  const [isAmountInputEnabled, setIsAmountInputEnabled] =
    useState<boolean>(false);
  const [isPurchasing, setIsPurchasing] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMessages([
      {
        sender: "ai",
        text: "Hello! Welcome to the airtime purchase store. Please select your network provider.",
      },
    ]);
  }, []);

  const handleProviderSelect = (provider: ServiceProvider) => {
    setSelectedProvider(provider);
    setIsPhoneInputEnabled(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        sender: "ai",
        text: `You selected ${provider.toUpperCase()}. Please enter your phone number.`,
      },
    ]);
  };

  const handlePhoneNumberSubmit = () => {
    if (!phoneNumber.trim()) return;

    // Basic phone number validation
    if (/^\d{11}$/.test(phoneNumber)) {
      setIsPhoneInputEnabled(false);
      setIsAmountInputEnabled(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: phoneNumber },
        {
          sender: "ai",
          text: `Phone number ${phoneNumber} received. Please enter the amount (minimum 100).`,
        },
      ]);
      setPhoneNumber(phoneNumber);
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "ai",
          text: "Invalid phone number. Please enter a valid 11-digit phone number.",
        },
      ]);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    if (isAmountInputEnabled && !isPurchasing) {
      const parsedAmount = parseFloat(input);
      if (!isNaN(parsedAmount) && parsedAmount >= 100) {
        setAmount(parsedAmount);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "user", text: input },
          {
            sender: "ai",
            text: `Amount of ${parsedAmount} received. Click on purchase to proceed.`,
          },
        ]);
        setInput(""); // Clear amount input
        setIsAmountInputEnabled(false);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "ai",
            text: "Invalid amount. Please enter an amount of at least 100.",
          },
        ]);
      }
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: input },
      ]);
      setInput(""); // Clear general input
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (isPhoneInputEnabled) {
        handlePhoneNumberSubmit();
      } else {
        handleSend();
      }
    }
  };

  const { mutate: purchaseAirtime } = usePurchaseAirtime();

  const handlePurchase = async () => {
    if (selectedProvider && amount && phoneNumber) {
      setIsPurchasing(true);
      try {
        await purchaseAirtime({
          serviceId: selectedProvider,
          amount,
          phone: phoneNumber,
        });

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "ai",
            text: "Purchase successful! Thank you for using our service.",
          },
        ]);
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "ai", text: "Purchase failed. Please try again." },
        ]);
      } finally {
        // Reset state after purchase
        setSelectedProvider(null);
        setPhoneNumber("");
        setAmount(null);
        setIsAmountInputEnabled(false);
        setIsPhoneInputEnabled(false);
        setIsPurchasing(false);
      }
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="relative w-full mt-2 p-4 flex flex-col h-full overflow-auto mx-auto rounded-lg shadow-lg bg-aiBackground bg-contain bg-no-repeat">
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

      <div className="self-center bottom-4 w-[90%] max-w-[450px]">
        {selectedProvider === null && (
          <div className="flex flex-col items-end mb-2">
            <p className="mb-2 text-center text-white">
              Select your service provider
            </p>
            <div className="flex flex-col gap-2">
              {[
                { name: "mtn", logo: "/assets/mtn.jpeg" },
                { name: "glo", logo: "/assets/glo.jpeg" },
                { name: "airtel", logo: "/assets/airtel.jpeg" },
                { name: "etisalat", logo: "/assets/etisalat.jpeg" },
              ].map((provider) => (
                <button
                  key={provider.name}
                  onClick={() =>
                    handleProviderSelect(provider.name as ServiceProvider)
                  }
                  className="flex flex-row gap-2 items-center px-4 py-2 rounded-full bg-[#3f3952] bg-opacity-95 text-white"
                >
                  <Image
                    alt={provider.name}
                    src={provider.logo}
                    width={24}
                    height={24}
                    className="w-[24px] h-[24px] rounded-full bg-white"
                  />
                  {provider.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {isPhoneInputEnabled && (
          <div className="fixed self-center bottom-4 p-4 w-[90%] max-w-[450px]">
            <div className="relative flex flex-row items-center">
              <input
                type="text"
                value={phoneNumber}
                onKeyDown={handleKeyDown}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number..."
                disabled={isPurchasing}
                className="w-full text-sm bg-[#3f3952] bg-opacity-75 backdrop-blur-sm pl-4 pr-14 py-4 border rounded-full"
              />
              <button
                onClick={handlePhoneNumberSubmit}
                className="absolute right-8 z-10"
              >
                <Send size="32" color="#ffffff" />
              </button>
            </div>
          </div>
        )}

        {isAmountInputEnabled && !isPhoneInputEnabled && (
          <div className="fixed self-center bottom-4 p-4 w-[90%] max-w-[450px]">
            <div className="relative flex flex-row items-center">
              <input
                type="text"
                value={input}
                onKeyDown={handleKeyDown}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter amount..."
                disabled={isPurchasing}
                className="w-full text-sm bg-[#3f3952] bg-opacity-75 backdrop-blur-sm pl-4 pr-14 py-4 border rounded-full"
              />
              <button onClick={handleSend} className="absolute right-8 z-10">
                <Send size="32" color="#ffffff" />
              </button>
            </div>
          </div>
        )}

        {!isPurchasing && selectedProvider && amount !== null && (
          <button
            onClick={handlePurchase}
            className="mt-4 px-4 py-2 w-full font-semibold bg-[#F6F1FE] text-[#290064] rounded-lg"
          >
            Purchase
          </button>
        )}

        {isPurchasing && (
          <div className="flex flex-col items-center">
            <p className="text-white">Processing your purchase...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AirtimeBot;
