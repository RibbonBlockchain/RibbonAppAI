"use client";

import clsx from "clsx";
import React from "react";
import { useGetTaskByID } from "@/api/auth";
import { useRouter } from "next/navigation";
import ProgressBar from "@ramonak/react-progress-bar";
import BgEffect from "@/components/questionnarie/bg-effect";
import RadioSelect from "@/components/questionnarie/radio-select";
import BeginQuestionnaire from "@/containers/questionnaire/start";
import { Check, RibbonLight } from "../../../../../../public/images";
import PrevQuestionnairePageButton from "@/components/button/prev-questionnarie-page";

const TaskPage = ({ params }: any) => {
  // console.log(params);
  const [step, setStep] = React.useState(0);
  const { data } = useGetTaskByID({ id: String(params.id) });

  const router = useRouter();

  const onclick = () => {
    setStep((x) => x + 1);
  };
  const prevPage = () => {
    setStep((x) => x - 1);
    step === 0 && router.push("/dashboard");
  };

  const disabled = step === data?.questions?.length;

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

        {step === 0 && (
          <BeginQuestionnaire
            reward={data?.reward}
            onclick={() => setStep(1)}
            rewardPoints={data?.reward * 5000}
            imageUrl={"/images/ribbon.svg"}
            description={data?.name}
            completionTime={data?.duration / 60}
          />
        )}

        <div className="flex h-[80vh] flex-col items-center justify-between">
          {data?.questions?.map(
            (q: any, i: any) =>
              q.id === step && (
                <>
                  <div className="flex w-full flex-col items-center justify-center gap-3">
                    <h1 className="font-normal text-lg text-center">
                      {q?.text}
                    </h1>

                    {q?.type === "SHORT_ANSWER" ? (
                      <p className="text-[10px] py-1 px-3 bg-[#F6E8F6] rounded-full">
                        Type your answer here
                      </p>
                    ) : (
                      <p className="text-[10px] py-1 px-3 bg-[#F6E8F6] rounded-full">
                        Select One
                      </p>
                    )}

                    {q?.type === "SHORT_ANSWER" && (
                      <input className="text-base border-[#7C56FE] border-[1px] w-full rounded-md py-3 px-2 self-start mt-10" />
                    )}

                    {q?.type === "BOOLEAN" && (
                      <div className="flex flex-row w-full mt-14">
                        <RadioSelect
                          options={q?.options?.map((o: any) => o?.text)}
                        />
                      </div>
                    )}

                    {/* {q?.isLast === true ? router.push("/dashboard") : ""} */}
                  </div>
                </>
              )
          )}

          <div
            onClick={onclick}
            className={clsx(
              "justify-center w-full mb-2",
              step === 0 ? "hidden" : "flex "
            )}
          >
            <button
              disabled={disabled}
              className="flex w-[12rem] items-center justify-center text-white bg-gradient-to-r from-[#714EE7] to-[#A81DA6] text-sm font-semibold p-4 rounded-[35px] border-solid border-gray-300 border-2 transition-colors duration-100 focus-visible:duration-0 bg-gray-100 hover:bg-gray-300 focus-visible:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-gray-300"
            >
              <Check />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
