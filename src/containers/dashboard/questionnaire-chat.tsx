import Image from "next/image";
import { Send, User } from "iconsax-react";
import { useRouter } from "next/navigation";
import { useRateQuestionnaire, useSubmitTask } from "@/api/user";
import { useState, KeyboardEvent, useRef, useEffect } from "react";

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

const QuestionnaireChat = ({ questions }: { questions: Question[] }) => {
  const router = useRouter();

  const [messages, setMessages] = useState<
    { sender: "user" | "ai"; text: string; options?: Option[] }[]
  >([]);
  const [input, setInput] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ratingMode, setRatingMode] = useState(false);
  const [claimReward, setClaimReward] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { mutate: submitTask, isPending } = useSubmitTask();
  const { mutate: rateTask } = useRateQuestionnaire();

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

      submitTask({
        optionId: 0,
        questionId: questionIdToSubmit,
        taskId: currentQuestion.taskId,
      });
    } else {
      // error
    }
  };

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
      }
    }

    const questionIdToSubmit =
      currentQuestionIndex === questions.length - 1
        ? questions[questions.length - 1].id
        : currentQuestion.id;

    submitTask({
      optionId: option.id,
      questionId: questionIdToSubmit,
      taskId: currentQuestion?.taskId,
    });
  };

  const handleSubmitClick = (option: string) => {
    if (option.toLowerCase() === "submit") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: "Submitted" },
        { sender: "ai", text: "Thank you for submitting the questionnaire!" },
      ]);

      setIsSubmitting(false);
      setRatingMode(true);
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "ai", text: "Please rate the questionnaire from 1 to 5." },
        ]);
      }, 1000);
    } else if (option.toLowerCase() === "cancel") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: "Cancelled" },
        {
          sender: "ai",
          text: "The questionnaire was not submitted. You can restart if needed.",
        },
      ]);

      setIsSubmitting(false);
    }
  };

  const handleRatingClick = (rating: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    const taskId = currentQuestion?.taskId;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: rating.toString() },
      {
        sender: "ai",
        text: `Thank you for rating the questionnaire with ${rating}!`,
      },
    ]);

    setRatingMode(false);
    setClaimReward(true);

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "ai",
          text: "You can now claim your reward points by clicking the button below.",
        },
      ]);
    }, 1000);

    rateTask({ rating: rating, questionnaireId: taskId });
  };

  const handleClaimClick = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: "Claimed reward" },
      {
        sender: "ai",
        text: "Congratulations! You have claimed your reward points. You can now close the questionnaire and return to the dashboard.",
      },
    ]);
    setClaimReward(false);
    router.push("/dashboard");
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="relative w-full mt-2 p-4 flex flex-col h-auto overflow-auto mx-auto rounded-lg shadow-lg bg-aiBackground bg-contain bg-no-repeat">
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
        <div ref={messagesEndRef} />
      </div>

      <div className="fixed self-center bottom-4 p-4 w-[90%] max-w-[450px]">
        {!isSubmitting && !ratingMode && !claimReward ? (
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
        ) : ratingMode ? (
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
        ) : claimReward ? (
          <div className="flex flex-row items-center justify-center gap-4">
            <button
              onClick={handleClaimClick}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Claim Reward
            </button>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-center gap-6">
            <button
              onClick={() => handleSubmitClick("Cancel")}
              className="bg-red-500 bg-opacity-75 backdrop-blur-sm text-white px-4 py-2 rounded-[14px]"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSubmitClick("Submit")}
              className="bg-[#3f3952] bg-opacity-75 backdrop-blur-sm text-white px-4 py-2 rounded-[14px]"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionnaireChat;
