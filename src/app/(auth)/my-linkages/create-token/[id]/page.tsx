"use client";

import clsx from "clsx";
import Image from "next/image";
import toast from "react-hot-toast";
import { Upload } from "lucide-react";
import { ArrowLeft2, Copy } from "iconsax-react";
import { useCreateLinkageToken, useGetLinkageById } from "@/api/linkage";
import React, { ChangeEvent, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import InputBox from "@/components/questionnarie/input-box";
import { SpinnerIconPurple } from "@/components/icons/spinner";
import { shortenTransaction } from "@/lib/utils/shorten";
import { copyToClipboard } from "@/lib/utils";

const networkOptions = [
  { id: "base", label: "Base", logo: "/assets/BASE.svg" },
  { id: "solana", label: "Solana", logo: "/assets/SOLANA.svg" },
  {
    id: "multichain",
    label: "Multichain (Base and Solana)",
    logo: "/assets/MULTICHAIN.svg",
  },
];

const CreateToken = () => {
  const router = useRouter();
  const params = useParams();
  const linkageId = params.id;

  const [selectedNetwork, setSelectedNetwork] = useState<string>("");

  const handleSelect = (label: string) => {
    setSelectedNetwork(label);
  };

  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState("");

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds the limit of 5MB.");
      return;
    }

    setLogoPreview(URL.createObjectURL(file));
    setLogo(file);
  };

  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");

  const { data } = useGetLinkageById(Number(linkageId));

  const { mutate, isPending } = useCreateLinkageToken();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("symbol", symbol);
    formData.append("description", description);
    formData.append("category", selectedNetwork);
    if (logo) formData.append("file", logo);

    mutate(
      {
        linkageId: Number(linkageId),
        body: formData as any,
      },
      {
        onSuccess: () => {
          toast.success(`Token ${name} created`);
          router.push("/my-linkages");
        },
        onError: () => {
          toast.error("An error occurred while creating the token.");
        },
      }
    );
  };

  const isSubmitDisabled =
    !name || !symbol || !description || !selectedNetwork || !logo;

  return (
    <main className="relative min-h-screen w-full text-white bg-[#0B0228] p-4 sm:p-6 pb-16">
      <div className="flex flex-row items-center gap-4 mt-2 mb-6">
        <ArrowLeft2
          size="24"
          color="#ffffff"
          className="my-2"
          onClick={() => router.back()}
        />
        <p className="text-[20px] font-bold">Create a Token</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
        <div className="mb-4">
          <p className="text-sm font-bold">Token Network</p>

          <div>
            {networkOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleSelect(option.label)}
                className="flex items-center justify-between cursor-pointer py-2 text-sm font-normal"
              >
                <div className="flex flex-row items-center justify-center gap-1">
                  <Image alt="coin" width={12} height={12} src={option.logo} />{" "}
                  <span className="flex-grow text-sm font-bold">
                    {option.label}
                  </span>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2 ml-2 ${
                    selectedNetwork === option.label
                      ? "bg-white border-white"
                      : "border-white"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-bold my-2">Token logo</p>
          <div className="relative flex flex-row gap-2 items-start justify-start">
            <Image
              width={32}
              height={32}
              alt="linkage"
              src={logoPreview || "/assets/sample-icon.png"}
              className="rounded-full border border-[#0B0228]"
            />
            <div className="flex flex-row gap-1 mt-1 border rounded-md py-1 px-3">
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Token Name"
          className=""
          label={"Name"}
          required={false}
        />

        <InputBox
          name="symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Symbol"
          className=""
          label={"Symbol"}
          required={false}
        />

        <InputBox
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className=""
          label={"Description"}
          required={false}
        />

        <div className="flex flex-col gap-1">
          <p className="text-sm font-bold">Wallet</p>
          <p className="text-sm">
            2% of the token supply will be deposited to your wallet address
          </p>
          <div className="flex flex-row gap-2 items-center py-3 pl-2 w-full border border-[#D6CBFF79] rounded-md">
            <p className="text-sm font-bold">
              {shortenTransaction(data?.data?.walletAddress)}
            </p>
            <Copy
              size="18"
              color="#F6F1FE"
              variant="Bold"
              className="cursor-pointer"
              onClick={() => {
                copyToClipboard(data?.data?.walletAddress, () =>
                  toast.success(`Wallet address copied`)
                );
              }}
            />
          </div>
        </div>

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
          {isPending ? <SpinnerIconPurple /> : "Create Token"}
        </button>
      </form>
    </main>
  );
};

export default CreateToken;
