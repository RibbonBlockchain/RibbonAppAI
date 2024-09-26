"use client";

import Button from "@/components/button";
import InputBox from "@/components/questionnarie/input-box";
import { ArrowLeft2 } from "iconsax-react";
import { useRouter } from "next/navigation";
import React from "react";

const Personalise = () => {
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
        <p className="text-lg font-semibold">Basename</p>
      </div>

      <section className="flex flex-col gap-6 mt-6">
        <InputBox
          name={undefined}
          value={undefined}
          label={"Basename"}
          required={false}
          onChange={() => {}}
          placeholder="Search for a name"
        />

        <Button>Register name</Button>
      </section>
    </main>
  );
};

export default Personalise;
