"use client";

import React, { useEffect, useState, useRef } from "react";
import Topbar from "@/containers/dashboard/top-bar";
import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";
import TimelineCard from "@/components/timeline-card";
import { useGetUserNotifications } from "@/api/user";
import { formatDateAndTimeAgo } from "@/lib/values/format-dateandtime-ago";
import { SpinnerIcon } from "@/components/icons/spinner";
import ActivityButton from "@/components/button/activity-button";

type EmbedType = "twitter" | "youtube" | "tiktok" | "instagram";
type EmbedData = {
  type: EmbedType;
  id: string;
  url: string;
  username?: string;
};

const TimelineComponent = () => {
  const { data: notifications, isLoading } = useGetUserNotifications();

  const sortedNotifications = notifications?.data?.sort((a: any, b: any) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const [url, setUrl] = useState("");
  const [embeds, setEmbeds] = useState<EmbedData[]>([]);
  const [error, setError] = useState("");

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
  }, [embeds]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const parsed = parseSocialUrl(url);
      if (parsed) {
        setEmbeds((prev) => [...prev, parsed]);
        setUrl("");
      } else {
        setError(
          "Invalid URL. Please enter a valid Twitter, YouTube, or TikTok URL."
        );
      }
    } catch (err) {
      setError("Error processing URL. Please check the format and try again.");
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

  const removeEmbed = (index: number) => {
    setEmbeds((prev) => prev.filter((_, i) => i !== index));
  };

  // Updated renderEmbed function with Instagram support
  const renderEmbed = (embed: EmbedData, index: number) => {
    switch (embed.type) {
      case "twitter":
        return (
          <div key={index} className="relative group">
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
          <div key={index} className="relative group">
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
          <div key={index} className="relative group">
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
          <div key={index} className="relative group">
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

  console.log(embeds, "here");

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
            Social Media Embed (Twitter, YouTube, Tiktok)
          </h1>

          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste Twitter, YouTube, or TikTok URL..."
                className="w-full bg-inherit text-[13px] py-2 px-2 rounded-[8px] border text-white placeholder:text-[#98A2B3] focus:ring-0 focus:outline-none"
              />
              <button
                type="submit"
                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Embed
              </button>
            </div>
            {error && (
              <p className="text-red-500 mt-2">
                {error.includes("Twitter, YouTube, or TikTok")
                  ? error.replace(
                      "Twitter, YouTube, or TikTok",
                      "Twitter, YouTube, TikTok, or Instagram"
                    )
                  : error}
              </p>
            )}{" "}
          </form>

          <div className="space-y-2">
            {embeds.map((embed, index) => (
              <div key={embed.url} className="flex flex-col gap-2">
                <div className="border rounded-lg bg-gray-50 dark:bg-gray-800">
                  {renderEmbed(embed, index)}
                </div>
                <div className="flex flex-row items-center justify-between mt-4">
                  <ActivityButton
                    className={"text-[#290064] bg-white rounded-md"}
                    text={"Mint"}
                    onClick={() => {}}
                  />
                  <ActivityButton
                    className={"text-[#290064] bg-white rounded-md"}
                    text={"Buy"}
                    onClick={() => {}}
                  />
                  <ActivityButton
                    className={"text-[#290064] bg-white rounded-md"}
                    text={"Sell"}
                    onClick={() => {}}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </AuthNavLayout>
  );
};

export default TimelineComponent;
