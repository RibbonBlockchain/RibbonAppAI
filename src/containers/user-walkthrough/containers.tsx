import Image from "next/image";
import { MessageQuestion } from "../../../public/images";

export const Welcome = () => {
  return (
    <div className="flex flex-col items-center w-auto max-w-[320px] mx-auto">
      <div className="h-auto rounded-md">
        <Image
          width={180}
          height={90}
          alt="welcome image"
          className="w-auto"
          src="/images/ribbon.svg"
        />
      </div>

      <div className="flex flex-col text-start gap-2 mt-2">
        <h1 className="text-lg text-center font-bold">Welcome to Ribbon</h1>
        <h2 className=" text-sm font-normal">
          We want to make sure you have the best experience with our app. To
          help you get started, we&apos;ve prepared a brief walkthrough that
          will introduce you to our key features.
        </h2>
      </div>
    </div>
  );
};

export const WorldID = () => {
  return (
    <div className="flex flex-col items-center w-auto max-w-[320px] mx-auto">
      <div className="h-auto rounded-md">
        <Image
          width={45}
          height={45}
          alt="welcome image"
          src="/images/world-coin.png"
        />
      </div>

      <div className="flex flex-col text-center gap-2 mt-2">
        <h1 className="text-xl text-center font-bold">WorldID</h1>
        <h2 className="text-sm font-semibold">
          Link your World ID to withdraw your worldcoin directly to your World
          ID wallet
        </h2>
        <h2 className="text-xs font-normal">
          Worldcoin is an open-source protocol, supported by a global community
          of developers, individuals, economists and technologists committed to
          expanding participation in, and access to, the global economy. The
          Worldcoin Foundation is the steward, and will support and grow the
          Worldcoin community until it becomes self-sufficient. Tools for
          Humanity helped launch Worldcoin, and currently serve as advisors to
          the Foundation and operators of the World App.
        </h2>
        <a href="#" className="py-2 text-gradient-2  underline">
          Link World ID
        </a>
      </div>
    </div>
  );
};

export const CompleteProfile = () => {
  return (
    <div className="flex flex-col items-center w-auto max-w-[320px] mx-auto">
      <div className="h-auto rounded-md ">
        <Image
          width={2400}
          height={90}
          alt="verify-phone"
          className="w-auto"
          src="/images/complete-profile.svg"
        />
      </div>

      <div className="flex flex-col text-start gap-2 mt-2">
        <h1 className="text-base text-center font-bold flex flex-row items-center justify-center gap-1">
          Quick tips <MessageQuestion />
        </h1>
        <h2 className="text-xs font-normal text-center">
          You need to complete your profile to be able to answer questionnaires,
          unlock more rewards & tasks to claim tokens
        </h2>
      </div>
    </div>
  );
};

export const VerifyIdentity = () => {
  return (
    <div className="flex flex-col items-center w-auto max-w-[320px] mx-auto">
      <div className="h-auto rounded-md flex flex-row gap-2">
        <Image
          width={2400}
          height={90}
          alt="verify-phone"
          className="w-auto"
          src="/images/verify-identity.svg"
        />
      </div>

      <div className="flex flex-col text-start gap-2 mt-2">
        <h1 className="text-base text-center font-bold flex flex-row items-center justify-center gap-1">
          Quick tips <MessageQuestion />
        </h1>
        <h2 className="text-xs font-normal text-center">
          You need to verify your identity to unlock more rewards & tasks to
          claim tokens
        </h2>
      </div>
    </div>
  );
};

export const WithdrawTokens = () => {
  return (
    <div className="flex flex-col items-center w-auto max-w-[320px] mx-auto">
      <div className="h-auto rounded-md flex flex-row gap-2">
        <Image
          width={2400}
          height={90}
          alt="verify-phone"
          className="w-auto"
          src="/images/withdraw-tokens.svg"
        />
      </div>

      <div className="flex flex-col text-start gap-2 mt-2">
        <h1 className="text-base text-center font-bold flex flex-row items-center justify-center gap-1">
          Quick tips <MessageQuestion />
        </h1>
        <h2 className="text-xs font-normal text-center">
          You need to reach 1000 points to be able to withdraw your tokens{" "}
        </h2>
      </div>
    </div>
  );
};

export const LetsGoBtn = () => {
  return (
    <strong className="w-auto min-w-[130px] absolute bottom-3 right-3 border-[1px] border-transparent bg-gradient-to-r from-[#714EE7] to-[#A81DA6] py-2 px-3  text-sm  rounded-md">
      Let&apos;s go
    </strong>
  );
};

export const Previous = () => {
  return (
    <div className="absolute bottom-3 left-3 w-auto min-w-[105px] border-[1px] text-black border-[#EDEEEF] bg-[#F6F7F7] py-2 px-3 text-sm rounded-md   ">
      <strong>Previous</strong>
    </div>
  );
};

export const Next = () => {
  return (
    <strong className=" w-auto min-w-[130px] absolute bottom-3 right-3 border-[1px] border-transparent bg-gradient-to-r from-[#714EE7] to-[#A81DA6] py-2 px-3  text-sm rounded-md   ">
      Next
    </strong>
  );
};

export const Skip = (props: { text?: string }) => {
  return (
    <div
      onClick={() => {}}
      className="w-auto min-w-[130px] absolute bottom-3 left-3 border-[1px] border-transparent bg-slate-200 py-2 px-3 text-sm rounded-md"
    >
      <strong>Skip</strong>
    </div>
  );
};

export const GetStarted = () => {
  return (
    <strong
      onClick={() => {}}
      className=" w-auto min-w-[130px] absolute bottom-3 right-3 border-[1px] border-transparent bg-gradient-to-r from-[#714EE7] to-[#A81DA6] py-2 px-3  text-sm rounded-md   "
    >
      Do it later
    </strong>
  );
};
