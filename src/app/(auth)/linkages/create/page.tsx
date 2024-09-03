"use client";

import {
  Sms,
  Call,
  Camera,
  Location,
  AddCircle,
  ArrowLeft2,
  CloseCircle,
} from "iconsax-react";
import clsx from "clsx";

import Image from "next/image";
import { useAtom } from "jotai";
import toast from "react-hot-toast";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCreateLinkage } from "@/api/linkage";
import React, { ChangeEvent, useState } from "react";
import { categoryOptions } from "@/lib/values/prompts";
import { createLinkageAtom } from "@/lib/atoms/auth.atom";
type Starter = {
  text: string;
};

const CreateLinkage = () => {
  const router = useRouter();
  const [linkageProps, setLinkageProps] = useAtom(createLinkageAtom);

  const [isAgreed, setIsAgreed] = useState<boolean>(false);

  const handleCheckboxChangeAdditional = () => {
    setIsAgreed((prev) => !prev);
  };

  const [selectedId, setSelectedId] = useState<string>("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instruction, setInstruction] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState("");

  const handleSelect = (id: string, label: string) => {
    setSelectedId(id);
    setCategory(label);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setImage(file);
  };

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoPreview(URL.createObjectURL(file));
    setLogo(file);
  };

  const { mutate } = useCreateLinkage();

  const handleCreateLinkage = () => {
    const [prompt, prompt1, prompt2] = starters
      .map((starter) => starter.text)
      .concat(["", "", ""]);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("instruction", instruction);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("location", location);
    formData.append("category", category);
    formData.append("prompts", prompt);
    formData.append("prompts", prompt1);
    formData.append("prompts", prompt2);

    if (image) formData.append("image", image);
    if (logo) formData.append("image", logo);

    mutate(formData as any, {
      onSuccess: (data) => {
        const { id, slug } = data?.data || {};

        // Update atom state
        setLinkageProps({ id, slug });

        router.push("/linkages/create/train");
        toast.success("Linkage created");
      },
      onError: (error) => {
        toast.error("Failed to create linkage");
      },
    });
  };

  // Conversational starters
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

  const isSubmitDisabled =
    !name ||
    !description ||
    !instruction ||
    !phone ||
    !email ||
    !location ||
    !category;

  return (
    <main className="relative min-h-screen w-full text-white bg-[#0B0228] p-4 sm:p-6 pb-16">
      <div className="flex flex-row items-center gap-4 mt-2 mb-6">
        <ArrowLeft2
          size="24"
          color="#ffffff"
          className="my-2"
          onClick={() => router.back()}
        />
        <p className="text-[20px] font-bold">Create AI Linkage</p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="relative">
          <div className="relative flex flex-col items-center justify-center">
            <Image
              width={280}
              height={110}
              alt="linkage"
              src={imagePreview || ""}
              className="rounded-md w-full bg-[#3f3856]"
            />
            <div className="absolute flex flex-row gap-1 mt-1">
              <label className="cursor-pointer text-sm font-medium flex flex-col items-center justify-center text-center gap-1 max-w-[200px]">
                <Camera size="24" color="#ffffff" />
                <span className="text-xs font-semibold">
                  Click to upload Linkage banner
                </span>
                <span className="text-[10px] font-light leading-3">
                  A catchy banner improves user engagement with your Linkage
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  placeholder="upload image"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          <div className="relative -top-6 flex flex-col items-start justify-start">
            <Image
              width={82}
              height={82}
              alt="linkage"
              src={logoPreview || "/assets/sample-icon.png"}
              className="rounded-full border border-[#0B0228]"
            />
            <div className="flex flex-row gap-1 mt-1">
              <label className="cursor-pointer text-sm font-medium flex flex-row items-center gap-2">
                <span className="">Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  placeholder="upload image"
                  onChange={handleLogoChange}
                />
                <Upload height={16} width={16} />
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            placeholder="Name your AI Linkage"
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-inherit py-3 px-2 rounded-[8px] border border-[#E5E7EB86] text-sm text-white placeholder:text-[#98A2B3] focus:ring-0 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Description</label>
          <textarea
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write about your Linkages and its capabilities"
            className="appearance-none bg-inherit p-2 rounded-[8px] border border-[#E5E7EB86] text-sm text-white placeholder:text-[#98A2B3] focus:ring-0 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Instructions</label>
          <textarea
            rows={6}
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            placeholder="What does this AI do? How does it behave? What should it avoid doing?"
            className="appearance-none bg-inherit p-2 rounded-[8px] border border-[#E5E7EB86] text-sm text-white placeholder:text-[#98A2B3] focus:ring-0 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">
            Mobile number{" "}
            <span className="text-xs font-normal">
              (include country code e.g. +234)
            </span>
          </label>
          <div className="relative flex flex-row items-center">
            <Call size="20" color="#ffffff" className="absolute left-3" />
            <input
              type="phone"
              value={phone}
              placeholder="0000 0000 000"
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-inherit pl-10 py-3 rounded-[8px] text-sm border border-[#E5E7EB86] text-white placeholder:text-[#98A2B3] focus:ring-0 focus:outline-none"
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
              className="w-full bg-inherit pl-10 py-3 rounded-[8px] text-sm border border-[#E5E7EB86] text-white placeholder:text-[#98A2B3] focus:ring-0 focus:outline-none"
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
              className="appearance-none w-full bg-inherit pl-10 py-3 text-sm rounded-[8px] border border-[#E5E7EB86] text-white placeholder:text-[#98A2B3] focus:ring-0 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-6">
          <h1 className="text-sm font-semibold">Business category</h1>
          <p className="text-sm font-light">
            This enables us to create a Linkage that aligns with your business.
          </p>

          <div className="space-y-2">
            {categoryOptions.map((option) => (
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

        <div className="flex flex-col gap-2 mt-4">
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
            className="w-full bg-inherit py-3 px-2 rounded-[8px] text-sm border border-[#E5E7EB86] text-white placeholder:text-[#98A2B3] focus:ring-0 focus:outline-none"
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

          <div className="flex flex-col gap-2 mt-8">
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
        </div>

        <button
          disabled={isSubmitDisabled}
          onClick={handleCreateLinkage}
          className={clsx(
            "my-10 w-full rounded-[8px] py-3 font-bold text-sm",
            isSubmitDisabled
              ? "bg-gray-600 text-white cursor-not-allowed"
              : "bg-white text-[#290064]"
          )}
        >
          Train your AI Linkage
        </button>
      </div>
    </main>
  );
};

export default CreateLinkage;
