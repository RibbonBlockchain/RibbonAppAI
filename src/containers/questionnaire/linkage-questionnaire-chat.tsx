import {
  useGetLinkageBySlug,
  useSubmitLinkageQuestionnaireAnswer,
} from "@/api/linkage";
import Image from "next/image";
import { Send, User } from "iconsax-react";
import { useParams, useRouter } from "next/navigation";
import { useState, KeyboardEvent, useRef, useEffect } from "react";

interface Option {
  id: number;
  value: string;
}

interface Question {
  id: number;
  text: string;
  type: any;
  isFirst: boolean;
  isLast: boolean;
  questionnaireId: number;
  linkageId: number;
  createdAt: string;
  updatedAt: string;
  options: Option[];
}

const LinkageQuestionnaireChat = ({ questions }: { questions: Question[] }) => {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [messages, setMessages] = useState<
    { sender: "user" | "ai"; text: string; options?: Option[] }[]
  >([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { mutate: submitTask, isPending } =
    useSubmitLinkageQuestionnaireAnswer();

  const { data } = useGetLinkageBySlug(slug);

  useEffect(() => {
    if (questions?.length > 0) {
      const firstQuestion = questions[0];
      setMessages([
        {
          sender: "ai",
          text: firstQuestion.text,
          options: firstQuestion.options,
        },
      ]);
    }
  }, [questions]);

  const handleOptionClick = (option: Option) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: option.value },
    ]);

    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestionIndex < questions.length - 1) {
      const nextQuestionIndex = currentQuestionIndex + 1;

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "ai",
            text: questions[nextQuestionIndex].text,
            options: questions[nextQuestionIndex].options,
          },
        ]);
        setCurrentQuestionIndex(nextQuestionIndex);
      }, 1500);
    } else {
      if (!isSubmitting) {
        setIsSubmitting(true);
        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: "ai",
              text: "You have reached the end of this question, click finish to answer more questionnaires.",
            },
          ]);
        }, 1000);
      }
    }

    const questionIdToSubmit =
      currentQuestionIndex === questions.length - 1
        ? questions[questions.length - 1].id
        : currentQuestion.id;

    submitTask(
      {
        body: { optionId: option.id, questionId: questionIdToSubmit },
        linkageId: data?.data?.id,
        questionnaireId: Number(params.id),
      },
      {
        onSuccess: () => console.log("Reward claimed"),
      }
    );
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="relative w-full mt-2 p-4 flex flex-col h-auto overflow-auto scroll-hidden mx-auto rounded-lg shadow-lg bg-aiBackground bg-contain bg-no-repeat">
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
              {msg.options && (
                <div className="mt-2 flex flex-col gap-2">
                  {msg.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleOptionClick(option)}
                      className="bg-gradient-to-b from-[#0B0228] to-[#121212] text-white px-4 py-2 rounded-md"
                    >
                      {option.value}
                    </button>
                  ))}
                </div>
              )}
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
        {!isSubmitting ? (
          <></>
        ) : (
          <div className="flex flex-row items-center justify-center gap-6">
            <button
              onClick={() => router.back()}
              className="bg-[#3f3952] bg-opacity-75 backdrop-blur-sm text-white px-4 py-2 rounded-[14px]"
            >
              Finish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkageQuestionnaireChat;
