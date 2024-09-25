"use client";

import Image from "next/image";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { ArrowLeft2, GalleryAdd } from "iconsax-react";
import InputBox from "@/components/questionnarie/input-box";

const AddStoreItem = () => {
  const router = useRouter();

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setImage(file);
  };

  return (
    <main className="relative min-h-screen w-full text-white bg-[#0B0228] p-3 sm:p-6 pb-8">
      <div className="flex flex-row items-center justify-start gap-4 mt-2">
        <ArrowLeft2
          size="24"
          color="#ffffff"
          className="my-2 cursor-pointer"
          onClick={() => router.back()}
        />
        <p className="text-lg font-semibold">Add new item</p>
      </div>

      <section className="flex flex-col gap-6 mt-6">
        <div className="flex flex-row gap-4">
          <div className="relative flex flex-col items-center justify-center">
            <Image
              alt="item"
              width={143}
              height={206}
              className="bg-[#3F3855] rounded-md text-[#3F3855]"
              src={imagePreview || ""}
            />
            <div className="absolute flex flex-row gap-1 mt-1">
              <label className="cursor-pointer text-sm font-medium flex flex-col items-center justify-center text-center gap-1 max-w-[200px]">
                <GalleryAdd size="24" color="#ffffff" />
                <span className="text-xs font-semibold">Add an image</span>
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

          <div className="relative flex flex-col items-center justify-center">
            <Image
              alt="item"
              width={143}
              height={206}
              className="bg-[#3F3855] rounded-md text-[#3F3855]"
              src={imagePreview || ""}
            />
            <div className="absolute flex flex-row gap-1 mt-1">
              <label className="cursor-pointer text-sm font-medium flex flex-col items-center justify-center text-center gap-1 max-w-[200px]">
                <GalleryAdd size="24" color="#ffffff" />
                <span className="text-xs font-semibold">Add an image</span>
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
        </div>

        <div className="flex flex-col gap-2">
          <InputBox
            name={undefined}
            value={undefined}
            label={"Item name"}
            required={false}
            onChange={() => {}}
            placeholder="Item name"
          />

          <InputBox
            name={undefined}
            value={undefined}
            label={"Price"}
            required={false}
            onChange={() => {}}
            placeholder="Price"
          />

          <InputBox
            name={undefined}
            value={undefined}
            label={"Number of Item available"}
            required={false}
            onChange={() => {}}
            placeholder="Number of item available"
          />

          <InputBox
            name={undefined}
            value={undefined}
            label={"Description"}
            required={false}
            onChange={() => {}}
            placeholder="Add a short description for your item"
          />
        </div>

        <Button>Add Item</Button>
      </section>
    </main>
  );
};

export default AddStoreItem;
