"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MicrophoneIcon } from "@heroicons/react/24/solid";

const FloatingIcon = () => {
  const router = useRouter();
  return (
    <div className="fixed flex flex-row items-center gap-2 top-[32%] right-2 rounded-full z-50">
      <Image
        alt="AI"
        width={44}
        height={44}
        src="/assets/AI.png"
        onClick={() => router.push("/activity")}
      />
      <MicrophoneIcon width={24} height={24} color="white" />
    </div>
  );
};

export default FloatingIcon;
