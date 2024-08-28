"use client";

import {
  useGetLinkagesAI,
  useGetLinkageBySlug,
  useGetDiscoveryLinkages,
} from "@/api/ai";
import React, { useEffect } from "react";
import Image from "next/image";
import PageLoader from "@/components/loader";
import { copyToClipboard } from "@/lib/utils";
import { shorten } from "@/lib/utils/shorten";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import RatingCompleted from "@/containers/activity/rate-completed";
import { Call, Copy, Location, Sms, WalletMoney } from "iconsax-react";
import FeaturedLinkages from "@/containers/linkages/featured-linkages-card";

const LinkageRatingsCard = () => {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-2 items-center">
          <Image
            alt=""
            src={""}
            width={36}
            height={36}
            className="w-[36px] h-[36px] bg-white rounded-full"
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

  const { data: discoveryLinkages } = useGetDiscoveryLinkages({
    params: { page: 1, pageSize: 5, query: "" },
  });

  // list all AIs under the linkage
  const { data: getLinkagesAi } = useGetLinkagesAI(data?.data?.id);

  useEffect(() => {}, [data]);

  return (
    <>
      {isLoading && <PageLoader />}

      <Toaster />

      {data && (
        <main className="relative min-h-screen w-full text-white bg-[#0B0228]">
          <Image
            width={320}
            height={200}
            alt="display"
            className="w-full h-auto"
            onClick={() => router.back()}
            src={"/assets/linkage-details.png"}
          />

          <div className="flex flex-col gap-6 p-4 sm:p-6 pb-24">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col gap-3">
                <p className="text-lg font-bold">{data?.data.name}</p>
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
                <div className="flex flex-row items-start gap-3 text-xs font-normal">
                  <WalletMoney size="18" color="#ffffff" />
                  <div className="flex flex-col gap-1">
                    <p>Wallet address</p>
                    <div
                      onClick={() =>
                        copyToClipboard(
                          data?.data?.walletAddress?.addressId,
                          () => toast.success("Wallet address copied")
                        )
                      }
                      className="flex flex-row items-center gap-1 font-semibold"
                    >
                      {shorten(data?.data?.walletAddress?.addressId)}
                      <Copy size="16" color="#ffffff" variant="Bold" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center justify-between">
                <p className="text-sm font-bold">My Linkages AI</p>
                <button className="text-sm font-medium px-1.5 py-1 rounded-md bg-white text-[#290064]">
                  Add new AI
                </button>
              </div>

              {getLinkagesAi?.data?.map((item: any) => (
                <div
                  key={item.id}
                  className="text-[13px] font-normal cursor-pointer flex flex-row gap-4 items-center"
                  onClick={() =>
                    router.push(`/linkages/explore/${slug}/${item.slug}`)
                  }
                >
                  <div
                    onClick={() => router.push("/bot")}
                    className="relative max-w-fit flex flex-row"
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
                      src={item.image || "/assets/sample-icon.png"}
                    />
                  </div>
                  <div>
                    <p className="text-base font-bold">{item.name}</p>
                  </div>
                </div>
              ))}
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
                  image={i.image}
                  description={i.description}
                  author={i.userId}
                  slug={i.slug}
                />
              ))}
            </div>
          </div>

          <div className="absolute mx-auto w-full">
            <div className="w-full fixed bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-4">
              <div className="w-full max-w-[450px] px-4 flex flex-col items-center space-y-4">
                <button
                  onClick={() => router.push("/bot")}
                  className="flex flex-row gap-2 items-center justify-center w-[inherit] bg-white text-[#290064] rounded-[8px] py-3 font-bold text-base"
                >
                  <Image
                    alt="ai"
                    width={20}
                    height={20}
                    src={"/assets/sparkle.png"}
                  />{" "}
                  AI support
                </button>
                <button
                  onClick={() => router.push("/bot")}
                  className="w-full bg-white text-[#290064] rounded-[8px] py-3 font-bold text-base"
                >
                  Schedule a Sesssion
                </button>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default LinkageViewDetails;
