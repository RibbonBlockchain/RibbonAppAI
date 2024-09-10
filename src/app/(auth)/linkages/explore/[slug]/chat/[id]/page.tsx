"use client";

import {
  useGetLinkageBySlug,
  useGetLinkageQuestionnaireById,
} from "@/api/linkage";
import React from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft2, VolumeHigh } from "iconsax-react";
import LinkageQuestionnaireChat from "@/containers/questionnaire/linkage-questionnaire-chat";

const LinkageQuestionnairePage = () => {
  const router = useRouter();
  const params = useParams();

  const slug = params.slug as string;
  const questionnaireId = Number(params.id);

  const { data } = useGetLinkageBySlug(slug);

  const linkageId = data?.data?.id;

  const { data: linkageQ } = useGetLinkageQuestionnaireById({
    linkageId,
    questionnaireId,
  });

  return (
    <div className="w-full h-screen overflow-hidden text-white bg-[#0B0228] flex flex-col">
      <div className="p-4 sm:p-6 py-6 flex flex-row items-center justify-between border-b border-[#C3B1FF4D]">
        <div className="flex flex-row items-center gap-4">
          <ArrowLeft2 className="w-6 h-6" onClick={() => router.back()} />
          <div className="flex flex-row items-center gap-4">
            <Image alt="AI" width={44} height={44} src="/assets/AI.png" />
            <div className="flex flex-row gap-1">
              <p>{linkageQ?.data?.name}</p>
            </div>
          </div>
        </div>
        <VolumeHigh size="32" color="#ffffff" />
      </div>

      <div className="flex-1 overflow-hidden flex">
        <LinkageQuestionnaireChat questions={linkageQ?.data?.questions} />
      </div>
    </div>
  );
};

export default LinkageQuestionnairePage;
