import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import LinkButton from "@/components/button/link";
import { WorldIdButton } from "@/containers/auth/landing/button";

const Home = () => {
  return (
    <div className="text-white bg-[#0B0228] flex flex-col h-[inherit] items-center justify-between gap-6 p-4 sm:p-6">
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
            Personalized Consumer Experiences
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-3 pb-12">
        <div className="flex flex-col items-start justify-start text-start gap-2 mb-4">
          <p className="text-base font-normal text-center">Join Linkages as;</p>

          <LinkButton
            href="/auth/signup/phone"
            className="text-sm font-normal text-white text-start bg-inherit border border-[#98A2B3]"
          >
            Personal account
          </LinkButton>
          <LinkButton
            href="/auth/signup/email"
            className="text-sm font-normal text-white text-start bg-inherit border border-[#98A2B3]"
          >
            Business account
          </LinkButton>
        </div>

        <LinkButton
          href="/auth/login"
          className="text-sm font-normal text-[#141414] text-center"
        >
          Already have an account?{" "}
          <span className="text-[#6200EE] font-semibold">Sign In</span>
        </LinkButton>
      </div>
    </div>
  );
};

export default Home;
