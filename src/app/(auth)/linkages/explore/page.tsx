"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import SearchComponent from "@/components/search";
import FeaturedLinkages from "@/containers/linkages/featured-linkages-card";
import { linkagesArray } from "@/lib/values/mockData";
import { useGetDiscoveryLinkages, useGetLinkages } from "@/api/ai";

const Linkages = () => {
  const router = useRouter();

  const {
    data: discoveryLinkages,
    isLoading,
    refetch,
  } = useGetDiscoveryLinkages({
    params: { page: 1, pageSize: 5, query: "" },
  });

  const { data: linkages } = useGetLinkages();

  return (
    <main className="relative min-h-screen w-full text-white bg-[#0B0228] p-4 sm:p-6 pb-24">
      <ArrowLeft onClick={() => router.back()} className="mt-2" />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 py-4">
          <div className="flex flex-row items-center justify-between">
            <p className="text-[24px] font-semibold">Linkages</p>
            <Link
              href="/linkages/create"
              className="py-2 px-3 text-xs font-semibold border border-[#FFFFFF36] rounded-[10px]"
            >
              Create your Linkages
            </Link>
          </div>

          <SearchComponent />
        </div>

        {linkages?.data && (
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-lg font-semibold">My Linkages</p>
              <p className="text-sm">Linkages you created</p>
            </div>

            {linkages?.data.map((i: any) => (
              <FeaturedLinkages
                key={i.name}
                name={i.name}
                image={i.image}
                description={i.description}
                author={i.userId}
                slug={i.slug}
              />
            ))}
          </div>
        )}

        {discoveryLinkages?.data?.data && (
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-lg font-semibold">Featured Linkages</p>
              <p className="text-sm">Top Picks from this week activities</p>
            </div>

            {discoveryLinkages?.data?.data.map((i: any) => (
              <FeaturedLinkages
                key={i.name}
                name={i.name}
                image={i.image}
                description={i.description}
                author={i.userId}
                slug={i.slug}
              />
            ))}
          </div>
        )}

        {discoveryLinkages?.data?.data && (
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-lg font-semibold">Recommended for you</p>
              <p className="text-sm">Linkages based on your response</p>
            </div>

            {discoveryLinkages?.data?.data.map((i: any) => (
              <FeaturedLinkages
                key={i.name}
                name={i.name}
                image={i.image}
                description={i.description}
                author={i.userId}
                slug={i.slug}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Linkages;
