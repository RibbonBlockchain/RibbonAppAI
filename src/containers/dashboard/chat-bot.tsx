import Image from "next/image";
import { Send, User } from "iconsax-react";
import { useState, KeyboardEvent, useRef, useEffect } from "react";
import { useChatLinkage, useGetLinkageBySlug } from "@/api/linkage";

const ChatBot = () => {
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

  const { mutate, data: chatData } = useChatLinkage();
  const { data } = useGetLinkageBySlug("slug");

  const prompts = data?.data?.prompts || alternatePrompts;

  useEffect(() => {
    // Randomly select an initial message from AI
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setMessages([{ sender: "ai", text: randomPrompt }]);
  }, []);

  const handleSend = () => {
    if (input.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: input },
    ]);

    // mutate({ slug: "slug", body: { message: input } });

    // Simulate a response from AI after a short delay
    setInput("");
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "ai",
          text: chatData?.data.message,
        },
      ]);
    }, 1500);
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
                <Image alt="AI" width={32} height={32} src="/assets/AI.png" />
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
  );
};

export default ChatBot;
