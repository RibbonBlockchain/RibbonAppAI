"use client";

import {
  useGetDiscoveryLinkages,
  useGetDiscoveryFeaturedLinkages,
} from "@/api/linkage";
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import LinkagesCard from "@/containers/linkages/linkages-card";
import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";

const FeaturedLinkages = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");

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

  const { data: featuredLinkages } = useGetDiscoveryFeaturedLinkages({
    params: { page: 1, pageSize: 10 },
  });

  return (
    <AuthNavLayout>
      <main className="relative min-h-screen w-full text-white bg-[rgb(11,2,40)] p-4 sm:p-6 pb-28">
        <ArrowLeft onClick={() => router.back()} className="mt-2 mb-4" />

        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-col gap-10">
            {featuredLinkages?.data && (
              <div className="w-full flex flex-col gap-3">
                <div>
                  <div className="flex flex-row items-center justify-between">
                    <p className="text-lg font-semibold">Featured Linkages</p>
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
          </div>
        </div>
      </main>
    </AuthNavLayout>
  );
};

export default FeaturedLinkages;
