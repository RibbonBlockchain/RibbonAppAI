"use client";

import {
  useBuyTimelineToken,
  useBuyTimelineTokenDex,
  useCommentEmbed,
  useCreateEmbed,
  useCreateTimelineToken,
  useDeleteEmbed,
  useFeaturedEmbed,
  useGetCommentEmbeds,
  useGetEmbeds,
  useGetLikedEmbeds,
  useGetMyEmbeds,
  useLikeEmbed,
  useSellTimelineToken,
  useSellTimelineTokenDex,
} from "@/api/timeline/index";
import toast from "react-hot-toast";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import ActivityButton from "@/components/button/activity-button";
import AuthLayout from "@/containers/layout/auth/auth.layout";
import { ArrowLeft, Heart, Repeat, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import CreateTokenModal from "@/containers/timeline/create-timlinetoken-modal";
import BuyTimelineTokenModal from "@/containers/timeline/buy-timeline-token-modal";
import SellTimelineTokenModal from "@/containers/timeline/sell-timelinetoken-modal";
import { shorten } from "@/lib/utils/shorten";
import { SpinnerIcon } from "@/components/icons/spinner";
import { Message } from "iconsax-react";
import ReplyCards from "@/components/timeline/reply-cards";
import Picker from "@emoji-mart/react";
import { formatDateAndTimeAgo } from "@/lib/values/format-dateandtime-ago";

import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import { parseEther } from "viem";
import abi from "../Abi.json";
import abi2 from "../Abi2.json";
import Web3 from "web3";
import { useAddTokenAddress } from "@/api/timeline/index";

type EmbedType =
  | "twitter"
  | "youtube"
  | "tiktok"
  | "instagram"
  | "zora"
  | "warpcast"
  | "farcaster";
type EmbedData = {
  type: EmbedType;
  id: string;
  url: string;
  username?: string;
  // Additional fields for Zora/Warpcast
  contractAddress?: string; // For Zora
  castHash?: string; // For Warpcast
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

  const { mutate: deleteEmbed } = useDeleteEmbed();
  const { mutate: featureEmbed } = useFeaturedEmbed();

  const { mutate: createTimelineToken, isPending: createIsPending } =
    useCreateTimelineToken();

  const { mutate: buyTimelineToken, isPending: buyIsPending } =
    useBuyTimelineToken();
  const { mutate: sellTimelineToken, isPending: sellIsPending } =
    useSellTimelineToken();

  const [url, setUrl] = useState("");
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

  // Add this to your useEffect for loading casts
  useEffect(() => {
    const loadFarcasterCasts = async () => {
      const farcasterEmbeds = timelineEmbeds.filter(
        (e) => e.embed.type === "farcaster"
      );
      if (farcasterEmbeds.length > 0) {
        try {
          const responses = await Promise.all(
            farcasterEmbeds.map((e) =>
              fetch(`https://api.farcaster.xyz/v1/casts/${e.embed.castHash}`)
            )
          );
          // Process and store cast data
        } catch (error) {
          console.error("Error loading Farcaster casts:", error);
        }
      }
    };

    loadFarcasterCasts();
  }, [timelineEmbeds]);

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

    // Zora
    const zoraMatch = normalizedUrl.match(
      /(?:zora\.co|zora\.xyz)\/(?:collect|eth)\/([a-zA-Z0-9:]+)/i
    );
    if (zoraMatch?.[1]) {
      return {
        type: "zora",
        id: zoraMatch[1],
        url: normalizedUrl,
        contractAddress: zoraMatch[1],
      };
    }

    // Warpcast
    const warpcastMatch = normalizedUrl.match(
      /(?:warpcast\.com)\/(\w+)\/(\w+)/i
    );
    if (warpcastMatch?.[2]) {
      return {
        type: "warpcast",
        id: warpcastMatch[2],
        url: normalizedUrl,
        castHash: warpcastMatch[2],
      };
    }

    // Warpcast/Farcaster
    const farcasterMatch = normalizedUrl.match(
      /(?:warpcast\.com|farcaster\.xyz)\/(\w+)\/(\w+)/i
    );
    if (farcasterMatch?.[2]) {
      return {
        type: "farcaster",
        id: farcasterMatch[2],
        url: normalizedUrl,
        castHash: farcasterMatch[2],
        username: farcasterMatch[1], // Store username too
      };
    }

    return null;
  };

  const removeEmbed = async (index: number) => {
    const item = timelineEmbeds[index];
    if (!item?.embed?.id) {
      toast.error("Embed ID not found");
      return;
    }
    deleteEmbed(
      { embedId: item.timelineId },
      {
        onSuccess: () => {
          setTimelineEmbeds((prev) => prev.filter((_, i) => i !== index));
          toast.success("Embed removed");
        },
      }
    );
  };

  const handleFeatureEmbed = async (index: number) => {
    const item = timelineEmbeds[index];
    if (!item?.embed?.id) {
      toast.error("Embed ID not found");
      return;
    }
    featureEmbed(
      { embedId: item.timelineId },
      {
        onSuccess: () => {
          setTimelineEmbeds((prev) => prev.filter((_, i) => i !== index));
          toast.success("Embed Featured");
        },
      }
    );
  };

  const renderEmbed = (embed: EmbedData, index: number) => {
    const ActionButtons = (
      <div className="w-full absolute top-2 left-2 flex gap-2 z-10 justify-between">
        <button
          onClick={() => handleFeatureEmbed(index)}
          className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm"
        >
          Feature
        </button>
        <button
          onClick={() => removeEmbed(index)}
          className="bg-red-500 text-white rounded-full px-3 py-1 text-sm"
        >
          ×
        </button>
      </div>
    );

    switch (embed.type) {
      case "twitter":
        return (
          <div key={`${embed.id}-${index}`} className="relative">
            <div className="w-full absolute top-2 left-2 flex gap-2 z-10 justify-between">
              <button
                onClick={() => handleFeatureEmbed(index)}
                className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm"
              >
                Feature
              </button>
              <button
                onClick={() => removeEmbed(index)}
                className="bg-red-500 text-white rounded-full px-3 py-1 text-sm"
              >
                ×
              </button>
            </div>{" "}
            <blockquote className="twitter-tweet">
              <a href={embed.url}></a>
            </blockquote>
          </div>
        );

      case "youtube":
        return (
          <div key={`${embed.id}-${index}`} className="relative">
            <div className="w-full absolute top-2 left-2 flex gap-2 z-10 justify-between">
              <button
                onClick={() => handleFeatureEmbed(index)}
                className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm"
              >
                Feature
              </button>
              <button
                onClick={() => removeEmbed(index)}
                className="bg-red-500 text-white rounded-full px-3 py-1 text-sm"
              >
                ×
              </button>
            </div>{" "}
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${embed.id}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        );

      case "tiktok":
        return (
          <div key={`${embed.id}-${index}`} className="relative w-full">
            <div className="w-full absolute top-2 left-2 flex gap-2 z-10 justify-between">
              <button
                onClick={() => handleFeatureEmbed(index)}
                className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm"
              >
                Feature
              </button>
              <button
                onClick={() => removeEmbed(index)}
                className="bg-red-500 text-white rounded-full px-3 py-1 text-sm"
              >
                ×
              </button>
            </div>{" "}
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
          </div>
        );

      case "instagram":
        return (
          <div key={`${embed.id}-${index}`} className="relative w-full">
            <div className="w-full absolute top-2 left-2 flex gap-2 z-10 justify-between">
              <button
                onClick={() => handleFeatureEmbed(index)}
                className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm"
              >
                Feature
              </button>
              <button
                onClick={() => removeEmbed(index)}
                className="bg-red-500 text-white rounded-full px-3 py-1 text-sm"
              >
                ×
              </button>
            </div>{" "}
            <div className="instagram-embed-container w-full flex justify-center">
              <blockquote
                className="instagram-media w-full max-w-full"
                data-instgrm-permalink={`https://www.instagram.com/p/${embed.id}/`}
                data-instgrm-version="14"
                style={{ width: "100%" }}
              ></blockquote>
            </div>
          </div>
        );

      case "zora":
        return (
          <div
            key={`${embed.id}-${index}`}
            className="relative w-full h-[600px]"
          >
            <div className="w-full absolute top-2 left-2 flex gap-2 z-10 justify-between">
              <button
                onClick={() => handleFeatureEmbed(index)}
                className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm"
              >
                Feature
              </button>
              <button
                onClick={() => removeEmbed(index)}
                className="bg-red-500 text-white rounded-full px-3 py-1 text-sm"
              >
                ×
              </button>
            </div>{" "}
            <iframe
              src={`https://zora.co/embed/${embed.contractAddress}`}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        );

      case "warpcast":
        return (
          <div key={`${embed.id}-${index}`} className="relative w-full">
            <div className="w-full absolute top-2 left-2 flex gap-2 z-10 justify-between">
              <button
                onClick={() => handleFeatureEmbed(index)}
                className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm"
              >
                Feature
              </button>
              <button
                onClick={() => removeEmbed(index)}
                className="bg-red-500 text-white rounded-full px-3 py-1 text-sm"
              >
                ×
              </button>
            </div>{" "}
            <iframe
              src={`https://warpcast.com/~/embed/casts/${embed.castHash}`}
              width="100%"
              height="400"
              frameBorder="0"
              className="rounded-lg"
            ></iframe>
          </div>
        );

      case "farcaster":
        return (
          <div key={`${embed.id}-${index}`} className="relative w-full">
            <div className="w-full absolute top-2 left-2 flex gap-2 z-10 justify-between">
              <button
                onClick={() => handleFeatureEmbed(index)}
                className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm"
              >
                Feature
              </button>
              <button
                onClick={() => removeEmbed(index)}
                className="bg-red-500 text-white rounded-full px-3 py-1 text-sm"
              >
                ×
              </button>
            </div>{" "}
            <div className="farcaster-embed p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                <div>
                  <p className="font-medium">@{embed.username}</p>
                  <p className="text-xs text-gray-500">Farcaster cast</p>
                </div>
              </div>
              <p className="mb-2">Loading cast...</p>
              <a
                href={embed.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View on Warpcast
              </a>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const [selectedTimelineId, setSelectedTimelineId] = useState<string | null>(
    null
  );
  const [selectedTimelineToken, setSelectedTimelineToken] = useState<
    string | null
  >(null);

  // const [name, setName] = useState("");
  // const [symbol, setSymbol] = useState("");
  // const [description, setDescription] = useState("");

  const [logo, setLogo] = useState<File | null>(null);
  // const [logoPreview, setLogoPreview] = useState("");

  // const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  //   if (!allowedTypes.includes(file.type)) {
  //     toast.error("Please upload a valid image file.");
  //     return;
  //   }

  //   if (file.size > 5 * 1024 * 1024) {
  //     toast.error("File size exceeds the limit of 5MB.");
  //     return;
  //   }

  //   setLogoPreview(URL.createObjectURL(file));
  //   setLogo(file);
  // };

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
  // const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  // const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  // const { data: getComments, refetch: refetchComments } = useGetCommentEmbeds({
  //   embedId: selectedTimelineId as string,
  // });
  // const { mutate: postComment } = useCommentEmbed();

  const [showComments, setShowComments] = useState(false);

  const [comment, setComment] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const emojiPickerRef = useRef<HTMLDivElement | null>(null);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleEmojiSelect = (emoji: any) => {
    setComment(comment + emoji.native);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // if (comment.trim()) {
    //   postComment(
    //     { embedId: selectedTimelineId as string, comment },
    //     {
    //       onSuccess: () => {
    //         setComment("");
    //         refetchComments();
    //         toast.success("New comment submitted");
    //       },
    //     }
    //   );
    // }
  };

  // const { mutate: likeNotification } = useLikeEmbed();
  const [isLiked, setIsLiked] = useState(false);

  // const { data: getLikes, refetch: refetchLikes } = useGetLikedEmbeds({
  //   embedId: selectedTimelineId as string,
  // });

  // const handleLikeNotification = () => {
  //   likeNotification(
  //     { embedId: selectedTimelineId as string },
  //     {
  //       onSuccess: () => {
  //         setIsLiked(!isLiked);
  //         // refetch();
  //       },
  //     }
  //   );
  // };

  const { address } = useAccount();
  const { isConnected } = useAccount();

  console.log(address, "smart address");
  // testnet parameters
  const network = baseSepolia;
  const bounding_curve = "0xE7bAB14fd484562b53c91c625D16368beb494DD3";
  const ribbonfactory = "0x0008ACAFe1024E1CE8e5CB628Cf302A94375938e";
  const alchemyURL =
    "https://base-sepolia.g.alchemy.com/v2/liLaWcC6Ivga84e3rgy3h2WbPmKEHO1G";

  // mainnet parameters
  // const network = base;
  // const bounding_curve = "0xd472c545aC4A482Ef08A2f73e007d4C403901c81";
  // const ribbonfactory = "0xfd878b3c723B57BBdBEE9FB7d5e663eb7774c440";
  // const alchemyURL =
  //   "https://base-mainnet.g.alchemy.com/v2/fw6todGL-HqWdvvhbGrx_nXxROeQQIth";

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  // Token creation form states
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [logoPreview, setLogoPreview] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");

  // Buy/Sell states
  const [amount, setAmount] = useState("");
  const [slippage, setSlippage] = useState("5");
  const [isPending, setIsPending] = useState(false);

  const { data: writeData, writeContract } = useWriteContract();
  const { data: receipt } = useWaitForTransactionReceipt({ hash: writeData });

  const { mutate: addTokenAddress } = useAddTokenAddress();

  const result = useReadContract({
    abi,
    address: ribbonfactory,
    functionName: "memeIdentifcation",
    args: [address],
    chainId: network.id,
  });

  console.log(selectedTimelineId, "selected timeline id???");
  console.log("selected address", selectedTimelineToken);

  useEffect(() => {
    if (receipt) {
      async function fetchAddressAndData() {
        const web3 = new Web3(alchemyURL);
        const contract = new web3.eth.Contract(abi, ribbonfactory);
        const checkadd = await contract.methods
          .memeIdentifcation(address)
          .call();

        console.log("checkadd ===>", checkadd);

        // @ts-ignore
        const contract2 = new web3.eth.Contract(abi2, checkadd);
        const tokenposturl = await contract2.methods.posturl().call();
        console.log(tokenposturl, "tokenpost url");

        console.log("call endpoint here to save address to bakend");
        console.log(result?.data, "result?");
        console.log("successfull");

        addTokenAddress(
          {
            body: {
              address: result?.data as string,
              embedId: selectedTimelineId as string,
            },
          },
          {
            onSuccess: () => {
              toast.success(`Token ${name} created successfully!`);
              setIsCreateModalOpen(false);
              resetForm();
            },
            onError: (error) => {
              console.error("Error adding token address:", error);
              toast.error("Token created but address update failed");
            },
          }
        );
      }
      fetchAddressAndData();
    }
  }, [receipt]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setLogoPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const createMeme = async () => {
    if (!name || !symbol || !embedUrl) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsPending(true);

    try {
      // First, create the token on-chain
      const txHash = await writeContract({
        abi,
        address: ribbonfactory,
        functionName: "createMemecoin",
        args: [address, bounding_curve, name, symbol, embedUrl],
        value: parseEther("0.0000002"),
        chain: network,
        account: address,
      });

      console.log(txHash, "txHash");
    } catch (error) {
      console.error("Error creating meme:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create token. Please try again."
      );
    } finally {
      setIsPending(false);
    }
  };

  // Helper function to reset form fields
  const resetForm = () => {
    setName("");
    setSymbol("");
    setDescription("");
    setEmbedUrl("");
    setLogoPreview("");
    setLogo(null);
  };

  const buyMeme = async () => {
    if (!amount || isNaN(Number(amount))) return;
    setIsPending(true);

    try {
      const web3 = new Web3(alchemyURL);

      const contract = new web3.eth.Contract(
        abi2,
        selectedTimelineToken as string
      );
      const tokenamount = await contract.methods
        .getEthBuyQuote(Number(amount) * 10 ** 18)
        .call();

      const slipage = Number(slippage) || 5;
      const amountafterslip =
        Number(tokenamount) - Number(tokenamount) * (slipage / 100);
      const amountafterslips = BigInt(amountafterslip);
      console.log(amountafterslips, amountafterslips.toString());

      await writeContract({
        abi: abi2,
        // @ts-ignore
        address: selectedTimelineToken as string,
        functionName: "buy",
        args: [address, address, 0, 0],
        value: parseEther(amount),
        chain: network,
        account: address,
      });
      setIsBuyModalOpen(false);

      console.log("buy successful");
    } catch (error) {
      console.error("Error buying meme:", error);
    } finally {
      setIsPending(false);
    }
  };

  const sellMeme = async () => {
    if (!amount || isNaN(Number(amount))) return;
    setIsPending(true);

    try {
      const web3 = new Web3(alchemyURL);

      const contract = new web3.eth.Contract(
        abi2,
        selectedTimelineToken as string
      );
      const tokenamount = await contract.methods.balanceOf(address).call();
      const sellAmount = parseEther(amount);

      if (Number(sellAmount) > Number(tokenamount)) {
        alert("You don't have enough tokens");
        return;
      }

      const ethamount = await contract.methods
        .getTokenSellQuote(sellAmount)
        .call();
      console.log(ethamount, "ll");

      const slipage = Number(slippage) || 5;
      const amountafterslip =
        Number(ethamount) - Math.round(Number(ethamount) * (slipage / 100));
      const amountafterslips = BigInt(amountafterslip);

      await writeContract({
        abi: abi2,
        // @ts-ignore
        address: selectedTimelineToken as string,
        functionName: "sell",
        args: [sellAmount, address, 0, amountafterslips],
        chain: network,
        account: address,
      });

      console.log("sell successful");

      setIsSellModalOpen(false);
    } catch (error) {
      console.error("Error selling meme:", error);
    } finally {
      setIsPending(false);
    }
  };

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
              placeholder="Paste Twitter, YouTube, TikTok, Instagram, Zora, or Warpcast URL..."
              className="w-full bg-inherit text-[13px] py-2 px-2 rounded-[8px] border text-white placeholder:text-[#98A2B3] focus:ring-0 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isPending}
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {isPending ? <SpinnerIcon /> : "Embed"}
            </button>
          </div>
          {error && (
            <p className="text-red-500 mt-2">
              {error.includes("Twitter, YouTube, or TikTok")
                ? error.replace(
                    "Twitter, YouTube, or TikTok",
                    "Twitter, YouTube, TikTok, Instagram, Zora, or Warpcast"
                  )
                : error}
            </p>
          )}{" "}
        </form>

        <div className="space-y-4 mb-20">
          {timelineEmbeds.map((item, index) => (
            <div
              key={`${item.embed.id}-${index}`}
              className="flex flex-col gap-3"
            >
              <div className="border rounded-lg bg-gray-50 dark:bg-gray-800">
                {renderEmbed(item.embed, index)}
              </div>

              {/* <div className="flex flex-row items-center justify-between text-[#FFFFFF80] text-[10px] font-semibold">
                <div
                  onClick={() => {
                    setShowComments(!showComments),
                      setSelectedTimelineId(item.timelineId);
                  }}
                  className="flex flex-row gap-1.5 items-center"
                >
                  <Message size={18} width={18} height={18} fill="#FFFFFF80" />
                  {getComments?.comments.length}
                </div>
                <div
                  onClick={() => {
                    setSelectedTimelineId(item.timelineId);
                    handleLikeNotification;
                  }}
                  className="flex flex-row gap-1.5 items-center"
                >
                  <Heart
                    size={18}
                    width={18}
                    height={18}
                    fill={isLiked ? "red" : "#0B0228"}
                  />
                  {getLikes?.likes.length}
                </div>
                <div
                  // onClick={() => setOpenShareModal(true)}
                  className="flex flex-row gap-1.5 items-center"
                >
                  <Repeat size={18} width={18} height={18} />
                </div>
              </div> */}

              {/* {showComments && (
                <div className="w-full max-h-[350px] min-h-[200px] flex flex-col overflow-hidden space-y-2">
                  <div className="w-full flex-1 overflow-y-auto space-y-2">
                    {getComments?.comments.length === 0 ? (
                      <div className="mt-10 text-center">
                        <p>No comments under this post</p>
                        <p>Be the first to add a comment</p>
                      </div>
                    ) : (
                      <>
                        {getComments?.comments.map((index: any) => (
                          <ReplyCards
                            key={index}
                            comments={""}
                            title={"Title"}
                            time={
                              formatDateAndTimeAgo(index.createdAt).relativeTime
                            }
                            description={index.comment}
                            likes={""}
                            shares={""}
                            id={""}
                          />
                        ))}
                      </>
                    )}
                  </div>

                  <div
                    ref={emojiPickerRef}
                    className="w-full max-w-[500px] mx-auto px-4 py-2 bg-[#1E1C2D]"
                  >
                    <form
                      onSubmit={handleCommentSubmit}
                      className="flex flex-row gap-1 mx-auto w-full"
                    >
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={handleCommentChange}
                        className="w-full p-2.5 rounded-md bg-[#1E1C2D] text-white placeholder-[#ffffff80] border border-[#FFFFFF14] focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="px-3 bg-[#290064] text-white rounded-full hover:bg-[#380085] flex items-center justify-center"
                      >
                        <Send size={24} />
                      </button>

                      <button
                        type="button"
                        onClick={toggleEmojiPicker}
                        className="px-3 bg-[#290064] text-white rounded-full hover:bg-[#380085] flex items-center justify-center"
                      >
                        😊
                      </button>
                    </form>

                    {showEmojiPicker && (
                      <div className="absolute bottom-16 left-0 right-0 mx-auto">
                        <Picker onEmojiSelect={handleEmojiSelect} />
                      </div>
                    )}
                  </div>
                </div>
              )} */}

              {!isConnected && (
                <div className="flex flex-row items-center justify-between mt-0">
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
              )}

              {isConnected && (
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
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
                    <button
                      onClick={() => {
                        setSelectedTimelineId(item.timelineId);
                        setIsCreateModalOpen(true);
                      }}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Create Token
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setSelectedTimelineToken(item.token.address as string);
                      setIsBuyModalOpen(true);
                    }}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Buy Meme
                  </button>

                  <button
                    onClick={() => {
                      setSelectedTimelineToken(item.token.address as string);
                      setIsSellModalOpen(true);
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Sell Meme
                  </button>
                </div>
              )}
            </div>
          ))}

          {timelineEmbeds.length === 0 && (
            <div>You do not have any embeded post</div>
          )}
        </div>

        <CreateTokenModal
          isOpen={isModalOpen && !isConnected}
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
          isOpen={isBuyModalOpen && !isConnected}
          onClose={() => setIsBuyModalOpen(false)}
          onSubmit={(data) =>
            selectedToken &&
            handleBuyToken({
              ...data,
              address: selectedToken.address,
            })
          }
          isPending={buyIsPending}
          contractAddress={selectedToken?.address as string}
        />

        <SellTimelineTokenModal
          isOpen={isSellModalOpen && !isConnected}
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

        {/* Create Token Modal */}
        {isCreateModalOpen && isConnected && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-[#0B0228] rounded-lg shadow-xl text-white p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Create New Token</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded bg-inherit"
                  placeholder="Token Name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Symbol</label>
                <input
                  type="text"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  className="w-full p-2 border rounded bg-inherit"
                  placeholder="Token Symbol"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Embed URL
                </label>
                <input
                  type="text"
                  value={embedUrl}
                  onChange={(e) => setEmbedUrl(e.target.value)}
                  className="w-full p-2 border rounded bg-inherit"
                  placeholder="https://example.com/meme"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Logo</label>
                <input
                  type="file"
                  onChange={handleLogoChange}
                  className="w-full p-2 border rounded bg-inherit"
                />
                {logoPreview && (
                  <img
                    src={logoPreview}
                    alt="Logo Preview"
                    className="mt-2 h-16 w-16 object-cover"
                  />
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border rounded bg-inherit"
                  placeholder="Token description"
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={createMeme}
                  disabled={!name || !symbol || !embedUrl || isPending}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                >
                  {isPending ? "Creating..." : "Create"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Buy Token Modal */}
        {isBuyModalOpen && isConnected && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#0B0228] rounded-lg shadow-xl text-white p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Buy Meme Tokens</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Amount (ETH)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-2 border rounded bg-inherit"
                  placeholder="0.00"
                  step="0.0001"
                  min="0"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Slippage (%)
                </label>
                <input
                  type="number"
                  value={slippage}
                  onChange={(e) => setSlippage(e.target.value)}
                  className="w-full p-2 border rounded bg-inherit"
                  placeholder="5"
                  min="0"
                  max="100"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsBuyModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={buyMeme}
                  disabled={!amount || isNaN(Number(amount)) || isPending}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                >
                  {isPending ? "Processing..." : "Buy"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sell Token Modal */}
        {isSellModalOpen && isConnected && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#0B0228] rounded-lg shadow-xl text-white p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Sell Meme Tokens</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Amount (Tokens)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-2 border rounded bg-inherit"
                  placeholder="0.00"
                  step="1"
                  min="0"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Slippage (%)
                </label>
                <input
                  type="number"
                  value={slippage}
                  onChange={(e) => setSlippage(e.target.value)}
                  className="w-full p-2 border rounded bg-inherit"
                  placeholder="5"
                  min="0"
                  max="100"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsSellModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={sellMeme}
                  disabled={!amount || isNaN(Number(amount)) || isPending}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                >
                  {isPending ? "Processing..." : "Sell"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </AuthLayout>
  );
};

export default MyEmbeds;
