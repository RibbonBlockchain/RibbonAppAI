import React from "react";
import { priorityTask, todo } from "@/lib/values/mockData";
import CoompletedSurvey from "@/containers/activity/completed-survey";
import TodoCompletedForm from "@/containers/activity/todo-completed-form";

const CompletedTasks = () => {
  return (
    <div className="p-4 sm:p-6 ">
      <div className="">
        <p className="text-xs text-[#141414] py-3 font-bold">Today, 3:30 pm</p>
        {priorityTask.map((i) => (
          <TodoCompletedForm
            key={i.id}
            score={i.score}
            reward={i.reward}
            priority={i.priority}
            taskTitle={i.taskTitle}
            approximateTime={i.approximateTime}
          />
        ))}
        {todo.map((i) => (
          <TodoCompletedForm
            key={i.id}
            score={i.score}
            reward={i.reward}
            taskTitle={i.taskTitle}
            approximateTime={i.approximateTime}
            ratings={i.ratings}
            ratingsLevel={i.ratingsLevel}
          />
        ))}
      </div>

      <div className="w-full">
        <p className="text-xs text-[#141414] py-3 font-bold">
          Yesterday, 8:30 am
        </p>
        <CoompletedSurvey />
      </div>
    </div>
  );
};

export default CompletedTasks;
