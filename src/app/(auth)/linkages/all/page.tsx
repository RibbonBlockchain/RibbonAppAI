import React from "react";
import LinkagesCard from "@/containers/linkages/linkages-card";
import { ArrowCircleLeft, ArrowCircleRight } from "iconsax-react";
import FeaturedLinkages from "@/containers/linkages/featured-linkages-card";
import { linkagesArray } from "@/lib/values/mockData";

const Linkages = () => {
  return (
    <main className="relative min-h-screen w-full text-white bg-[#0B0228] p-4 sm:p-6 pb-24">
      <div className="flex flex-col gap-6">
        <div className="py-4">
          <p className="text-[24px] font-semibold">Linkages</p>
          <p className="text-[13px] font-normal mt-2">
            Based on your responses on our surveys and questionnaires,
            we&apos;`ve suggested some services that could assist you in
            overcoming your challenges
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">Recommended for you</p>
            <div className="flex flex-row items-center gap-3">
              <ArrowCircleLeft size="24" color="#ffffff" />
              <ArrowCircleRight size="24" color="#ffffff" />
            </div>
          </div>

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

        <div className="flex flex-col gap-4">
          <p className="text-lg font-semibold">Featured Linkages</p>
          {linkagesArray.map((i) => (
            <FeaturedLinkages
              key={i.title}
              title={i.title}
              image={i.image}
              description={i.description}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Linkages;
