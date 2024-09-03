import React from "react";
import { Plus, X } from "lucide-react";

// Define types
interface Option {
  value: string;
  label: string;
}

type QuestionType = "BOOLEAN" | "MULTIPLE_CHOICE" | "TEXT";

interface LinkageQuestion {
  text: string;
  type: QuestionType;
  options: Option[];
}

interface QuestionProps {
  number: number;
  question: LinkageQuestion;
  onChangeQuestion: (text: string) => void;
  onChangeOption: (value: string, index: number) => void;
  onChangeOptionLabel: (label: string, index: number) => void;
  onSelectChange: (type: QuestionType) => void;
  onAddOption: () => void;
  onRemoveOption: (index: number) => void;
  onChangeOptionType: (type: QuestionType) => void;
  onRemoveQuestion: () => void;
}

const Question: React.FC<QuestionProps> = ({
  number,
  question,
  onChangeQuestion,
  onChangeOption,
  onChangeOptionLabel,
  onSelectChange,
  onAddOption,
  onRemoveOption,
  onChangeOptionType,
  onRemoveQuestion,
}) => {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between pr-2">
          <p className="text-sm font-semibold">Question {number}</p>
          <button
            onClick={onRemoveQuestion}
            className="flex flex-row items-center gap-2 py-2 mt-2 text-sm text-start text-[#DFCBFB] font-medium"
          >
            Remove Question <X size={14} />
          </button>
        </div>

        <input
          type="text"
          value={question.text}
          onChange={(e) => onChangeQuestion(e.target.value)}
          placeholder="Write your question here"
          className="py-3 px-2 rounded-lg bg-inherit border border-[#E5E7EB] text-sm font-normal text-white placeholder:text-[#98A2B3]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor={`options-select-${number}`}
          className="text-sm font-semibold"
        >
          Options type
        </label>
        <select
          id={`options-select-${number}`}
          value={question.type}
          onChange={(e) => onChangeOptionType(e.target.value as QuestionType)}
          className="w-full py-3 px-2 rounded-lg bg-inherit border border-[#E5E7EB] text-sm font-normal text-white"
        >
          <option value="BOOLEAN">Boolean</option>
          <option value="MULTIPLE_CHOICE">Multiple Choice</option>
          <option value="TEXT">Text</option>
        </select>
      </div>

      <div className="border border-[#D6CBFF33] my-2"></div>

      <div className="flex flex-col gap-3 px-2">
        <label
          htmlFor={`options-select-${number}`}
          className="text-sm font-semibold"
        >
          Type your options here
        </label>
        {question.options.map((option, index) => (
          <div key={index} className="flex flex-row gap-4 items-center">
            {question.type === "TEXT" ? (
              <input
                type="text"
                value={option.label}
                onChange={(e) => onChangeOptionLabel(e.target.value, index)} // Updated to use onChangeOptionLabel
                placeholder={`Option ${index + 1}`}
                className="w-full py-3 px-2 rounded-lg bg-inherit border border-[#E5E7EB] text-sm font-normal text-white placeholder:text-[#98A2B3]"
              />
            ) : question.type === "BOOLEAN" ? (
              <select
                value={option.value}
                onChange={(e) => onChangeOption(e.target.value, index)}
                className="w-full py-3 px-2 rounded-lg bg-inherit border border-[#E5E7EB] text-sm font-normal text-white"
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      onChangeOption(reader.result as string, index);
                    };
                    reader.readAsDataURL(e.target.files[0]);
                  }
                }}
                className="w-full py-3 px-2 rounded-lg bg-inherit border border-[#E5E7EB] text-sm font-normal text-white"
              />
            )}

            <button
              onClick={() => onRemoveOption(index)}
              className={`text-[#DFCBFB] rounded-full border border-[#DFCBFB] ${
                question.options.length === 1 ? "hidden" : ""
              }`}
            >
              <X size={20} />
            </button>
          </div>
        ))}

        {question.options.length < 3 && (
          <button
            onClick={onAddOption}
            className="flex flex-row justify-end items-center gap-2 py-2 mt-2 text-sm text-start text-[#DFCBFB] font-medium"
          >
            Add Option <Plus size={14} />
          </button>
        )}

        <div className="border border-[#D6CBFF33] my-2"></div>
      </div>
    </div>
  );
};

export default Question;
