"use client";

import BackArrow from "@/components/button/back-arrow";
import LinkButton from "@/components/button/link";
import InputBox from "@/components/questionnarie/input-box";
import { WorldIdButton } from "@/containers/auth/landing/button";
import { authAtom } from "@/lib/atoms/auth.atom";
import { Google } from "iconsax-react";
import { useAtom } from "jotai";
import { Apple, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SubmitEmailSignup from "./submitemailsignup";

const Signup = () => {
  const router = useRouter();
  const [state, setState] = useAtom(authAtom);

  const setEmail = (email: string) => setState((prev) => ({ ...prev, email }));

  return (
    <div className="w-full text-white bg-[#0B0228] flex flex-col min-h-full items-center justify-between pb-8 pt-4 gap-6 px-4 sm:px-6">
      <div className="w-full flex flex-col gap-4 sm:gap-6">
        <BackArrow stroke="#FFF" />
        <div className="flex flex-col gap-2">
          <h1 className="font-extrabold text-3xl">Let&apos;s get started!</h1>
          <p className="text-sm">
            Enter your business email. We will send you confirmation code here
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col items-start justify-start self-start gap-2">
        <InputBox
          name="email"
          value={state.email}
          label="Business Email"
          required={false}
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
        />
        <SubmitEmailSignup />
      </div>

      <div className="w-full flex flex-row gap-4 items-center justify-center">
        <hr className="w-full h-[1px] text-white " />
        or
        <hr className="w-full h-[1px] text-white " />
      </div>

      <div className="w-full flex flex-col gap-3">
        <LinkButton
          href="#"
          className="flex bg-inherit border border-[#E5E7EB] flex-row items-center justify-center gap-3"
        >
          <Apple /> Continue with Apple
        </LinkButton>

        <LinkButton
          href="#"
          className="flex bg-inherit border border-[#E5E7EB] flex-row items-center justify-center gap-3"
        >
          <Google /> Continue with Google
        </LinkButton>

        <WorldIdButton>Sign In with World ID</WorldIdButton>
      </div>
    </div>
  );
};

export default Signup;
