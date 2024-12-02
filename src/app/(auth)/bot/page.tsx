"use client";

import Image from "next/image";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ArrowLeft2, Send } from "iconsax-react";
import { useRespondBasedAgent } from "@/api/user";
import { SpinnerIcon } from "@/components/icons/spinner";
import React, { useState, KeyboardEvent, useEffect } from "react";
import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";
import AgentQuestionnaire from "@/containers/dashboard/agent-questionnaire";

const BasedAgent = () => {
  const router = useRouter();

  const { mutate, data, isPending } = useRespondBasedAgent();

  const [input, setInput] = useState("");

  const handleSend = () => {
    mutate({
      message: input,
      type: "conversation.start",
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const questionnaireTitle = data?.data.messages?.[0]?.content;
  const questions = data?.data.messages?.[0]?.extra?.questions;

  const handleStartConversation = () => {
    mutate({ message: "Hello there", type: "conversation.start" });
  };

  useEffect(() => {
    handleStartConversation();
  }, []);

  return (
    <AuthNavLayout>
      <Toaster />

      <div className="w-full h-screen overflow-hidden text-white bg-[#0B0228] flex flex-col">
        <div className="p-4 sm:p-6 py-6 flex flex-row items-center justify-between border-b border-[#C3B1FF4D]">
          <div className="flex flex-row items-center gap-4">
            <ArrowLeft2 className="w-6 h-6" onClick={() => router.back()} />
            <div className="flex flex-row items-center gap-4">
              <Image
                alt="AI"
                width={44}
                height={44}
                src={"/assets/sample-icon.png"}
              />
              <div>
                <p className="text-lg font-bold">Ribbon Base Agent</p>
              </div>
            </div>
          </div>
        </div>

        {isPending && (
          <div className="flex items-center justify-center h-screen">
            <SpinnerIcon />
          </div>
        )}

        {!data?.data?.messages.length && !isPending && (
          <>
            <div className="fixed self-center bottom-4 p-4 w-[90%] max-w-[450px]">
              <div className="flex flex-row items-center">
                <input
                  type="text"
                  value={input}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full text-sm bg-[#3f3952] bg-opacity-75 backdrop-blur-sm pl-4 pr-14 py-4 border rounded-full"
                />
                <button onClick={handleSend} className="absolute right-8 z-10">
                  <Send size="32" color="#ffffff" />
                </button>
              </div>
            </div>
          </>
        )}

        {data?.data?.messages.length && (
          <AgentQuestionnaire
            questions={questions}
            questionTitle={questionnaireTitle}
            handleStartConversation={handleStartConversation}
          />
        )}
      </div>
    </AuthNavLayout>
  );
};

export default BasedAgent;
