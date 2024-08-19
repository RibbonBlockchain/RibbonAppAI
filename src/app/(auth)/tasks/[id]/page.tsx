"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGetTaskByID } from "@/api/user";
import { ArrowLeft2, VolumeHigh } from "iconsax-react";
import Chat from "@/containers/dashboard/questionnaire-chat";

const sampleTaskQuestions = [
  {
    id: 1,
    text: "Do you prefer working from home?",
    type: "BOOLEAN",
    isFirst: true,
    isLast: false,
    taskId: 101,
    createdAt: "2024-07-31T08:00:00Z",
    updatedAt: "2024-07-31T08:00:00Z",
    options: [
      {
        id: 1,
        text: "Yes",
      },
      {
        id: 2,
        text: "No",
      },
    ],
  },
  {
    id: 2,
    text: "Which of the following project management tools have you used?",
    type: "MULTICHOICE",
    isFirst: false,
    isLast: false,
    taskId: 101,
    createdAt: "2024-07-31T08:05:00Z",
    updatedAt: "2024-07-31T08:05:00Z",
    options: [
      {
        id: 1,
        text: "Trello",
      },
      {
        id: 2,
        text: "Asana",
      },
      {
        id: 3,
        text: "Jira",
      },
      {
        id: 4,
        text: "Monday.com",
      },
    ],
  },
  {
    id: 3,
    text: "Do you think remote work increases productivity?",
    type: "BOOLEAN",
    isFirst: false,
    isLast: true,
    taskId: 101,
    createdAt: "2024-07-31T08:10:00Z",
    updatedAt: "2024-07-31T08:10:00Z",
    options: [
      {
        id: 1,
        text: "Yes",
      },
      {
        id: 2,
        text: "No",
      },
    ],
  },
  {
    id: 4,
    text: "Which of the following best describes your role?",
    type: "MULTICHOICE",
    isFirst: true,
    isLast: false,
    taskId: 102,
    createdAt: "2024-07-31T08:15:00Z",
    updatedAt: "2024-07-31T08:15:00Z",
    options: [
      {
        id: 1,
        text: "Software Developer",
      },
      {
        id: 2,
        text: "Project Manager",
      },
      {
        id: 3,
        text: "Designer",
      },
      {
        id: 4,
        text: "Marketing Specialist",
      },
    ],
  },
  {
    id: 5,
    text: "Have you ever attended a professional development workshop?",
    type: "BOOLEAN",
    isFirst: false,
    isLast: true,
    taskId: 102,
    createdAt: "2024-07-31T08:20:00Z",
    updatedAt: "2024-07-31T08:20:00Z",
    options: [
      {
        id: 1,
        text: "Yes",
      },
      {
        id: 2,
        text: "No",
      },
    ],
  },
];

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
        {/* <Chat questions={data?.questions} /> */}
        <Chat questions={sampleTaskQuestions} />
      </div>
    </div>
  );
};

export default QuestionnairePage;
