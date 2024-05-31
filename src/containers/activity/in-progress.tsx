import React from "react";
import Pending from "../dashboard/pending";
import PageLoader from "@/components/loader";
import NoInProgressTask from "./no-inprogress";
import { useGetTasksInProgress } from "@/api/user";

const InProgress = () => {
  const { data, isSuccess, isLoading } = useGetTasksInProgress();

  isLoading && <PageLoader />;

  return (
    <div className="p-4 sm:p-6">
      <div className="w-full">
        <p className="text-xs pt-5 pb-3 font-bold">In Progress</p>
        {!data?.length && <NoInProgressTask />}
        {data?.map((i: any) => (
          <Pending
            id={i?.id}
            key={i?.id}
            score={i?.score}
            icon={undefined}
            reward={i?.reward}
            taskTitle={i?.name}
            ratings={i?.ratings}
            ratingsLevel={i?.ratingsLevel || "/images/empty-rating.svg"}
            approximateTime={i?.duration / 60}
            href={`/dashboard/activity/${i.id}`}
          />
        ))}
      </div>

      {/* <div className="w-full">
        <p className="text-xs pt-5 pb-3 font-bold">Exclusive Surveys</p>
        <Survey />
        <Survey />
        <Survey />
      </div> */}
    </div>
  );
};

export default InProgress;
