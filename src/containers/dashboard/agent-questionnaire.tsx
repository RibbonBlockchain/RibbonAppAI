import Image from "next/image";
import toast from "react-hot-toast";
import { Send, User } from "iconsax-react";
import { useRouter } from "next/navigation";
import SuccessAnimation from "@/components/success-animation";
import { useState, KeyboardEvent, useRef, useEffect } from "react";
import { useRateQuestionnaire, useRespondBasedAgent } from "@/api/user";

interface Option {
  id: number;
  text: string;
}

interface Question {
  id: number;
  text: string;
  type: any;
  isFirst: boolean;
  isLast: boolean;
  taskId: number;
  createdAt: string;
  updatedAt: string;
  options: Option[];
}

const AgentQuestionnaire = ({
  questions,
  questionTitle,
  handleStartConversation,
}: {
  questions: Question[];
  questionTitle: string;
  handleStartConversation: () => void;
}) => {
  const router = useRouter();

  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const [messages, setMessages] = useState<
    { sender: "user" | "ai"; text: string; options?: Option[] }[]
  >([]);
  const [input, setInput] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ratingMode, setRatingMode] = useState(false);
  const [loadNext, setLoadNext] = useState(false);
  const [claimReward, setClaimReward] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { mutate: rateTask } = useRateQuestionnaire();
  const { mutate, isPending, data } = useRespondBasedAgent();

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

  const onSuccess = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const nextQuestionIndex = currentQuestionIndex + 1;

    if (
      currentQuestion != null &&
      currentQuestionIndex < questions.length - 1
    ) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "ai",
          text: questions[nextQuestionIndex].text,
          options: questions[nextQuestionIndex].options,
        },
      ]);
      setCurrentQuestionIndex(nextQuestionIndex);
      toast.success("Received 0.01usdc");
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "ai",
          text: `Thank you for completing the ${questionTitle} questionnaire! Kindly rate the questionnaire`,
        },
      ]);
      setRatingMode(true);
    }
  };

  const handleSend = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const currentQuestionHasOptions = currentQuestion?.options?.length > 0;

    if (input.trim() === "" && !currentQuestionHasOptions) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: input },
    ]);

    setInput("");

    if (currentQuestion) {
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
        if (!isSubmitting && !ratingMode && !claimReward) {
          setIsSubmitting(true);
          setTimeout(() => {
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                sender: "ai",
                text: "Do you want to submit the questionnaire?",
              },
            ]);
          }, 1000);
        }
      }

      const questionIdToSubmit =
        currentQuestionIndex === questions.length - 1
          ? questions[questions.length - 1].id
          : currentQuestion.id;

      mutate({
        optionId: 0,
        questionId: questionIdToSubmit,
        taskId: currentQuestion.taskId,
        type: "questionnaire.respond",
      });
    } else {
      // error
    }
  };

  // const handleSend = () => {
  //   const currentQuestion = questions[currentQuestionIndex];
  //   const currentQuestionHasOptions = currentQuestion?.options?.length > 0;

  //   if (input.trim() === "" && !currentQuestionHasOptions) return;

  //   setMessages((prevMessages) => [
  //     ...prevMessages,
  //     { sender: "user", text: input },
  //   ]);

  //   setInput("");

  //   if (currentQuestion) {
  //     if (currentQuestionIndex < questions.length - 1) {
  //       const nextQuestionIndex = currentQuestionIndex + 1;

  //       setTimeout(() => {
  //         setMessages((prevMessages) => [
  //           ...prevMessages,
  //           {
  //             sender: "ai",
  //             text: questions[nextQuestionIndex].text,
  //             options: questions[nextQuestionIndex].options,
  //           },
  //         ]);
  //         setCurrentQuestionIndex(nextQuestionIndex);
  //       }, 1500);
  //     } else {
  //       if (!isSubmitting && !ratingMode && !claimReward) {
  //         setIsSubmitting(true);
  //         setTimeout(() => {
  //           setMessages((prevMessages) => [
  //             ...prevMessages,
  //             {
  //               sender: "ai",
  //               text: "Do you want to submit the questionnaire?",
  //             },
  //           ]);
  //         }, 1000);
  //       }
  //     }

  //     const questionIdToSubmit =
  //       currentQuestionIndex === questions.length - 1
  //         ? questions[questions.length - 1].id
  //         : currentQuestion.id;

  //     mutate(
  //       {
  //         optionId: 0,
  //         questionId: questionIdToSubmit,
  //         taskId: currentQuestion.taskId,
  //         type: "questionnaire.respond",
  //       }
  //       // { onSuccess }
  //     );
  //   } else {
  //   }
  // };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const handleOptionClick = (option: Option) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: option.text },
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
      if (!isSubmitting && !ratingMode && !claimReward) {
        setIsSubmitting(true);
        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: "ai",
              text: "Do you want to submit the questionnaire?",
            },
          ]);
        }, 1000);
        toast.success("Reward received");
      }
    }

    const questionIdToSubmit =
      currentQuestionIndex === questions.length - 1
        ? questions[questions.length - 1].id
        : currentQuestion.id;

    mutate({
      optionId: option.id,
      questionId: questionIdToSubmit,
      taskId: currentQuestion?.taskId,
      type: "questionnaire.respond",
    });
  };

  // const handleOptionClick = (option: Option) => {
  //   setMessages((prevMessages) => [
  //     ...prevMessages,
  //     { sender: "user", text: option.text },
  //   ]);

  //   const currentQuestion = questions[currentQuestionIndex];

  //   if (currentQuestionIndex < questions.length - 1) {
  //     const nextQuestionIndex = currentQuestionIndex + 1;

  //     setTimeout(() => {
  //       setMessages((prevMessages) => [
  //         ...prevMessages,
  //         {
  //           sender: "ai",
  //           text: questions[nextQuestionIndex].text,
  //           options: questions[nextQuestionIndex].options,
  //         },
  //       ]);
  //       setCurrentQuestionIndex(nextQuestionIndex);
  //     }, 1500);
  //   } else {
  //     if (!isPending && !isSubmitting && !ratingMode && !claimReward) {
  //       setIsSubmitting(true);
  //     }

  //   }

  //   const questionIdToSubmit =
  //     currentQuestionIndex === questions.length - 1
  //       ? questions[questions.length - 1].id
  //       : currentQuestion.id;

  //   mutate(
  //     {
  //       optionId: option.id,
  //       questionId: questionIdToSubmit,
  //       taskId: currentQuestion?.taskId,
  //       type: "questionnaire.respond",
  //     }
  //     // { onSuccess }
  //   );
  // };

  const handleRatingClick = (rating: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    const taskId = currentQuestion?.taskId;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: rating.toString() },
      {
        sender: "ai",
        text: `Thank you for rating the questionnaire with ${rating}! Click next to answer another questionnaire or end to return`,
      },
    ]);

    setRatingMode(false);
    setClaimReward(true);

    rateTask(
      { rating: rating, questionnaireId: taskId },
      { onSuccess: () => setLoadNext(true) }
    );
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="relative w-full mt-2 p-4 flex flex-col h-auto overflow-auto scroll-hidden mx-auto rounded-lg shadow-lg">
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
              {msg.sender === "ai" && (
                <p className="italic mb-2">{questionTitle}</p>
              )}

              {msg.text}
              {msg.options && (
                <div className="mt-2 flex flex-col gap-2">
                  {msg.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleOptionClick(option)}
                      className="bg-gradient-to-b from-[#0B0228] to-[#121212] text-white px-4 py-2 rounded-md"
                    >
                      {option.text}
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

        {/* {isPending && (
          <div className="mb-2 italic text-[15px] animate-pulse">Typing...</div>
        )} */}

        <div ref={messagesEndRef} />
      </div>
      <div className="fixed self-center bottom-4 p-4 w-[90%] max-w-[450px]">
        {!loadNext && !isSubmitting && !ratingMode ? (
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
        ) : loadNext ? (
          <div className="flex flex-row items-center justify-center gap-6">
            <button
              onClick={() => router.back()}
              className="bg-red-500 bg-opacity-75 backdrop-blur-sm text-white px-4 py-2 rounded-[14px]"
            >
              End
            </button>
            <button
              onClick={handleStartConversation}
              className="bg-[#3f3952] bg-opacity-75 backdrop-blur-sm text-white px-4 py-2 rounded-[14px]"
            >
              Next
            </button>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-center gap-4">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingClick(rating)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {rating}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentQuestionnaire;
