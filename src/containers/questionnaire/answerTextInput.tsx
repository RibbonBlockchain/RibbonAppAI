import React, { ChangeEvent } from "react";

interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
}

const TextareaInput: React.FC<TextareaProps> = ({ value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <textarea
      // rows={12}
      value={value}
      onChange={handleChange}
      className="border rounded-md p-2 w-full"
    />
  );
};

export default TextareaInput;
