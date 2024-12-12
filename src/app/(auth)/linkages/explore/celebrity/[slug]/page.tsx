"use client";

import Image from "next/image";
import Button from "@/components/button";
import { useParams, useRouter } from "next/navigation";
import { Copy, Gift, Share } from "lucide-react";
import AuthLayout from "@/containers/layout/auth/auth.layout";
import { ArrowLeft2, Microphone, People, Send, User } from "iconsax-react";
import {
  useChatLinkage,
  useGetChatHistory,
  useGetLinkageBySlug,
  useGetLinkageQuestionnaire,
} from "@/api/linkage";
import { shorten } from "@/lib/utils/shorten";
import { alternatePrompts } from "@/lib/values/prompts";
import { useState, KeyboardEvent, useRef, useEffect } from "react";
import { useCreateUserToken } from "@/api/user";
import toast from "react-hot-toast";
import Buy from "./buy/buy";
import Sell from "./sell/sell";
import Swap from "./swap/swap";
import ToggleBuySell from "@/components/toggleBuySell";

const influencerStoreData = [
  { id: 1, image: "", title: "Tyla Digital 2024", price: 15, currency: "$" },
  { id: 2, image: "", title: "Tyla Digital 2024", price: 15, currency: "$" },
  {
    id: 3,
    image: "",
    title: "Tyla Digital 2024 Long text",
    price: 15,
    currency: "$",
  },
  { id: 4, image: "", title: "Tyla Digital 2024", price: 15, currency: "$" },
  { id: 5, image: "", title: "Tyla Digital 2024", price: 15, currency: "$" },
  { id: 6, image: "", title: "Tyla Digital 2024", price: 15, currency: "$" },
];

const tokenTabs: TabProps[] = [
  { title: "Initial Token Sale", id: "token-sale" },
  { title: "DEX Token Trader", id: "token-trader" },
];

interface TabProps {
  title: string;
  id: string;
}

interface Message {
  sender: "user" | "ai";
  text: string;
}

const Influencer = () => {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [selectedCelebrityTab, setSelectedCelebrityTab] = useState(() => {
    const savedTab = localStorage.getItem("selectedCelebrityTab");
    return savedTab ? savedTab : "ai";
  });

  useEffect(() => {
    localStorage.setItem("selectedCelebrityTab", selectedCelebrityTab);
  }, [selectedCelebrityTab]);

  const handleTabClick = (tab: string) => {
    setSelectedCelebrityTab(tab);
  };

  const [activeTokenTab, setActiveTokenTab] = useState<string>("token-sale");
  const [activeTraderPage, setActiveTradePage] = useState<string>("home");

  const [amount, setAmount] = useState<number>();

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = event.target.value;

    if (!isNaN(Number(newAmount))) {
      setAmount(Number(newAmount));
    }
  };

  const { data, isLoading, isError } = useGetLinkageBySlug(slug);
  const { mutateAsync } = useChatLinkage();

  const id = data?.data?.id;
  const { data: linkageQuestionnaire } = useGetLinkageQuestionnaire({
    linkageId: id,
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [oldMessages, setOldMessages] = useState<Message[]>([]);

  const prompts: string[] =
    (data?.data?.prompts || []).filter((prompt: any) => prompt.trim() !== "") ||
    alternatePrompts;

  const sendMessage = async (message: string) => {
    try {
      const newUserMessage: Message = { sender: "user", text: message };
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);

      const response = await mutateAsync({ slug, body: { message } });
      const aiMessage =
        response?.data?.message || "Sorry, I didn't get a response.";
      const newAiMessage: Message = { sender: "ai", text: aiMessage };
      setMessages((prevMessages) => [...prevMessages, newAiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "ai",
          text: "Sorry, there was an error processing your request.",
        },
      ]);
    }
  };

  const handleSend = () => {
    if (input.trim() === "") return;

    sendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const { data: chatHistory } = useGetChatHistory(slug);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const tabs = [
    { name: `${slug} AI`, value: "ai" },
    { name: "$Token", value: "token" },
    { name: "Store", value: "store" },
    { name: "LIVE", value: "live" },
  ];

  const handleSwapToken = () => {
    router.push(`/linkages/explore/celebrity/${slug}/swap`);
  };
  const handleBuyToken = () => {
    router.push(`/linkages/explore/celebrity/${slug}/buy`);
  };
  const handleSellToken = () => {
    router.push(`/linkages/explore/celebrity/${slug}/sell`);
  };

  const createdToken = true;

  return (
    <AuthLayout>
      <main className="w-auto max-w-[450px] relative h-screen text-white bg-[#251F2E]">
        <div className="p-4 sm:p-6 fixed bg-[#2c2151] z-20 w-full max-w-[450px] ">
          <div className="flex flex-row items-center gap-4 mt-2">
            <ArrowLeft2
              size="24"
              color="#ffffff"
              className="my-2"
              onClick={() => router.back()}
            />
            <p className="text-[20px] font-bold">{slug} AI</p>
          </div>

          <div className="bg-[#5e5482] h-auto mt-4 flex flex-col justify-between text-white rounded-2xl w-full min-w-[270px] xxs:min-w-[330px] xs:min-w-full max-w-[452px] p-4 my-2 border border-[#D6CBFF4D]">
            <div className="flex flex-row items-start justify-between">
              <div className="flex flex-col xxs:flex-row gap-2 items-center">
                <Image
                  width={64}
                  height={64}
                  alt="avatar"
                  className="bg-white rounded-full"
                  src={data?.data?.logo}
                />
                <div className="flex flex-col text-xs font-medium gap-1">
                  <div className="flex flex-row gap-1 text-base font-bold">
                    <p>{slug}</p>
                  </div>
                  <p>{data?.data?.category}</p>
                  <p className="text-[#DFCBFB] text-underline">audio link</p>
                  <p>
                    <span className="font-extrabold">92.5M</span> followers
                  </p>
                </div>
              </div>

              <div className="min-h-[86px] flex flex-col items-end justify-between h-[inherit]">
                <div className="text-[#DFCBFB] text-xs font-bold flex flex-row gap-1 items-center">
                  {shorten(data?.data.walletAddress)}
                  <Copy size={16} />
                </div>
                <Button className="self-end max-w-fit px-3 py-0.5">
                  Follow
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-row items-start justify-between w-full overflow-x-auto scroll-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => handleTabClick(tab.value)}
                className={`min-w-fit border-[1px] border-[#FFFFFF] text-center text-[13px] px-3 pt-[7px] pb-[6px] rounded-[32px] ${
                  selectedCelebrityTab === tab.value
                    ? `text-white bg-[#D6CBFF4D] font-bold`
                    : `text-[#F2EEFF] font-medium`
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        <main className="relative rounded-xl w-full top-[274px] overflow-y-auto bg-[#251F2E] flex flex-col">
          {selectedCelebrityTab === "ai" && (
            <main className="h-full text-white flex flex-col rounded-xl">
              <div className="fixed z-20 p-4 py-6 w-full max-w-[450px] border-b border-[#C3B1FF1A] flex flex-row items-center justify-between bg-[#251F2E]">
                <p className="text-xl font-bold">{slug} AI Chat</p>
                <div className="flex flex-col justify-center gap-1 text-xs font-medium">
                  <p>Balance</p>
                  <div className="flex flex-row items-center text-[13px] justify-center gap-1">
                    <Image
                      src={"/assets/ribbon.svg"}
                      alt="logo"
                      width={16}
                      height={16}
                      className="max-h-4 max-w-4"
                    />
                    <p>20 $Tyla</p>
                  </div>
                </div>
              </div>

              <section className="flex-1 overflow-y-auto pt-[100px] mb-16">
                <div className="relative w-full mt-2 p-4 flex flex-col h-full overflow-auto scroll-hidden mx-auto rounded-lg shadow-lg">
                  <div className="flex-1 h-full overflow-y-auto mb-16">
                    {/* Display old messages first */}
                    {oldMessages.map((msg, index) => (
                      <div
                        key={index}
                        className={`mb-6 flex flex-row gap-2 items-start ${
                          msg.sender === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        {msg.sender === "ai" && (
                          <div className="w-8 h-8 self-end flex-shrink-0">
                            <Image
                              alt="AI"
                              width={32}
                              height={32}
                              src="/assets/AI.png"
                            />
                          </div>
                        )}
                        <div
                          className={`inline-block px-4 py-2.5 rounded-lg w-auto max-w-[65%] text-sm font-normal ${
                            msg.sender === "user"
                              ? "bg-[#3f3952] bg-opacity-95 text-white rounded-l-[12px] rounded-tr-[12px] rounded-br-[4px]"
                              : "bg-[#3f3952] bg-opacity-95 text-white rounded-r-[12px] rounded-tl-[12px] rounded-bl-[4px]"
                          }`}
                        >
                          {msg.text}
                        </div>
                        {msg.sender === "user" && (
                          <div className="w-8 h-8 self-end flex-shrink-0">
                            <User
                              size="32"
                              fill="gray"
                              className="flex bg-white rounded-full"
                            />
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Display new messages */}
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`mb-6 flex flex-row gap-2 items-start ${
                          msg.sender === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        {msg.sender === "ai" && (
                          <div className="w-8 h-8 self-end flex-shrink-0">
                            <Image
                              alt="AI"
                              width={32}
                              height={32}
                              src="/assets/AI.png"
                            />
                          </div>
                        )}
                        <div
                          className={`inline-block px-4 py-2.5 rounded-lg w-auto max-w-[65%] text-sm font-normal ${
                            msg.sender === "user"
                              ? "bg-[#3f3952] bg-opacity-95 text-white rounded-l-[12px] rounded-tr-[12px] rounded-br-[4px]"
                              : "bg-[#3f3952] bg-opacity-95 text-white rounded-r-[12px] rounded-tl-[12px] rounded-bl-[4px]"
                          }`}
                        >
                          {msg.text}
                        </div>
                        {msg.sender === "user" && (
                          <div className="w-8 h-8 self-end flex-shrink-0">
                            <User
                              size="32"
                              fill="gray"
                              className="flex bg-white rounded-full"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="fixed self-center bottom-2 p-4 w-[90%] max-w-[450px]">
                    <div className="flex flex-row items-center">
                      <input
                        type="text"
                        value={input}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        className="w-full text-sm bg-[#3f3952] bg-opacity-75 backdrop-blur-sm pl-4 pr-14 py-4 border rounded-full"
                      />
                      <button
                        onClick={handleSend}
                        className="absolute right-8 z-10"
                      >
                        <Send size="32" color="#ffffff" />
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          )}

          {selectedCelebrityTab === "token" && (
            <section>
              <div className="bg-[#251F2E] fixed z-20 w-full flex items-center justify-center gap-4 py-2">
                {tokenTabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`px-4 py-2 ${
                      activeTokenTab === tab.id
                        ? "border-b border-b-white text-white"
                        : "text-white"
                    }`}
                    onClick={() => setActiveTokenTab(tab.id)}
                  >
                    {tab.title}
                  </button>
                ))}
              </div>

              {activeTokenTab === "token-sale" && (
                <main className="mt-[36px] h-full text-white flex flex-col rounded-xl">
                  <div className="p-4 py-6 flex flex-col w-full max-w-[450px] border-b border-[#C3B1FF1A] items-start justify-between gap-6 bg-[#251F2E]">
                    <div className="w-full p-3 flex flex-col gap-4 border border-white rounded-[12px]">
                      <ToggleBuySell onChange={() => {}} />

                      <div className="w-full flex flex-row items-center gap-2 relative">
                        <input
                          type="number"
                          value={amount}
                          onChange={handleAmountChange}
                          className="text-base rounded-[10px] py-3 w-full font-bold pl-2 bg-inherit border border-white max-w-full"
                          min="0"
                        />
                        <div className="absolute right-4 flex flex-row gap-1 items-center">
                          <p className="text-base font-medium">USDC</p>
                          <Image
                            alt="logo"
                            width={20}
                            height={20}
                            src={"/assets/ETHEREUM.svg"}
                          />
                        </div>
                      </div>

                      <div>
                        <p>Default Slippage: 15%</p>
                      </div>

                      <div className="w-[60%] flex items-center justify-center mx-auto">
                        <Button
                          disabled={false}
                          onClick={() => {}}
                          className="rounded-md py-3"
                        >
                          Place Trade
                        </Button>
                      </div>
                    </div>

                    <div className="w-full">
                      <p>Bonding curve progress: 80%</p>
                      <Image
                        src={"/assets/BCP.svg"}
                        alt="logo"
                        width={300}
                        height={8}
                      />
                      <p>Raydium pool seeded! view on raydium here</p>
                    </div>

                    <div className="w-full">
                      <p>King of the hill progress: 80%</p>
                      <Image
                        src={"/assets/KOH.svg"}
                        alt="logo"
                        width={300}
                        height={8}
                      />
                      <p>Crowned King of the hill on 10/28/2024, 9:04:01 pm</p>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-2">
                      {[
                        { label: "Twitter" },
                        { label: "Email" },
                        { label: "LinkedIn" },
                        { label: "GitHub" },
                      ].map((item) => (
                        <div key={item.label} className="flex flex-col gap-2">
                          <p className="text-white bg-[#534E5A] py-2 px-2 rounded-md">
                            {item.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="w-full flex flex-col gap-3">
                      <div className="flex flex-row items-center justify-between">
                        <p>Holder distriution</p>
                        <p>Generate bubble map</p>
                      </div>

                      {[
                        { rank: 1, name: "Dave", percentage: "4.00%" },
                        { rank: 2, name: "Sarah", percentage: "3.50%" },
                        { rank: 3, name: "John", percentage: "3.25%" },
                        { rank: 4, name: "Alice", percentage: "2.75%" },
                        { rank: 5, name: "Bob", percentage: "2.50%" },
                        { rank: 6, name: "Charlie", percentage: "2.20%" },
                        { rank: 7, name: "Eve", percentage: "2.00%" },
                      ].map((entry) => (
                        <div
                          key={entry.rank}
                          className="w-full flex flex-row items-center justify-between"
                        >
                          <div className="flex flex-row items-center gap-2">
                            <p>{entry.rank}</p>
                            <p>{entry.name}</p>
                          </div>
                          <p>{entry.percentage}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </main>
              )}

              {activeTokenTab === "token-trader" && (
                <>
                  {createdToken && (
                    <main className="mt-[36px] h-full text-white flex flex-col rounded-xl">
                      {activeTraderPage === "home" && (
                        <>
                          <div className="p-4 py-6 w-full max-w-[450px] border-b border-[#C3B1FF1A] flex flex-row items-center justify-between bg-[#251F2E]">
                            <div className="flex flex-col justify-center gap-1 text-xs font-medium">
                              <p className="text-xl font-bold">xxxx.xx</p>
                              <p className="text-[10px] font-normal">
                                xxx (%x.x)
                              </p>
                            </div>
                            <div className="flex flex-col justify-center gap-1 text-xs font-medium">
                              <p>Balance</p>
                              <div className="flex flex-row items-center text-[13px] justify-center gap-1">
                                <Image
                                  src={"/assets/ribbon.svg"}
                                  alt=""
                                  width={16}
                                  height={16}
                                  className="max-h-4 max-w-4"
                                />
                                <p>X token</p>
                              </div>
                            </div>
                          </div>

                          <section className="flex-1 overflow-y-auto pt-[100px] mx-4 flex flex-col gap-4 mb-20">
                            <div className="w-full h-auto flex self-center items-center justify-center ">
                              <div className="w-full bg-[inherit] min-h-[320px]  border border-[#C3B1FF4D]">
                                .
                              </div>
                            </div>

                            <div className="flex flex-col gap-2 border border-[#D6CBFF79] rounded-md px-3 py-4">
                              <p className="text-[15px] font-bold">
                                Statistics
                              </p>

                              <div className="grid grid-cols-2 text-sm font-normal">
                                <div className="flex flex-col">
                                  <p className="text-[#98A2B3]">Total supply</p>
                                  <p>xx xx</p>
                                </div>
                                <div className="flex flex-col">
                                  <p className="text-[#98A2B3]">
                                    Circulating Supply
                                  </p>
                                  <p>xx xx</p>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col gap-2 border border-[#D6CBFF79] rounded-md px-3 py-4">
                              <p className="text-[15px] font-bold">
                                Historical Data
                              </p>

                              <div className="grid grid-cols-2 gap-y-3 text-sm font-normal">
                                <div className="flex flex-col">
                                  <p className="text-[#98A2B3]">24H High</p>
                                  <p>xx xx</p>
                                </div>
                                <div className="flex flex-col">
                                  <p className="text-[#98A2B3]">24H Low</p>
                                  <p>xx xx</p>
                                </div>
                                <div className="flex flex-col">
                                  <p className="text-[#98A2B3]">
                                    All Time High
                                  </p>
                                  <p>xx xx</p>
                                  <p>xx xx</p>
                                </div>
                                <div className="flex flex-col">
                                  <p className="text-[#98A2B3]">All Time Low</p>
                                  <p>xx xx</p>
                                  <p>xx xx</p>
                                </div>
                              </div>
                            </div>
                          </section>
                        </>
                      )}

                      {activeTraderPage === "swap" && (
                        <Swap
                          handleButtonClick={() => setActiveTradePage("home")}
                        />
                      )}

                      {activeTraderPage === "buy" && (
                        <Buy
                          handleButtonClick={() => setActiveTradePage("home")}
                        />
                      )}

                      {activeTraderPage === "sell" && (
                        <Sell
                          handleButtonClick={() => setActiveTradePage("home")}
                        />
                      )}

                      <div className="z-10 fixed w-full bottom-0 bg-[#251F2E] py-3 flex gap-4 mt-6 px-4 ">
                        <Button
                          onClick={() => setActiveTradePage("swap")}
                          className="bg-[#FFFFFF36] text-white"
                        >
                          Swap
                        </Button>
                        <Button
                          onClick={() => setActiveTradePage("buy")}
                          className="bg-[#40BF6A] text-white"
                        >
                          Buy
                        </Button>
                        <Button
                          onClick={() => setActiveTradePage("sell")}
                          className="bg-[#DF2040] text-white"
                        >
                          Sell
                        </Button>
                      </div>
                    </main>
                  )}
                </>
              )}
            </section>
          )}

          {selectedCelebrityTab === "store" && (
            <main className="h-full text-white flex flex-col rounded-xl">
              <div className="fixed z-20 p-4 py-6 w-full max-w-[450px] border-b border-[#C3B1FF1A] flex flex-row items-center justify-between bg-[#251F2E]">
                <p className="text-xl font-bold">Tyla Store</p>
                <div className="flex flex-col justify-center gap-1 text-xs font-medium">
                  <p>Balance</p>
                  <div className="flex flex-row items-center text-[13px] justify-center gap-1">
                    <Image
                      src={"/assets/ribbon.svg"}
                      alt=""
                      width={16}
                      height={16}
                      className="max-h-4 max-w-4"
                    />
                    <p>20 $Tyla</p>
                  </div>
                </div>
              </div>

              <section className="flex-1 overflow-y-auto pt-[100px] px-4 mb-16">
                <div className="flex flex-col gap-8">
                  {/* albums */}
                  <div className="w-full h-auto flex flex-col gap-2">
                    <div className="flex flex-row items-center justify-between">
                      <p className="text-base font-bold ">Albums</p>
                      <p className="text-xs font-medium text-[#DFCBFB]">
                        View all
                      </p>
                    </div>

                    <div className="flex flex-row gap-4 overflow-x-auto ">
                      {influencerStoreData.map((i) => (
                        <div
                          key={i.id}
                          className="flex flex-col gap-1 w-[100px]"
                        >
                          <Image
                            src={i.image}
                            alt=""
                            width={96}
                            height={84}
                            className="max-h-[84px] max-w-[96px] bg-white"
                          />
                          <p className="text-xs font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                            {i.title}
                          </p>
                          <p className="text-sm font-bold text-[#DFCBFB] whitespace-nowrap overflow-hidden text-ellipsis">
                            {i.currency} {i.price}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Merchandise */}
                  <div className="w-full h-auto flex flex-col gap-2">
                    <div className="flex flex-row items-center justify-between">
                      <p className="text-base font-bold ">Merchandise</p>
                      <p className="text-xs font-medium text-[#DFCBFB]">
                        View all
                      </p>
                    </div>
                    <div className="flex flex-row gap-4 overflow-x-auto ">
                      {influencerStoreData.map((i) => (
                        <div
                          key={i.id}
                          className="flex flex-col gap-1 w-[100px]"
                        >
                          <Image
                            src={i.image}
                            alt=""
                            width={96}
                            height={84}
                            className="max-h-[84px] max-w-[96px] bg-white"
                          />
                          <p className="text-xs font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                            {i.title}
                          </p>
                          <p className="text-sm font-bold text-[#DFCBFB] whitespace-nowrap overflow-hidden text-ellipsis">
                            {i.currency} {i.price}
                          </p>
                        </div>
                      ))}
                    </div>{" "}
                  </div>
                </div>
              </section>
            </main>
          )}

          {selectedCelebrityTab === "live" && (
            <main
              className="flex-1 text-white flex flex-col rounded-xl bg-liveBgImage bg-cover bg-center"
              style={{
                minHeight: "calc(100vh - 272px)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
              }}
            >
              <div className="fixed z-20 p-4 py-6 w-full border-b border-[#C3B1FF1A] flex flex-row gap-4">
                <Button className="text-center px-4 h-[10px] max-w-fit text-xs font-bold bg-red-600">
                  Live
                </Button>
                <Button className="text-center text-white px-4 h-[10px] max-w-fit text-xs font-bold bg-[#1616174D]">
                  <People size={20} fill="white" /> 3.6k
                </Button>
              </div>

              <section className="flex-1 overflow-y-auto pt-[100px] px-4 mb-16">
                <div className="w-full flex flex-col h-full flex-1">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`mb-6 flex flex-row gap-2 items-start ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {msg.sender === "ai" && (
                        <div className="w-8 h-8 self-end flex-shrink-0">
                          <Image
                            alt="AI"
                            width={32}
                            height={32}
                            src="/assets/AI.png"
                          />
                        </div>
                      )}
                      <div
                        className={`inline-block px-4 py-2.5 rounded-lg w-auto max-w-[65%] text-sm font-normal break-words ${
                          msg.sender === "user"
                            ? "bg-[#3f3952] bg-opacity-95 text-white rounded-l-[12px] rounded-tr-[12px] rounded-br-[4px]"
                            : "bg-[#3f3952] bg-opacity-95 text-white rounded-r-[12px] rounded-tl-[12px] rounded-bl-[4px]"
                        }`}
                      >
                        {msg.text}
                      </div>
                      {msg.sender === "user" && (
                        <div className="w-8 h-8 self-end flex-shrink-0">
                          <User
                            size="32"
                            fill="gray"
                            className="flex bg-white rounded-full"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </section>
              <section className="flex-1 fixed bottom-0 pb-5 pt-3 px-4 w-full z-10 max-w-[450px]">
                <div className="flex flex-row items-center bg-[#1F222B] bg-opacity-50">
                  <input
                    type="text"
                    value={input}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full text-sm text-white rounded-lg py-2 px-4 focus:outline-none bg-[#1F222B] bg-opacity-50"
                  />

                  <button
                    // onClick={() => handleSend(input)}
                    // disabled={loading}
                    className="ml-3 p-2 rounded-full disabled:opacity-50 bg-[#1F222B] bg-opacity-50"
                  >
                    <Send size={22} fill="#FFF" stroke="#FFF" />
                  </button>

                  <div className="flex flex-row">
                    <button
                      // onClick={() => handleSend(input)}
                      // disabled={loading}
                      className="ml-3 p-2 rounded-full disabled:opacity-50 text-[10px] font-semibold"
                    >
                      <Gift size={20} className="mb-1" />
                      Gift
                    </button>
                    <button
                      // onClick={() => handleSend(input)}
                      // disabled={loading}
                      className="ml-3 p-2 rounded-full disabled:opacity-50 text-[10px] font-semibold"
                    >
                      <Share size={20} className="mb-1" />
                      5.7k
                    </button>
                  </div>
                </div>
              </section>
            </main>
          )}
        </main>
      </main>
    </AuthLayout>
  );
};

export default Influencer;
