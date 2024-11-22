"use client";

import React, { useState, KeyboardEvent } from "react";
import { useRespondBasedAgent } from "@/api/user";
import { SpinnerIcon } from "@/components/icons/spinner";
import AgentQuestionnaire from "@/containers/dashboard/agent-questionnaire";
import { Send } from "iconsax-react";

const BasedAgent = () => {
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

  return (
    <div className="text-white bg-[#0B0228] flex flex-col h-[inherit] gap-6 p-4 sm:p-6">
      <p>BasedAgent</p>

      {!data?.data?.messages.length && !isPending && (
        <>
          <div className="py-1 px-3 w-fit flex flex-col self-end rounded-md text-white">
            <div onClick={handleStartConversation} className="italic gap-1">
              <p>Conversational starters</p>
              <p>Conversational starters</p>
            </div>
          </div>
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

      {isPending && <SpinnerIcon />}

      {data?.data?.messages.length && (
        <AgentQuestionnaire questions={questions} />
      )}
    </div>
  );
};

export default BasedAgent;
