"use client";

import React from "react";
import { useGetLinkages } from "@/api/linkage";
import { ArrowLeft2 } from "iconsax-react";
import { useRouter } from "next/navigation";
import MyLinkagesCard from "@/containers/linkages/my-linkages-card";

const MyLinkages = () => {
  const router = useRouter();

  const { data } = useGetLinkages();

  return (
    <main className="relative min-h-screen w-full text-white bg-[#0B0228] p-4 sm:p-6 pb-8">
      <div className="flex flex-row items-center gap-4 mt-2">
        <ArrowLeft2
          size="24"
          color="#ffffff"
          className="my-2"
          onClick={() => router.back()}
        />

        <p className="text-[22px] font-bold">Linkages</p>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <p className="text-lg font-bold py-3 border-b border-[#C3B1FF4D]">
          Manage your linkages
        </p>

        {data?.data.map((i: any) => (
          <MyLinkagesCard
            key={i.name}
            name={i.name}
            image={i.image}
            description={i.description}
            author={i.userId}
            slug={i.slug}
          />
        ))}
      </div>
    </main>
  );
};

export default MyLinkages;
