"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import SearchComponent from "@/components/search";
import FeaturedLinkages from "@/containers/linkages/featured-linkages-card";
import { linkagesArray } from "@/lib/values/mockData";
import { useGetDiscoveryLinkages, useGetLinkages } from "@/api/ai";

const tabs = [
  { name: "For you", value: "for-you" },
  { name: "Following", value: "following" },
  { name: "My Linkages", value: "my-linkages" },
  { name: "DMs (Direct Messages)", value: "dms" },
];

const Linkages = () => {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState("for-you");
  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

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

        <div className="px-1 flex flex-row gap-2 w-[inherit] border-b border-[#F2EEFF40] overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => handleTabClick(tab.value)}
              className={`min-w-fit px-3 py-3 ${
                selectedTab === tab.value
                  ? "text-white border-b-2 border-b-white"
                  : "bg-transparent text-[#F2EEFF]"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className="flex">
          {/* // For you */}
          <div>
            {selectedTab === "for-you" && (
              <div className="flex flex-col gap-10">
                {discoveryLinkages?.data?.data && (
                  <div className="flex flex-col gap-3">
                    <div>
                      <p className="text-lg font-semibold">Featured Linkages</p>
                      <p className="text-sm">
                        Top Picks from this week activities
                      </p>
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
                      <p className="text-lg font-semibold">
                        Recommended for you
                      </p>
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
            )}
          </div>

          {/* Following */}
          <div>
            {selectedTab === "following" && (
              <div className="bg-red-500">
                <p>Linkages you follow will appear here</p>
              </div>
            )}
          </div>

          {/* my linkages */}
          <div>
            {selectedTab === "my-linkages" && (
              <div>
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
              </div>
            )}
          </div>

          {/* DMs */}
          <div>
            {selectedTab === "dms" && (
              <div>
                <p>
                  DMs and interactions you have with linkages will appear here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Linkages;
