"use client";

import Image from "next/image";
import { Send, User } from "iconsax-react";
import { useBuyData, useCablePay, useGetDataServiceList } from "@/api/store";
import { useState, KeyboardEvent, useRef, useEffect } from "react";

type ServiceProvider = "dstv";

interface DataVariation {
  variation_code: string;
  name: string;
  variation_amount: string;
  fixedPrice: string;
}

interface Message {
  sender: "user" | "ai";
  text: string;
}

const EntertainmentBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [selectedService, setSelectedService] =
    useState<ServiceProvider | null>(null);
  const [selectedVariation, setSelectedVariation] = useState<string | null>(
    null
  );
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isServiceSelectionEnabled, setIsServiceSelectionEnabled] =
    useState<boolean>(true);
  const [isVariationSelectionEnabled, setIsVariationSelectionEnabled] =
    useState<boolean>(false);
  const [isPhoneInputEnabled, setIsPhoneInputEnabled] =
    useState<boolean>(false);
  const [isPurchasing, setIsPurchasing] = useState<boolean>(false);

  const { data, error, isLoading } = useGetDataServiceList(
    selectedService || ""
  );
  const { mutate: subscribeEntertainment } = useCablePay();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMessages([
      {
        sender: "ai",
        text: "Hello! Welcome to the data purchase store. Please select your service provider.",
      },
    ]);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleServiceSelect = (provider: ServiceProvider) => {
    setSelectedService(provider);
    setIsServiceSelectionEnabled(false);
    setIsVariationSelectionEnabled(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        sender: "ai",
        text: `You selected ${provider
          .replace("-data", "")
          .toUpperCase()}. Please select your desired subscription.`,
      },
    ]);
  };

  const handleVariationSelect = (variationCode: string) => {
    setSelectedVariation(variationCode);
    setIsVariationSelectionEnabled(false);
    setIsPhoneInputEnabled(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        sender: "ai",
        text: `You selected ${variationCode}. Please enter your phone number.`,
      },
    ]);
  };

  const handlePhoneNumberSubmit = () => {
    if (!phoneNumber.trim()) return;

    if (/^\d{11}$/.test(phoneNumber)) {
      setIsPhoneInputEnabled(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: phoneNumber },
        {
          sender: "ai",
          text: `Phone number ${phoneNumber} received. Click on purchase to proceed.`,
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

    if (isPhoneInputEnabled && !isPurchasing) {
      handlePhoneNumberSubmit();
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
      handleSend();
    }
  };

  const handlePurchase = async () => {
    if (selectedService && selectedVariation && phoneNumber) {
      setIsPurchasing(true);

      try {
        await subscribeEntertainment({
          serviceId: selectedService,
          variationCode: selectedVariation,
          phone: phoneNumber,
          billersCode: "1212121212",
          type: "RENEW",
        });

        console.log(selectedService, selectedVariation, phoneNumber);

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
        setSelectedService(null);
        setSelectedVariation(null);
        setPhoneNumber("");
        setIsServiceSelectionEnabled(true);
        setIsVariationSelectionEnabled(false);
        setIsPhoneInputEnabled(false);
        setIsPurchasing(false);
      }
    }
  };

  return (
    <div className="relative w-full mt-2 p-4 flex flex-col h-full overflow-auto scroll-hidden mx-auto rounded-lg shadow-lg bg-aiBackground bg-contain bg-no-repeat">
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
        {isServiceSelectionEnabled && (
          <div className="flex flex-col items-end mb-2">
            <p className="mb-2 text-center text-white">
              Select your service provider
            </p>
            <div className="flex flex-col gap-2">
              {[{ name: "dstv", logo: "/assets/dstv.jpeg" }].map((provider) => (
                <button
                  key={provider.name}
                  onClick={() =>
                    handleServiceSelect(provider.name as ServiceProvider)
                  }
                  className="flex flex-row gap-2 items-center px-4 py-2 rounded-full bg-[#3f3952] bg-opacity-95 text-white"
                >
                  <Image
                    width={24}
                    height={24}
                    alt={provider.name}
                    src={provider.logo}
                    className="w-[24px] h-[24px] rounded-full bg-white"
                  />
                  {provider.name.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}

        {isVariationSelectionEnabled && data && (
          <div className="text-sm items-end bottom-4 w-[90%] max-w-[450px] max-h-[250px] overflow-auto scroll-hidden">
            <p className="text-end text-white mb-2">
              Select your desired subscription
            </p>
            <div className="flex flex-col gap-2 items-end">
              {data.content.varations.map((option: DataVariation) => (
                <button
                  key={option.variation_code}
                  onClick={() => handleVariationSelect(option.variation_code)}
                  className="flex flex-row gap-2 px-4 text-start w-f py-2 rounded-full bg-[#3f3952] bg-opacity-95 text-white"
                >
                  {option.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {isPhoneInputEnabled && !isVariationSelectionEnabled && (
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

        {!isPurchasing && selectedVariation && phoneNumber && (
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

export default EntertainmentBot;
