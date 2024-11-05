import clsx from "clsx";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { QuestionType } from "@/api/linkage/types";
import { SpinnerIcon } from "@/components/icons/spinner";
import Question from "../questionnaire/question-template";
import { useCreateLoan } from "@/api/linkage";

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

export const repaymentFrequencyOptions = [
  { value: 1, label: "Daily" },
  { value: 2, label: "Weekly" },
  { value: 3, label: "Monthly" },
  { value: 4, label: "Yearly" },
];

const UploadLoanQuestionnaireTemplate = ({
  linkageId,
}: {
  linkageId: number;
}) => {
  const router = useRouter();
  const { mutate, isPending } = useCreateLoan();

  const defaultQuestionnaireName = "";
  const defaultLoanAmount = 0;
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
  const [interestRate, setInterestRate] = useState(0);
  const [repaymentPeriod, setRepaymentPeriod] = useState(0);
  const [installmentAmount, setInstallmentAmount] = useState(0);
  const [repaymentFrequency, setRepaymentFrequency] = useState(1); // Default to daily

  const calculateInstallment = () => {
    if (loanAmount <= 0 || interestRate < 0 || repaymentPeriod <= 0) {
      setInstallmentAmount(0);
      return;
    }

    let rate, n;

    switch (repaymentFrequency) {
      case 1: // Daily
        rate = interestRate / 100 / 365;
        n = repaymentPeriod; // Number of days
        break;
      case 2: // Weekly
        rate = interestRate / 100 / 52;
        n = repaymentPeriod; // Number of weeks
        break;
      case 3: // Monthly
        rate = interestRate / 100 / 12;
        n = repaymentPeriod; // Number of months
        break;
      case 4: // Yearly
        rate = interestRate / 100;
        n = repaymentPeriod; // Number of years
        break;
      default:
        return;
    }

    const M = (loanAmount * rate) / (1 - Math.pow(1 + rate, -n));
    setInstallmentAmount(M);
  };

  useEffect(() => {
    calculateInstallment();
  }, [loanAmount, interestRate, repaymentPeriod, repaymentFrequency]);

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

  const handleCreateLoanService = () => {
    mutate(
      {
        body: {
          // type: "LOAN",
          name: questionnaireName,
          amount: loanAmount,
          interest: interestRate,
          timeline: repaymentPeriod,
          period: repaymentFrequency,
          questions,
        },
        linkageId,
      },
      {
        onSuccess: () => {
          toast.success("Loan service created successfully");
          setQuestionnaireName(defaultQuestionnaireName);
          setQuestions(defaultQuestions);
          setLoanAmount(0);
          setInterestRate(0);
          setRepaymentFrequency(0);
          setRepaymentPeriod(0);
          setInstallmentAmount(0);
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
          className="py-3 px-2 rounded-lg bg-inherit border border-[#F2EEFF40] text-sm font-normal text-white placeholder:text-[#98A2B3]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold">Loan Amount</p>
        <input
          type="text"
          value={loanAmount}
          onChange={(e: any) => setLoanAmount(Number(e.target.value))}
          placeholder="Enter loan amount"
          className="py-3 px-2 rounded-lg bg-inherit border border-[#F2EEFF40] text-sm font-normal text-white placeholder:text-[#98A2B3]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold">Loan Collection</p>

        <div className="grid grid-cols-[2fr_0.5fr_1fr] items-center justify-between">
          <p className="text-sm font-medium">Annual interest rate (%)</p>
          <p>-</p>
          <input
            type="text"
            value={interestRate}
            onChange={(e: any) => setInterestRate(Number(e.target.value))}
            placeholder=""
            className="p-2 max-w-[100px] rounded-lg bg-inherit border border-[#F2EEFF40] text-sm font-normal text-white placeholder:text-[#98A2B3]"
          />
        </div>

        <div className="grid grid-cols-[2fr_0.5fr_1fr] items-center justify-between">
          <p className="text-sm font-semibold">Repayment Frequency</p>
          <p>-</p>
          <select
            value={repaymentFrequency}
            onChange={(e: any) => setRepaymentFrequency(Number(e.target.value))}
            className="bg-inherit max-w-[100px] py-3 px-2 rounded-lg border border-[#F2EEFF40] text-sm font-normal text-white"
          >
            {repaymentFrequencyOptions.map((option) => (
              <option
                key={option.value}
                className="bg-[#0B0228] text-white"
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-[2fr_0.5fr_1fr] items-center justify-between">
          <p className="text-sm font-medium">Repayment Period</p>
          <p>-</p>
          <input
            type="text"
            value={repaymentPeriod}
            onChange={(e: any) => setRepaymentPeriod(Number(e.target.value))}
            placeholder=""
            className="p-2 max-w-[100px] rounded-lg bg-inherit border border-[#F2EEFF40] text-sm font-normal text-white placeholder:text-[#98A2B3]"
          />
        </div>

        <div className="grid grid-cols-[2fr_0.5fr_1fr] items-center justify-between">
          <p className="text-sm font-medium">Installment amount</p>
          <p>-</p>
          <input
            type="text"
            value={installmentAmount}
            readOnly
            className="p-2 max-w-[100px] rounded-lg bg-inherit border border-[#F2EEFF40] text-sm font-normal text-white placeholder:text-[#98A2B3]"
          />
        </div>
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
        onClick={handleCreateLoanService}
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

export default UploadLoanQuestionnaireTemplate;
