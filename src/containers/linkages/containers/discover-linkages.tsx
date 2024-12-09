import React, { useEffect, useState } from "react";
import LinkagesCard from "../linkages-card";
import { useGetDiscoveryLinkages } from "@/api/linkage";
import Pagination from "./pagination";

const DiscoverLinkages = () => {
  const [query, setQuery] = useState<string>("");

  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: discoveryLinkages, refetch } = useGetDiscoveryLinkages({
    params: {
      page: currentPage,
      pageSize: pageSize,
      query,
      type: "ORGANIZATION",
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
    <div>
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
      )}{" "}
    </div>
  );
};

export default DiscoverLinkages;
