import { useGetCompletedTasks } from "@/api/user";
import React from "react";

interface Task {
  id: number;
  name: string;
  description: string;
  reward: string;
  completed_date: string;
  // .....and the other fields
}

interface Reward {
  id: number;
  completed_date: string;
  name: string;
  description: string;
  reward: string;
}

const completedTasks: Task[] = [
  {
    id: 1,
    name: "Home",
    description: "Home questionnaire",
    reward: "5 WLD",
    completed_date: "18-04-2024",
  },
  {
    id: 2,
    name: "Lifestyle",
    description: "Lifestyle questionnaire",
    reward: "5 WLD",
    completed_date: "17-04-2024",
  },
  {
    id: 3,
    name: "Health",
    description: "Health questionnaire",
    reward: "5 WLD",
    completed_date: "18-04-2024",
  },
  {
    id: 4,
    name: "Education",
    description: "Education questionnaire",
    reward: "5 WLD",
    completed_date: "17-04-2024",
  },
  {
    id: 5,
    name: "Relationship",
    description: "Relationship questionnaire",
    reward: "5 WLD",
    completed_date: "19-04-2024",
  },
  {
    id: 6,
    name: "Finance",
    description: "Finance questionnaire",
    reward: "5 WLD",
    completed_date: "17-04-2024",
  },
];

const claimedRewards: Reward[] = [
  {
    id: 11,
    completed_date: "17-04-2024",
    name: "Daily reward",
    description: "Daily reward",
    reward: "1000 points",
  },
  {
    id: 12,
    completed_date: "17-04-2024",
    name: "Daily reward",
    description: "Daily reward",
    reward: "1000 points",
  },
  {
    id: 13,
    completed_date: "18-04-2024",
    name: "Daily reward",
    description: "Daily reward",
    reward: "1000 points",
  },
  {
    id: 14,
    completed_date: "18-04-2024",
    name: "Daily reward",
    description: "Daily reward",
    reward: "1000 points",
  },
  {
    id: 15,
    completed_date: "19-04-2024",
    name: "Daily reward",
    description: "Daily reward",
    reward: "1000 points",
  },
  {
    id: 16,
    completed_date: "19-04-2024",
    name: "Daily reward",
    description: "Daily reward",
    reward: "1000 points",
  },
];

const DailySummary: React.FC = () => {
  const { data: all, isLoading: allLoading } = useGetCompletedTasks();

  const dataByDate: {
    [key: string]: { completedTasks: Task[]; claimedRewards: Reward[] };
  } = {};

  // Organize completed tasks and claimed rewards by date
  [...completedTasks, ...claimedRewards].forEach((item) => {
    const date = item.completed_date || item.completed_date;
    if (!dataByDate[date]) {
      dataByDate[date] = { claimedRewards: [], completedTasks: [] };
    }
    if ("completed_date" in item) {
      dataByDate[date].completedTasks.push(item);
    } else {
      dataByDate[date].claimedRewards.push(item);
    }
  });

  // Map over each date to display completed tasks and claimed rewards
  const renderedData = Object.entries(dataByDate).map(
    ([date, { completedTasks, claimedRewards }]) => (
      <div className="p-4 sm:p-6" key={date}>
        <h2 className="text-sm text-gray-400 py-2">{date}</h2>

        <div>
          {completedTasks.map((task) => (
            <>
              {task.name === "Daily reward" ? (
                <div className="flex items-center justify-between px-2 py-2 bg-white border-2 border-slate-100 rounded-md gap-2 mb-2">
                  <p>Daily reward</p>
                  <p>5000 points</p>
                </div>
              ) : (
                <div
                  className="px-2 py-2 bg-white border-2 border-slate-100 rounded-md flex items-center justify-between mb-2"
                  key={task.id}
                >
                  <p>{task.description}</p>
                  <p>{task.reward}</p>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    )
  );

  // Render the mapped data
  return <div className="bg-[#F7F5FF]">{renderedData}</div>;
};

export default DailySummary;
