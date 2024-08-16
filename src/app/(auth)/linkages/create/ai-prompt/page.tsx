"use client";

import {
  ArrowUp,
  AddCircle,
  ArrowLeft2,
  InfoCircle,
  CloseCircle,
} from "iconsax-react";
import clsx from "clsx";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ChatBot from "@/containers/dashboard/chat-bot";

const AIPrompt = () => {
  const router = useRouter();
  const [selected, setSelected] = useState("create");

  const [activeInfo, setActiveInfo] = useState<string | null>(null);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleInfoClick = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveInfo(optionValue === activeInfo ? null : optionValue);
  };

  const handleCheckboxChange = (value: string) => {
    setSelectedValues((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((v) => v !== value)
        : [...prevSelected, value]
    );
  };

  const [isAgreed, setIsAgreed] = useState<boolean>(false);

  const handleCheckboxChangeAdditional = () => {
    setIsAgreed((prev) => !prev);
  };

  return (
    <main className="relative min-h-screen w-full text-white bg-[#0B0228] p-4 sm:p-6 pb-16">
      <ArrowLeft2
        size="24"
        color="#ffffff"
        className="my-2"
        onClick={() => router.back()}
      />

      <div className="flex flex-col gap-6 text-[13px] mt-4">
        <div className="flex flex-row bg-[#3f3856] p-1 rounded-full">
          <p
            onClick={() => setSelected("create")}
            className={clsx(
              "w-full text-center py-2 rounded-full",
              selected === "create" && " bg-[#0B0228]"
            )}
          >
            Create
          </p>
          <p
            onClick={() => setSelected("preview")}
            className={clsx(
              "w-full text-center py-2 rounded-full",
              selected === "preview" && " bg-[#0B0228]"
            )}
          >
            Preview
          </p>
        </div>

        {selected === "create" && (
          <div className="flex flex-col gap-6">
            <Image
              src={""}
              width={82}
              height={82}
              alt="linkage"
              className="rounded-full bg-white self-center"
            />

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                placeholder="Name your AI"
                className="w-full bg-inherit py-3 px-2 rounded-[8px] border border-[#E5E7EB] text-[#98A2B3] focus:ring-0 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Description</label>
              <input
                type="text"
                placeholder="Write a short description of what your AI does"
                className="w-full bg-inherit py-3 px-2 rounded-[8px] border border-[#E5E7EB] text-[#98A2B3] focus:ring-0 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Instructions</label>
              <textarea
                rows={6}
                placeholder="What does this AI do? How does it behave? What should it avoid doing?"
                className="appearance-none bg-inherit p-2 rounded-[8px] border border-[#E5E7EB] text-[13px] text-[#98A2B3] focus:ring-0 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center justify-between">
                <p className="text-sm font-medium">Conversation starters</p>
                <button className="flex flex-row items-center gap-1">
                  Add <AddCircle size="14" color="#ffffff" />
                </button>
              </div>
              <input
                type="text"
                placeholder="Write conversation starters here"
                className="w-full bg-inherit py-3 px-2 rounded-[8px] border border-[#E5E7EB] text-[#98A2B3] focus:ring-0 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-4 w-[90%]">
              <div className="flex flex-row items-center justify-between">
                One example conversational starter here{" "}
                <CloseCircle size="20" color="#ffffff" />
              </div>
              <div className="flex flex-row items-center justify-between">
                Two example conversational starter here{" "}
                <CloseCircle size="20" color="#ffffff" />
              </div>
              <div className="flex flex-row items-center justify-between">
                Three example conversational starter here{" "}
                <CloseCircle size="20" color="#ffffff" />
              </div>
              <div className="flex flex-row items-center justify-between">
                Four example conversational starter here{" "}
                <CloseCircle size="20" color="#ffffff" />
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <h1 className="text-sm font-semibold">Knowledge</h1>
              <p className="text-xs font-light">
                If you upload files here, conversations with your AI may include
                the file contents. Files can be downloaded when Code interpreter
                is enabled.
              </p>

              <div className="mt-2 flex flex-row gap-4 items-center">
                {/* <div>{image or file preview here}</div> */}

                <div className="relative flex flex-row items-center">
                  <input id="fileInput" type="file" className="hidden" />
                  <label
                    htmlFor="fileInput"
                    className="min-w-[110px] px-2.5 appearance-none bg-inherit py-3 rounded-[8px] border border-[#E5E7EB] text-[#98A2B3] cursor-pointer flex items-center"
                  >
                    <span className="text-xs">Upload files</span>
                  </label>
                  <ArrowUp
                    size="16"
                    color="#ffffff"
                    className="absolute right-2"
                  />
                </div>
                <p>jpg, png, pdf, docs, xlsx...</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <h1 className="text-sm font-semibold">Capabilities</h1>

              <div className="space-y-2">
                {[
                  {
                    value: "option1",
                    label: "Web browsing",
                    info: "Access the web for the latest information",
                  },
                  { value: "option2", label: "DALL.E image generation" },
                  {
                    value: "option3",
                    label: "Code interpreter",
                    info: "Code interpreter lets your AI run code. When enabled, your AI can analyze data, work with files you’ve uploaded, do math and more",
                  },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`relative flex items-center space-x-2 py-1 cursor-pointer gap-1 rounded-lg`}
                  >
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={selectedValues.includes(option.value)}
                      onChange={() => handleCheckboxChange(option.value)}
                      className="form-checkbox h-4 w-4"
                    />
                    <span className="text-white">{option.label}</span>

                    {option.info && (
                      <div className="flex flex-row items-center gap-1">
                        <InfoCircle
                          size={16}
                          color="#fff"
                          onClick={(e) => handleInfoClick(option.value, e)}
                          style={{ cursor: "pointer" }}
                        />
                        {activeInfo === option.value && (
                          <div className="absolute z-10 top-7 py-1.5 px-2 rounded-md bg-[#3f3952] text-[#EFE6FD]">
                            {option.info}
                          </div>
                        )}
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <h1 className="text-sm font-semibold">Additional Settings</h1>
              <div className="flex items-start rounded-lg">
                <input
                  type="checkbox"
                  checked={isAgreed}
                  onChange={handleCheckboxChangeAdditional}
                  className="form-checkbox h-4 w-4 mt-[3px]"
                />
                <span className="pl-2 text-white">
                  Use conversation data in your AI to improve our models
                </span>
              </div>
            </div>

            <button
              onClick={() => router.push("/linkages/subscription")}
              className="my-10 w-full bg-white text-[#290064] rounded-[8px] py-3 font-bold text-sm"
            >
              Publish AI Linkage
            </button>
          </div>
        )}

        {selected === "preview" && (
          <div className="">
            <ChatBot />
          </div>
        )}
      </div>
    </main>
  );
};

export default AIPrompt;
