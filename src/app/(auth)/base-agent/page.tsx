"use client";

import React from "react";
import toast from "react-hot-toast";
import { useRespondBasedAgent } from "@/api/user";

const BasedAgent = () => {
  const { mutate, data } = useRespondBasedAgent();

  const handleRespondBasedAgent = () => {
    mutate(
      { message: "No", type: "questionnaire.respond" },
      { onSuccess: () => toast.success("Response successfully recorded") }
    );
  };

  console.log(data?.data?.messages, "here");

  return (
    <div className="text-white bg-[#0B0228] flex flex-col h-[inherit] gap-6 p-4 sm:p-6">
      <p>BasedAgent</p>

      <div className="flex flex-row items-center gap-1">
        Question 1:{" "}
        <p className="italic text-sm">based agent asks question here</p>
      </div>
      <div className="flex flex-row items-center gap-6">
        <div>Answer: No</div>
        <div
          onClick={handleRespondBasedAgent}
          className="py-1 px-3 bg-green-300 rounded-md text-black"
        >
          Reply
        </div>
      </div>
    </div>
  );
};

export default BasedAgent;
