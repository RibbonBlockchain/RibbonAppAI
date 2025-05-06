"use client";

import React, { useEffect, useState } from "react";

type EmbedType = "twitter" | "youtube" | "tiktok";
type EmbedData = {
  type: EmbedType;
  id: string;
  url: string;
  username?: string;
};

const MultiSocialEmbed = () => {
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

    // No cleanup needed as we want scripts to persist
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

    return null;
  };

  const removeEmbed = (index: number) => {
    setEmbeds((prev) => prev.filter((_, i) => i !== index));
  };

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

      default:
        return null;
    }
  };

  return (
    <div className="social-embed p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Social Media Embed</h1>

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
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>

      <div className="space-y-4">
        {embeds.map((embed, index) => (
          <div
            key={index}
            className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-800"
          >
            {renderEmbed(embed, index)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiSocialEmbed;
