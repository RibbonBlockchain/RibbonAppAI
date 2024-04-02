import clsx from "clsx";
import React from "react";
import { useGetUserActivities } from "@/api/user";
import TodoCompletedForm from "./todo-completed-form";

const TaskComponent = ({ tasks }: { tasks: any }) => {
  return (
    <div>
      {tasks?.map((task: any) => (
        <TodoCompletedForm
          key={task.id}
          score={task.score}
          reward={task.reward}
          taskTitle={task.name}
          approximateTime={task.duration / 60}
        />
      ))}
    </div>
  );
};

const TaskListByDate = () => {
  const { data: tasks } = useGetUserActivities();

  const groupedTasks = tasks?.data.reduce((acc: any, task: any) => {
    const { completedDate } = task;
    if (!acc[completedDate]) {
      acc[completedDate] = [];
    }
    acc[completedDate].push(task);
    return acc;
  }, {});

  console.log(groupedTasks, "grouped tasks here");

  return (
    <div>
      {groupedTasks &&
        Object.entries(groupedTasks)?.map(([date, tasks]) => (
          <div key={date}>
            <>
              <h2 className="mb-2">{date}</h2>
              <TaskComponent tasks={tasks} />
            </>
          </div>
        ))}
    </div>
  );
};

export default TaskListByDate;
