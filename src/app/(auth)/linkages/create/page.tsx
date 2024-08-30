"use client";

import clsx from "clsx";
import Image from "next/image";
import toast from "react-hot-toast";
import { Send, Upload, User } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useChatLinkage,
  useCreateLinkage,
  useGetLinkageBySlug,
} from "@/api/linkage";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AddCircle,
  ArrowLeft2,
  Call,
  CloseCircle,
  Edit2,
  InfoCircle,
  Location,
  Sms,
} from "iconsax-react";
import FileUpload from "@/containers/linkages/file-upload";

type Starter = {
  text: string;
};

const options = [
  { id: "mental-health", label: "Mental healthes" },
  { id: "diseases-control", label: "Diseases control" },
  { id: "finance", label: "Finance" },
  { id: "fitness-programs", label: "Fitness programs" },
  { id: "nutrition-dietics", label: "Nutrition and Dietics" },
  { id: "environmental-sector", label: "Environmental sector" },
  { id: "employment-sector", label: "Employment sector" },
  { id: "relationship-lifestyle", label: "Relationships & Lifestyle" },
  { id: "other", label: "Other" },
];

const CreateLinkage = () => {
  const router = useRouter();

  const [selected, setSelected] = useState("create");
  const [activeInfo, setActiveInfo] = useState<string | null>(null);

  const handleInfoClick = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveInfo(optionValue === activeInfo ? null : optionValue);
  };

  const [isAgreed, setIsAgreed] = useState<boolean>(false);

  const handleCheckboxChangeAdditional = () => {
    setIsAgreed((prev) => !prev);
  };

  const [selectedId, setSelectedId] = useState<string>("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instruction, setInstruction] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const handleSelect = (id: string, label: string) => {
    setSelectedId(id);
    setCategory(label);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setImage(file as any);
  };

  const { mutate } = useCreateLinkage();

  const handleCreateLinkage = () => {
    const [prompt, prompt1, prompt2, , prompt3] = starters
      .map((starter) => starter.text)
      .concat(["", "", ""]);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("instruction", instruction);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("location", location);
    formData.append("category", category);
    formData.append("prompts", prompt);
    formData.append("prompts", prompt1);
    formData.append("prompts", prompt2);
    formData.append("prompts", prompt3);

    if (image) formData.append("image", image);

    mutate(formData as any, {
      onSuccess: (data) => {
        console.log(data, "on success data");
        router.push("/linkages/explore"), toast.success("Linkage created");
      },
    });
  };

  //conversational starters
  const [starters, setStarters] = useState<Starter[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle adding a new starter
  const handleAddClick = () => {
    if (inputValue.trim()) {
      setStarters([...starters, { text: inputValue.trim() }]);
      setInputValue("");
    }
  };

  const handleRemoveClick = (index: number) => {
    setStarters(starters.filter((_, i) => i !== index));
  };

  // chat-preview immplementation
  const { data: linkageData } = useGetLinkageBySlug("videsky");
  const { mutateAsync } = useChatLinkage();

  const [messages, setMessages] = useState<
    { sender: "user" | "ai"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const alternatePrompts = [
    "Hello! How can I assist you today?",
    "Hi there! What can I help you with right now?",
    "Greetings! Is there something specific you're looking for today?",
    "Hey! I'm here to help with any questions you might have. What’s up?",
    "Welcome! How can I make your experience better today?",
    "Hi! What’s on your mind today?",
    "Hello! If you need any help or information, just let me know.",
    "Good day! Did you know I can assist with [specific feature]? How can I help you?",
    "Hey there! How’s it going? Need any help with something?",
    "Hi! It’s great to see you. What can I do for you today?",
  ];

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
        slug: "videsky",
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

  const isSubmitDisabled =
    !name ||
    !description ||
    !instruction ||
    !phone ||
    !email ||
    !location ||
    !category;

  return (
    <main className="relative min-h-screen w-full text-white bg-[#0B0228] p-4 sm:p-6 pb-16">
      <ArrowLeft2
        size="24"
        color="#ffffff"
        className="my-2"
        onClick={() => router.back()}
      />

      <div className="flex flex-col gap-6 text-[13px] mt-4">
        <div className="flex flex-row bg-[#3f3856] p-1 rounded-full">
          <p
            onClick={() => setSelected("create")}
            className={clsx(
              "w-full text-center py-2 rounded-full",
              selected === "create" && " bg-[#0B0228]"
            )}
          >
            Create
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

        {selected === "create" && (
          <div className="flex flex-col gap-6">
            <div className="relative flex flex-col items-center justify-center">
              <Image
                width={280}
                height={140}
                alt="linkage"
                src={imagePreview || ""}
                className="rounded-md w-full bg-[#3f3856]"
              />
              <div className="absolute flex flex-row gap-1 mt-1">
                <label className="cursor-pointer text-sm font-medium flex flex-row items-center gap-2">
                  <span className="">Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    placeholder="upload image"
                    onChange={handleImageChange}
                  />
                  <Upload height={16} width={16} />
                </label>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <Image
                width={82}
                height={82}
                alt="linkage"
                src={imagePreview || "/assets/sample-icon.png"}
                className="rounded-full"
              />
              <div className="flex flex-row gap-1 mt-1">
                <label className="cursor-pointer text-sm font-medium flex flex-row items-center gap-2">
                  <span className="">Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    placeholder="upload image"
                    onChange={handleImageChange}
                  />
                  <Upload height={16} width={16} />
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                value={name}
                placeholder="Name your AI"
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-inherit py-3 px-2 rounded-[8px] border border-[#E5E7EB86] text-white placeholder:text-[#98A2B3] focus:ring-0 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Description</label>
              <textarea
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write about your Linkages and its capabilities"
                className="appearance-none bg-inherit p-2 rounded-[8px] border border-[#E5E7EB86] text-[13px] text-white placeholder:text-[#98A2B3] focus:ring-0 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Instructions</label>
              <textarea
                rows={6}
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                placeholder="What does this AI do? How does it behave? What should it avoid doing?"
                className="appearance-none bg-inherit p-2 rounded-[8px] border border-[#E5E7EB86] text-[13px] text-white placeholder:text-[#98A2B3] focus:ring-0 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Mobile number</label>
              <div className="relative flex flex-row items-center">
                <Call size="20" color="#ffffff" className="absolute left-3" />
                <input
                  type="phone"
                  value={phone}
                  placeholder="0000 0000 000"
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-inherit pl-10 py-2.5 rounded-[8px] border border-[#E5E7EB] text-white placeholder:text-[#98A2B3] focus:ring-0 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Email address</label>
              <div className="relative flex flex-row items-center">
                <Sms size="20" color="#ffffff" className="absolute left-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ribbon@mail.com"
                  className="w-full bg-inherit pl-10 py-2.5 rounded-[8px] border border-[#E5E7EB] text-white placeholder:text-[#98A2B3] focus:ring-0 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Location</label>
              <div className="relative flex flex-row items-center">
                <Location
                  size="20"
                  color="#ffffff"
                  className="absolute left-3"
                />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="South Africa"
                  className="appearance-none w-full bg-inherit pl-10 py-2.5 rounded-[8px] border border-[#E5E7EB] text-white placeholder:text-[#98A2B3] focus:ring-0 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <h1 className="text-sm font-semibold">Business category</h1>
              <p className="text-sm font-light">
                This enables us to create a Linkage that aligns with your
                business.
              </p>

              <div className="space-y-2">
                {options.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleSelect(option.id, option.label)}
                    className="flex items-center cursor-pointer py-2 text-sm font-normal"
                  >
                    <span className="flex-grow">{option.label}</span>
                    <div
                      className={`w-5 h-5 rounded-full border-2 ml-2 ${
                        selectedId === option.id
                          ? "bg-white border-white"
                          : "border-white"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <div className="flex flex-row items-center justify-between">
                <p className="text-sm font-medium">
                  Conversation starters (maximum of 3)
                </p>
                <button
                  disabled={starters.length === 3}
                  onClick={handleAddClick}
                  className={clsx(
                    "flex flex-row items-center gap-1 hover:bg-[#3f3856] py-1 px-2 rounded-[10px]",
                    starters.length === 3
                      ? "cursor-not-allowed bg-red-400"
                      : "bg-green-400"
                  )}
                >
                  Add <AddCircle size={14} color="#ffffff" />
                </button>
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Write conversation starters here"
                className="w-full bg-inherit py-3 px-2 rounded-[8px] border border-[#E5E7EB86] text-white placeholder:text-[#98A2B3] focus:ring-0 focus:outline-none"
              />

              <div className="flex flex-col gap-4 w-[90%] mt-4">
                {starters.map((starter, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-center justify-between"
                  >
                    {starter.text}
                    <button
                      onClick={() => handleRemoveClick(index)}
                      className="flex items-center justify-center"
                    >
                      <CloseCircle size={20} color="#ffffff" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <h1 className="text-sm font-semibold">Knowledge</h1>
              <p className="text-xs font-light">
                If you upload files here, conversations with your AI may include
                the file contents. Files can be downloaded when Code interpreter
                is enabled.
              </p>

              <FileUpload />
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
            <div className="flex flex-col gap-2 mt-6">
              <h1 className="text-sm font-semibold">Additional Settings</h1>
              <div className="flex flex-row items-center rounded-lg">
                <input
                  type="checkbox"
                  checked={isAgreed}
                  onChange={handleCheckboxChangeAdditional}
                  className="form-checkbox h-4 w-4"
                />
                <span className="pl-2 text-white">
                  Use conversation data in your AI to improve our models
                </span>
              </div>
            </div>

            <button
              disabled={isSubmitDisabled}
              onClick={handleCreateLinkage}
              className={clsx(
                "my-10 w-full rounded-[8px] py-3 font-bold text-sm",
                isSubmitDisabled
                  ? "bg-gray-600 text-white cursor-not-allowed"
                  : "bg-white text-[#290064]"
              )}
            >
              Publish AI Linkage
            </button>
          </div>
        )}

        {/* chat preview */}
        {selected === "preview" && (
          <div className="relative w-full mt-2 p-4 flex flex-col h-full overflow-auto scroll-hidden mx-auto rounded-lg shadow-lg bg-aiBackground bg-contain bg-no-repeat">
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

export default CreateLinkage;
