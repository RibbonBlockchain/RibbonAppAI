"use client";

import Image from "next/image";
import PageLoader from "@/components/loader";
import { copyToClipboard } from "@/lib/utils";
import toast, { Toaster } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { shortenTransaction } from "@/lib/utils/shorten";
import RatingCompleted from "@/containers/activity/rate-completed";
import FeaturedLinkages from "@/containers/linkages/linkages-card";
import { useGetLinkageBySlug, useGetDiscoveryLinkages } from "@/api/linkage";
import {
  Add,
  ArrowLeft,
  Call,
  Coin1,
  Copy,
  Location,
  Sms,
  WalletMoney,
} from "iconsax-react";
import AddStatusModal from "@/containers/linkages/add-status-modal";

const LinkageRatingsCard = () => {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-2 items-center">
          <Image
            width={36}
            height={36}
            alt="rating"
            src={"/assets/sample-icon.png"}
            className="w-[36px] h-[36px] bg-white text-white rounded-full"
          />
          <p className="text-sm font-semibold">Brian Okafor</p>
        </div>
        <RatingCompleted rating={3} />
      </div>
      <p className="text-[13px] font-normal">
        Great service. Highly recommend{" "}
      </p>
    </div>
  );
};

const LinkageViewDetails = () => {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const { data, isLoading } = useGetLinkageBySlug(slug);

  const { data: discoveryLinkages, refetch } = useGetDiscoveryLinkages({
    params: { page: 1, pageSize: 5, query: "", type: "" },
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleAddStatusClick = () => {
    setIsModalOpen(true);
  };

  const handleModalProceed = () => {
    router.push(`/linkages/explore/${slug}/status`);
  };

  const [following, setFollowing] = useState(false);

  useEffect(() => {
    refetch();
  }, [data]);

  return (
    <>
      {isLoading && <PageLoader />}

      <Toaster />

      {data && (
        <main className="relative min-h-screen w-full text-white bg-[#0B0228]">
          <div className="p-1 rounded-full absolute top-3 left-3 w-fit border-2 border-gray-300 z-50 shadow-md">
            <ArrowLeft
              size={20}
              className="text-black"
              onClick={() => router.back()}
            />
          </div>

          <Image
            width={320}
            height={200}
            alt="display"
            priority={true}
            className="w-full h-auto z-10 bg-red-500 border-red-500"
            src={data?.data.banner || "/assets/linkage-details.png"}
          />

          <div className="p-4 sm:p-6">
            <button
              onClick={handleAddStatusClick}
              className="relative min-w-[65px] flex flex-row"
            >
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
            <p className="mt-1 text-sm">Post a status for your linkage</p>
          </div>

          <div className="w-full flex flex-col gap-6 p-4 sm:p-6 pb-24">
            <div className="flex flex-row items-center justify-between">
              <div className="w-full flex flex-col gap-3">
                <div className="flex flex-row items-center justify-between mb-1">
                  <p className="text-lg font-bold">{data?.data.name}</p>

                  <div
                    className="flex items-center justify-center"
                    onClick={() => setFollowing(!following)}
                  >
                    {following ? (
                      <button className="px-2 py-1 text-xs text-[#0B0228] bg-white rounded-md">
                        Following
                      </button>
                    ) : (
                      <button className="px-2 py-1 text-xs text-[#0B0228] bg-white rounded-md">
                        Follow
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex flex-row items-center gap-3 text-xs font-normal">
                  <Call size="18" color="#ffffff" variant="Bold" />
                  {data?.data.phone}
                </div>
                <div className="flex flex-row items-center gap-3 text-xs font-normal">
                  <Sms size="18" color="#ffffff" variant="Bold" />{" "}
                  {data?.data.email}
                </div>
                <div className="flex flex-row items-center gap-3 text-xs font-normal">
                  <Location size="18" color="#ffffff" variant="Bold" />{" "}
                  {data?.data.location}
                </div>

                <div className="flex flex-row items-center gap-3 text-xs font-normal">
                  <WalletMoney size="18" color="#ffffff" variant="Bold" />{" "}
                  <div
                    onClick={() =>
                      copyToClipboard(data?.data?.walletAddress, () =>
                        toast.success("Wallet address copied")
                      )
                    }
                    className="flex flex-row items-center gap-1 font-semibold text-xs"
                  >
                    {shortenTransaction(data?.data?.walletAddress)}
                    <Copy size="16" color="#ffffff" variant="Bold" />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative max-w-fit -mt-16 mb-8 self-end rounded-full custom-shadow shadow-white">
              <div
                className="relative max-w-fit flex flex-row z-10"
                onClick={() => router.push(`/linkages/explore/${slug}/chat`)}
              >
                <Image
                  width={10}
                  height={10}
                  alt="display"
                  src={"/assets/small-star.png"}
                  className="w-[10px] h-[10px] absolute right-0"
                />
                <Image
                  width={42}
                  height={42}
                  alt="display"
                  className="w-[50px] h-auto"
                  src={data?.data.logo || "/assets/sample-icon.png"}
                />
              </div>
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="w-[58px] h-[58px] border-4 border-transparent border-t-purple-700 rounded-full animate-spin-slow"></div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">About</p>
              <p className="text-[13px] font-normal">
                {data?.data.description}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-sm font-bold">Reviews & Ratings</p>
              <div className="flex flex-col gap-6">
                {[{}].map((i, index) => (
                  <LinkageRatingsCard key={index} />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-6">
              <p className="text-sm font-bold">View Location on the map</p>
              <p className="text-[13px] font-normal">Coming soon</p>
            </div>

            <div className="flex flex-col gap-2 mt-10 mb-16">
              <p className="text-sm font-bold">More Linkages for you</p>

              {discoveryLinkages?.data?.data.map((i: any) => (
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
          </div>

          <div className="absolute mx-auto w-full">
            <div className="w-full fixed bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-4">
              <div className="w-full max-w-[450px] px-4 flex flex-col items-center space-y-4">
                <button
                  onClick={() => router.push(`/linkages/explore/${slug}`)}
                  className="flex flex-row gap-2 items-center justify-center w-[inherit] bg-white text-[#290064] rounded-[8px] py-3 font-bold text-base"
                >
                  <Image
                    alt="ai"
                    width={20}
                    height={20}
                    src={"/assets/sparkle.png"}
                    className="w-[20px] h-[20px]"
                  />
                  AI support
                </button>
                <button
                  onClick={() => router.push(`/linkages/explore/${slug}`)}
                  className="w-full bg-white text-[#290064] rounded-[8px] py-3 font-bold text-base"
                >
                  Schedule a Sesssion
                </button>
              </div>
            </div>
          </div>

          {/* Render the modal */}
          <AddStatusModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onProceed={handleModalProceed}
          />
        </main>
      )}
    </>
  );
};

export default LinkageViewDetails;
