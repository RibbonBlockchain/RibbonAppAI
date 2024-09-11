import clsx from "clsx";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import Question from "../questionnaire/question-template";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { QuestionType } from "@/api/linkage/types";
import { SpinnerIcon } from "@/components/icons/spinner";
import { useUploadLinkageQuestionnaire } from "@/api/linkage";

export type TUploadLinkageQuestionnaireBody = {
  name: string;
  linkageId: number;
  questions: LinkageQuestion[];
};

interface LinkageQuestion {
  text: string;
  type: QuestionType;
  options: Options[];
}

interface Options {
  value: string;
  label?: string;
}

const UploadLoanQuestionniareTemplate = ({
  linkageId,
}: {
  linkageId: number;
}) => {
  const router = useRouter();
  const { mutate, isPending } = useUploadLinkageQuestionnaire();

  // Define default values
  const defaultQuestionnaireName = "";
  const defaultLoanAmount = "0";
  const defaultQuestions: LinkageQuestion[] = [
    {
      text: "",
      type: "BOOLEAN",
      options: [{ value: "" }],
    },
  ];

  const [questionnaireName, setQuestionnaireName] = useState(
    defaultQuestionnaireName
  );
  const [loanAmount, setLoanAmount] = useState(defaultLoanAmount);
  const [questions, setQuestions] = useState(defaultQuestions);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: "",
        type: "MULTISELECT",
        options: [{ value: "" }],
      },
    ]);
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmitLinkageQuestionnaireManually = () => {
    mutate(
      { body: { type: "LOAN", name: questionnaireName, questions }, linkageId },
      {
        onSuccess: () => {
          toast.success("Questionnaire successfully added");
          setQuestionnaireName(defaultQuestionnaireName);
          setQuestions(defaultQuestions);
          router.push("/my-linkages");
        },
      }
    );
  };

  const handleChangeQuestion = (index: number, text: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) => (i === index ? { ...q, text } : q))
    );
  };

  const handleChangeOption = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) =>
        i === questionIndex
          ? {
              ...q,
              options: q.options.map((opt, j) =>
                j === optionIndex ? { ...opt, value } : opt
              ),
            }
          : q
      )
    );
  };

  const handleChangeOptionLabel = (
    questionIndex: number,
    optionIndex: number,
    label: string
  ) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) =>
        i === questionIndex
          ? {
              ...q,
              options: q.options.map((opt, j) =>
                j === optionIndex ? { ...opt, label } : opt
              ),
            }
          : q
      )
    );
  };

  const handleSelectChange = (index: number, type: QuestionType) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) => (i === index ? { ...q, type } : q))
    );
  };

  const handleAddOption = (index: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) =>
        i === index && q.options.length < 3
          ? { ...q, options: [...q.options, { value: "", label: "" }] }
          : q
      )
    );
  };

  const handleRemoveOption = (questionIndex: number, optionIndex: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) =>
        i === questionIndex
          ? { ...q, options: q.options.filter((_, j) => j !== optionIndex) }
          : q
      )
    );
  };

  const handleChangeOptionType = (index: number, type: QuestionType) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) => (i === index ? { ...q, type } : q))
    );
  };

  return (
    <div className="w-full flex flex-col gap-6 mb-20">
      <Toaster />

      <div className="flex flex-col gap-2 mt-4">
        <p className="text-sm font-semibold">Loan Name</p>
        <input
          type="text"
          value={questionnaireName}
          onChange={(e) => setQuestionnaireName(e.target.value)}
          placeholder="Enter loan name"
          className="py-3 px-2 rounded-lg bg-inherit border border-[#E5E7EB] text-sm font-normal text-white placeholder:text-[#98A2B3]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold">Loan Amount</p>
        <input
          type="text"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          placeholder="Enter loan amount"
          className="py-3 px-2 rounded-lg bg-inherit border border-[#E5E7EB] text-sm font-normal text-white placeholder:text-[#98A2B3]"
        />
      </div>

      {questions.map((question, index) => (
        <Question
          key={index}
          number={index + 1}
          question={question}
          onChangeQuestion={(text) => handleChangeQuestion(index, text)}
          onChangeOption={(value, optionIndex) =>
            handleChangeOption(index, optionIndex, value)
          }
          onChangeOptionLabel={(label, optionIndex) =>
            handleChangeOptionLabel(index, optionIndex, label)
          }
          onSelectChange={(type) => handleSelectChange(index, type)}
          onAddOption={() => handleAddOption(index)}
          onRemoveOption={(optionIndex) =>
            handleRemoveOption(index, optionIndex)
          }
          onChangeOptionType={(type) => handleChangeOptionType(index, type)}
          onRemoveQuestion={() => handleRemoveQuestion(index)}
        />
      ))}

      <button
        onClick={handleAddQuestion}
        className="flex flex-row flex-end items-center justify-end gap-2 py-2 mt-2 text-sm text-start text-[#DFCBFB] font-medium"
      >
        Add Question <Plus size={14} />
      </button>

      <button
        onClick={handleSubmitLinkageQuestionnaireManually}
        className={clsx(
          "flex justify-center py-2.5 mt-8 text-sm text-start font-semibold w-full rounded-[8px] text-[#290064]",
          isPending ? "border-stone-300 bg-stone-400/50" : "bg-white"
        )}
      >
        {isPending ? <SpinnerIcon /> : "Create loan service"}
      </button>
    </div>
  );
};

export default UploadLoanQuestionniareTemplate;
