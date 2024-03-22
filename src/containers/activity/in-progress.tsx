import React from "react";
import Todo from "@/containers/dashboard/todo";
import Survey from "@/containers/dashboard/survey";
import { useGetTasksInProgress } from "@/api/auth";
import { priorityTask, todo } from "@/lib/values/mockData";

const InProgress = () => {
  const { data, isSuccess } = useGetTasksInProgress();
  console.log(data, "in progress");

  return (
    <div className="p-4 sm:p-6">
      <div className="w-full">
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
      </div>

      <div className="w-full">
        <p className="text-xs pt-5 pb-3 font-bold">To do List</p>
        {todo.map((i) => (
          <Todo
            key={i.id}
            score={i.score}
            reward={i.reward}
            taskTitle={i.taskTitle}
            approximateTime={i.approximateTime}
            ratings={i.ratings}
            ratingsLevel={i.ratingsLevel}
            icon={""}
            id={i.id}
            href={"#"}
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
