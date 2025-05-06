import React from "react";
import { Link } from "wouter";
import { platforms } from "./socialPlatforms";
import { useSocialMedia } from "@/context/socialmediacontext";

const ConnectionStatus: React.FC = () => {
  const { platforms: connectedPlatforms } = useSocialMedia();

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-wrap items-center justify-between text-xs">
          <div className="flex items-center mr-4 py-1">
            <span className="text-gray-600 dark:text-gray-400">
              Connected platforms:
            </span>
            <div className="flex ml-2">
              {Object.entries(platforms).map(([key, platform]) => {
                const isConnected = connectedPlatforms.some(
                  (p) => p.platformName === key && p.isConnected
                );
                return (
                  <span
                    key={key}
                    className={`inline-flex items-center mx-1 ${
                      isConnected ? "text-" + key : "opacity-50"
                    }`}
                    style={{ color: isConnected ? platform.color : undefined }}
                  >
                    <i className={platform.icon}></i>
                  </span>
                );
              })}
            </div>
          </div>
          <Link href="/connections">
            <button className="text-primary flex items-center py-1">
              Manage connections <i className="ri-arrow-right-s-line ml-1"></i>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConnectionStatus;
