import Image from "next/image";

export const QuestionnaireHeader = () => {
  return (
    <div className="bg-[#F2EEFF] mb-2 flex flex-row items-center justify-between text-[#A81DA6] text-xs px-3 py-1 font-bold rounded-md">
      <p>Questionnaire</p>
      <Image
        width={40}
        height={40}
        alt="questionnaires"
        src="/images/questionnaires.png"
      />
    </div>
  );
};

export const SurveyHeader = () => {
  return (
    <div className="bg-[#F2EEFF] mb-2 flex flex-row items-center justify-between text-[#A81DA6] text-xs px-3 py-1 font-bold rounded-md">
      <p>Surveys</p>
      <Image width={40} height={40} alt="surveys" src="/images/surveys.png" />
    </div>
  );
};

export const TaskHeader = () => {
  return (
    <div className="bg-[#F2EEFF] mb-2 flex flex-row items-center justify-between text-[#A81DA6] text-xs px-3 py-1 font-bold rounded-md">
      <p>Tasks</p>
      <Image width={40} alt="tasks" height={40} src="/images/tasks.png" />
    </div>
  );
};
