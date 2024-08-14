"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Call, Location, Sms } from "iconsax-react";
import { linkagesArray } from "@/lib/values/mockData";
import LinkagesCard from "@/containers/linkages/linkages-card";
import RatingCompleted from "@/containers/activity/rate-completed";

const LinkageRatingsCard = () => {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-2 items-center">
          <Image
            alt=""
            src={""}
            width={36}
            height={36}
            className="w-[36px] h-[36px] bg-white rounded-full"
          />
          <p className="text-sm font-semibold">Brian Okafor</p>
        </div>
        <RatingCompleted rating={3} />
      </div>
      <p className="text-[13px] font-normal">
        Great service. Highly recommend{" "}
      </p>
    </div>
  );
};

const LinkageViewDetails = () => {
  const router = useRouter();

  return (
    <main className="relative min-h-screen w-full text-white bg-[#0B0228]">
      <Image
        width={320}
        height={200}
        alt="display"
        className="w-full h-auto"
        onClick={() => router.back()}
        src={"/assets/linkage-details.png"}
      />

      <div className="flex flex-col gap-6 p-4 sm:p-6 pb-24">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col gap-3">
            <p className="text-lg font-bold">Mental Health Support</p>
            <div className="flex flex-row items-center gap-3 text-xs font-normal">
              <Call size="18" color="#ffffff" variant="Bold" /> (123) 278-6913
            </div>
            <div className="flex flex-row items-center gap-3 text-xs font-normal">
              <Sms size="18" color="#ffffff" variant="Bold" />{" "}
              infohealth@mail.com
            </div>
            <div className="flex flex-row items-center gap-3 text-xs font-normal">
              <Location size="18" color="#ffffff" variant="Bold" />{" "}
              Johannesburg, SA
            </div>
          </div>
          <div
            onClick={() => router.push("/bot")}
            className="relative flex flex-row mt-8 mr-6"
          >
            <Image
              width={10}
              height={10}
              alt="display"
              src={"/assets/small-star.png"}
              className="w-[10px] h-[10px] absolute right-0"
            />
            <Image
              width={42}
              height={42}
              alt="display"
              className="w-[50px] h-auto"
              src={"/assets/linkage-AI.png"}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-bold">About</p>
          <p className="text-[13px] font-normal">
            Lorem ipsum dolor sit amet consectetur. Nisl urna neque morbi
            ultrices leo amet quis imperdiet. Eu felis faucibus sed placerat.
            Tincidunt ultrices vulputate volutpat adipiscing eget quis pulvinar
            eleifend. Ornare mauris tristique volutpat egestas nunc. Lorem ipsum
            dolor sit amet consectetur. At aliquam ipsum neque sapien platea.
            Amet tristique eu sed eu. Facilisi risus nunc odio ut nisi.
            Consequat dictum volutpat lobortis ullamcorper.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-bold">Reviews & Ratings</p>
          <div className="flex flex-col gap-6">
            {linkagesArray.map((i, index) => (
              <LinkageRatingsCard key={index} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-6">
          <p className="text-sm font-bold">View Location on the map</p>
          <div></div>
        </div>

        <div className="flex flex-col gap-2 mt-10 mb-16">
          <p className="text-sm font-bold">More Linkages for you</p>
          <div className="flex flex-row gap-4 w-full overflow-auto py-1">
            {linkagesArray.map((i) => (
              <LinkagesCard
                key={i.title}
                title={i.title}
                image={i.image}
                description={i.description}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute mx-auto w-full">
        <div className="w-full fixed bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-4">
          <div className="w-full max-w-[450px] px-4 flex flex-col items-center space-y-4">
            <button
              onClick={() => router.push("/bot")}
              className="w-full bg-white text-[#290064] rounded-[8px] py-3 font-bold text-base"
            >
              Schedule a Sesssion
            </button>
            <button
              onClick={() => router.push("/bot")}
              className="flex flex-row gap-2 items-center justify-center w-[inherit] bg-white text-[#290064] rounded-[8px] py-3 font-bold text-base"
            >
              <Image
                alt="ai"
                width={20}
                height={20}
                src={"/assets/sparkle.png"}
              />{" "}
              AI support
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LinkageViewDetails;
