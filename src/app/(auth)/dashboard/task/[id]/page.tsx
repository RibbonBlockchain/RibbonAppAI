"use client";

import clsx from "clsx";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "@ramonak/react-progress-bar";
import YesOrNo from "@/containers/questionnaire/YesOrNo";
import { SpinnerIcon } from "@/components/icons/spinner";
import { useGetTaskByID, useSubmitTask } from "@/api/user";
import BgEffect from "@/components/questionnarie/bg-effect";
import BeginQuestionnaire from "@/containers/questionnaire/start";
import ClaimTaskReward from "@/components/modal/claim_task_reward";
import { Check, RibbonLight } from "../../../../../../public/images";
import RadioOptions from "@/containers/questionnaire/radio-options";
import PrevQuestionnairePageButton from "@/components/button/prev-questionnarie-page";

const TaskPage = ({ params }: any) => {
  const [step, setStep] = React.useState(0);
  const [claim, setClaim] = React.useState(false);

  const { data, isLoading } = useGetTaskByID({ id: String(params.id) });
  const questionIds = data?.questions?.map((question: any) => question.id);

  const { mutate: submitTask, isPending } = useSubmitTask();
  isPending && <SpinnerIcon />;

  const router = useRouter();

  const prevPage = () => {
    setStep((x) => x - 1);
    step === 0 && router.push("/dashboard");
  };

  const [optionId, setSelectedOptionId] = useState<number>();
  const [YesOrNoId, setYesorNoId] = useState<number>();

  const handleOptionSelect = (id: number) => {
    setSelectedOptionId(id);

    if (step !== data?.questions?.length) {
      submitTask({
        questionId: questionIds[step - 1],
        optionId: id,
        taskId: data?.id,
      });
    }
  };

  const handleYesOrNoOptionSelect = (id: number) => {
    setYesorNoId(id);

    if (step !== data?.questions?.length) {
      submitTask({
        questionId: questionIds[step - 1],
        optionId: id,
        taskId: data?.id,
      });
    }
  };

  return (
    <div className="relative flex flex-col min-h-[100vh] items-start justify-between p-4 sm:p-6">
      <BgEffect />

      <div className="flex flex-col w-full">
        <div className="flex flex-row gap-20 items-center justify-start">
          <PrevQuestionnairePageButton onClick={prevPage} />
          <RibbonLight />
        </div>

        {step > 0 && (
          <div className="mt-6 mb-4 flex flex-row gap-2 items-center justify-center">
            <div className="text-xs text-[#939393] flex flex-row items-center">
              <p className="">{step}</p>/
              <p className="">{data?.questions?.length}</p>
            </div>

            <div className="w-full">
              <ProgressBar
                height="3px"
                completed={step}
                labelSize="10px"
                isLabelVisible={false}
                maxCompleted={data?.questions?.length}
              />
            </div>
          </div>
        )}

        {step == 0 ? (
          <BeginQuestionnaire
            reward={data?.reward}
            onclick={() => setStep(1)}
            rewardPoints={data?.reward * 5000}
            imageUrl={data?.image || "/images/ribbon.svg"}
            description={data?.description}
            completionTime={data?.duration / 60}
          />
        ) : (
          <div className="flex h-[80vh] flex-col items-center justify-between">
            {data?.questions?.map(
              (q: any, i: any) =>
                i + 1 === step && (
                  <>
                    <div
                      key={q?.id}
                      className="flex w-full flex-col items-center justify-center gap-3"
                    >
                      <h1 className="font-normal text-lg text-center">
                        {q?.text}
                      </h1>

                      {q?.type && (
                        <p className="text-[10px] py-1 px-3 bg-[#F6E8F6] rounded-full">
                          Select One
                        </p>
                      )}

                      {q?.type === "BOOLEAN" ? (
                        <div className="flex items-center justify-center flex-row w-full mt-14">
                          <YesOrNo
                            options={q?.options}
                            onOptionSelect={handleYesOrNoOptionSelect}
                          />
                        </div>
                      ) : (
                        <div className="flex flex-row w-full mt-10 mb-20  ">
                          <RadioOptions
                            options={q?.options}
                            onOptionSelect={handleOptionSelect}
                          />
                        </div>
                      )}
                    </div>

                    <div className={clsx("flex justify-center w-full")}>
                      <button
                        onClick={() => {
                          setStep((x) => x + 1);
                          if (step === data?.questions?.length) {
                            setStep(data?.questions?.length);
                            setClaim(!claim);
                            submitTask({
                              questionId:
                                questionIds[data?.questions?.length - 1],
                              optionId: YesOrNoId || optionId || 0,
                              taskId: data?.id,
                            });
                          }
                        }}
                        className={clsx(
                          `flex w-[12rem] items-center gap-2 justify-center mb-16 text-white text-base bg-gradient-to-r from-[#714EE7] to-[#A81DA6] font-semibold p-4 rounded-[35px] border-solid border-gray-300 border-2 transition-colors duration-100 focus-visible:duration-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-gray-300`
                        )}
                      >
                        Submit <Check />
                      </button>
                    </div>
                  </>
                )
            )}

            {claim && (
              <ClaimTaskReward
                isOpen={claim}
                closeModal={() => setClaim(false)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskPage;
