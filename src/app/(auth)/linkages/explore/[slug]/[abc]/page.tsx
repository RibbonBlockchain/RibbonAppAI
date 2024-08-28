"use client";

import React from "react";
import Image from "next/image";
import { useGetLinkageAIBySlug } from "@/api/ai";
import ChatBot from "@/containers/dashboard/chat-bot";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft2, VolumeHigh } from "iconsax-react";
import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";

const LinkageAIChatInterface = () => {
  const router = useRouter();

  const params = useParams();
  const slug = params.abc as string;

  const { data } = useGetLinkageAIBySlug(slug);

  return (
    <AuthNavLayout>
      <div className="w-full h-screen overflow-hidden text-white bg-[#0B0228] flex flex-col">
        <div className="p-4 sm:p-6 py-6 flex flex-row items-center justify-between border-b border-[#C3B1FF4D]">
          <div className="flex flex-row items-center gap-4">
            <ArrowLeft2 className="w-6 h-6" onClick={() => router.back()} />
            <div className="flex flex-row items-center gap-4">
              <Image alt="AI" width={44} height={44} src="/assets/AI.png" />
              <div>
                <p className="text-lg font-bold">{data?.data?.name}</p>
              </div>
            </div>
          </div>
          <VolumeHigh size="32" color="#ffffff" />
        </div>

        <ChatBot />
      </div>
    </AuthNavLayout>
  );
};

export default LinkageAIChatInterface;
