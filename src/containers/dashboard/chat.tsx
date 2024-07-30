import Image from "next/image";
import { Send, User } from "iconsax-react";
import { useState, KeyboardEvent } from "react";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<
    { sender: "user" | "ai"; text: string }[]
  >([{ sender: "ai", text: "Hi Tolu, what do you feel like doing today?" }]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { sender: "user", text: input }]);

    // Simulate AI response
    setTimeout(() => {
      setMessages([
        ...messages,
        { sender: "user", text: input },
        { sender: "ai", text: "This is a response from the AI!" },
      ]);
    }, 1000);
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full mt-2 p-4 flex flex-col h-auto overflow-auto mx-auto rounded-lg shadow-lg">
      <div className="flex-1 overflow-y-auto mb-16">
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
              className={`inline-block px-4 py-2 rounded-lg w-auto max-w-[65%] text-sm font-normal ${
                msg.sender === "user"
                  ? "bg-[#3f3952] bg-opacity-75 text-white rounded-l-full rounded-tr-full rounded-br-md "
                  : "bg-[#3f3952] bg-opacity-75 text-white rounded-r-full rounded-tl-full rounded-bl-md"
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
      </div>

      <div className="absolute bottom-4 p-4 w-[340px]">
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

export default Chat;
