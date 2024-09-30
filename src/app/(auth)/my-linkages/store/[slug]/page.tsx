"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { ArrowLeft2, GalleryAdd } from "iconsax-react";
import {
  useAddLinkageStoreItem,
  useGetLinkages,
  useGetLinkageStoreItemBuSlug,
} from "@/api/linkage";
import { SpinnerIcon } from "@/components/icons/spinner";
import InputBox from "@/components/questionnarie/input-box";
import { AIdata } from "@/api/linkage/types";

const MAX_IMAGES = 4;

const StoreItemDetails = () => {
  const router = useRouter();
  const [selectedAI, setSelectedAI] = useState<AIdata | null>(null);
  const { data: linkagesList } = useGetLinkages();

  useEffect(() => {
    if (linkagesList?.data && linkagesList.data.length > 0) {
      setSelectedAI(linkagesList.data[0]);
    }
  }, [linkagesList]);

  // const { data } = useGetLinkageStoreItemBuSlug(selectedAI?.slug as string);
  const { data } = useGetLinkageStoreItemBuSlug("harmony-2");

  const [images, setImages] = useState<
    { file: File | null; preview: string }[]
  >(Array(MAX_IMAGES).fill({ file: null, preview: "" }));

  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState<number | "">("");
  const [description, setDescription] = useState("");

  const handleImageChange =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const newImages = [...images];
      newImages[index] = { file, preview: URL.createObjectURL(file) };
      setImages(newImages);
    };

  const { mutate, isPending } = useAddLinkageStoreItem();

  const handleEditItem = () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("currency", currency);
    formData.append("price", price);
    formData.append("stock", String(stock));
    formData.append("description", description);

    images.forEach(({ file }) => {
      if (file) formData.append("images", file);
    });

    const linkageId = localStorage.getItem("selectedLinkageId");

    mutate(
      { body: formData as any, linkageId: Number(linkageId) },
      {
        onSuccess: () => {
          toast.success("Item added to store");
          setImages(Array(MAX_IMAGES).fill({ file: null, preview: "" }));
          setName("");
          setPrice("");
          setStock("");
          setCurrency("");
          setDescription("");
        },
      }
    );
  };

  const isSubmitDisabled = isPending || !name || !currency || !price || !stock;

  return (
    <main className="relative min-h-screen w-full text-white bg-[#0B0228] p-3 sm:p-6 pb-8">
      <div className="flex flex-row items-center justify-start gap-4 mt-2">
        <ArrowLeft2
          size="24"
          color="#ffffff"
          className="my-2 cursor-pointer"
          onClick={() => router.back()}
        />
        <p className="text-lg font-semibold">Edit item</p>
      </div>

      <section className="flex flex-col gap-6 mt-6 w-full">
        <div className="flex flex-row gap-4 w-full overflow-auto scroll-hidden">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center justify-center"
            >
              <Image
                width={143}
                height={206}
                alt={`item-${index}`}
                src={image.preview || ""}
                className="bg-[#3F3855] rounded-md text-[#3F3855] min-w-[143px] min-h-[206px]"
              />
              <div className="absolute flex flex-row gap-1 mt-1">
                <label className="cursor-pointer text-sm font-medium gap-1 max-w-[200px]">
                  {image.preview ? (
                    <></>
                  ) : (
                    <div className="flex flex-col items-center">
                      <GalleryAdd size="24" color="#ffffff" />
                      <span className="text-xs font-semibold">
                        Add an image
                      </span>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange(index)}
                  />
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <InputBox
            name="name"
            value={name}
            label={"Item name"}
            required={true}
            onChange={(e) => setName(e.target.value)}
            placeholder="Item name"
          />

          <div className="flex flex-row items-center justify-between gap-2">
            <InputBox
              name="currency"
              value={currency}
              label={"Currency"}
              required={true}
              onChange={(e) => setCurrency(e.target.value)}
              placeholder="Currency"
              className="w-full"
            />
            <InputBox
              name="price"
              value={price}
              label={"Price"}
              required={true}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full"
            />
          </div>

          <InputBox
            name="stock"
            value={stock}
            label={"Number of Item available"}
            required={true}
            onChange={(e) => setStock(Number(e.target.value))}
            placeholder="Number of item available"
          />

          <InputBox
            name="description"
            value={description}
            label={"Description"}
            required={true}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a short description for your item"
          />
        </div>

        <Button onClick={handleEditItem} disabled={isSubmitDisabled}>
          {isPending ? <SpinnerIcon /> : "Update Item"}
        </Button>
      </section>
    </main>
  );
};

export default StoreItemDetails;
