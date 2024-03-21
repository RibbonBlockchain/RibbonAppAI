"use client";
import { useState } from "react";
import BeginQuestionnaire from "@/containers/questionnaire/start";
import SelectOptions from "@/containers/questionnaire/select-options";
import OptionSelectQuestionnarie from "@/containers/questionnaire/radio-questionnaire";
import YesOrNo from "@/containers/questionnaire/YesOrNo";

export default function Environment() {
  const question = {
    reward: "5",
    rewardPoints: "45",
    completionTime: "1",
    description: "Complete your profile",
    rewardPointText: "completing your profile",
    imageUrl: "/images/questionnaire/environment.svg",
    personalInfo: {
      task: "Does the House you live in pose any risk to you or your family's Health?",
      instruction: "PLEASE WRITE IN THE BOX",
      userDetails: [
        { label: "First Name", required: true, value: "" },
        { label: "Last Name", required: true, value: "" },
        { label: "Other Names", required: false, value: "" },
      ],
    },
  };

  const [step, setStep] = useState(0);

  const handleClick = () => {
    setStep(step + 1);
  };

  const handlePrevPageClick = () => {
    setStep(step - 1);
  };
  return (
    <div>
      {step === 0 ? (
        <BeginQuestionnaire
          onclick={handleClick}
          reward={question.reward}
          imageUrl={question.imageUrl}
          description={question.description}
          rewardPoints={question.rewardPoints}
          completionTime={question.completionTime}
          rewardPointText={question.rewardPointText}
        />
      ) : step === 1 ? (
        <OptionSelectQuestionnarie
          step={1}
          no_of_steps={6}
          onclick={handleClick}
          instruction="Select one"
          prevPage={handlePrevPageClick}
          question="Does the House you live in pose any risk to you or your family's health?"
        >
          <YesOrNo />
        </OptionSelectQuestionnarie>
      ) : step === 2 ? (
        <OptionSelectQuestionnarie
          step={2}
          no_of_steps={6}
          onclick={handleClick}
          instruction="Select one"
          prevPage={handlePrevPageClick}
          question="Does the neighborhood you live in pose any risk to you or your family’s health?"
        >
          <YesOrNo />
        </OptionSelectQuestionnarie>
      ) : step === 3 ? (
        <OptionSelectQuestionnarie
          step={3}
          no_of_steps={6}
          onclick={handleClick}
          instruction="Select one"
          prevPage={handlePrevPageClick}
          question="Does your family feel safe in the area you live in?"
        >
          <YesOrNo thirdOptionText="Sometimes" />
        </OptionSelectQuestionnarie>
      ) : step === 4 ? (
        <OptionSelectQuestionnarie
          step={4}
          no_of_steps={6}
          onclick={handleClick}
          instruction="Select one"
          prevPage={handlePrevPageClick}
          question="Do you have tarred/asphalt roads in your neighborhood?"
        >
          <YesOrNo thirdOptionText="Sometimes" />
        </OptionSelectQuestionnarie>
      ) : step === 5 ? (
        <OptionSelectQuestionnarie
          step={5}
          no_of_steps={6}
          onclick={handleClick}
          instruction="Select one"
          prevPage={handlePrevPageClick}
          question="Do you have tarred/asphalt roads in your neighborhood?"
        >
          <YesOrNo thirdOptionText="Partly" />
        </OptionSelectQuestionnarie>
      ) : (
        <OptionSelectQuestionnarie
          step={6}
          no_of_steps={6}
          onclick={handleClick}
          instruction="Select one"
          prevPage={handlePrevPageClick}
          question="Do you have access to the public transport in your neighborhood?"
        >
          <YesOrNo thirdOptionText="Sometimes" />
        </OptionSelectQuestionnarie>
      )}
    </div>
  );
}
