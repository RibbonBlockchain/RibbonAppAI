"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { featuredLinkagesArray, linkagesArray } from "@/lib/values/mockData";
import LinkagesCard from "@/containers/linkages/linkages-card";
import { ArrowCircleLeft, ArrowCircleRight } from "iconsax-react";
import FeaturedLinkages from "@/containers/linkages/featured-linkages-card";
import SearchComponent from "@/components/search";

const Linkages = () => {
  const router = useRouter();
  return (
    <main className="relative min-h-screen w-full text-white bg-[#0B0228] p-4 sm:p-6 pb-24">
      <ArrowLeft onClick={() => router.back()} className="mt-2" />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 py-4">
          <div className="flex flex-row items-center justify-between">
            <p className="text-[24px] font-semibold">Linkages</p>
            <Link
              href="/linkages/create"
              className="py-2 px-3 text-xs font-semibold border border-[#FFFFFF] rounded-[12px]"
            >
              Create your Linkages
            </Link>
          </div>

          <SearchComponent />
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <p className="text-lg font-semibold">Featured Linkages</p>
            <p className="text-sm">Top Picks from this week activities</p>
          </div>

          {featuredLinkagesArray.map((i) => (
            <FeaturedLinkages
              key={i.title}
              title={i.title}
              image={i.image}
              description={i.description}
              author={i.author}
            />
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <p className="text-lg font-semibold">Recommended for you</p>
            <p className="text-sm">Linkages based on your response</p>
          </div>

          {linkagesArray.map((i) => (
            <FeaturedLinkages
              key={i.title}
              title={i.title}
              image={i.image}
              description={i.description}
              author={i.author}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Linkages;
