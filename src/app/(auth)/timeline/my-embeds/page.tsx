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
import ActivityButton from "@/components/button/activity-button";
import AuthLayout from "@/containers/layout/auth/auth.layout";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import CreateTokenModal from "@/containers/timeline/create-timlinetoken-modal";
import BuyTimelineTokenModal from "@/containers/timeline/buy-timeline-token-modal";
import SellTimelineTokenModal from "@/containers/timeline/sell-timelinetoken-modal";
import { shorten } from "@/lib/utils/shorten";

type EmbedType = "twitter" | "youtube" | "tiktok" | "instagram";
type EmbedData = {
  type: EmbedType;
  id: string;
  url: string;
  username?: string;
};
type TokenData = {
  id: number;
  logo: string;
  name: string;
  symbol: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  description: string;
};

type TimelineWithEmbed = {
  timelineId: string;
  embed: EmbedData;
  token: TokenData;
};

const MyEmbeds = () => {
  const router = useRouter();

  const { mutate: createEmbed } = useCreateEmbed();
  const { data: getMyEmbeds, refetch: refetchEmbeds } = useGetMyEmbeds();

  const { mutate: createTimelineToken, isPending: createIsPending } =
    useCreateTimelineToken();

  const { mutate: buyTimelineToken, isPending: buyIsPending } =
    useBuyTimelineToken();
  const { mutate: sellTimelineToken, isPending: sellIsPending } =
    useSellTimelineToken();

  const [url, setUrl] = useState("");
  const [embeds, setEmbeds] = useState<EmbedData[]>([]);
  const [error, setError] = useState("");

  // Add this useEffect hook near your other useEffect hooks
  useEffect(() => {
    if (getMyEmbeds) {
      const formatted: TimelineWithEmbed[] = getMyEmbeds
        .map((entry: any) => {
          return {
            timelineId: entry.id,
            embed: entry.embed[0], // Assuming each entry has at least one embed
            token: entry.token,
          };
        })
        .filter((item: any) => item.embed); // Filter out entries without embeds

      setTimelineEmbeds(formatted);
    }
  }, [getMyEmbeds]);

  const [timelineEmbeds, setTimelineEmbeds] = useState<TimelineWithEmbed[]>([]);
  useEffect(() => {
    // TikTok needs special handling
    if (timelineEmbeds.some((e) => e.embed.type === "tiktok")) {
      const loadTikTok = () => {
        const tiktokScript = document.createElement("script");
        tiktokScript.src = "https://www.tiktok.com/embed.js";
        tiktokScript.async = true;
        tiktokScript.onload = () => {
          // Manually initialize TikTok embeds after script loads
          if (window.tiktokEmbed) {
            window.tiktokEmbed.lib.init();
          }
        };
        document.body.appendChild(tiktokScript);

        return tiktokScript;
      };

      const script = loadTikTok();

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [timelineEmbeds]); // Watch timelineEmbeds instead of embeds

  // Load appropriate embed scripts when embeds change
  useEffect(() => {
    // Twitter
    if (timelineEmbeds.some((e) => e.embed.type === "twitter")) {
      const twitterScript = document.createElement("script");
      twitterScript.src = "https://platform.twitter.com/widgets.js";
      twitterScript.async = true;
      twitterScript.onload = () => {
        if (window.twttr) {
          window.twttr.widgets?.load();
        }
      };
      document.body.appendChild(twitterScript);
    }

    // TikTok
    if (timelineEmbeds.some((e) => e.embed.type === "tiktok")) {
      const tiktokScript = document.createElement("script");
      tiktokScript.src = "https://www.tiktok.com/embed.js";
      tiktokScript.async = true;
      tiktokScript.onload = () => {
        if (window.tiktokEmbed) {
          window.tiktokEmbed.lib.init();
        }
      };
      document.body.appendChild(tiktokScript);
    }

    // Instagram
    if (timelineEmbeds.some((e) => e.embed.type === "instagram")) {
      const instagramScript = document.createElement("script");
      instagramScript.src = "//www.instagram.com/embed.js";
      instagramScript.async = true;
      document.body.appendChild(instagramScript);
    }

    return () => {
      // Cleanup all scripts
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
  }, [timelineEmbeds]);

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
          <div key={`${embed.id}-${index}`} className="relative group w-full">
            <div
              className="tiktok-embed-container"
              data-video-id={embed.id}
              data-username={embed.username}
            >
              <blockquote
                className="tiktok-embed w-full"
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
            </div>
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
          <div key={`${embed.id}-${index}`} className="relative group w-full">
            <div className="instagram-embed-container w-full flex justify-center">
              <blockquote
                className="instagram-media w-full max-w-full"
                data-instgrm-permalink={`https://www.instagram.com/p/${embed.id}/`}
                data-instgrm-version="14"
                style={{ width: "100%" }}
              ></blockquote>
            </div>
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

  const [selectedTimelineId, setSelectedTimelineId] = useState<string | null>(
    null
  );

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
    formData.append("embedId", selectedTimelineId || "");
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

  const handleBuyToken = (data: {
    amount: number;
    slippage: number;
    address: string;
  }) => {
    buyTimelineToken(
      {
        amount: data.amount.toString(),
        slippage: data.slippage,
        token: data.address,
      },
      {
        onSuccess: () => {
          toast.success("Token purchased successfully"),
            setIsBuyModalOpen(false);
        },
        onError: () => {
          setIsBuyModalOpen(false);
        },
      }
    );
  };

  const handleSellToken = (data: {
    amount: number;
    slippage: number;
    address: string;
  }) => {
    sellTimelineToken(
      {
        amount: data.amount.toString(),
        slippage: data.slippage,
        token: data.address,
      },
      {
        onSuccess: () => {
          toast.success("Token sold successfully"), setIsSellModalOpen(false);
        },
        onError: () => {
          setIsSellModalOpen(false);
        },
      }
    );
  };

  const [selectedToken, setSelectedToken] = useState<TokenData | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  return (
    <AuthLayout>
      <main className="w-full min-h-screen text-white bg-[#0B0228] p-4 sm:p-6 flex flex-col gap-4">
        <ArrowLeft
          size={20}
          className="text-white"
          onClick={() => router.back()}
        />

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

        <div className="space-y-4 mb-20">
          {timelineEmbeds.map((item, index) => (
            <div
              key={`${item.embed.id}-${index}`}
              className="flex flex-col gap-4"
            >
              <div className="border rounded-lg bg-gray-50 dark:bg-gray-800">
                {renderEmbed(item.embed, index)}
              </div>

              <div className="flex flex-row items-center justify-between mt-2">
                {/* if token, render token address and name */}
                {item.token ? (
                  <div className="flex items-center gap-2">
                    <img
                      src={item.token.logo}
                      alt={item.token.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="font-medium">
                        {item.token.name} ({item.token.symbol})
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {shorten(item.token.address)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <ActivityButton
                    className="text-[#290064] bg-white rounded-md"
                    text="Mint"
                    onClick={() => {
                      setSelectedTimelineId(item.timelineId);
                      setIsModalOpen(true);
                    }}
                  />
                )}

                <ActivityButton
                  className="text-[#290064] bg-white rounded-md"
                  text="Buy"
                  onClick={() => {
                    setSelectedToken(item.token);
                    setIsBuyModalOpen(true);
                  }}
                />

                <ActivityButton
                  className="text-[#290064] bg-white rounded-md"
                  text="Sell"
                  onClick={() => {
                    setSelectedToken(item.token);
                    setIsSellModalOpen(true);
                  }}
                />
              </div>
            </div>
          ))}

          {timelineEmbeds.length === 0 && (
            <div>You do not have any embeded post</div>
          )}
        </div>

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

        <BuyTimelineTokenModal
          isOpen={isBuyModalOpen}
          onClose={() => setIsBuyModalOpen(false)}
          onSubmit={(data) =>
            selectedToken &&
            handleBuyToken({
              ...data,
              address: selectedToken.address,
            })
          }
          isPending={buyIsPending}
        />

        <SellTimelineTokenModal
          isOpen={isSellModalOpen}
          onClose={() => setIsSellModalOpen(false)}
          onSubmit={(data) =>
            selectedToken &&
            handleSellToken({
              ...data,
              address: selectedToken.address,
            })
          }
          isPending={sellIsPending}
        />
      </main>
    </AuthLayout>
  );
};

export default MyEmbeds;
