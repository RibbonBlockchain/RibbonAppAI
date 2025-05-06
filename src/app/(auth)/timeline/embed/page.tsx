"use client";

import React, { useEffect, useState } from "react";

type EmbedType = "twitter" | "youtube" | "tiktok" | "instagram";

type EmbedData = {
  type: EmbedType;
  id: string;
  username?: string;
  additionalData?: any;
};

const SocialEmbed = () => {
  const [url, setUrl] = useState("");
  const [embedData, setEmbedData] = useState<EmbedData | null>(null);
  const [error, setError] = useState("");

  // Load appropriate embed scripts when embedData changes
  useEffect(() => {
    if (!embedData) return;

    let script: HTMLScriptElement | null = null;

    switch (embedData.type) {
      case "twitter":
        script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        document.body.appendChild(script);
        break;

      case "youtube":
        // YouTube iframe API is usually loaded automatically when using iframe embeds
        break;

      case "tiktok":
        script = document.createElement("script");
        script.src = "https://www.tiktok.com/embed.js";
        script.async = true;
        document.body.appendChild(script);
        break;
    }

    return () => {
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [embedData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const parsed = parseSocialUrl(url);
      if (parsed) {
        setEmbedData(parsed);
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
    // Normalize x.com to twitter.com
    const normalizedUrl = url.replace(/x\.com/g, "twitter.com");

    // Try to match Twitter URL
    const twitterMatch = normalizedUrl.match(
      /(?:twitter\.com)\/(\w+)\/status\/(\d+)/i
    );
    if (twitterMatch && twitterMatch[1] && twitterMatch[2]) {
      return {
        type: "twitter",
        username: twitterMatch[1],
        id: twitterMatch[2],
      };
    }

    // Try to match YouTube URL
    const youtubeMatch = normalizedUrl.match(
      /(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|shorts\/)?([a-zA-Z0-9_-]{11})/i
    );
    if (youtubeMatch && youtubeMatch[1]) {
      return {
        type: "youtube",
        id: youtubeMatch[1],
      };
    }

    // Try to match TikTok URL
    const tiktokMatch = normalizedUrl.match(
      /(?:tiktok\.com)\/@([a-zA-Z0-9_.-]+)\/video\/(\d+)/i
    );
    if (tiktokMatch && tiktokMatch[1] && tiktokMatch[2]) {
      return {
        type: "tiktok",
        username: tiktokMatch[1],
        id: tiktokMatch[2],
      };
    }

    return null;
  };

  const renderEmbed = () => {
    if (!embedData) return null;

    switch (embedData.type) {
      case "twitter":
        return (
          <blockquote className="twitter-tweet">
            <a
              href={`https://twitter.com/${embedData.username}/status/${embedData.id}`}
            ></a>
          </blockquote>
        );

      case "youtube":
        return (
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${embedData.id}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="my-4"
          ></iframe>
        );

      case "tiktok":
        return (
          <blockquote
            className="tiktok-embed"
            cite={`https://www.tiktok.com/@${embedData.username}/video/${embedData.id}`}
            data-video-id={embedData.id}
          >
            <section>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.tiktok.com/@${embedData.username}?refer=embed`}
              >
                @{embedData.username}
              </a>
            </section>
          </blockquote>
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
            className="flex-1 p-2 border border-gray-300 rounded"
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

      {renderEmbed()}

      <div className="flex flex-row items-center justify-between mt-4">
        <button className="py-2 px-4 bg-green-200 rounded hover:bg-green-300">
          Mint
        </button>
        <button className="py-2 px-4 bg-green-200 rounded hover:bg-green-300">
          Buy
        </button>
        <button className="py-2 px-4 bg-green-200 rounded hover:bg-green-300">
          Sell
        </button>
      </div>
    </div>
  );
};

export default SocialEmbed;
