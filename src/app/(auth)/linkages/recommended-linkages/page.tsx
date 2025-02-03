"use client";

import { useGetDiscoveryLinkages } from "@/api/linkage";
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import LinkagesCard from "@/containers/linkages/linkages-card";
import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";
import Pagination from "@/containers/linkages/containers/pagination";

const RecommendedLinkages = () => {
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

  return (
    <AuthNavLayout>
      <main className="relative min-h-screen w-full text-white bg-[rgb(11,2,40)] p-4 sm:p-6 pb-28">
        <ArrowLeft onClick={() => router.back()} className="mt-2 mb-4" />

        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-col gap-10">
            {discoveryLinkages?.data?.data && (
              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-lg font-semibold">Recommended for you</p>
                  <p className="text-sm">Linkages based on your response</p>
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
          </div>
        </div>
      </main>
    </AuthNavLayout>
  );
};

export default RecommendedLinkages;
