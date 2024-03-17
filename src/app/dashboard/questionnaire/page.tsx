import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Questionnaire() {
  return (
    <div className="pt-7 px-5">
      <div className="relative">
        <Image
          src="/images/questionnaire/i1.png"
          alt="q1"
          width={178}
          height={178}
          className="absolute top-0 left-0"
        />
      </div>

      {/* main */}
      <div>
        <ArrowLeft />
        <div className="flex justify-center">
          <Image
            src="/images/questionnaire/questions.svg"
            alt="question"
            width={234}
            height={241}
          />
        </div>
        <div className="mt-9 relative">
          <Image
            src="/images/questionnaire/i1.png"
            alt="q1"
            width={178}
            height={178}
            className="absolute top-0 right-0"
          />
          <h1 className="font-bold text-[1.265rem] text-center">
            Verify your phone number
          </h1>

          <div className="mt-9 grid gap-y-11">
            <div className="flex items-center gap-x-2">
              <div className="border rounded-full w-10 h-10 flex justify-center items-center border-[#A78EFE] relative">
                <Image
                  src="/images/questionnaire/coins.png"
                  alt="coins"
                  width={25}
                  height={20}
                  className=""
                />
              </div>
              <div>
                <h3 className="text-primary font-bold text-xl">3 WLD</h3>
                <p className="text-[#434343] text-[0.75rem] mt-1">
                  Verify your phone number for a token of 3 WLD
                </p>
              </div>
            </div>

            <div className="flex items-center gap-x-2">
              <div className="border rounded-full w-10 h-10 flex justify-center items-center border-[#A78EFE]">
                <Image
                  src="/images/questionnaire/cup.png"
                  alt="coins"
                  width={25}
                  height={20}
                  className=""
                />
              </div>
              <div>
                <h3 className="text-primary font-bold text-xl">+ 15 points</h3>
                <p className="text-[#434343] text-[0.75rem] mt-1">
                  Earn 15 points by verifying your phone number
                </p>
              </div>
            </div>

            <div className="flex items-center gap-x-2">
              <div className="border rounded-full w-10 h-10 flex justify-center items-center border-[#A78EFE]">
                <Image
                  src="/images/questionnaire/time.png"
                  alt="coins"
                  width={25}
                  height={20}
                />
              </div>
              <div>
                <h3 className="text-primary font-bold text-xl">2 minutes</h3>
                <p className="text-[#434343] text-[0.75rem] mt-1">
                  Complete this task in just 2 minutes
                </p>
              </div>
            </div>
          </div>

          <Image
            src="/images/questionnaire/i1.png"
            alt="q1"
            width={178}
            height={178}
            className="absolute -bottom-24 left-0"
          />
        </div>
      </div>

      <div className="mt-10 w-full bg-gradient-to-r from-[#714EE7] to-[#A81DA6] text-white text-center py-3.5 font-semibold rounded-lg">
        <Link href="/questuinnaire/sign-in" className="">
          Start Questionnaire
        </Link>
      </div>
    </div>
  );
}
