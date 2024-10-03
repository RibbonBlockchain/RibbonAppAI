"use client";

import clsx from "clsx";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { Camera, Upload } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { TCreateLinkageBody } from "@/api/linkage/types";
import InputBox from "@/components/questionnarie/input-box";
import React, { useState, useEffect, ChangeEvent } from "react";
import { ArrowLeft2, Call, Sms, Location } from "iconsax-react";
import { useEditLinkage, useGetLinkageById } from "@/api/linkage";

const EditLinkagePage = () => {
  const router = useRouter();
  const params = useParams();
  const linkageId = params.id;

  const { data } = useGetLinkageById(Number(linkageId));
  const initialData = data?.data;

  const { mutate: editLinkage } = useEditLinkage();

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(initialData?.banner || "");

  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState(initialData?.logo || "");

  const [linkageDetails, setLinkageDetails] = useState<TCreateLinkageBody>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    phone: initialData?.phone || "",
    email: initialData?.email || "",
    location: initialData?.location || "",
    category: initialData?.category || "",
    image: initialData?.image || "",
    instruction: initialData?.instruction || "",
    prompts: initialData?.prompts || "",
    prompts1: initialData?.prompts1 || "",
    banner: initialData?.banner || "",
    logo: initialData?.logo || "",
  });

  useEffect(() => {
    if (initialData) {
      setLinkageDetails(initialData);
      setImagePreview(initialData.banner || "");
      setLogoPreview(initialData.logo || "");
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLinkageDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setImage(file);
    setLinkageDetails((prev) => ({ ...prev, banner: file.name }));
  };

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoPreview(URL.createObjectURL(file));
    setLogo(file);
    setLinkageDetails((prev) => ({ ...prev, logo: file.name }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editLinkage(
      { body: linkageDetails, linkageId: Number(linkageId) },
      {
        onSuccess: () => {
          toast.success("Linkage details updated");
          router.push("/my-linkages");
        },
      }
    );
  };

  const isSubmitDisabled = false;

  return (
    <main className="relative min-h-screen w-full text-white bg-[#0B0228] p-4 sm:p-6 pb-16">
      <div className="flex flex-row items-center gap-4 mt-2 mb-6">
        <ArrowLeft2
          size="24"
          color="#ffffff"
          className="my-2"
          onClick={() => router.back()}
        />
        <p className="text-[20px] font-bold">Edit Linkage</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div className="relative">
          <div className="relative flex flex-col items-center justify-center">
            <Image
              width={280}
              height={110}
              alt="linkage"
              src={
                imagePreview ||
                "http://res.cloudinary.com/arpeiks/image/upload/v1725460153/absa_banner-382065518715.jpg"
              }
              className="rounded-md w-full bg-[#3f3856]"
            />
            <div className="absolute flex flex-row gap-1 mt-1">
              <label className="cursor-pointer text-sm font-medium flex flex-col items-center justify-center text-center gap-1 max-w-[200px]">
                <Camera size="24" color="#ffffff" />
                {/* <span className="text-xs font-semibold">
                  Click to upload Linkage banner
                </span>
                <span className="text-[10px] font-light leading-3">
                  A catchy banner improves user engagement with your Linkage
                </span> */}
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
              src={
                logoPreview ||
                "http://res.cloudinary.com/arpeiks/image/upload/v1725460152/ABSA_bank_icon-872468613638.png"
              }
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

        <InputBox
          name="name"
          value={linkageDetails.name}
          onChange={handleChange}
          placeholder="Linkage Name"
          className=""
          label={"Name"}
          required={false}
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Description</label>
          <textarea
            rows={4}
            value={linkageDetails.description}
            onChange={handleChange}
            placeholder="Write about your Linkages and its capabilities"
            className="appearance-none bg-inherit p-2 rounded-[8px] border border-[#E5E7EB86] text-sm text-white placeholder:text-[#98A2B3] focus:ring-0 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Instructions</label>
          <textarea
            rows={3}
            value={linkageDetails.instruction}
            onChange={handleChange}
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
              value={linkageDetails.phone}
              onChange={handleChange}
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
              value={linkageDetails.email}
              onChange={handleChange}
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
              value={linkageDetails.location}
              onChange={handleChange}
              placeholder="South Africa"
              className="appearance-none w-full bg-inherit pl-10 py-3 text-sm rounded-[8px] border border-[#E5E7EB86] text-white placeholder:text-[#98A2B3] focus:ring-0 focus:outline-none"
            />
          </div>
        </div>

        <InputBox
          name="prompts"
          value={linkageDetails.prompts}
          onChange={handleChange}
          placeholder="Prompts"
          className=""
          label={"Prompts"}
          required={false}
        />

        <InputBox
          name="prompts"
          value={linkageDetails.prompts1 || ""}
          onChange={handleChange}
          placeholder="Prompts 1 (optional)"
          className=""
          label={"Prompts"}
          required={false}
        />

        <button
          disabled={isSubmitDisabled}
          type="submit"
          className={clsx(
            "my-10 w-full rounded-[8px] py-3 font-bold text-sm",
            isSubmitDisabled
              ? "bg-gray-600 text-white cursor-not-allowed"
              : "bg-white text-[#290064]"
          )}
        >
          Save
        </button>
      </form>
    </main>
  );
};

export default EditLinkagePage;
