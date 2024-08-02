import Image from "next/image";
import { Send, User } from "iconsax-react";
import { useState, KeyboardEvent, useRef, useEffect } from "react";

interface Option {
  id: number;
  text: string;
}

interface Question {
  id: number;
  text: string;
  type: any; // Consider specifying this more precisely
  isFirst: boolean;
  isLast: boolean;
  taskId: number;
  createdAt: string;
  updatedAt: string;
  options: Option[];
}

const Chat = ({ questions }: { questions: Question[] }) => {
  const [messages, setMessages] = useState<
    { sender: "user" | "ai"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (questions?.length > 0) {
      setMessages([{ sender: "ai", text: questions[0].text }]);
    }
  }, [questions]);

  const handleSend = () => {
    if (input.trim() === "") return;

    // Add user's message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: input },
    ]);

    // Clear the input field
    setInput("");

    // Determine if there's a next question
    if (currentQuestionIndex < questions.length - 1) {
      const nextQuestionIndex = currentQuestionIndex + 1;

      // Delay AI's response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "ai", text: questions[nextQuestionIndex].text },
        ]);
        setCurrentQuestionIndex(nextQuestionIndex);
      }, 1000); // Adjust this delay as needed
    }
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
    <div className="relative w-full mt-2 p-4 flex flex-col h-auto overflow-auto mx-auto rounded-lg shadow-lg bg-aiBackground bg-contain bg-no-repeat">
      <div className="flex-1 h-auto overflow-y-auto mb-16">
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

export default Chat;
