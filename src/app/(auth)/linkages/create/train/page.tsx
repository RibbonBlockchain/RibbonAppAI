"use client";

import React, {
  useRef,
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import {
  useChatLinkage,
  usePublishLinkage,
  useGetLinkageBySlug,
  useUploadLinkageFile,
} from "@/api/linkage";
import clsx from "clsx";
import Image from "next/image";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { ArrowUp, Send, User, X } from "lucide-react";
import { ArrowLeft2, InfoCircle } from "iconsax-react";
import { alternatePrompts } from "@/lib/values/prompts";
import { createLinkageAtom } from "@/lib/atoms/auth.atom";

const TrainLinkage = () => {
  const router = useRouter();

  const [linkagesProps] = useAtom(createLinkageAtom);
  const [published, setPublished] = useState(false);

  const [selected, setSelected] = useState("train");
  const [activeInfo, setActiveInfo] = useState<string | null>(null);

  const handleInfoClick = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveInfo(optionValue === activeInfo ? null : optionValue);
  };

  const { mutate } = usePublishLinkage();

  const isSubmitDisabled = false;

  // train ai linkage
  const { mutate: trainAILinkage } = useUploadLinkageFile();

  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | ArrayBuffer | null>(
    null
  );

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setFilePreview(URL.createObjectURL(selectedFile));
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFilePreview(null);
  };

  const handleUpload = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    trainAILinkage(
      { id: Number(linkagesProps?.id), file: formData as any },
      {
        onSuccess: () => toast.success("File uploaded successfully"),
        onError: (error) => console.error("Upload failed", error),
      }
    );
  };

  // chat-preview immplementation
  const { data: linkageData } = useGetLinkageBySlug(
    linkagesProps.slug as string
  );
  const { mutateAsync } = useChatLinkage();

  const [messages, setMessages] = useState<
    { sender: "user" | "ai"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const prompts = linkageData?.data?.prompts || alternatePrompts;

  useEffect(() => {
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setMessages([{ sender: "ai", text: randomPrompt }]);
  }, [prompts]);

  const sendMessage = async (message: string) => {
    try {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: message },
      ]);

      const response = await mutateAsync({
        slug: linkagesProps?.slug,
        body: { message },
      });

      const aiMessage =
        response?.data?.message || "Sorry, I didn't get a response.";
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", text: aiMessage },
      ]);
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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <main className="relative min-h-screen w-full text-white bg-[#0B0228] p-4 sm:p-6 pb-16">
      <Toaster />
      <ArrowLeft2
        size="24"
        color="#ffffff"
        className="my-2"
        onClick={() => router.back()}
      />

      <div className="flex flex-col gap-6 text-[13px] mt-4">
        <div className="flex flex-row bg-[#3f3856] p-1 rounded-full">
          <p
            onClick={() => setSelected("train")}
            className={clsx(
              "w-full text-center py-2 rounded-full",
              selected === "train" && " bg-[#0B0228]"
            )}
          >
            Train
          </p>
          <p
            onClick={() => setSelected("preview")}
            className={clsx(
              "w-full text-center py-2 rounded-full",
              selected === "preview" && " bg-[#0B0228]"
            )}
          >
            Preview
          </p>
        </div>

        {selected === "train" && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 mt-6">
              <h1 className="text-sm font-semibold">Knowledge</h1>
              <p className="text-xs font-light">
                If you upload files here, conversations with your AI may include
                the file contents. Files can be downloaded when Code interpreter
                is enabled.
              </p>

              <div className="mt-2 flex flex-col gap-4 items-start">
                <Toaster />
                <div className="w-full flex flex-wrap gap-4">
                  {filePreview && (
                    <div className="w-full flex flex-row items-center justify-between text-xs text-[#98A2B3] ">
                      <div>{file ? file.name : "No file chosen"}</div>
                      <X
                        onClick={handleRemoveFile}
                        className="text-red-500 mr-6"
                        size={18}
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-4 flex-start items-start">
                  <div className="flex flex-row gap-2 items-center">
                    <div className="relative flex flex-row items-center">
                      <input
                        id="fileInput"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept="*/*"
                      />
                      <label
                        htmlFor="fileInput"
                        className="min-w-[110px] px-2.5 appearance-none bg-inherit py-3 rounded-[8px] border border-[#FFFFFF52] text-[#98A2B3] cursor-pointer flex items-center"
                      >
                        <span className="text-xs">Select a file</span>
                      </label>
                      <ArrowUp
                        size="16"
                        color="#ffffff"
                        className="absolute right-2"
                      />
                    </div>

                    <p className="text-xs text-[#98A2B3]">
                      jpg, png, pdf, docs, xlsx...
                    </p>
                  </div>

                  <button
                    onClick={handleUpload}
                    className="px-4 py-2 bg-[#3f3856] text-white rounded-[8px] text-xs"
                  >
                    Upload file to train Linkage
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <h1 className="text-sm font-semibold">Capabilities</h1>

              <div className="space-y-2">
                {[
                  {
                    value: "option1",
                    label: "File search",
                    info: "AI can look through uploaded files and provide intelligent interactions with users.",
                  },
                  { value: "option2", label: "API integrations" },
                  {
                    value: "option3",
                    label: "Code interpreter",
                    info: "Code interpreter lets your AI run code. When enabled, your AI can analyze data, work with files you’ve uploaded, do math and more",
                  },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`relative flex flex-row items-center space-x-2 py-1 cursor-pointer gap-1 rounded-lg`}
                  >
                    <span className="text-white">{option.label}</span>

                    {option.info && (
                      <div className="flex flex-row items-center gap-1">
                        <InfoCircle
                          size={16}
                          color="#fff"
                          onClick={(e) => handleInfoClick(option.value, e)}
                          style={{ cursor: "pointer" }}
                        />
                        {activeInfo === option.value && (
                          <div className="absolute z-10 top-7 py-1.5 px-2 rounded-md bg-[#3f3952] text-[#EFE6FD]">
                            {option.info}
                          </div>
                        )}
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            <button
              disabled={isSubmitDisabled}
              onClick={() =>
                mutate(Number(linkagesProps?.id), {
                  onSuccess: () => setPublished(true),
                })
              }
              className={clsx(
                "my-10 w-full rounded-[8px] py-3 font-bold text-sm",
                isSubmitDisabled
                  ? "bg-gray-600 text-white cursor-not-allowed"
                  : "bg-white text-[#290064]"
              )}
            >
              Publish AI Linkage
            </button>

            {published && (
              <button
                onClick={() => router.push("/linkages/explore")}
                className={clsx(
                  "w-full rounded-[8px] py-3 font-bold text-sm bg-white text-[#290064]"
                )}
              >
                Explore Linkages
              </button>
            )}
          </div>
        )}

        {/* chat preview */}
        {selected === "preview" && (
          <div className="relative w-full mt-2 flex flex-col h-full overflow-auto scroll-hidden mx-auto rounded-lg shadow-lg bg-aiBackground bg-contain bg-no-repeat">
            <div className="flex-1 h-full overflow-y-auto mb-16">
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
    </main>
  );
};

export default TrainLinkage;
