"use client";

import {
  useGetLinkages,
  useGetDiscoveryLinkages,
  useGetDiscoveryLinkageStatus,
  useGetDiscoveryFeaturedLinkages,
} from "@/api/linkage";
import {
  formatStatusDate,
  formatDateAndTimeAgo,
} from "@/lib/values/format-dateandtime-ago";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import SearchComponent from "@/components/search";
import LinkagesCard from "@/containers/linkages/linkages-card";
import FeaturedLinkages from "@/containers/linkages/linkages-card";
import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";
import DisplayStatusModal from "@/containers/linkages/display-status-modal";
import FeatureLinkageModal from "@/containers/linkages/feature-linkage-modal";
import { Add } from "iconsax-react";
import CelebrityLinkageCard from "@/containers/linkages/celebrity-linkage-card";
import CreateLinkageTypeModal from "@/containers/linkages/create-linkage-modal";
import Pagination from "@/containers/linkages/containers/pagination";

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
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [featureModalOpen, setFeatureModalOpen] = useState(false);
  const [createLinkageModalOpen, setCreateLinkageModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<
    {
      url: string;
      caption?: string;
      linkageName: string;
      linkageLogo?: string;
      updatedTime: string;
      linkageId: number;
      statusId: number;
    }[]
  >([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  const pageSize = 20;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: discoveryLinkages, refetch } = useGetDiscoveryLinkages({
    params: {
      page: currentPage,
      pageSize: pageSize,
      query,
      type: "",
    },
  });

  const handleNextPage = () => {
    if (discoveryLinkages?.data?.pagination?.hasNextPage) {
      console.log("clicked");
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (discoveryLinkages?.data?.pagination?.hasPreviousPage) {
      console.log("clicked");
      setCurrentPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    refetch();
  }, [currentPage]);

  const celebrityLinkageData = discoveryLinkages?.data?.data.filter(
    (item: any) => item.type === "CELEBRITY"
  );

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    refetch();
  };

  const handleSearchSubmit = (query: string) => {
    refetch();
  };

  const { data: featuredLinkages } = useGetDiscoveryFeaturedLinkages({
    params: { page: 1, pageSize: 10 },
  });

  const { data: linkages } = useGetLinkages();

  const { data: statuses } = useGetDiscoveryLinkageStatus({
    params: { page: 1, pageSize: 20 },
  });

  const searching = query && discoveryLinkages;
  const noSearchResult = query && discoveryLinkages?.data?.data.length === 0;

  const openModal = (
    images: {
      url: string;
      caption?: string;
      linkageName: string;
      linkageLogo?: string;
      updatedTime: string;
      linkageId: number;
      statusId: number;
    }[],
    index: number
  ) => {
    setModalImages(images);
    setCurrentImageIndex(index);
    setStatusModalOpen(true);
  };

  const closeModal = () => {
    setStatusModalOpen(false);
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
              <div
                onClick={() => setCreateLinkageModalOpen(true)}
                className="py-2 px-3 text-xs font-semibold border border-[#FFFFFF36] rounded-[10px]"
              >
                Create your Linkages
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-2 w-[inherit] py-2 overflow-x-auto scroll-hidden">
            {statuses?.data?.data?.length === 0 && (
              <div className="flex flex-row items-center gap-2">
                <button className="relative min-w-[65px] flex flex-row">
                  <Image
                    alt="alt"
                    width={65}
                    height={65}
                    src={"/assets/status-circle.png"}
                    className="rounded-full w-[65px] h-[65px]"
                  />
                  <Add
                    size="24"
                    color="#ffffff"
                    className="absolute bottom-0 right-0 bg-[#A166F5] border-[3px] border-[#0B0228] rounded-full"
                  />
                </button>
                <p className="mt-1 text-sm max-w-[170px] text-center">
                  Status update from all linkages will appear here
                </p>
              </div>
            )}

            {statuses?.data?.data.map((i: any, index: number) => (
              <div
                key={i.id}
                className="flex-shrink-0 w-20 h-20 relative"
                onClick={() =>
                  openModal(
                    statuses?.data?.data.map((img: any) => ({
                      url: img.media || "/assets/sample-icon.png",
                      caption: img.caption,
                      linkageName: img.linkage.name,
                      linkageLogo: img.linkageLogo || "/assets/sample-icon.png",
                      updatedTime: ``,
                      statusId: img.id,
                      linkageId: img.linkageId,
                    })),
                    index
                  )
                }
              >
                <Image
                  alt="alt"
                  layout="fill"
                  objectFit="cover"
                  src={i.media || "/assets/sample-icon.png"}
                  className="rounded-full border-[3px] border-[#FFF]"
                />
              </div>
            ))}
          </div>

          {searching ? (
            <>
              {discoveryLinkages?.data?.data && (
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-lg font-semibold">
                      Heare are your search results
                    </p>
                    <p className="text-sm">Linkages based on your search</p>
                  </div>

                  {discoveryLinkages?.data?.data.map((i: any) => (
                    <LinkagesCard
                      key={i.name}
                      name={i.name}
                      slug={i.slug}
                      image={i.logo}
                      author={i.userId}
                      description={i.description}
                      type={i.type}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="px-1 flex flex-row gap-2 w-[inherit] border-b border-[#F2EEFF40] overflow-x-auto scroll-hidden">
                {tabs.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => handleTabClick(tab.value)}
                    className={`min-w-fit px-3 py-3 ${
                      selectedTab === tab.value
                        ? "text-white border-b-2 border-b-white font-bold"
                        : "bg-transparent text-[#F2EEFF]"
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
              <div className="w-full flex sm:mb-24">
                {selectedTab === "for-you" && (
                  <div className="w-full flex flex-col gap-10">
                    {featuredLinkages?.data && (
                      <div className="w-full flex flex-col gap-3">
                        <div>
                          <div className="flex flex-row items-center justify-between">
                            <p className="text-lg font-semibold">
                              Featured Linkages
                            </p>
                            <button
                              onClick={() => setFeatureModalOpen(true)}
                              className="py-1.5 px-2 text-[13px] bg-[#3f3953] rounded-[12px] text-white"
                            >
                              Feature your linkage
                            </button>
                          </div>
                          <p className="text-sm">This week&apos;s top picks </p>
                        </div>
                        {featuredLinkages?.data?.data?.map((i: any) => (
                          <LinkagesCard
                            featured={true}
                            key={i.linkage.id}
                            name={i.linkage.name}
                            slug={i.linkage.slug}
                            image={i.linkage.logo}
                            author={i.linkage.userId}
                            description={i.linkage.description}
                            type={i.type}
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
                          <p className="text-sm">
                            Linkages based on your response
                          </p>
                        </div>

                        {discoveryLinkages?.data?.data.map((i: any) => (
                          <LinkagesCard
                            key={i.name}
                            name={i.name}
                            slug={i.slug}
                            image={i.logo}
                            author={i.userId}
                            description={i.description}
                            type={i.type}
                          />
                        ))}

                        <Pagination
                          handlePreviousPage={handlePreviousPage}
                          handleNextPage={handleNextPage}
                          pagination={discoveryLinkages?.data?.pagination}
                        />
                      </div>
                    )}

                    {busnessLinkage?.data?.data && (
                      <div className="flex flex-col gap-3">
                        <div>
                          <p className="text-lg font-semibold">
                            Business Linkages
                          </p>
                          <p className="text-sm">
                            Linkages from most popular companies
                          </p>
                        </div>

                        {busnessLinkage?.data?.data.map((i: any) => (
                          <CelebrityLinkageCard
                            key={i.name}
                            name={i.name}
                            slug={i.slug}
                            image={i.logo}
                            author={i.userId}
                            description={i.description}
                          />
                        ))}
                      </div>
                    )}

                    {celebrityLinkageData && (
                      <div className="flex flex-col gap-3">
                        <div>
                          <p className="text-lg font-semibold">
                            Celebrity Linkages
                          </p>
                          <p className="text-sm">
                            Linkages from your favorite celebrities{" "}
                          </p>
                        </div>

                        {celebrityLinkageData.map((i: any) => (
                          <CelebrityLinkageCard
                            key={i.name}
                            name={i.name}
                            slug={i.slug}
                            image={i.logo}
                            author={i.userId}
                            description={i.description}
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
                  <div className="w-full">
                    {linkages?.data && (
                      <div className="flex flex-col gap-3">
                        {linkages?.data.map((i: any) => (
                          <FeaturedLinkages
                            key={i.name}
                            name={i.name}
                            slug={i.slug}
                            image={i.logo}
                            author={i.userId}
                            description={i.description}
                            type={i.type}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {selectedTab === "dms" && (
                  <div>
                    <p>
                      DMs and interactions you have with linkages will appear
                      here
                    </p>
                  </div>
                )}
              </div>{" "}
            </>
          )}
        </div>

        {noSearchResult && (
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="flex flex-col items-center text-center gap-2">
              <p className="text-base">Not found</p>
              <p className="text-xs">Try a different search term.</p>
            </div>
          </div>
        )}

        {statusModalOpen && (
          <DisplayStatusModal
            images={modalImages}
            currentIndex={currentImageIndex}
            onClose={closeModal}
          />
        )}

        {featureModalOpen && (
          <FeatureLinkageModal
            isOpen={featureModalOpen}
            onClose={() => setFeatureModalOpen(false)}
          />
        )}

        {createLinkageModalOpen && (
          <CreateLinkageTypeModal
            isOpen={createLinkageModalOpen}
            onClose={() => setCreateLinkageModalOpen(false)}
          />
        )}
      </main>
    </AuthNavLayout>
  );
};

export default Linkages;

const busnessLinkage = {
  data: {
    data: [
      {
        name: "TechCorp Solutions",
        slug: "techcorp-solutions",
        logo: "",
        userId: "user123",
        description:
          "TechCorp Solutions is a global leader in software and AI-driven solutions, specializing in enterprise resource planning and automation tools.",
        industry: "Technology",
        location: "San Francisco, CA",
        contactEmail: "contact@techcorp.com",
        website: "https://www.techcorp.com",
        establishedYear: 2010,
        employeeCount: 500,
      },
      {
        name: "Green Ventures Group",
        slug: "green-ventures-group",
        logo: "",
        userId: "user456",
        description:
          "Green Ventures Group is committed to sustainable practices and green technology, focusing on renewable energy and eco-friendly innovations.",
        industry: "Renewable Energy",
        location: "Denver, CO",
        contactEmail: "info@greenventures.com",
        website: "https://www.greenventures.com",
        establishedYear: 2015,
        employeeCount: 200,
      },
      {
        name: "Health Innovations Ltd.",
        slug: "health-innovations-ltd",
        logo: "",
        userId: "user789",
        description:
          "Health Innovations Ltd. pioneers new medical technologies aimed at improving patient outcomes and enhancing healthcare delivery through AI and IoT.",
        industry: "Healthcare & MedTech",
        location: "New York, NY",
        contactEmail: "support@healthinnovations.com",
        website: "https://www.healthinnovations.com",
        establishedYear: 2018,
        employeeCount: 150,
      },
    ],
  },
};

// const celebrityLinkages = {
//   data: {
//     data: [
//       {
//         name: "Zendaya",
//         slug: "zendaya",
//         logo: "",
//         userId: "user101",
//         description:
//           "Zendaya is an award-winning actress, singer, and fashion icon known for her roles in 'Euphoria' and 'Spider-Man'.",
//         profession: "Actress, Singer",
//         location: "Los Angeles, CA",
//         contactEmail: "contact@zendaya.com",
//         website: "https://www.zendaya.com",
//         establishedYear: 2010,
//         popularityRank: 1, // Ranking based on fame or social media presence
//         socialMedia: {
//           instagram: "@zendaya",
//           twitter: "@Zendaya",
//           facebook: "/ZendayaOfficial",
//         },
//       },
//       {
//         name: "Chris Hemsworth",
//         slug: "chris-hemsworth",
//         logo: "",
//         userId: "user102",
//         description:
//           "Chris Hemsworth is an Australian actor famous for portraying Thor in the Marvel Cinematic Universe.",
//         profession: "Actor",
//         location: "Byron Bay, Australia",
//         contactEmail: "info@chrishemsworth.com",
//         website: "https://www.chrishemsworth.com",
//         establishedYear: 2002,
//         popularityRank: 2,
//         socialMedia: {
//           instagram: "@chrishemsworth",
//           twitter: "@chrishemsworth",
//           facebook: "/ChrisHemsworthOfficial",
//         },
//       },
//       {
//         name: "Taylor Swift",
//         slug: "taylor-swift",
//         logo: "",
//         userId: "user103",
//         description:
//           "Taylor Swift is a Grammy-winning singer-songwriter known for her genre-defying music and chart-topping albums.",
//         profession: "Singer-Songwriter",
//         location: "Nashville, TN",
//         contactEmail: "contact@taylorswift.com",
//         website: "https://www.taylorswift.com",
//         establishedYear: 2006,
//         popularityRank: 3,
//         socialMedia: {
//           instagram: "@taylorswift",
//           twitter: "@taylorswift13",
//           facebook: "/taylorswift",
//         },
//       },
//     ],
//   },
// };
