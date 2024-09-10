"use client";

import React from "react";
import { Clock4 } from "lucide-react";
import { useRouter } from "next/navigation";
import RatingCompleted from "./rate-completed";
import { useGetTaskByID, useRateQuestionnaire } from "@/api/user";
import Image from "next/image";

type Props = {
  score: number;
  reward: number;
  taskTitle: string;
  priority?: boolean;
  approximateTime: number;
  completed?: string;
  params: any;
  ratings?: number;
  totalRatings?: number;
};

const TodoCompletedForm = (props: Props) => {
  const rewardPoints = props.reward * 5000;

  const router = useRouter();
  const [rateTask, setRateTask] = React.useState(false);

  const { data } = useGetTaskByID({ id: String(props.params?.id) });
  const questionIds = data?.questions?.map((question: any) => question.id);

  const { mutate: submitRate } = useRateQuestionnaire();
  const [rating, setRating] = React.useState(0);

  return (
    <div
      className={`bg-[#FFFFFF] border-[1px] border-[#fcfcfc] text-[#626262] w-full p-2.5 flex flex-row self-center items-center justify-between rounded-lg mb-3`}
    >
      <div className="flex flex-row items-start justify-start gap-1">
        <div className="flex flex-col text-xs gap-[3px]">
          <p className="font-extrabold whitespace-nowrap truncate max-w-[130px] xxs:max-w-[150px] xs:max-w-[170px]">
            {props.taskTitle}
          </p>
          <div className="flex flex-row items-center">
            <p className="mr-1.5">
              Earned {rewardPoints.toLocaleString()} ribbon
            </p>
          </div>

          <div className="flex flex-row items-center gap-1">
            <RatingCompleted rating={props.ratings || 0} />
            {/* {props.ratings === 0 && (
              <p
                onClick={() => setRateTask(true)}
                className="text-[#714EE7] underline cursor-pointer"
              >
                Rate task
              </p>
            )} */}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-start self-start gap-[3px] text-[10px]">
        <Clock4 size={10} />~
        <p className="font-extrabold">
          {props.approximateTime} <span className="font-normal">mins</span>
        </p>
      </div>

      <div className="flex flex-col gap-[3px]">
        <p className="text-[#626262] text-xs font-medium self-end">Reward</p>
        <div
          className={`flex flex-row gap-1 items-center self-end text-sm font-black`}
        >
          <Image
            alt="coin"
            width={32}
            height={32}
            src="/assets/coin.png"
            className="w-[32px] h-[32px] -ml-2 -mr-2"
          />{" "}
          {props.reward} ribbon
        </div>
        {
          <p className="text-[10px] font-medium text-[#626262] self-end">
            ({props.totalRatings}) Ratings
          </p>
        }
      </div>

      {/* {rateTask && (
        <RateTaskModal
          isOpen={rateTask}
          closeModal={() => {
            setRateTask(false);
          }}
          onChange={(newRating: any) => setRating(newRating)}
          handleSubmit={() => {
            submitRate(
              { rating: rating, questionnaireId: data?.id },
              {
                onSuccess: () => {
                  router.push("/dashboard");
                },
              }
            );
            // router.push("/dashboard");
          }}
        />
      )} */}
    </div>
  );
};

export default TodoCompletedForm;
