"use client";

import { useBaseName } from "@/api/user";
import Button from "@/components/button";
import InputBox from "@/components/questionnarie/input-box";
import { ArrowLeft2 } from "iconsax-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Personalise: React.FC = () => {
  const router = useRouter();
  const { mutate } = useBaseName();

  // State for the search input and the result
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isNameTaken, setIsNameTaken] = useState<boolean | null>(null);

  // Function to handle searching for the name
  const handleSearch = async (): Promise<void> => {
    // Here you would typically make a request to your API to check if the name is taken
    const response = await fetch(`/api/check-name?name=${searchTerm}`);
    const data: { isTaken: boolean } = await response.json();

    // Update the state based on the response
    setIsNameTaken(data.isTaken);
  };

  const handleBaseName = () => {
    // mutate({ name: searchTerm });
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
          // onBlur={handleSearch}
        />

        {isNameTaken !== null && (
          <p className={isNameTaken ? "text-red-500" : "text-green-500"}>
            {isNameTaken ? "Name is already taken." : "Name is available!"}
          </p>
        )}

        <Button onClick={handleBaseName}>Register name</Button>
      </section>
    </main>
  );
};

export default Personalise;
