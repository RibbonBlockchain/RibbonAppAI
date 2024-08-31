import React, { useState } from "react";
import Question from "./question-template";
import { Plus } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface Question {
  id: number;
  name: string;
  selectedValue: string;
  optionType: "text" | "image"; // New field to specify the type of options
  options: Option[];
}

const Questionnaire: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: Date.now(),
      name: "",
      selectedValue: "",
      optionType: "text",
      options: [{ value: "", label: "" }],
    },
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        name: "",
        selectedValue: "",
        optionType: "text",
        options: [{ value: "", label: "" }],
      },
    ]);
  };

  const handleChangeQuestion = (id: number, name: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, name } : q)));
  };

  const handleChangeOption = (id: number, value: string, index: number) => {
    setQuestions(
      questions.map((q) =>
        q.id === id
          ? {
              ...q,
              options: q.options.map((opt, i) =>
                i === index ? { ...opt, label: value } : opt
              ),
            }
          : q
      )
    );
  };

  const handleSelectChange = (id: number, value: string) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, selectedValue: value } : q))
    );
  };

  const handleAddOption = (id: number) => {
    setQuestions(
      questions.map((q) =>
        q.id === id && q.options.length < 3
          ? { ...q, options: [...q.options, { value: "", label: "" }] }
          : q
      )
    );
  };

  const handleRemoveOption = (id: number, index: number) => {
    setQuestions(
      questions.map((q) =>
        q.id === id
          ? { ...q, options: q.options.filter((_, i) => i !== index) }
          : q
      )
    );
  };

  const handleChangeOptionType = (id: number, type: "text" | "image") => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, optionType: type } : q))
    );
  };

  return (
    <div className="w-full flex flex-col gap-4 mb-10">
      {questions.map((question, index) => (
        <Question
          key={question.id}
          number={index + 1}
          question={question}
          onChangeQuestion={(name) => handleChangeQuestion(question.id, name)}
          onChangeOption={(value, index) =>
            handleChangeOption(question.id, value, index)
          }
          onSelectChange={(value) => handleSelectChange(question.id, value)}
          onAddOption={() => handleAddOption(question.id)}
          onRemoveOption={(index) => handleRemoveOption(question.id, index)}
          onChangeOptionType={(type) =>
            handleChangeOptionType(question.id, type)
          }
        />
      ))}
      <button
        onClick={handleAddQuestion}
        className="flex flex-row items-center flex-end justify-end gap-2 py-2 mt-2 text-sm text-start text-[#DFCBFB] font-medium"
      >
        <Plus size={14} /> Add more questions
      </button>
    </div>
  );
};

export default Questionnaire;
