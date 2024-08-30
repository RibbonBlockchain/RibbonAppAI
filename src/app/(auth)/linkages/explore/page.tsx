"use client";

import Link from "next/link";
import Image from "next/image";
import { Add } from "iconsax-react";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import SearchComponent from "@/components/search";
import LinkagesCard from "@/containers/linkages/linkages-card";
import FeaturedLinkages from "@/containers/linkages/linkages-card";
import {
  useGetDiscoveryLinkages,
  useGetLinkages,
  usePublishLinkage,
} from "@/api/linkage";
import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";

const tabs = [
  { name: "For you", value: "for-you" },
  { name: "Following", value: "following" },
  { name: "My Linkages", value: "my-linkages" },
  { name: "DMs (Direct Messages)", value: "dms" },
];

const statuses = [
  { id: 1, image: "" },
  { id: 2, image: "" },
  { id: 3, image: "" },
  { id: 4, image: "" },
  { id: 5, image: "" },
  { id: 6, image: "" },
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
  const { mutate } = usePublishLinkage();

  return (
    <AuthNavLayout>
      <main className="relative min-h-screen w-full text-white bg-[rgb(11,2,40)] p-4 sm:p-6 pb-28">
        <ArrowLeft onClick={() => router.back()} className="mt-2 mb-4" />

        <SearchComponent />

        <div className="w-full flex flex-col gap-4">
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
          </div>

          <div className="flex flex-row gap-2 w-[inherit] py-2 overflow-x-auto scroll-hidden">
            <div className="relative min-w-[82px] flex flex-row ">
              <Image
                alt="alt"
                width={82}
                height={82}
                src={"/assets/status-circle.png"}
                className="rounded-full w-[82px] h-[82px]"
              />
              <Add
                size="24"
                color="#ffffff"
                className="absolute bottom-0 right-0 bg-[#A166F5] border-[3px] border-[#0B0228] rounded-full"
              />
            </div>

            {statuses.map((i) => (
              <Image
                key={i.id}
                alt="alt"
                width={82}
                height={82}
                src={i.image || "/assets/sample-icon.png"}
                className="rounded-full w-[82px] h-[82px] border-[3px] border-[#FFF]"
              />
            ))}
          </div>

          <div className="px-1 flex flex-row gap-2 w-[inherit] border-b border-[#F2EEFF40] overflow-x-auto scroll-hidden">
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

          <div className="w-full flex">
            {/* // For you */}
            {selectedTab === "for-you" && (
              <div className="w-full flex flex-col gap-10">
                {discoveryLinkages?.data?.data && (
                  <div className="w-full flex flex-col gap-3">
                    <div>
                      <p className="text-lg font-semibold">Featured Linkages</p>
                      <p className="text-sm">
                        Top Picks from this week activities
                      </p>
                    </div>
                    {discoveryLinkages?.data?.data.map((i: any) => (
                      <LinkagesCard
                        key={i.name}
                        name={i.name}
                        image={i.image}
                        description={i.description}
                        author={i.userId}
                        slug={i.slug}
                        featured={true}
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
                      <LinkagesCard
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

            {/* Following */}
            {selectedTab === "following" && (
              <div className="">
                <p>Linkages you follow will appear here</p>
              </div>
            )}

            {/* my linkages */}
            {selectedTab === "my-linkages" && (
              <div>
                {linkages?.data && (
                  <div className="flex flex-col gap-3">
                    {linkages?.data.map((i: any) => (
                      <FeaturedLinkages
                        key={i.name}
                        name={i.name}
                        slug={i.slug}
                        image={i.image}
                        author={i.userId}
                        description={i.description}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* DMs */}
            {selectedTab === "dms" && (
              <div>
                <p>
                  DMs and interactions you have with linkages will appear here
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </AuthNavLayout>
  );
};

export default Linkages;
