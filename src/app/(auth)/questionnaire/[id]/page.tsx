"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGetTaskByID } from "@/api/user";
import { ArrowLeft2, VolumeHigh } from "iconsax-react";
import QuestionnaireChat from "@/containers/dashboard/questionnaire-chat";

const QuestionnairePage = ({ params }: any) => {
  const router = useRouter();

  const {
    data,
    isLoading: isLoadingGetTask,
    isPending: isPendingGetTask,
  } = useGetTaskByID({ id: String(params.id) });

  return (
    <div className="w-full h-screen overflow-hidden text-white bg-[#0B0228] flex flex-col">
      <div className="p-4 sm:p-6 py-6 flex flex-row items-center justify-between border-b border-[#C3B1FF4D]">
        <div className="flex flex-row items-center gap-4">
          <ArrowLeft2
            className="w-6 h-6"
            onClick={() => router.push("/dashboard")}
          />
          <div className="flex flex-row items-center gap-4">
            <Image alt="AI" width={44} height={44} src="/assets/AI.png" />
            <div>
              <p>Ribbon AI</p>
              <p>{data?.name}</p>
            </div>
          </div>
        </div>
        <VolumeHigh size="32" color="#ffffff" />
      </div>

      <div className="flex-1 overflow-hidden flex">
        <QuestionnaireChat questions={data?.questions} />
      </div>
    </div>
  );
};

export default QuestionnairePage;
