"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Call, Location, Sms } from "iconsax-react";
import LinkagesCard from "@/containers/linkages/linkages-card";
import { linkagesArray } from "@/lib/values/mockData";
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
        alt=""
        width={320}
        height={200}
        src={"/assets/linkage-details.png"}
        className="w-full h-auto"
        onClick={() => router.back()}
      />

      <div className="flex flex-col gap-6 p-4 sm:p-6 pb-24">
        <div className="flex flex-col gap-3">
          <p className="text-lg font-bold">Mental Health Support</p>
          <div className="flex flex-row items-center gap-3 text-xs font-normal">
            <Call size="18" color="#ffffff" variant="Bold" /> (123) 278-6913
          </div>
          <div className="flex flex-row items-center gap-3 text-xs font-normal">
            <Sms size="18" color="#ffffff" variant="Bold" /> infohealth@mail.com
          </div>
          <div className="flex flex-row items-center gap-3 text-xs font-normal">
            <Location size="18" color="#ffffff" variant="Bold" /> Johannesburg,
            SA
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

        <div className="flex flex-col gap-2 mt-10">
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
    </main>
  );
};

export default LinkageViewDetails;
