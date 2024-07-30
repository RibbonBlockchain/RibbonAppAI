"use client";

import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import Topbar from "@/containers/dashboard/top-bar";
import { VolumeHigh } from "iconsax-react";
import { useRouter } from "next/navigation";
import Chat from "@/containers/dashboard/chat";

const QuestionnairePage = () => {
  const router = useRouter();

  return (
    <div className="w-full max-h-screen overflow-auto text-white bg-[#0B0228]">
      <div className="p-4 sm:p-6">
        <Topbar />
      </div>

      <div className="border-t-2 rounded-t-[36px] border-white border-b rounded-b-[12px]">
        <div className="pt-8 px-4 pb-4 flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-4">
            <X onClick={() => router.push("/dashboard")} className="w-6 h-6 " />
            <div className="flex flex-row items-center gap-4">
              <Image alt="AI" width={44} height={44} src="/assets/AI.png" />
              <p>Ribbon AI</p>
            </div>
          </div>

          <VolumeHigh size="32" color="#ffffff" />
        </div>
      </div>

      <div className="h-auto">
        <Chat />
      </div>
    </div>
  );
};

export default QuestionnairePage;
