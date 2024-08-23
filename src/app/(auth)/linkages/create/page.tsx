"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateLinkage } from "@/api/ai";
import { ArrowLeft2, Call, Location, Sms } from "iconsax-react";

const options = [
  { id: "mental-health", label: "Mental healthes" },
  { id: "diseases-control", label: "Diseases control" },
  { id: "finance", label: "Finance" },
  { id: "fitness-programs", label: "Fitness programs" },
  { id: "nutrition-dietics", label: "Nutrition and Dietics" },
  { id: "environmental-sector", label: "Environmental sector" },
  { id: "employment-sector", label: "Employment sector" },
  { id: "relationship-lifestyle", label: "Relationships & Lifestyle" },
  { id: "other", label: "Other" },
];

const CreateLinkage = () => {
  const router = useRouter();

  const [selectedId, setSelectedId] = useState<string>("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const handleSelect = (id: string, label: string) => {
    setSelectedId(id);
    setCategory(label);
  };

  const { mutate } = useCreateLinkage();
  const handleCreateLinkage = () => {
    const body = {
      name,
      description,
      phone,
      email,
      location,
      category,
    };

    mutate(body, { onSuccess: () => toast.success("Linkage created") });
    router.push("/linkages/create/ai-prompt");
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
            width={60}
            height={60}
            alt="linkage"
            className="rounded-full"
            src={"/assets/sample-icon.png"}
          />
          <input
            type="text"
            value={name}
            placeholder="Linkage name"
            onChange={(e) => setName(e.target.value)}
            className="w-full border-b bg-inherit border-white h-[45px] pl-3 font-medium focus:ring-0 focus:outline-none text-white placeholder:text-[#98A2B3]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Linkage description</label>
          <textarea
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write about your Linkages and its capabilities"
            className="appearance-none bg-inherit p-2 rounded-[8px] border border-[#E5E7EB] text-[13px] text-white placeholder:text-[#98A2B3] focus:ring-0 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Mobile number</label>
          <div className="relative flex flex-row items-center">
            <Call size="20" color="#ffffff" className="absolute left-3" />
            <input
              type="phone"
              value={phone}
              placeholder="0000 0000 000"
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-inherit pl-10 py-2.5 rounded-[8px] border border-[#E5E7EB] text-white placeholder:text-[#98A2B3] focus:ring-0 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Email address</label>
          <div className="relative flex flex-row items-center">
            <Sms size="20" color="#ffffff" className="absolute left-3" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ribbon@mail.com"
              className="w-full bg-inherit pl-10 py-2.5 rounded-[8px] border border-[#E5E7EB] text-white placeholder:text-[#98A2B3] focus:ring-0 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Location</label>
          <div className="relative flex flex-row items-center">
            <Location size="20" color="#ffffff" className="absolute left-3" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="South Africa"
              className="appearance-none w-full bg-inherit pl-10 py-2.5 rounded-[8px] border border-[#E5E7EB] text-white placeholder:text-[#98A2B3] focus:ring-0 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-6">
          <h1 className="text-sm font-semibold">Business category</h1>
          <p className="text-sm font-light">
            This enables us to create a Linkage that aligns with your business.
          </p>

          <div className="space-y-2">
            {options.map((option) => (
              <div
                key={option.id}
                onClick={() => handleSelect(option.id, option.label)}
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
          onClick={handleCreateLinkage}
          className="my-10 w-full bg-white text-[#290064] rounded-[8px] py-3 font-bold text-sm"
        >
          Create your AI Prompt
        </button>
      </div>
    </main>
  );
};

export default CreateLinkage;
