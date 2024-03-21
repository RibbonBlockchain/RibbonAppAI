import React from "react";
import RadioSelect from "../../components/questionnarie/radio-select";

export default function YesOrNo({
  thirdOptionText,
}: {
  thirdOptionText?: string;
}) {
  const questionOptions = ["Yes", "No"];

  return (
    <RadioSelect options={questionOptions} thirdOptionText={thirdOptionText} />
  );
}
