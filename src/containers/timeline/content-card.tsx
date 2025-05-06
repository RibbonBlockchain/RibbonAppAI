import React, { useState, useEffect, useRef } from "react";
import { SocialContent } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import * as Dialog from "@radix-ui/react-dialog";
// import MintTokenButton from "./MintTokenButton";
// import BuyTokenButton from "./BuyTokenButton";
// import SellTokenButton from "./SellTokenButton";
import { TrendingUp } from "lucide-react";
import { useGetAuth } from "@/api/auth";
import { formatTimeAgo } from "@/lib/values/constants";
import {
  getPlatformColor,
  getPlatformIcon,
  getPlatformName,
} from "./socialPlatforms";
import { useContentActions } from "@/lib/useContentActions";
import { useContentTimer } from "@/lib/useContentTimer";

interface ContentCardProps {
  content: SocialContent;
}

const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasMedia, setHasMedia] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [mediaUrl, setMediaUrl] = useState<string | undefined>(undefined);
  const [isBoostAnimating, setIsBoostAnimating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // const { user } = useAuth(); // Get authentication status
  const { data: user } = useGetAuth({ enabled: true });

  const { remainingTime, timerWidth, isExpired } = useContentTimer(
    content.id,
    content.remainingTime
  );

  const { likeContent, repostContent, boostContent, shareContent, isPending } =
    useContentActions();

  useEffect(() => {
    // Check if content has media
    if (content.mediaUrls && content.mediaUrls.length > 0) {
      setHasMedia(true);
      setMediaUrl(content.mediaUrls[0]);

      // Check if media is video (this is a simple check, would be more robust in real app)
      const isVideoFile = content.mediaUrls[0]?.match(/\.(mp4|webm|ogg)$/i);

      // For YouTube content, assume it's a video for demo purposes
      const isYouTubeContent = content.platformName === "youtube";
      // For Zora, NFTs are often displayed as images (could be videos in real app)
      const isZoraContent = content.platformName === "zora";
      // For Warpcast, could be any media type
      setIsVideo(!!isVideoFile || isYouTubeContent);
    }
  }, [content]);

  useEffect(() => {
    if (isExpired) {
      // Animate out
      setIsAnimating(true);

      // Hide after animation completes
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [isExpired]);

  // Handler functions
  const handleLike = async () => {
    await likeContent(content.id);
  };

  const handleRepost = async () => {
    await repostContent(content.id);
  };

  const handleBoost = async () => {
    setIsBoostAnimating(true);
    await boostContent(content.id);

    // Play boost animation
    if (cardRef.current) {
      cardRef.current.classList.add("boost-animation");
      setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.classList.remove("boost-animation");
        }
        setIsBoostAnimating(false);
      }, 800);
    }
  };

  const handleShare = () => {
    if (content.originalUrl) {
      shareContent(content.originalUrl);
    }
  };

  if (!isVisible) {
    return null;
  }

  // Get platform-specific styling
  const getPlatformHighlightColor = () => {
    return {
      borderLeft: `4px solid ${getPlatformColor(content.platformName)}`,
    };
  };

  // Get platform-specific media styling
  const getMediaHeightClass = () => {
    // TikTok and YouTube get taller videos for portrait content
    if (content.platformName === "tiktok") {
      return "h-96 sm:h-[400px] md:h-[450px]";
    } else if (content.platformName === "youtube") {
      return "h-64 sm:h-80 md:h-96";
    } else if (content.platformName === "instagram") {
      return "h-64 sm:h-72 md:h-80"; // Square-ish for Instagram
    } else if (content.platformName === "zora") {
      return "h-72 sm:h-80 md:h-96"; // Taller for NFT art display
    } else if (content.platformName === "warpcast") {
      return "h-56 sm:h-64 md:h-72"; // Standard height for Warpcast
    } else {
      return "h-56 sm:h-64 md:h-72"; // Regular media height for other platforms
    }
  };

  // Open media in modal
  const openMediaModal = () => {
    if (hasMedia) {
      setIsModalOpen(true);
    }
  };

  // Handle video playback in modal
  const handleVideoPlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <>
      <Card
        ref={cardRef}
        className={`mb-4 overflow-hidden ${
          isExpired ? "opacity-60 translate-y-2" : "new-content"
        } ${isAnimating ? "opacity-60 translate-y-2" : ""}`}
        style={{
          transition: "transform 0.3s ease, opacity 0.2s ease",
          ...getPlatformHighlightColor(),
        }}
      >
        <div className="relative">
          {/* Timer bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-zinc-800">
            <div
              className="h-full bg-primary"
              style={{
                width: `${timerWidth}%`,
                transition: "width 0.1s linear",
              }}
            ></div>
          </div>

          {/* Card header */}
          <CardHeader className="flex flex-row items-center justify-between p-3 pt-6 pb-2 sm:p-4 sm:pt-6 sm:pb-2">
            <div className="flex items-center">
              <Avatar className="w-8 h-8 sm:w-10 sm:h-10 mr-2 sm:mr-3 flex-shrink-0">
                <AvatarImage
                  src={content.authorProfileImage}
                  alt={content.authorName || "Profile picture"}
                />
                <AvatarFallback>
                  {content.authorName?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                {" "}
                {/* Prevent overflow in small screens */}
                <div className="flex items-center flex-wrap">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base truncate max-w-[120px] sm:max-w-full">
                    {content.authorName || "User"}
                  </h3>
                  {content.authorUsername && (
                    <span className="ml-1 sm:ml-2 text-xs text-gray-500 dark:text-gray-400 truncate max-w-[80px] sm:max-w-full">
                      @{content.authorUsername}
                    </span>
                  )}
                </div>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 flex-wrap">
                  <span className="flex items-center truncate">
                    <i
                      className={`${getPlatformIcon(
                        content.platformName
                      )} mr-1`}
                      style={{ color: getPlatformColor(content.platformName) }}
                    ></i>
                    <span>{getPlatformName(content.platformName)}</span>
                    {(content.platformName === "warpcast" ||
                      content.platformName === "zora") && (
                      <Badge
                        variant="outline"
                        className="ml-2 px-1 py-0 h-4 text-[10px] border-current"
                        style={{
                          color: getPlatformColor(content.platformName),
                        }}
                      >
                        Web3
                      </Badge>
                    )}
                  </span>
                  <span className="mx-1">•</span>
                  <span className="truncate">
                    {formatTimeAgo(new Date(content.createdAt))}
                  </span>
                </div>
              </div>
            </div>
            {content.originalUrl && (
              <a
                href={content.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center"
              >
                <i className="ri-external-link-line text-lg sm:text-xl"></i>
              </a>
            )}
          </CardHeader>

          {/* Card content */}
          <CardContent
            className={`px-3 sm:px-4 ${hasMedia ? "pb-0" : "pb-2 sm:pb-3"}`}
          >
            {content.content && (
              <div
                className={`mb-3 text-sm sm:text-base cursor-pointer ${
                  content.platformName === "warpcast"
                    ? "px-3 py-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800"
                    : ""
                }`}
                onClick={openMediaModal}
              >
                <p className="text-gray-800 dark:text-gray-200 hover:text-gray-700 dark:hover:text-white">
                  {content.content}
                </p>
                {content.platformName === "warpcast" && (
                  <div className="flex items-center text-[11px] text-purple-600 dark:text-purple-400 mt-1">
                    <i className="ri-broadcast-line mr-1"></i>
                    <span>Cast</span>
                  </div>
                )}
              </div>
            )}

            {hasMedia && (
              <div
                className={`rounded-lg overflow-hidden mb-3 ${
                  isVideo ? "" : "bg-gray-100 dark:bg-zinc-800"
                } cursor-pointer ${
                  content.platformName === "zora"
                    ? "border-2 border-purple-400 dark:border-purple-600 shadow-lg"
                    : ""
                }`}
                onClick={openMediaModal}
              >
                {isVideo ? (
                  <div className="relative">
                    <video
                      className={`w-full object-cover ${getMediaHeightClass()}`}
                      poster={mediaUrl}
                      controls
                      preload="metadata"
                    >
                      <source src={mediaUrl} />
                    </video>
                    <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                      <i className="ri-fullscreen-line text-4xl text-white drop-shadow-md"></i>
                    </div>
                  </div>
                ) : (
                  <div className="relative group">
                    <img
                      src={mediaUrl}
                      alt="Content media"
                      className={`w-full object-cover ${getMediaHeightClass()}`}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <i className="ri-zoom-in-line text-4xl text-white drop-shadow-md"></i>
                    </div>
                    {content.platformName === "zora" && (
                      <div className="absolute top-2 left-2 bg-purple-500 text-white px-2 py-0.5 rounded-md text-xs font-medium">
                        NFT
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </CardContent>

          {/* Card actions */}
          <CardFooter className="flex items-center justify-between px-2 sm:px-4 py-2 sm:py-3 border-t border-gray-100 dark:border-zinc-800">
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Engagement buttons - only shown to authenticated users */}
              {user ? (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleLike}
                          disabled={isPending}
                          className="flex items-center text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500 p-0"
                        >
                          <i className="ri-heart-3-line text-lg sm:text-xl mr-1"></i>
                          <span className="text-xs sm:text-sm">
                            {content.likes.toLocaleString()}
                          </span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Like to keep this content visible longer</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleRepost}
                          disabled={isPending}
                          className="flex items-center text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-500 p-0"
                        >
                          <i className="ri-repeat-line text-lg sm:text-xl mr-1"></i>
                          <span className="text-xs sm:text-sm">
                            {content.reposts.toLocaleString()}
                          </span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Repost to keep this content visible longer</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleBoost}
                          disabled={isPending}
                          className={`flex items-center ${
                            remainingTime > 15
                              ? "text-amber-500 dark:text-amber-500"
                              : "text-gray-500 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-500"
                          } p-0`}
                        >
                          <i
                            className={`${
                              remainingTime > 15
                                ? "ri-rocket-fill"
                                : "ri-rocket-line"
                            } text-lg sm:text-xl mr-1`}
                          ></i>
                          <span className="text-xs sm:text-sm">
                            {remainingTime > 15 ? "Boosted" : "Boost"}
                          </span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Boost to keep this content visible longer</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                <>
                  {/* Display counts for non-authenticated users */}
                  <div className="flex items-center text-gray-500 dark:text-gray-400 p-0">
                    <i className="ri-heart-3-line text-lg sm:text-xl mr-1"></i>
                    <span className="text-xs sm:text-sm">
                      {content.likes.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-500 dark:text-gray-400 p-0">
                    <i className="ri-repeat-line text-lg sm:text-xl mr-1"></i>
                    <span className="text-xs sm:text-sm">
                      {content.reposts.toLocaleString()}
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {/* Token Buttons - available to all users */}
              {/* Show token buttons for every piece of content regardless of trending score */}
              <>
                {/* Use real components for token functionality for all content */}
                {/* <MintTokenButton contentId={content.id} />
                <BuyTokenButton contentId={content.id} />
                <SellTokenButton contentId={content.id} /> */}

                <p>Mint token</p>
                <p>Buy token</p>
                <p>Sell token</p>

                {/* Trending Badge - only shown if trending score exists */}
                {content.trendingScore && content.trendingScore > 0 && (
                  <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span className="text-xs">
                      #{Math.round(content.trendingScore || 0)}
                    </span>
                  </Badge>
                )}
              </>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleShare}
                      className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary p-0 h-8 w-8"
                    >
                      <i className="ri-share-forward-line text-lg sm:text-xl"></i>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardFooter>
        </div>
      </Card>

      {/* Media Modal */}
      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-50" />
          <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[90vh] w-[90vw] max-w-[1200px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white dark:bg-zinc-900 p-4 shadow-lg focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] z-50 overflow-auto">
            <div className="relative flex flex-col items-center">
              <Dialog.Close className="absolute right-2 top-2 rounded-full p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 bg-white/10 hover:bg-white/20 backdrop-blur-sm">
                <i className="ri-close-line text-2xl"></i>
              </Dialog.Close>

              {isVideo ? (
                <video
                  ref={videoRef}
                  className="max-h-[80vh] w-auto max-w-full rounded-md"
                  controls
                  autoPlay
                  onLoadedMetadata={handleVideoPlay}
                >
                  <source src={mediaUrl} />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={mediaUrl}
                  alt="Content media"
                  className="max-h-[80vh] w-auto max-w-full rounded-md"
                />
              )}

              <div className="w-full mt-4">
                <div className="flex items-center">
                  <Avatar className="w-10 h-10 mr-3">
                    <AvatarImage
                      src={content.authorProfileImage}
                      alt={content.authorName || "Profile picture"}
                    />
                    <AvatarFallback>
                      {content.authorName?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {content.authorName || "User"}
                      </h3>
                      {content.authorUsername && (
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                          @{content.authorUsername}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center">
                        <i
                          className={`${getPlatformIcon(
                            content.platformName
                          )} mr-1`}
                          style={{
                            color: getPlatformColor(content.platformName),
                          }}
                        ></i>
                        <span>{getPlatformName(content.platformName)}</span>
                        {(content.platformName === "warpcast" ||
                          content.platformName === "zora") && (
                          <Badge
                            variant="outline"
                            className="ml-2 px-1.5 py-0 h-5 text-[11px] border-current"
                            style={{
                              color: getPlatformColor(content.platformName),
                            }}
                          >
                            Web3
                          </Badge>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {content.content && (
                  <div
                    className={`mt-3 ${
                      content.platformName === "warpcast"
                        ? "px-4 py-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800"
                        : ""
                    }`}
                  >
                    <p className="text-gray-800 dark:text-gray-200">
                      {content.content}
                    </p>
                    {content.platformName === "warpcast" && (
                      <div className="flex items-center text-xs text-purple-600 dark:text-purple-400 mt-2">
                        <i className="ri-broadcast-line mr-1"></i>
                        <span>Cast on Farcaster</span>
                      </div>
                    )}
                  </div>
                )}

                {content.originalUrl && (
                  <a
                    href={content.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:underline mt-3"
                  >
                    <i className="ri-link mr-1"></i> View original post
                  </a>
                )}
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default ContentCard;
