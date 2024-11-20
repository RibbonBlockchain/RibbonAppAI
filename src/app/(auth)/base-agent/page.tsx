"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRespondBasedAgent } from "@/api/user";
import { SpinnerIcon } from "@/components/icons/spinner";

const BasedAgent = () => {
  const { mutate, data, isPending } = useRespondBasedAgent();
  const [userInput, setUserInput] = useState("");

  const lastQuestion =
    data?.data?.messages[data?.data?.messages.length - 1].content;

  const handleStartConversation = () => {
    mutate({ message: "Hello there", type: "conversation.starter" });
  };

  const handleResponse = () => {
    mutate(
      { message: userInput, type: "questionnaire.respond" },
      {
        onSuccess: () => {
          toast.success("Response successfully recorded");
          setUserInput("");
        },
      }
    );
  };

  return (
    <div className="text-white bg-[#0B0228] flex flex-col h-[inherit] gap-6 p-4 sm:p-6">
      <p>BasedAgent</p>

      {!data?.data?.messages.length && !isPending && (
        <div
          onClick={handleStartConversation}
          className="py-1 px-3 w-fit bg-green-200 rounded-md text-black"
        >
          Begin
        </div>
      )}

      {data?.data?.messages.length && (
        <>
          {isPending ? (
            <SpinnerIcon />
          ) : (
            <>
              <div className="flex flex-col gap-1">
                <p className="italic text-base">{lastQuestion}</p>
              </div>
            </>
          )}
        </>
      )}

      {/* Input field for user to respond */}
      <div className="mt-auto">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your response..."
          className="w-full py-2 px-4 rounded-md bg-[#2d2d2d] text-white border border-gray-600"
        />
        <button
          onClick={handleResponse}
          disabled={!userInput.trim()} // Disable if input is empty
          className="mt-2 py-2 px-4 w-full bg-green-200 rounded-md text-black disabled:bg-gray-400"
        >
          Submit Response
        </button>
      </div>
    </div>
  );
};

export default BasedAgent;
