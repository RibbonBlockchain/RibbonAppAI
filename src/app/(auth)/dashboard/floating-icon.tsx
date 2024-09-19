"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MicrophoneIcon } from "@heroicons/react/24/solid";

const FloatingIcon = () => {
  const router = useRouter();
  return (
    <div className="absolute right-0 bottom-20 rounded-full p-1 flex flex-row items-center gap-2 border bg-[#3f3952] bg-opacity-95">
      <MicrophoneIcon width={24} height={24} color="white" />
      <Image
        alt="AI"
        width={36}
        height={36}
        src="/assets/AI.png"
        onClick={() => router.push("/bot")}
      />
    </div>
  );
};

export default FloatingIcon;
