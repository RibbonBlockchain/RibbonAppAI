import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { ArrowLeft2 } from "iconsax-react";
import { SpinnerIconPurple } from "@/components/icons/spinner";
import InputBox from "@/components/questionnarie/input-box";
import { Upload } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  logoPreview: string;
  handleLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  setName: (val: string) => void;
  symbol: string;
  setSymbol: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  isSubmitDisabled: boolean;
  isPending: boolean;
};

const CreateTokenModal: React.FC<Props> = ({
  isOpen,
  onClose,
  handleSubmit,
  logoPreview,
  handleLogoChange,
  name,
  setName,
  symbol,
  setSymbol,
  description,
  setDescription,
  isSubmitDisabled,
  isPending,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="relative w-full max-w-xl bg-[#0B0228] rounded-lg shadow-xl text-white p-4 sm:p-6 overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-xl font-bold hover:text-gray-300"
        >
          &times;
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6 mt-2">
          <ArrowLeft2
            size="24"
            color="#ffffff"
            className="cursor-pointer"
            onClick={onClose}
          />
          <p className="text-[20px] font-bold">Create a Token</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
          {/* Network Options */}
          <div className="mb-4">
            <p className="text-sm font-bold">Token Network</p>
          </div>

          {/* Token Logo Upload */}
          <div>
            <p className="text-sm font-bold my-2">Token logo</p>
            <div className="relative flex gap-2 items-start">
              <Image
                width={32}
                height={32}
                alt="logo"
                src={logoPreview || "/assets/sample-icon.png"}
                className="rounded-full border border-[#0B0228]"
              />
              <div className="flex gap-1 mt-1 border rounded-md py-1 px-3">
                <label className="cursor-pointer text-sm font-medium flex items-center gap-2">
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoChange}
                  />
                  <Upload height={16} width={16} />
                </label>
              </div>
            </div>
          </div>

          {/* Inputs */}
          <InputBox
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Token Name"
            label="Name"
            required={false}
          />

          <InputBox
            name="symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="Symbol"
            label="Symbol"
            required={false}
          />

          <InputBox
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            label="Description"
            required={false}
          />

          {/* Wallet Address */}
          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold">Wallet</p>
            <p className="text-sm">
              2% of the token supply will be deposited to your wallet address
            </p>
          </div>

          {/* Submit Button */}
          <button
            disabled={isSubmitDisabled}
            type="submit"
            className={clsx(
              "my-6 w-full rounded-[8px] py-3 font-bold text-sm flex items-center justify-center text-center",
              isSubmitDisabled
                ? "bg-gray-600 text-white cursor-not-allowed"
                : "bg-white text-[#290064]"
            )}
          >
            {isPending ? <SpinnerIconPurple /> : "Create Token"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTokenModal;
