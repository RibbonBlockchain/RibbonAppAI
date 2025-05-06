"use client";

import { useState } from "react";

type Platform = "youtube" | "tiktok" | "zora";

const SocialMediaIframes = () => {
  const [activeTab, setActiveTab] = useState<Platform>("youtube");

  return (
    <div className="social-media-container">
      <div className="tabs">
        <button
          className={activeTab === "youtube" ? "active" : ""}
          onClick={() => setActiveTab("youtube")}
        >
          YouTube Shorts
        </button>
        <button
          className={activeTab === "tiktok" ? "active" : ""}
          onClick={() => setActiveTab("tiktok")}
        >
          TikTok
        </button>
        <button
          className={activeTab === "zora" ? "active" : ""}
          onClick={() => setActiveTab("zora")}
        >
          Zora
        </button>
      </div>

      <div className="iframe-container">
        {activeTab === "youtube" && (
          <div className="iframe-wrapper">
            <iframe
              src="https://www.youtube.com/shorts/"
              title="YouTube Shorts"
              className="social-iframe"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="iframe-fallback">
              <p>
                YouTube doesn&apos;t allow embedding of the Shorts homepage.
              </p>
              <a
                href="https://www.youtube.com/shorts/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open YouTube Shorts in new tab
              </a>
            </div>
          </div>
        )}

        {activeTab === "tiktok" && (
          <div className="iframe-wrapper">
            <iframe
              src="https://www.tiktok.com/foryou"
              title="TikTok For You"
              className="social-iframe"
            />
            <div className="iframe-fallback">
              <p>TikTok blocks embedding of the For You page.</p>
              <a
                href="https://www.tiktok.com/foryou"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open TikTok in new tab
              </a>
            </div>
          </div>
        )}

        {activeTab === "zora" && (
          <div className="iframe-wrapper">
            <iframe
              src="https://zora.co/"
              title="Zora"
              className="social-iframe"
            />
            <div className="iframe-fallback">
              <p>Zora may restrict some embedded content.</p>
              <a
                href="https://zora.co/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Zora in new tab
              </a>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .social-media-container {
          max-width: 100%;
          margin: 0 auto;
          padding: 20px;
        }

        .tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }

        .tabs button {
          padding: 10px 20px;
          background: #f0f0f0;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .tabs button.active {
          background: #0070f3;
          color: white;
        }

        .iframe-container {
          height: 80vh;
          border: 1px solid #eee;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
        }

        .iframe-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .social-iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        .iframe-fallback {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.9);
          padding: 20px;
          text-align: center;
        }

        .iframe-fallback a {
          margin-top: 10px;
          color: #0070f3;
          text-decoration: none;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default SocialMediaIframes;
