"use client";

import React from "react";
import { useUpdateProfile } from "@/api/user";
import Claim from "@/containers/questionnaire/success";
import FillInfo from "@/containers/questionnaire/fill-info";
import BeginQuestionnaire from "@/containers/questionnaire/start";
import Birthdate from "@/components/questionnarie/complete-profile/birthdate";
import UserNames from "@/components/questionnarie/complete-profile/user-names";
import UserSocials from "@/components/questionnarie/complete-profile/user-socials";
import GenderSelect from "@/components/questionnarie/complete-profile/gender-select";
import OptionSelectQuestionnarie from "@/containers/questionnaire/radio-questionnaire";

const CompleteProfile = () => {
  const [step, setStep] = React.useState(0);
  const { mutate: update } = useUpdateProfile();

  const [state, setState] = React.useState({
    firstName: "",
    lastName: "",
    otherNames: "",
    socials: { x: "", linkedIn: "", discord: "", instagram: "" },
    gender: undefined,
  });

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
        { label: "First Name", required: true },
        { label: "Last Name", required: true },
        { label: "Other Names", required: false },
      ],
    },
  };

  const handleClick = () => {
    if (step < 1) return setStep(step + 1);

    update(state, {
      onSuccess: () => {
        console.log(step);
        setStep(step + 1);
      },
    });
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
          isProfile={true}
          onclick={handleClick}
          prevPage={handlePrevPageClick}
          task={question.personalInfo.task}
          instruction={question.personalInfo.instruction}
        >
          <UserNames state={state} setState={setState} />
        </FillInfo>
      ) : step === 2 ? (
        <OptionSelectQuestionnarie
          step={2}
          no_of_steps={4}
          isProfile={true}
          onclick={handleClick}
          instruction="Choose one"
          prevPage={handlePrevPageClick}
          question={"Select your gender"}
        >
          <GenderSelect
            value={state.gender}
            onChange={(gender: any) =>
              setState((prev) => ({ ...prev, gender }))
            }
          />
        </OptionSelectQuestionnarie>
      ) : step === 3 ? (
        <OptionSelectQuestionnarie
          step={3}
          no_of_steps={4}
          isProfile={true}
          onclick={handleClick}
          prevPage={handlePrevPageClick}
          question={"What is your birthdate"}
        >
          <Birthdate
            setValue={(dob: any) => setState((prev) => ({ ...prev, dob }))}
          />
        </OptionSelectQuestionnarie>
      ) : step === 4 ? (
        <FillInfo
          step={4}
          no_of_steps={4}
          onclick={handleClick}
          prevPage={handlePrevPageClick}
          task={question.personalInfo.task}
          instruction={question.personalInfo.instruction}
          isProfile={true}
        >
          <UserSocials state={state} setState={setState} />
        </FillInfo>
      ) : (
        <Claim />
      )}
    </div>
  );
};

export default CompleteProfile;
