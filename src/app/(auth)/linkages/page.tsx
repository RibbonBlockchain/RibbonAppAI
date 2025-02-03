"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";
import Link from "next/link";

const LinkagesHome = () => {
  const router = useRouter();

  return (
    <AuthNavLayout>
      <div className="relative min-h-screen w-full text-white bg-[#0B0228] p-4 sm:p-6 pb-24">
        {/* <Image
          width={300}
          height={470}
          alt="linkages-logo"
          className="w-full h-auto"
          src={"/assets/linkages.png"}
        /> */}

        <div className="py-10">
          <p className="text-[24px] font-semibold">Linkages</p>

          <p className="text-[13px] font-normal mt-2">
            Based on your responses on our surveys and questionnaires,
            we&apos;`ve suggested some services that could assist you in
            overcoming your challenges
          </p>
        </div>

        <div className="pb-10 flex flex-col gap-4">
          <Link
            href={"/linkages/featured-linkages"}
            className=" border-b border-[#C3B1FF4D] pb-2 text-base font-medium"
          >
            Featured Linkages
          </Link>
          <Link
            href={"/linkages/recommended-linkages"}
            className=" border-b border-[#C3B1FF4D] pb-2 text-base font-medium"
          >
            Recommended Linkages
          </Link>
          <Link
            href={"#"}
            className=" border-b border-[#C3B1FF4D] pb-2 text-base font-medium"
          >
            Business Linkages
          </Link>
          <Link
            href={"/linkages/celebrity-linkages"}
            className=" border-b border-[#C3B1FF4D] pb-2 text-base font-medium"
          >
            Celebrity Linkages
          </Link>
        </div>

        <div>
          <button
            onClick={() => router.push("/linkages/explore")}
            className="w-full py-3 bg-[#F6F1FE] rounded-[12px] text-sm font-semibold text-[#290064]"
          >
            Explore All Linkages
          </button>
          <p className="mt-2 text-[13px] text-center">
            <a className="text-[#DFCBFB] underline" href="#">
              Click here
            </a>{" "}
            to learn more about Linkages
          </p>
        </div>
      </div>
    </AuthNavLayout>
  );
};

export default LinkagesHome;
