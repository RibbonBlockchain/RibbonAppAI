"use client";

import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { ArrowLeft2 } from "iconsax-react";
import { useRouter } from "next/navigation";

interface TOptions {
  id: number;
  name: string;
}

const PricingCard = ({
  plan,
  pricing,
  options,
  planIcon,
  onclick,
}: {
  plan: string;
  pricing: number;
  planIcon: string;
  options: TOptions[];
  onclick: () => void;
}) => {
  return (
    <div className="flex flex-col items-start justify-between">
      <div className="w-full flex flex-col gap-4">
        <div className="bg-[#3f3952] p-4 rounded-[12px]">
          <div className="flex flex-row items-center gap-4 text-[28px] font-bold">
            {plan}
            {planIcon && (
              <Image
                alt="plan"
                height={32}
                width={32}
                className="w-[32px] h-[32px]"
                src={planIcon}
              />
            )}
          </div>
          <p className="text-[20px] font-semibold">
            ${pricing} <span className="text-sm -ml-1">/month</span>
          </p>
        </div>

        <div className="flex self-center">
          <Image
            alt="hr"
            height={1}
            width={240}
            className="w-full h-auto"
            src="/assets/horizontal-line.png"
          />
        </div>

        <div className="flex flex-col gap-2 bg-[#3f3952] p-4 rounded-[12px]">
          <p className="text-xs font-medium">Access to:</p>
          <div className="flex flex-col gap-2 text-sm font-semibold">
            {options?.map((i) => (
              <p key={i.id} className="flex flex-row gap-2 items-center">
                <Check size={16} /> {i.name}{" "}
              </p>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={onclick}
        className="mt-6 mb-10 w-full bg-white text-[#290064] rounded-[8px] py-3 font-bold text-sm"
      >
        Subscribe at ${pricing}/month
      </button>
    </div>
  );
};

const Pricing = () => {
  const router = useRouter();

  return (
    <main className="relative min-h-screen w-full text-white bg-[#0B0228] p-4 sm:p-6 pb-16">
      <div className="flex flex-row items-center gap-4 mt-2">
        <ArrowLeft2
          size="24"
          color="#ffffff"
          className="my-2"
          onClick={() => router.back()}
        />
        <p className="text-[24px] font-bold">Subscription</p>
      </div>

      <div className="flex flex-col gap-6 mt-10">
        <PricingCard
          plan={"Basic"}
          planIcon={""}
          pricing={10}
          options={[
            { id: 1, name: "1 Linkage bot" },
            { id: 2, name: "25 message credits" },
            { id: 3, name: "20 training links per Linkage bot" },
            { id: 4, name: "Embed on unlimited websites" },
            { id: 5, name: "Conversation history" },
            { id: 6, name: "Visitor details" },
            { id: 7, name: "Real-time analytics" },
          ]}
          onclick={() => router.push("/transaction/payment-method")}
        />
        <PricingCard
          plan={"Pro"}
          planIcon={"/assets/pro-subscription.png"}
          pricing={39}
          options={[
            { id: 1, name: "2 Linkage bot" },
            { id: 2, name: "4,000 message credits/month" },
            { id: 3, name: "200 training links per Linkage bot" },
            { id: 4, name: "Embed on unlimited websites" },
            { id: 5, name: "Image capabilities" },
            { id: 6, name: "Human agent" },
            { id: 7, name: "Conversation history" },
            { id: 8, name: "Chat notifications" },
            { id: 9, name: "Visitor details" },
            { id: 10, name: "Real-time analytics" },
          ]}
          onclick={() => router.push("/transaction/payment-method")}
        />
        <PricingCard
          plan={"Business"}
          planIcon={"/assets/business-subscription.png"}
          pricing={70}
          options={[
            { id: 1, name: "2 Linkage bot" },
            { id: 2, name: "10,000 message credits/month" },
            { id: 3, name: "500 training links per Linkage bot" },
            { id: 4, name: "3 members" },
            { id: 5, name: "Role-based access controls" },
            { id: 6, name: "Expert conversation data" },
            { id: 7, name: "Embed on unlimited websites" },
            { id: 8, name: "Image capabilities" },
            { id: 9, name: "Human agent" },
            { id: 10, name: "Conversation history" },
            { id: 11, name: "Chat notifications" },
            { id: 12, name: "Visitor details" },
            { id: 13, name: "Real-time analytics" },
          ]}
          onclick={() => router.push("/transaction/payment-method")}
        />
        <PricingCard
          plan={"Enterprise"}
          planIcon={"/assets/enterprise-subscription.png"}
          pricing={150}
          options={[
            { id: 1, name: "5 Linkage bot" },
            { id: 2, name: "40,000 message credits/month" },
            { id: 3, name: "1000 training links per Linkage bot" },
            { id: 4, name: "3 members" },
            { id: 5, name: "Role-based access controls" },
            { id: 6, name: "Expert conversation data" },
            { id: 7, name: "Embed on unlimited websites" },
            { id: 8, name: "Image capabilities" },
            { id: 9, name: "Human agent" },
            { id: 10, name: "Conversation history" },
            { id: 11, name: "Chat notifications" },
            { id: 12, name: "Visitor details" },
            { id: 13, name: "Real-time analytics" },
          ]}
          onclick={() => router.push("/transaction/payment-method")}
        />
      </div>
    </main>
  );
};

export default Pricing;
