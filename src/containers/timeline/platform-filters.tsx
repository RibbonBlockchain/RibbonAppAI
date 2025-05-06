import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useSocialMedia } from "@/context/socialmediacontext";
import { platforms } from "./socialPlatforms";

const PlatformFilters: React.FC = () => {
  const { selectedPlatform, setSelectedPlatform } = useSocialMedia();

  const handleFilterClick = (platform: string) => {
    setSelectedPlatform(platform);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 shadow-sm sticky top-14 sm:top-16 z-40">
      <div className="container max-w-3xl mx-auto px-1 sm:px-2">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex items-center py-1.5 sm:py-2">
            <Button
              //   variant={selectedPlatform === "all" ? "default" : "outline"}
              //   size="sm"
              className={`mr-1 first:ml-1 rounded-full flex items-center text-xs sm:text-sm h-7 sm:h-8 px-2.5 sm:px-3 ${
                selectedPlatform === "all"
                  ? "bg-primary text-white"
                  : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300"
              }`}
              onClick={() => handleFilterClick("all")}
            >
              <i className="ri-earth-line mr-1"></i> All
            </Button>

            {Object.entries(platforms).map(([key, platform]) => (
              <Button
                key={key}
                // variant={selectedPlatform === key ? "default" : "outline"}
                // size="sm"
                className={`mr-1 rounded-full flex items-center text-xs sm:text-sm h-7 sm:h-8 px-2.5 sm:px-3 ${
                  selectedPlatform === key
                    ? "bg-primary text-white"
                    : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => handleFilterClick(key)}
              >
                <i
                  className={`${platform.icon} mr-1`}
                  style={{
                    color: selectedPlatform === key ? "white" : platform.color,
                  }}
                ></i>
                <span className="truncate max-w-[50px] sm:max-w-none">
                  {platform.name}
                </span>
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default PlatformFilters;
