import React from "react";
import FillInfo from "@/containers/questionnaire/fill-info";
import RadioQuestionnaire from "@/containers/questionnaire/radio-questionnaire";

const Page = () => {
  const questions = ["First Name ", "Last Name", "Other Names"];

  return <RadioQuestionnaire question={"Do you smoke?"} options={questions} />;
};

export default Page;
