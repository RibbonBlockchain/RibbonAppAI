"use client";

import {
  useBuyTimelineToken,
  useBuyTimelineTokenDex,
  useCreateEmbed,
  useCreateTimelineToken,
  useGetEmbeds,
  useGetMyEmbeds,
  useSellTimelineToken,
  useSellTimelineTokenDex,
} from "@/api/timeline/index";
import toast from "react-hot-toast";
import React, { ChangeEvent, useEffect, useState } from "react";
import Topbar from "@/containers/dashboard/top-bar";
import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";
import TimelineCard from "@/components/timeline-card";
import { useGetUserNotifications } from "@/api/user";
import { formatDateAndTimeAgo } from "@/lib/values/format-dateandtime-ago";
import { SpinnerIcon } from "@/components/icons/spinner";
import ActivityButton from "@/components/button/activity-button";
import { mutate } from "swr";
import CreateTokenModal from "@/containers/timeline/create-timlinetoken-modal";

type EmbedType = "twitter" | "youtube" | "tiktok" | "instagram";
type EmbedData = {
  type: EmbedType;
  id: string;
  url: string;
  username?: string;
};

const TimelineComponent = () => {
  const { data: notifications, isLoading } = useGetUserNotifications();

  const { mutate: createEmbed } = useCreateEmbed();
  const { data: getAllEmbeds } = useGetEmbeds();
  const { data: getMyEmbeds, refetch: refetchEmbeds } = useGetMyEmbeds();

  const { mutate: createTimelineToken, isPending: createIsPending } =
    useCreateTimelineToken();
  const { mutate: buyTimelineToken } = useBuyTimelineToken();
  const { mutate: sellTimelineToken } = useSellTimelineToken();

  const sortedNotifications = notifications?.data?.sort((a: any, b: any) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const [url, setUrl] = useState("");
  const [embeds, setEmbeds] = useState<EmbedData[]>([]);
  const [allEmbeds, setAllEmbeds] = useState<EmbedData[]>([]);
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState<"my" | "all">("my"); // State to manage active tab

  const handleTabChange = (tab: "my" | "all") => {
    setActiveTab(tab);
  };

  // Load embeds from backend
  useEffect(() => {
    if (getMyEmbeds?.length) {
      const allEmbeds: EmbedData[] = getMyEmbeds
        .flatMap((entry: any) => entry.embed || [])
        .map((item: any) => {
          if (item.type && item.id && item.url) {
            return {
              type: item.type,
              id: item.id,
              url: item.url,
              username: item.username,
            };
          }
          return parseSocialUrl(item.url);
        })
        .filter(Boolean) as EmbedData[];

      setEmbeds(allEmbeds);
    }
  }, [getMyEmbeds]);

  useEffect(() => {
    if (getAllEmbeds?.length) {
      const allEmbeds: EmbedData[] = getAllEmbeds
        .flatMap((entry: any) => entry.embed || [])
        .map((item: any) => {
          if (item.type && item.id && item.url) {
            return {
              type: item.type,
              id: item.id,
              url: item.url,
              username: item.username,
            };
          }
          return parseSocialUrl(item.url);
        })
        .filter(Boolean) as EmbedData[];

      setAllEmbeds(allEmbeds);
    }
  }, [getAllEmbeds]);

  // Load appropriate embed scripts when embeds change
  useEffect(() => {
    // Twitter
    if (embeds.some((e) => e.type === "twitter")) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    }

    // TikTok
    if (embeds.some((e) => e.type === "tiktok")) {
      const script = document.createElement("script");
      script.src = "https://www.tiktok.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }

    // Instagram
    if (embeds.some((e) => e.type === "instagram")) {
      const script = document.createElement("script");
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }

    // Cleanup function to remove scripts
    return () => {
      document
        .querySelectorAll('script[src*="twitter.com/widgets.js"]')
        .forEach((el) => el.remove());
      document
        .querySelectorAll('script[src*="tiktok.com/embed.js"]')
        .forEach((el) => el.remove());
      document
        .querySelectorAll('script[src*="instagram.com/embed.js"]')
        .forEach((el) => el.remove());
    };
  }, [embeds]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const parsed = parseSocialUrl(url);
      if (!parsed) {
        throw new Error("Invalid URL. Please enter a valid social media URL.");
      }

      createEmbed(
        {
          embedItems: [parsed],
        },
        {
          onSuccess: () => {
            toast.success("Successfully embedded post");
            setUrl("");
            refetchEmbeds();
          },
          onError: (error: any) => {
            toast.error(error.message || "Failed to create embed");
          },
        }
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error processing URL");
    }
  };

  const parseSocialUrl = (url: string): EmbedData | null => {
    const normalizedUrl = url.replace(/x\.com/g, "twitter.com");

    // Twitter
    const twitterMatch = normalizedUrl.match(
      /(?:twitter\.com)\/(\w+)\/status\/(\d+)/i
    );
    if (twitterMatch?.[1] && twitterMatch?.[2]) {
      return {
        type: "twitter",
        username: twitterMatch[1],
        id: twitterMatch[2],
        url: normalizedUrl,
      };
    }

    // YouTube
    const youtubeMatch = normalizedUrl.match(
      /(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|shorts\/)?([a-zA-Z0-9_-]{11})/i
    );
    if (youtubeMatch?.[1]) {
      return {
        type: "youtube",
        id: youtubeMatch[1],
        url: normalizedUrl,
      };
    }

    // TikTok
    const tiktokMatch = normalizedUrl.match(
      /(?:tiktok\.com)\/@([a-zA-Z0-9_.-]+)\/video\/(\d+)/i
    );
    if (tiktokMatch?.[1] && tiktokMatch?.[2]) {
      return {
        type: "tiktok",
        username: tiktokMatch[1],
        id: tiktokMatch[2],
        url: normalizedUrl,
      };
    }

    // Instagram
    const instagramMatch = normalizedUrl.match(
      /(?:instagram\.com|instagr\.am)\/(?:p|reel)\/([a-zA-Z0-9_-]+)/i
    );
    if (instagramMatch?.[1]) {
      return {
        type: "instagram",
        id: instagramMatch[1],
        url: normalizedUrl,
      };
    }

    return null;
  };

  const removeEmbed = async (index: number) => {
    setEmbeds((prev) => prev.filter((_, i) => i !== index));
    toast.success("Embed removed");
  };

  const renderEmbed = (embed: EmbedData, index: number) => {
    switch (embed.type) {
      case "twitter":
        return (
          <div key={`${embed.id}-${index}`} className="relative group">
            <blockquote className="twitter-tweet">
              <a href={embed.url}></a>
            </blockquote>
            <button
              onClick={() => removeEmbed(index)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-full p-1 transition-opacity"
            >
              ×
            </button>
          </div>
        );

      case "youtube":
        return (
          <div key={`${embed.id}-${index}`} className="relative group">
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${embed.id}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
            <button
              onClick={() => removeEmbed(index)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-full p-1 transition-opacity"
            >
              ×
            </button>
          </div>
        );

      case "tiktok":
        return (
          <div key={`${embed.id}-${index}`} className="relative group">
            <blockquote
              className="tiktok-embed"
              cite={embed.url}
              data-video-id={embed.id}
            >
              <section>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.tiktok.com/@${embed.username}`}
                >
                  @{embed.username}
                </a>
              </section>
            </blockquote>
            <button
              onClick={() => removeEmbed(index)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-full p-1 transition-opacity"
            >
              ×
            </button>
          </div>
        );

      case "instagram":
        return (
          <div key={`${embed.id}-${index}`} className="relative group">
            <blockquote
              className="instagram-media"
              data-instgrm-permalink={`https://www.instagram.com/p/${embed.id}/`}
              data-instgrm-version="14"
            ></blockquote>
            <button
              onClick={() => removeEmbed(index)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-full p-1 transition-opacity"
            >
              ×
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");

  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState("");

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds the limit of 5MB.");
      return;
    }

    setLogoPreview(URL.createObjectURL(file));
    setLogo(file);
  };

  const handlehandleCreateTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("symbol", symbol);
    formData.append("description", description);
    formData.append("category", "Social");
    if (logo) formData.append("file", logo);

    createTimelineToken(
      {
        body: formData as any,
      },
      {
        onSuccess: () => {
          toast.success(`Token ${name} created`);
          setIsModalOpen(false);
        },
        onError: () => {
          toast.error("An error occurred while creating the token.");
        },
      }
    );
  };

  const handleBuyToken = () => {
    buyTimelineToken({
      amount: "0.00002",
      slippage: 5,
      token: "0xD05A63Ec12a81F7a5225288A64908aD456991204",
    });
  };

  const handleSellToken = () => {
    sellTimelineToken({
      amount: 20,
      slippage: 5,
      token: "0xD05A63Ec12a81F7a5225288A64908aD456991204",
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <AuthNavLayout>
      <main className="w-full min-h-screen text-white bg-[#0B0228] p-4 sm:p-6 flex flex-col gap-4">
        <Topbar>
          <p className="text-xl font-bold">Timeline</p>
        </Topbar>

        <section>
          {isLoading ? (
            <div className="mt-10 flex items-center justify-center">
              <SpinnerIcon />
            </div>
          ) : (
            <div className="space-y-4">
              {sortedNotifications?.map((i: any) => (
                <TimelineCard
                  key={i.id}
                  title={i.title}
                  image={null}
                  time={formatDateAndTimeAgo(i.createdAt).relativeTime}
                  description={i.message}
                  comments={i.comments.length}
                  likes={i.likes.length}
                  shares={""}
                  id={i.id}
                />
              ))}
            </div>
          )}
        </section>

        <section className="mb-20">
          <h1 className="font-bold mb-2">
            Social Media Embed (Twitter, YouTube, TikTok, Instagram)
          </h1>

          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste Twitter, YouTube, TikTok, or Instagram URL..."
                className="w-full bg-inherit text-[13px] py-2 px-2 rounded-[8px] border text-white placeholder:text-[#98A2B3] focus:ring-0 focus:outline-none"
              />
              <button
                type="submit"
                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Embed
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>

          <div className="flex space-x-4 mb-6">
            <button
              className={`px-4 py-2 rounded-lg text-lg font-medium transition-all duration-300 ${
                activeTab === "my"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-blue-100"
              }`}
              onClick={() => handleTabChange("my")}
            >
              My Embeds
            </button>
            <button
              className={`px-4 py-2 rounded-lg text-lg font-medium transition-all duration-300 ${
                activeTab === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-blue-100"
              }`}
              onClick={() => handleTabChange("all")}
            >
              All Embeds
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "my" ? (
              <div className="space-y-4">
                {embeds.map((embed, index) => (
                  <div
                    key={`${embed.id}-${index}`}
                    className="flex flex-col gap-4"
                  >
                    <div className="border rounded-lg bg-gray-50 dark:bg-gray-800">
                      {renderEmbed(embed, index)}
                    </div>
                    <div className="flex flex-row items-center justify-between mt-2">
                      <ActivityButton
                        className="text-[#290064] bg-white rounded-md"
                        text="Mint"
                        onClick={() => setIsModalOpen(true)}
                      />

                      <ActivityButton
                        className={"text-[#290064] bg-white rounded-md"}
                        text={"Buy"}
                        onClick={handleBuyToken}
                      />
                      <ActivityButton
                        className={"text-[#290064] bg-white rounded-md"}
                        text={"Sell"}
                        onClick={handleSellToken}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <div className="space-y-4">
                  {allEmbeds.map((embed, index) => (
                    <div
                      key={`${embed.id}-${index}`}
                      className="flex flex-col gap-4"
                    >
                      <div className="border rounded-lg bg-gray-50 dark:bg-gray-800">
                        {renderEmbed(embed, index)}
                      </div>
                      <div className="flex flex-row items-center justify-between mt-2">
                        <ActivityButton
                          className="text-[#290064] bg-white rounded-md"
                          text="Mint"
                          onClick={() => setIsModalOpen(true)}
                        />

                        <ActivityButton
                          className={"text-[#290064] bg-white rounded-md"}
                          text={"Buy"}
                          onClick={handleBuyToken}
                        />
                        <ActivityButton
                          className={"text-[#290064] bg-white rounded-md"}
                          text={"Sell"}
                          onClick={handleSellToken}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <CreateTokenModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          name={name}
          symbol={symbol}
          setName={setName}
          setSymbol={setSymbol}
          isSubmitDisabled={false}
          logoPreview={logoPreview}
          description={description}
          isPending={createIsPending}
          setDescription={setDescription}
          handleLogoChange={handleLogoChange}
          handleSubmit={handlehandleCreateTokenSubmit}
        />
      </main>
    </AuthNavLayout>
  );
};

export default TimelineComponent;
