"use client";

import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useRespondBasedAgent } from "@/api/user";
import { SpinnerIcon } from "@/components/icons/spinner";

const BasedAgent = () => {
  const { mutate, data, isPending } = useRespondBasedAgent();

  const lastQuestion =
    data?.data?.messages[data?.data?.messages.length - 1].content;

  const handleStartConversation = () => {
    mutate({ message: "Hello there", type: "conversation.starter" });
  };

  const handleResponse = () => {
    mutate(
      { message: "Hello there", type: "questionnaire.respond" },
      { onSuccess: () => toast.success("Response successfully recorded") }
    );
  };

  return (
    <div className="text-white bg-[#0B0228] flex flex-col h-[inherit] gap-6 p-4 sm:p-6">
      <p>BasedAgent</p>

      {!data?.data?.messages.length && (
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
                Question 1: <p className="italic text-sm">{lastQuestion}</p>
              </div>
              <div className="flex flex-row items-center gap-6">
                <div>Answer: No</div>
                <div
                  onClick={handleResponse}
                  className="py-1 px-3 bg-white rounded-md text-black"
                >
                  Respond to question
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default BasedAgent;
