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

interface Message {
  sender: "user" | "ai";
  text: string;
}

const Influencer = () => {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [selectedTab, setSelectedTab] = useState("ai");
  const handleTabCLick = (tab: string) => setSelectedTab(tab);

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

  const [tokenName, setTokenName] = useState("");

  const [createTokenModal, setCreateTokenModal] = useState(false);
  const { mutate } = useCreateUserToken();

  const handleCreateToken = () => {
    mutate(
      { name: tokenName },
      {
        onSuccess: () => {
          toast.success(`Token ${tokenName} created`);
          setCreateTokenModal(false);
        },
      }
    );
  };

  const handleBuyToken = () => {};
  const handleSellToken = () => {};

  const createdToken = false;

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
                onClick={() => handleTabCLick(tab.value)}
                className={`min-w-fit border-[1px] border-[#FFFFFF] text-center text-[13px] px-3 pt-[7px] pb-[6px] rounded-[32px] ${
                  selectedTab === tab.value
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
          {selectedTab === "ai" && (
            <main className="h-full text-white flex flex-col rounded-xl">
              <div className="fixed z-20 p-4 py-6 w-full max-w-[450px] border-b border-[#C3B1FF1A] flex flex-row items-center justify-between bg-[#251F2E]">
                <p className="text-xl font-bold">{slug} AI Chat</p>
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

          {selectedTab === "token" && (
            <section>
              {createdToken && (
                <main className="h-full text-white flex flex-col rounded-xl">
                  <div className="fixed z-20 p-4 py-6 w-full max-w-[450px] border-b border-[#C3B1FF1A] flex flex-row items-center justify-between bg-[#251F2E]">
                    <div className="flex flex-col justify-center gap-1 text-xs font-medium">
                      <p className="text-xl font-bold">3,839.65</p>
                      <p className="text-[10px] font-normal">105 (%0.8)</p>
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
                        <p>20 $Tyla</p>
                      </div>
                    </div>
                  </div>

                  <section className="flex-1 overflow-y-auto pt-[100px] px-4 mb-16">
                    <div className="w-full h-auto flex self-center items-center justify-center ">
                      <div className="w-full bg-white min-h-[400px] mx-4">
                        graph for coin
                      </div>
                    </div>

                    <div className="flex gap-4 mt-6 px-4 ">
                      <Button onClick={handleBuyToken} className="bg-[#40BF6A]">
                        Buy
                      </Button>
                      <Button
                        onClick={handleSellToken}
                        className="bg-[#DF2040]"
                      >
                        Sell
                      </Button>
                    </div>
                  </section>
                </main>
              )}

              {!createdToken && (
                <main className="h-full text-white flex flex-col items-center rounded-xl">
                  <div className="mt-10 p-4 py-6 w-full max-w-[300px] flex flex-col gap-4 items-center justify-center bg-[#251F2E]">
                    <p> No token</p>
                    <p className="text-center">
                      This Linkage is Not Yet Connected to a Token
                    </p>
                    <Button
                      onClick={() => setCreateTokenModal(true)}
                      className="max-w-fit px-3 py-2 rounded-md"
                    >
                      Create a Token
                    </Button>
                  </div>
                </main>
              )}
            </section>
          )}

          {selectedTab === "store" && (
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

          {selectedTab === "live" && (
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

        {createTokenModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#251F2E] p-6 rounded-xl w-[300px]">
              <h2 className="text-center text-xl mb-4">Create a Token</h2>
              <input
                type="text"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
                placeholder="Enter token name"
                className="w-full p-2 rounded-md bg-[#3E3A4E] text-white mb-4"
              />
              <div className="flex justify-between gap-2">
                <Button
                  onClick={() => setCreateTokenModal(false)}
                  className="px-3 py-2 rounded-md bg-red-300"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateToken}
                  className="px-3 py-2 rounded-md bg-[#F6F1FE]"
                >
                  Create
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </AuthLayout>
  );
};

export default Influencer;
