"use client";

import {
  useGetLinkages,
  useGetDiscoveryLinkages,
  useGetDiscoveryLinkageStatus,
} from "@/api/linkage";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import SearchComponent from "@/components/search";
import LinkagesCard from "@/containers/linkages/linkages-card";
import FeaturedLinkages from "@/containers/linkages/linkages-card";
import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";
import DisplayStatusModal from "@/containers/linkages/display-status-modal";

const tabs = [
  { name: "For you", value: "for-you" },
  { name: "Following", value: "following" },
  { name: "My Linkages", value: "my-linkages" },
  { name: "DMs (Direct Messages)", value: "dms" },
];

const Linkages = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("for-you");
  const [query, setQuery] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<
    { url: string; caption?: string }[]
  >([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleSearchSubmit = (query: string) => {
    console.log("Search submitted with query:", query);
  };

  const { data: discoveryLinkages } = useGetDiscoveryLinkages({
    params: { page: 1, pageSize: 5, query },
  });

  const { data: linkages } = useGetLinkages();

  const { data } = useGetDiscoveryLinkageStatus({
    params: { page: 1, pageSize: 20 },
  });

  const openModal = (
    images: { url: string; caption?: string }[],
    index: number
  ) => {
    setModalImages(images);
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <AuthNavLayout>
      <main className="relative min-h-screen w-full text-white bg-[rgb(11,2,40)] p-4 sm:p-6 pb-28">
        <ArrowLeft onClick={() => router.back()} className="mt-2 mb-4" />

        <SearchComponent
          onQueryChange={handleQueryChange}
          onSearchSubmit={handleSearchSubmit}
        />

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
            {data?.data?.data.map((i: any, index: number) => (
              <Image
                key={i.id}
                alt="alt"
                width={82}
                height={82}
                src={i.media || "/assets/sample-icon.png"}
                className="rounded-full w-[82px] h-[82px] border-[3px] border-[#FFF]"
                onClick={() =>
                  openModal(
                    data?.data?.data.map((img: any) => ({
                      url: img.media || "/assets/sample-icon.png",
                      caption: img.caption, // Assuming the API provides a caption field
                    })),
                    index
                  )
                }
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

            {selectedTab === "following" && (
              <div>
                <p>Linkages you follow will appear here</p>
              </div>
            )}

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

            {selectedTab === "dms" && (
              <div>
                <p>
                  DMs and interactions you have with linkages will appear here
                </p>
              </div>
            )}
          </div>
        </div>

        {modalOpen && (
          <DisplayStatusModal
            images={modalImages}
            currentIndex={currentImageIndex}
            onClose={closeModal}
          />
        )}
      </main>
    </AuthNavLayout>
  );
};

export default Linkages;
