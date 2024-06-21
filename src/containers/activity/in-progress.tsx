import {
  TaskHeader,
  SurveyHeader,
  QuestionnaireHeader,
} from "../questionnaire/headers";
import React from "react";
import Pending from "../dashboard/pending";
import PageLoader from "@/components/loader";
import NoInProgressTask from "./no-inprogress";
import { useGetSurveysInProgress, useGetTasksInProgress } from "@/api/user";

const InProgress = () => {
  const { data, isSuccess, isLoading } = useGetTasksInProgress();
  const { data: surveyProcessing } = useGetSurveysInProgress();

  isLoading && <PageLoader />;

  return (
    <div className="p-4 sm:p-6">
      <div className="w-full">
        <p className="text-xs pt-5 pb-3 font-bold">In Progress</p>
        {!data?.length && <NoInProgressTask />}

        <div className="mb-8">
          <QuestionnaireHeader />
          {data?.map((i: any) => (
            <Pending
              id={i?.id}
              key={i?.id}
              score={i?.score}
              icon={undefined}
              reward={i?.reward}
              taskTitle={i?.name}
              ratings={i?.ratings}
              totalRatings={i?.totalRatings}
              approximateTime={i?.duration / 60}
              href={`/dashboard/activity/${i.id}`}
            />
          ))}
        </div>

        <div className="mb-8">
          <SurveyHeader />
          {surveyProcessing?.map((i: any) => (
            <Pending
              id={i?.id}
              key={i?.id}
              score={i?.score}
              icon={undefined}
              reward={i?.reward}
              taskTitle={i?.name}
              ratings={i?.ratings}
              totalRatings={i?.totalRatings}
              approximateTime={i?.duration / 60}
              href={`/dashboard/activity/${i.id}`}
            />
          ))}
        </div>

        <div className="mb-8">
          <TaskHeader />
        </div>
      </div>
    </div>
  );
};

export default InProgress;
