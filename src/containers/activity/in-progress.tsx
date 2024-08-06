import React from "react";
import PageLoader from "@/components/loader";
import NoInProgressTask from "./no-inprogress";
import { useGetSurveysInProgress, useGetTasksInProgress } from "@/api/user";
import Pending from "./pending";

const InProgress = () => {
  const { data, isSuccess, isLoading } = useGetTasksInProgress();
  const { data: surveyInDrogressData } = useGetSurveysInProgress();

  isLoading && <PageLoader />;
  const nothingInProgress = !data || !surveyInDrogressData;

  return (
    <div className="w-full">
      <p className="text-xs pt-5 pb-3 font-bold">In Progress</p>
      {nothingInProgress && <NoInProgressTask />}

      {data?.length > 0 && (
        <div className="mb-8">
          <div>Questionnaire</div>
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
      )}

      {surveyInDrogressData?.length > 0 && (
        <div className="mb-8">
          <div>Survey</div>
          {surveyInDrogressData?.map((i: any) => (
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
      )}
    </div>
  );
};

export default InProgress;
