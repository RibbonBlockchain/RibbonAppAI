import React, { useState } from "react";
import Link from "next/link";
import TaskDetailsModal from "@/components/modal/task-modal";
import { SpinnerIcon, SpinnerIconPurple } from "@/components/icons/spinner";

type Props = {
  id: string;
  score: number;
  reward: number;
  taskTitle: string;
  priority?: boolean;
  completed?: boolean;
};

const TaskTodo = (props: Props) => {
  const rewardPoints = props.reward * 5000;

  const [selectedTask, setSelectedTask] = useState(null);

  const [taskProgress, setTaskProgress] = useState("not-started");

  const handleTaskClick = (clickedTask: any) => {
    setSelectedTask(clickedTask);
  };

  const closeTaskModal = () => {
    setSelectedTask(null);
  };

  return (
    <div
      id={props.id}
      className={`${
        props.priority
          ? "bg-[#EDE8F5]"
          : "bg-white border-[1px] border-[#f1f1f1]"
      }   w-full p-2.5 flex flex-row self-center items-center justify-between rounded-lg mb-3`}
    >
      <div className="flex flex-row items-start justify-start text-black gap-1">
        <div className="flex flex-col text-xs gap-[3px]">
          <div
            className={`font-extrabold whitespace-nowrap truncate max-w-[130px] xxs:max-w-[150px] xs:max-w-[170px] ${
              props.priority ? "text-black" : "text-gradient-2"
            }`}
          >
            {props.taskTitle}
          </div>

          <div className="flex flex-row items-center text-[11px]">
            <p className="text-[#434343]">
              Claim {rewardPoints.toLocaleString()} points
            </p>
          </div>
        </div>
      </div>

      {taskProgress === "not-started" && (
        <button
          onClick={() => handleTaskClick(props)}
          className="flex flex-col text-sm font-semibold text-[#A81DA6] border border-[#A81DA6] rounded-full px-3.5 py-1.5 "
        >
          Go
        </button>
      )}

      {taskProgress === "confirm" && (
        <button
          onClick={() => setTaskProgress("pending")}
          className="flex flex-col text-sm font-semibold text-white bg-[#A81AD6] border border-[#A81DA6] rounded-full px-3.5 py-1.5 "
        >
          Check
        </button>
      )}

      {taskProgress === "pending" && (
        <button
          onClick={() => setTaskProgress("completed")}
          className="flex flex-col text-sm font-semibold text-white bg-[#A81AD6] border border-[#A81DA6] rounded-full px-3.5 py-1.5 "
        >
          <SpinnerIcon />
        </button>
      )}

      {taskProgress === "completed" && (
        <button
          onClick={() => console.log("claim points")}
          className="flex flex-col text-sm font-semibold text-white bg-[#A81AD6] border border-[#A81DA6] rounded-full px-3.5 py-1.5 "
        >
          Claim
        </button>
      )}

      {selectedTask && (
        <TaskDetailsModal
          isOpen={true}
          task={selectedTask}
          closeModal={closeTaskModal}
          handleStartTask={() => {
            setTaskProgress("confirm"), setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
};

export default TaskTodo;
