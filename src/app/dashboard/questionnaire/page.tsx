"use client";

import { useRouter } from "next/navigation";
import BeginQuestionnaire from "@/containers/questionnaire/start";

export default function Questionnaire() {
  const router = useRouter();

  const question = {
    reward: "5",
    rewardPoints: "45",
    completionTime: "1",
    description: "Verify your number",
    rewardPointText: "verifying your number",
    imageUrl: "/images/questionnaire/questions.svg",
  };

  const handleClick = () => {
    router.push("/dashboard/questionnaire/verify-phone-number");
  };

  return (
    <BeginQuestionnaire
      onclick={handleClick}
      reward={question.reward}
      imageUrl={question.imageUrl}
      description={question.description}
      rewardPoints={question.rewardPoints}
      completionTime={question.completionTime}
      rewardPointText={question.rewardPointText}
    />
  );
}
