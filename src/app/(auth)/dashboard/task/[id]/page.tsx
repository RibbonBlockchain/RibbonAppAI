"use client";

import clsx from "clsx";
import React from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "@ramonak/react-progress-bar";
import { YesorNoOptions } from "@/lib/values/options";
import YesOrNo from "@/containers/questionnaire/YesOrNo";
import { SpinnerIcon } from "@/components/icons/spinner";
import { useGetTaskByID, useSubmitTask } from "@/api/user";
import BgEffect from "@/components/questionnarie/bg-effect";
import RadioSelect from "@/components/questionnarie/radio-select";
import BeginQuestionnaire from "@/containers/questionnaire/start";
import ClaimTaskReward from "@/components/modal/claim_task_reward";
import { Check, RibbonLight } from "../../../../../../public/images";
import PrevQuestionnairePageButton from "@/components/button/prev-questionnarie-page";

const TaskPage = ({ params }: any) => {
  const [step, setStep] = React.useState(0);
  const [claim, setClaim] = React.useState(false);

  const { data, isLoading } = useGetTaskByID({ id: String(params.id) });
  isLoading && <SpinnerIcon />;

  const { mutate: submitTask, isPending } = useSubmitTask();
  isPending && <SpinnerIcon />;

  const router = useRouter();

  // const onclick = () => {
  //   setStep((x) => x + 1);
  //   if (step === data?.questions?.length) {
  //     setStep(data?.questions?.length);
  //   }
  // };

  const prevPage = () => {
    setStep((x) => x - 1);
    step === 0 && router.push("/dashboard");
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
                completed={0}
                labelSize="10px"
                isLabelVisible={false}
                maxCompleted={data?.questions?.length}
              />
            </div>
          </div>
        )}

        {step === 0 ? (
          <BeginQuestionnaire
            reward={data?.reward}
            onclick={() => setStep(1)}
            rewardPoints={data?.reward * 5000}
            imageUrl={"/images/ribbon.svg"}
            description={data?.name}
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

                      {/* {q?.type === "SHORT_ANSWER" ? (
                    <p className="text-[10px] py-1 px-3 bg-[#F6E8F6] rounded-full">
                      Type your answer here
                    </p>
                  ) : (
                    <p className="text-[10px] py-1 px-3 bg-[#F6E8F6] rounded-full">
                      Select One
                    </p>
                  )} */}
                      {/* 
                  {q?.type === "SHORT_ANSWER" && (
                    <input className="text-base border-[#7C56FE] border-[1px] w-full rounded-md py-3 px-2 self-start mt-10" />
                  )} */}

                      {q?.type && (
                        <p className="text-[10px] py-1 px-3 bg-[#F6E8F6] rounded-full">
                          Select One
                        </p>
                      )}

                      {/* {q?.type === "BOOLEAN" ? (
                        <div
                          onClick={onclick}
                          className="flex items-center justify-center flex-row w-full mt-14"
                        >
                          <YesOrNo options={YesorNoOptions} />
                        </div>
                      ) : (
                        ""
                      )} */}

                      <div className="flex flex-row w-full mt-10 mb-20">
                        <RadioSelect
                          options={q?.options?.map((o: any) => (
                            <div
                              key={o?.id}
                              onClick={() => {
                                setStep((x) => x + 1);
                                if (step === data?.questions?.length) {
                                  setStep(data?.questions?.length);
                                }
                                submitTask({
                                  questionId: q?.id,
                                  optionId: o?.id,
                                  taskId: data?.id,
                                });

                                // console.log(q?.id, "<<< questionId");
                                // console.log(
                                //   o?.id,
                                //   o?.text,
                                //   "<<< selected option ID"
                                // );
                                // console.log(data?.id, ">>> taskID here");
                              }}
                            >
                              {o?.text}
                            </div>
                          ))}
                        />
                      </div>
                    </div>

                    <div
                      className={clsx(
                        "justify-center w-full ",
                        step <= 0 ? "hidden" : "flex"
                      )}
                    >
                      <button
                        onClick={() => {
                          if (step === data?.questions?.length) {
                            setStep(data?.questions?.length);
                            setClaim(!claim);
                          }
                        }}
                        className={clsx(
                          `w-[12rem] items-center gap-2 justify-center mb-16 text-white bg-gradient-to-r from-[#714EE7] to-[#A81DA6] text-base font-semibold p-4 rounded-[35px] border-solid border-gray-300 border-2 transition-colors duration-100 focus-visible:duration-0 bg-gray-100 hover:bg-gray-300 focus-visible:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-gray-300`,
                          step !== data?.questions?.length ? "hidden" : "flex"
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

            {/* <div
          className={clsx(
            "justify-center w-full mb-2",
            step <= 0 ? "hidden" : "flex"
          )}
        >
          <button
            onClick={onclick}
            disabled={disabled}
            className={clsx(
              `w-[12rem] items-center justify-center text-white bg-gradient-to-r from-[#714EE7] to-[#A81DA6] text-sm font-semibold p-4 rounded-[35px] border-solid border-gray-300 border-2 transition-colors duration-100 focus-visible:duration-0 bg-gray-100 hover:bg-gray-300 focus-visible:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-gray-300`,
              step <= 0 ? "hidden" : "flex"
            )}
          >
            <Check />
          </button>
        </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskPage;
