"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MicrophoneIcon } from "@heroicons/react/24/solid";

const FloatingIcon = () => {
  const router = useRouter();
  return (
    <div className="absolute right-16 top-[46%] z-50">
      <div className="fixed rounded-full pl-2 flex flex-row items-center gap-3 shadow-md shadow-white bg-[#3f3952] bg-opacity-95">
        <MicrophoneIcon width={24} height={24} color="white" />
        <Image
          alt="AI"
          width={50}
          height={50}
          src="/assets/AI.png"
          onClick={() => router.push("/bot")}
        />
      </div>
    </div>
  );
};

export default FloatingIcon;
