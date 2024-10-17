"use client";

import React, { useState } from "react";
import { useBaseName } from "@/api/user";
import Button from "@/components/button";
import { ArrowLeft2 } from "iconsax-react";
import { useRouter } from "next/navigation";
import InputBox from "@/components/questionnarie/input-box";
import { SpinnerIconPurple } from "@/components/icons/spinner";

const Personalise: React.FC = () => {
  const router = useRouter();
  const { mutate, isPending } = useBaseName();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isNameTaken, setIsNameTaken] = useState<boolean | null>(null);

  const handleSearch = async (): Promise<void> => {
    const response = await fetch(`/api/check-name?name=${searchTerm}`);
    const data: { isTaken: boolean } = await response.json();

    setIsNameTaken(data.isTaken);
  };

  const handleBaseName = () => {
    mutate({ name: searchTerm });
    console.log(searchTerm, "name");
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
        <p className="text-lg font-semibold">Basename</p>
      </div>

      <section className="flex flex-col gap-6 mt-6">
        <InputBox
          name="basename"
          value={searchTerm}
          label={"Basename"}
          required={false}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a name"
          onBlur={handleSearch}
        />

        {isNameTaken !== null && (
          <p className={isNameTaken ? "text-red-500" : "text-green-500"}>
            {isNameTaken ? "Name is already taken." : "Name is available!"}
          </p>
        )}

        <Button onClick={handleBaseName} disabled={!searchTerm}>
          {isPending ? <SpinnerIconPurple /> : "Register name"}
        </Button>
      </section>
    </main>
  );
};

export default Personalise;
