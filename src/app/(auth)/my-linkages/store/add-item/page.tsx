"use client";

import React from "react";
import Image from "next/image";
import Button from "@/components/button";
import { ArrowLeft2 } from "iconsax-react";
import { useRouter } from "next/navigation";
import InputBox from "@/components/questionnarie/input-box";

const AddStoreItem = () => {
  const router = useRouter();

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
          <Image
            alt="item"
            width={143}
            height={206}
            src=""
            className="bg-[#3F3855] rounded-md"
          />
          <Image
            alt="item"
            width={143}
            height={206}
            src=""
            className="bg-[#3F3855] rounded-md"
          />
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
