"use client";

import {
  useChatLinkage,
  useGetChatHistory,
  useGetLinkageBySlug,
  useGetLinkageQuestionnaire,
} from "@/api/linkage";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { useAddWallet } from "@/api/user";
import { Send, User } from "iconsax-react";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft2, VolumeHigh } from "iconsax-react";
import { alternatePrompts } from "@/lib/values/prompts";
import { useState, KeyboardEvent, useRef, useEffect } from "react";
import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";

interface Message {
  sender: "user" | "ai";
  text: string;
}

const LinkageAIChatInterface: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [selected, setSelected] = useState("questionnaire");
  const [hideAddWallet, setHideAddWallet] = useState(true);

  const { data, isLoading, isError } = useGetLinkageBySlug(slug);
  const { mutateAsync } = useChatLinkage();

  const id = data?.data?.id;
  const { data: linkageQuestionnaire } = useGetLinkageQuestionnaire({
    linkageId: id,
  });

  const { mutate: addWallet } = useAddWallet();
  const userWalletAddress: string = localStorage.getItem("address") as string;

  const handleAddWallet = () => {
    if (!userWalletAddress) {
      toast.error("Wallet address not found");
    } else {
      addWallet(
        { address: userWalletAddress },
        {
          onSuccess: () => {
            toast.success("Wallet linked successfully");
            setHideAddWallet(false);
          },
        }
      );
    }
  };

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

  useEffect(() => {
    if (oldMessages.length === 0) {
      // Check if there are no old messages
      if (prompts.length > 0) {
        const randomPrompt =
          prompts[Math.floor(Math.random() * prompts.length)];
        setMessages([{ sender: "ai", text: randomPrompt }]);
      } else {
        setMessages([
          { sender: "ai", text: "Hello! How can I assist you today?" },
        ]);
      }
    }
  }, [oldMessages, prompts]);

  useEffect(() => {
    const formattedMessages: Message[] =
      chatHistory?.data?.data?.flatMap((item: any) => [
        { sender: "user", text: item.human },
        { sender: "ai", text: item.assistant },
      ]) || [];

    setOldMessages(formattedMessages);
    setMessages((prevMessages) => [...formattedMessages, ...prevMessages]);
  }, [chatHistory]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isLoading) return <p className="text-white">Loading...</p>;
  if (isError) return <p className="text-white">Error loading data.</p>;

  return (
    <AuthNavLayout>
      <Toaster />
      <div className="w-full h-screen overflow-hidden text-white bg-[#0B0228] flex flex-col">
        <div className="p-4 sm:p-6 py-6 flex flex-row items-center justify-between border-b border-[#C3B1FF4D]">
          <div className="flex flex-row items-center gap-4">
            <ArrowLeft2 className="w-6 h-6" onClick={() => router.back()} />
            <div className="flex flex-row items-center gap-4">
              <Image
                alt="AI"
                width={44}
                height={44}
                src={data?.data.logo || "/assets/sample-icon.png"}
              />
              <div>
                <p className="text-lg font-bold">{data?.data?.name}</p>
                {hideAddWallet ? (
                  <button onClick={handleAddWallet}>Connect wallet</button>
                ) : (
                  <p>Wallet connected</p>
                )}
              </div>
            </div>
          </div>
          <VolumeHigh size="32" color="#ffffff" />
        </div>

        <div className="flex flex-row items-center justify-center self-center bg-[#3f3856] p-1 rounded-full mt-2 w-[90%]">
          <p
            onClick={() => setSelected("questionnaire")}
            className={clsx(
              "w-full text-center py-2 rounded-full",
              selected === "questionnaire" && " bg-[#0B0228]"
            )}
          >
            Catalogues
          </p>
          <p
            onClick={() => setSelected("ai-bot")}
            className={clsx(
              "w-full text-center py-2 rounded-full",
              selected === "ai-bot" && " bg-[#0B0228]"
            )}
          >
            AI Chat
          </p>
        </div>

        {selected === "questionnaire" && (
          <div className="p-4 sm:p-6 py-6 flex flex-col overflow-auto scroll-hidden mb-20">
            {linkageQuestionnaire?.data.map((i: any) => (
              <div key={i.id} className="flex flex-col gap-2 py-2">
                <Link
                  href={`/linkages/explore/${slug}/chat/${i.id}`}
                  className="flex flex-row items-center justify-between text-sm text-white border-b border-[#C3B1FF4D] mb-2"
                >
                  <div>
                    <p className="font-semibold mb-1">{i.name}</p>
                    <div className="-ml-2 flex flex-row items-center font-medium mb-2">
                      <Image
                        src="/assets/coin.png"
                        alt="coin"
                        height={32}
                        width={32}
                      />
                      {i.type === "LOAN" ? (
                        "Loan application"
                      ) : (
                        <p>{i.reward} usdc / question</p>
                      )}
                    </div>
                  </div>
                  <button className="py-2 px-6 font-bold bg-[#A166F5] rounded-full mb-2">
                    Go
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}

        {selected === "ai-bot" && (
          <div className="relative w-full mt-2 p-4 flex flex-col h-full overflow-auto scroll-hidden mx-auto rounded-lg shadow-lg bg-aiBackground bg-contain bg-no-repeat">
            <div className="flex-1 h-full overflow-y-auto mb-16">
              {/* Display old messages first */}
              {oldMessages.map((msg, index) => (
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

            <div className="fixed self-center bottom-4 p-4 w-[90%] max-w-[450px]">
              <div className="flex flex-row items-center">
                <input
                  type="text"
                  value={input}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full text-sm bg-[#3f3952] bg-opacity-75 backdrop-blur-sm pl-4 pr-14 py-4 border rounded-full"
                />
                <button onClick={handleSend} className="absolute right-8 z-10">
                  <Send size="32" color="#ffffff" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthNavLayout>
  );
};

export default LinkageAIChatInterface;
