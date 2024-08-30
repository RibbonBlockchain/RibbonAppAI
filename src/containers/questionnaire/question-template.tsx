import { Plus, X } from "lucide-react";
import React from "react";

interface Option {
  value: string;
  label: string;
}

interface QuestionProps {
  number: number;
  question: {
    id: number;
    name: string;
    selectedValue: string;
    optionType: "text" | "image"; // New field to specify the type of options
    options: Option[];
  };
  onChangeQuestion: (name: string) => void;
  onChangeOption: (value: string, index: number) => void;
  onSelectChange: (value: string) => void;
  onAddOption: () => void;
  onRemoveOption: (index: number) => void;
  onChangeOptionType: (type: "text" | "image") => void;
}

const Question: React.FC<QuestionProps> = ({
  number,
  question,
  onChangeQuestion,
  onChangeOption,
  onSelectChange,
  onAddOption,
  onRemoveOption,
  onChangeOptionType,
}) => {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold">Question {number}</p>
        <input
          type="text"
          value={question.name}
          onChange={(e) => onChangeQuestion(e.target.value)}
          placeholder="Write your question here"
          className="py-3 px-2 rounded-lg bg-inherit border border-[#E5E7EB] text-sm font-normal text-white placeholder:text-[#98A2B3]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor={`options-select-${question.id}`}
          className="text-sm font-semibold"
        >
          Options type
        </label>
        <select
          id={`options-select-${question.id}`}
          value={question.optionType}
          onChange={(e) =>
            onChangeOptionType(e.target.value as "text" | "image")
          }
          className="w-full py-3 px-2 rounded-lg bg-inherit border border-[#E5E7EB] text-sm font-normal text-white"
        >
          <option value="text">Text</option>
          <option value="image">Image</option>
        </select>
      </div>

      <div className="border border-[#D6CBFF33] my-2"></div>

      <div className="flex flex-col gap-3 px-2">
        {question.options.map((option, index) => (
          <div key={index} className="flex flex-row gap-4 items-center">
            {question.optionType === "text" ? (
              <input
                type="text"
                value={option.label}
                onChange={(e) => onChangeOption(e.target.value, index)}
                placeholder={`Option ${index + 1}`}
                className="w-full py-3 px-2 rounded-lg bg-inherit border border-[#E5E7EB] text-sm font-normal text-white placeholder:text-[#98A2B3]"
              />
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
            className="flex flex-row items-center gap-2 py-2 mt-2 text-sm text-start text-[#DFCBFB] font-medium"
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
