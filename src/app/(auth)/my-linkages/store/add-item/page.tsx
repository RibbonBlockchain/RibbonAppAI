"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { ArrowLeft2, GalleryAdd } from "iconsax-react";
import { useAddLinkageStoreItem } from "@/api/linkage";
import InputBox from "@/components/questionnarie/input-box";

const AddStoreItem = () => {
  const router = useRouter();

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState<number | "">("");
  const [description, setDescription] = useState("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setImage(file);
  };

  const { mutate, isPending } = useAddLinkageStoreItem();

  const handleAddNewItem = () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("currency", currency);
    formData.append("price", price);
    formData.append("stock", String(stock));
    formData.append("description", description);

    if (image) formData.append("images", image);

    const linkageId = localStorage.getItem("selectedLinkageId");

    mutate(
      { body: formData as any, linkageId: Number(linkageId) },
      {
        onSuccess: () => {
          toast.success("Item added to store"), setImage(null);
          setName("");
          setPrice("");
          setStock("");
          setCurrency("");
          setDescription("");
          setImagePreview("");
        },
      }
    );
  };

  const isSubmitDisabled =
    isPending ||
    !name ||
    !currency ||
    !price ||
    !stock ||
    !description ||
    !image;

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

        <Button onClick={handleAddNewItem} disabled={isSubmitDisabled}>
          Add Item
        </Button>
      </section>
    </main>
  );
};

export default AddStoreItem;
