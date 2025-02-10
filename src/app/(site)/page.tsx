"use client";

import Image from "next/image";
import LinkButton from "@/components/button/link";
import { WorldIdButton } from "@/containers/auth/landing/button";
import toast from "react-hot-toast";
import { useState } from "react";
import RewardAnimation from "@/components/reward-animation";

const Home = () => {
  const [showRewardAnimation, setShowRewardAnimation] = useState(false);

  return (
    <div className="text-white bg-[#0B0228] flex flex-col h-[inherit] items-center justify-between gap-6 p-4 sm:p-6">
      <div className="w-full flex flex-end items-end justify-end">
        <a
          href="https://ribbonprotocol.gitbook.io/linkages.ai"
          className="text-end px-5 py-2 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Whitepaper
        </a>
      </div>

      <div className="h-full w-full flex flex-col items-center justify-center gap-4 sm:gap-6">
        <Image
          width={100}
          height={24}
          alt="ribbon logo"
          src="/assets/ribbon-white.png"
        />

        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-base font-normal">Welcome to</h1>
          <h1 className="text-3xl font-extrabold">Linkages</h1>
          <p className="text-base font-normal text-center">
            Onchain Agentic Economy
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-3 pb-12">
        <div className="flex flex-col items-start justify-start text-start gap-2 mb-4">
          <p className="text-base font-normal text-center">Join Linkages as;</p>

          <LinkButton
            href="/auth/signup/phone"
            onclick={() => {
              toast.success("You received 2500 Ribbon reward"),
                setShowRewardAnimation(true);
            }}
            className="text-sm font-normal text-white text-start bg-inherit border border-[#98A2B3]"
          >
            Personal account
          </LinkButton>
          <LinkButton
            href="/auth/signup/email"
            onclick={() => {
              toast.success("You received 2500 Ribbon reward"),
                setShowRewardAnimation(true);
            }}
            className="text-sm font-normal text-white text-start bg-inherit border border-[#98A2B3]"
          >
            Organization account
          </LinkButton>
        </div>

        <LinkButton
          href="/auth/login"
          className="text-sm font-normal text-[#141414] text-center"
        >
          Already have an account?{" "}
          <span className="text-[#290064] font-semibold">Sign In</span>
        </LinkButton>

        <WorldIdButton>Sign In with World ID</WorldIdButton>
      </div>

      <div className="w-full flex flex-row items-center justify-between px-2 text-center text-[13px] mb-3 text-gray-400">
        <a
          href="https://ribbonprotocol.gitbook.io/linkages.ai/terms-of-use"
          className="text-white underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms of Use
        </a>
        <a
          href="https://ribbonprotocol.gitbook.io/linkages.ai/privacy-policy"
          className="text-white underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
      </div>

      {showRewardAnimation && <RewardAnimation />}
    </div>
  );
};

export default Home;
