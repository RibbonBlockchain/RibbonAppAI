"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import ChatBot from "@/containers/dashboard/chat-bot";
import FileUpload from "@/containers/linkages/file-upload";
import { AddCircle, CloseCircle, InfoCircle } from "iconsax-react";

type Starter = {
  text: string;
};

const Retrain = () => {
  const router = useRouter();

  const [selected, setSelected] = useState("retrain");

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

  const [instruction, setInstruction] = useState("");

  const handleCreateLinkageAI = () => {
    const [prompt, prompts1, prompts2] = starters
      .map((starter) => starter.text)
      .concat(["", "", ""]);

    console.log("retrain logic");
  };

  const isSubmitDisabled = !instruction || !prompt;

  const [starters, setStarters] = useState<Starter[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle adding a new starter
  const handleAddClick = () => {
    if (inputValue.trim()) {
      setStarters([...starters, { text: inputValue.trim() }]);
      setInputValue("");
    }
  };

  const handleRemoveClick = (index: number) => {
    setStarters(starters.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-6 text-[13px] mt-4">
      <div className="flex flex-row bg-[#3f3856] p-1 rounded-full">
        <p
          onClick={() => setSelected("retrain")}
          className={clsx(
            "w-full text-center py-2 rounded-full",
            selected === "retrain" && " bg-[#0B0228]"
          )}
        >
          Retrain
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

      {selected === "retrain" && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Data Sources</label>
            <p className="text-xs font-light">
              Enhance your chatbot knowledge base by adding and managing data
              sources
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Instructions</label>
            <textarea
              rows={6}
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="What does this AI do? How does it behave? What should it avoid doing?"
              className="appearance-none bg-inherit p-2 rounded-[8px] border border-[#E5E7EB86] text-[13px] text-white placeholder:text-[#98A2B3] focus:ring-0 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between">
              <p className="text-sm font-medium">
                Conversation starters (maximum of 3)
              </p>
              <button
                disabled={starters.length === 3}
                onClick={handleAddClick}
                className={clsx(
                  "flex flex-row items-center gap-1 hover:bg-[#3f3856] py-1 px-2 rounded-[10px]",
                  starters.length === 3
                    ? "cursor-not-allowed bg-red-400"
                    : "bg-green-400"
                )}
              >
                Add <AddCircle size={14} color="#ffffff" />
              </button>
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Write conversation starters here"
              className="w-full bg-inherit py-3 px-2 rounded-[8px] border border-[#E5E7EB86] text-white placeholder:text-[#98A2B3] focus:ring-0 focus:outline-none"
            />

            <div className="flex flex-col gap-4 w-[90%] mt-4">
              {starters.map((starter, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center justify-between"
                >
                  {starter.text}
                  <button
                    onClick={() => handleRemoveClick(index)}
                    className="flex items-center justify-center"
                  >
                    <CloseCircle size={20} color="#ffffff" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Add website links</label>
            <p className="text-xs font-light">
              Enhance your bot’s knowledge by adding content from websites. You
              can manually enter specific URLs.
            </p>

            <label className="text-sm font-medium">
              Enter URLs (one per line)
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder=""
              className="w-full bg-inherit py-3 px-2 rounded-[8px] border border-[#E5E7EB86] text-white placeholder:text-[#98A2B3] focus:ring-0 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2 mt-6">
            <h1 className="text-sm font-semibold">Knowledge</h1>
            <p className="text-xs font-light">
              If you upload files here, conversations with your AI may include
              the file contents. Files can be downloaded when Code interpreter
              is enabled.
            </p>

            <FileUpload />
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
                  className={`relative flex flex-row items-center space-x-2 py-1 cursor-pointer gap-1 rounded-lg`}
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
            <div className="flex flex-row items-center rounded-lg">
              <input
                type="checkbox"
                checked={isAgreed}
                onChange={handleCheckboxChangeAdditional}
                className="form-checkbox h-4 w-4"
              />
              <span className="pl-2 text-white">
                Use conversation data in your AI to improve our models
              </span>
            </div>
          </div>
          <button
            disabled={isSubmitDisabled}
            onClick={handleCreateLinkageAI}
            className={clsx(
              "my-10 w-full rounded-[8px] py-3 font-bold text-sm",
              isSubmitDisabled
                ? "bg-gray-600 text-white cursor-not-allowed"
                : "bg-white text-[#290064]"
            )}
          >
            Retrain AI Linkage
          </button>
        </div>
      )}

      {selected === "preview" && (
        <div className="">
          <ChatBot />
        </div>
      )}
    </div>
  );
};

export default Retrain;
