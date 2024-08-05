"use client";

import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { VolumeHigh } from "iconsax-react";
import { useRouter } from "next/navigation";
import Chat from "@/containers/dashboard/chat";
import Topbar from "@/containers/dashboard/top-bar";
import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";

const Activity = () => {
  const router = useRouter();

  return (
    <AuthNavLayout>
      <div className="w-full h-screen overflow-hidden text-white bg-[#0B0228] flex flex-col">
        <div className="p-4 sm:p-6">
          <Topbar />
        </div>

        <div className="border-t-2 rounded-t-[36px] border-white border-b rounded-b-[12px]">
          <div className="pt-8 px-4 pb-4 flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-4">
              <X
                onClick={() => router.push("/dashboard")}
                className="w-6 h-6"
              />
              <div className="flex flex-row items-center gap-4">
                <Image alt="AI" width={44} height={44} src="/assets/AI.png" />
                <div>
                  <p>Ribbon AI</p>
                </div>
              </div>
            </div>
            <VolumeHigh size="32" color="#ffffff" />
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex">
          <Chat questions={[]} />
        </div>
      </div>
    </AuthNavLayout>
  );
};

export default Activity;
