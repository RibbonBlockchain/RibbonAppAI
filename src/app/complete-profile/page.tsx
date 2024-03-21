"use client";

import React from "react";
import FillInfo from "@/containers/questionnaire/fill-info";
import BeginQuestionnaire from "@/containers/questionnaire/start";
import Birthdate from "@/components/questionnarie/complete-profile/birthdate";
import UserNames from "@/components/questionnarie/complete-profile/user-names";
import UserSocials from "@/components/questionnarie/complete-profile/user-socials";
import GenderSelect from "@/components/questionnarie/complete-profile/gender-select";
import OptionSelectQuestionnarie from "@/containers/questionnaire/radio-questionnaire";

const CompleteProfile = () => {
  const question = {
    reward: "5",
    rewardPoints: "45",
    completionTime: "1",
    description: "Complete your profile",
    rewardPointText: "completing your profile",
    imageUrl: "/images/questionnaire/profile11.svg",
    personalInfo: {
      task: "Kindly tell us your full name",
      instruction: "PLEASE WRITE IN THE BOX",
      userDetails: [
        { label: "First Name", required: true, value: "" },
        { label: "Last Name", required: true, value: "" },
        { label: "Other Names", required: false, value: "" },
      ],
    },
  };

  const [step, setStep] = React.useState(0);
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
        <FillInfo
          step={1}
          no_of_steps={4}
          onclick={handleClick}
          prevPage={handlePrevPageClick}
          task={question.personalInfo.task}
          instruction={question.personalInfo.instruction}
          isProfile={true}
        >
          <UserNames />
        </FillInfo>
      ) : step === 2 ? (
        <OptionSelectQuestionnarie
          step={2}
          no_of_steps={4}
          onclick={handleClick}
          instruction="Choose one"
          prevPage={handlePrevPageClick}
          question={"Select your gender"}
          isProfile={true}
        >
          <GenderSelect />
        </OptionSelectQuestionnarie>
      ) : step === 3 ? (
        <OptionSelectQuestionnarie
          step={3}
          no_of_steps={4}
          onclick={handleClick}
          prevPage={handlePrevPageClick}
          question={"What is your birthdate"}
          isProfile={true}
        >
          <Birthdate />
        </OptionSelectQuestionnarie>
      ) : (
        <FillInfo
          step={4}
          no_of_steps={4}
          onclick={handleClick}
          prevPage={handlePrevPageClick}
          task={question.personalInfo.task}
          instruction={question.personalInfo.instruction}
          isProfile={true}
        >
          <UserSocials />
        </FillInfo>
      )}
    </div>
  );
};

export default CompleteProfile;
