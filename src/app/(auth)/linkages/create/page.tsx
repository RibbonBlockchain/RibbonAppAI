"use client";

import React, { useState } from "react";
import { ArrowLeft2, Call, Location, Sms } from "iconsax-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const options = [
  { id: 1, label: "option 1" },
  { id: 2, label: "option 2" },
  { id: 3, label: "option 3" },
  { id: 4, label: "option 4" },
  { id: 5, label: "option 5" },
  { id: 6, label: "option 6" },
  { id: 7, label: "option 7" },
  { id: 8, label: "option 8" },
];

const CreateLinkage = () => {
  const router = useRouter();

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  return (
    <main className="relative min-h-screen w-full text-white bg-[#0B0228] p-4 sm:p-6 pb-16">
      <ArrowLeft2
        size="24"
        color="#ffffff"
        className="my-2"
        onClick={() => router.back()}
      />
      <div className="flex flex-col gap-6 text-[13px]">
        <h1 className="text-[22px] xs:text-[24px] font-bold">
          Create your linkage
        </h1>

        <div className="flex flex-row items-center gap-2">
          <Image
            src={""}
            width={60}
            height={60}
            alt="linkage"
            className="rounded-full bg-white"
          />
          <input
            type="text"
            placeholder="Linkage name"
            className="w-full border-b bg-inherit border-white h-[45px] pl-3 text-[#98A2B3] font-medium focus:ring-0 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Link description</label>
          <textarea
            rows={6}
            placeholder="Write about your Linkages and it capabilities"
            className="appearance-none bg-inherit p-2 rounded-[8px] border border-[#E5E7EB] text-[13px] text-[#98A2B3] focus:ring-0 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Mobile number</label>
          <div className="relative flex flex-row items-center">
            <Call size="20" color="#ffffff" className="absolute left-3" />
            <input
              type="phone"
              placeholder="klklk hhjh hjhjh"
              className="w-full bg-inherit pl-10 py-2.5 rounded-[8px] border border-[#E5E7EB] text-[#98A2B3] focus:ring-0 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Email address</label>
          <div className="relative flex flex-row items-center">
            <Sms size="20" color="#ffffff" className="absolute left-3" />
            <input
              type="email"
              placeholder="ribbon@mail.com"
              className="w-full bg-inherit pl-10 py-2.5 rounded-[8px] border border-[#E5E7EB] text-[#98A2B3] focus:ring-0 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Location</label>
          <div className="relative flex flex-row items-center">
            <Location size="20" color="#ffffff" className="absolute left-3" />
            <input
              type="text"
              placeholder="South Africa"
              className="appearance-none w-full bg-inherit pl-10 py-2.5 rounded-[8px] border border-[#E5E7EB] text-[#98A2B3] focus:ring-0 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-6">
          <h1 className="text-sm font-semibold">Business category</h1>
          <p className="text-sm font-light">
            This enables us to create a Linkage that aligns with your business.
          </p>

          <div className="space-y-2">
            {options.map((option: any) => (
              <div
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className="flex items-center cursor-pointer py-2 text-sm font-normal"
              >
                <span className="flex-grow">{option.label}</span>
                <div
                  className={`w-5 h-5 rounded-full border-2 ml-2 ${
                    selectedId === option.id
                      ? "bg-white border-white"
                      : "border-white"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => router.push("/linkages/create/ai-prompt")}
          className="my-10 w-full bg-white text-[#290064] rounded-[8px] py-3 font-bold text-sm"
        >
          Create your AI Prompt
        </button>
      </div>
    </main>
  );
};

export default CreateLinkage;
