import React from "react";
import Todo from "@/containers/dashboard/todo";
import NoInProgressTask from "./no-inprogress";
import { useGetTasksInProgress } from "@/api/user";
import PageLoader from "@/components/loader";

const InProgress = () => {
  const { data, isSuccess, isLoading } = useGetTasksInProgress();

  isLoading && <PageLoader />;

  return (
    <div className="p-4 sm:p-6">
      {/* <div className="w-full">
        <p className="text-xs py-3 font-bold">Priority task</p>
        {priorityTask.map((i) => (
          <Todo
            icon={""}
            id={i.id}
            key={i.id}
            score={i.score}
            reward={i.reward}
            priority={i.priority}
            taskTitle={i.taskTitle}
            approximateTime={i.approximateTime}
            href={"#"}
          />
        ))}
      </div> */}

      <div className="w-full">
        <p className="text-xs pt-5 pb-3 font-bold">In Progress</p>
        {!data?.length && <NoInProgressTask />}
        {data?.map((i: any) => (
          <Todo
            id={i?.id}
            key={i?.id}
            score={i?.score}
            icon={undefined}
            reward={i?.reward}
            taskTitle={i?.name}
            ratings={i?.ratings}
            ratingsLevel={i?.ratingsLevel}
            approximateTime={i?.duration / 60}
            href={`/dashboard/task/${i.id}`}
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
