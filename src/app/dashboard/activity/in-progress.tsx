import { priorityTask, todo } from "@/app/lib/values/mockData";
import Todo from "@/components/todo";
import React from "react";

const InProgress = () => {
  return (
    <div className="p-4 sm:p-6 ">
      <div className="w-full">
        <p className="text-xs text-gradient py-3 font-bold">Priority task</p>
        {priorityTask.map((i) => (
          <Todo
            key={i.id}
            score={i.score}
            reward={i.reward}
            priority={i.priority}
            taskTitle={i.taskTitle}
            approximateTime={i.approximateTime}
          />
        ))}
      </div>

      <div className="w-full">
        <p className="text-xs text-[#4E2774] pt-5 pb-3 font-bold">To do List</p>
        {todo.map((i) => (
          <Todo
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
    </div>
  );
};

export default InProgress;
