"use client";

import {
  useGetCompletedSurveys,
  useGetCompletedTasks,
  useGetCompletedTasksByDate,
} from "@/api/user";
import Image from "next/image";
import React, { useState } from "react";
import "react-day-picker/dist/style.css";
import { CalendarDays } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { formatDate } from "@/lib/utils/format-date";
import { SpinnerIcon } from "@/components/icons/spinner";
import { NoCompletedTaskOnDate } from "./no-completed-task";
import TodoCompletedForm from "@/containers/activity/todo-completed-form";

interface Task {
  id: number;
  image: string;
  name: string;
  description: string;
  type: string;
  completedDate: string;
  score: number;
  slug: string;
  reward: number;
  point: number;
  duration: number;
  createdAt: string;
  priority: boolean;
  ratings: number;
  totalRatings: number;
}

interface Reward {
  id: number;
  type: string;
  completedDate: string;
  image: string;
  name: string;
  description: string;
  score: number;
  slug: string;
  reward: number;
  point: number;
  duration: number;
  createdAt: string;
  priority: boolean;
  ratings: number;
  totalRatings: number;
}

const css = `
  .my-selected:not([disabled]) { 
    font-weight: bold; 
    border: 2px solid currentColor;
  }
  .my-selected:hover:not([disabled]) { 
    border-color: blue;
    color: blue;
  }
  .my-today { 
    font-weight: bold;
    font-size: 120%; 
    color: "#6200EE"
    }
    .container {
      width: 280px
    }
`;

const CompletedActivities = () => {
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));

  const todayDate = new Date();

  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + i);
    weekDates.push(currentDate);
  }

  // state management
  const [showCalender, setShowCalender] = React.useState(false);

  // get dates
  const [selectedDay, setSelectedDay] = React.useState<Date | undefined>(
    todayDate
  );
  const [seeAllTasks, setSeeAllTasks] = React.useState<boolean>(true);

  const closeCalender = () => {
    setShowCalender(false), setSeeAllTasks(false);
  };

  const CloseCalender = () => (
    <div
      className="text-end text-sm cursor-pointer pt-2 text-[#714EE7] font-bold"
      onClick={closeCalender}
    >
      Check date
    </div>
  );

  // api calls
  const { data, isLoading } = useGetCompletedTasksByDate(
    formatDate(selectedDay)
  );

  const {
    data: allCompleted,
    isLoading: allLoading,
    isFetching: allFetching,
  } = useGetCompletedTasks();

  const { data: completedSurvey } = useGetCompletedSurveys();

  if (allFetching || allLoading) {
    <SpinnerIcon />;
  }

  const renderData: { [date: string]: (Task | Reward)[] } =
    allCompleted?.data.reduce(
      (acc: { [x: string]: any[] }, item: { completedDate: any }) => {
        const date = item.completedDate;
        // ONLY PROCESS IF DATE IS NOT NULL
        if (date) {
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(item);
        }

        //  PROCESS ALL DATES
        // if (!acc[date]) {
        //   acc[date] = [];
        // }
        // acc[date].push(item);

        return acc;
      },
      {}
    );

  // SORT BY DATE
  const sortedDates = renderData
    ? Object.keys(renderData).sort((a, b) => {
        if (a === null && b === null) return 0;
        if (a === null) return 1;
        if (b === null) return -1;
        return new Date(b).getTime() - new Date(a).getTime();
      })
    : [];

  const sortedRenderData: { [date: string]: (Task | Reward)[] } = {};
  sortedDates.forEach((date) => {
    sortedRenderData[date] = renderData[date];
  });

  const [collapseQuestionnaire, setCollapseQuestionnaire] = useState(true);
  const [collapseSurvey, setCollapseSurvey] = useState(true);
  const [collapseTasks, setCollapseTasks] = useState(true);

  return (
    <div className="mb-20">
      <div className="flex flex-col mb-2">
        <div className="flex flex-row items-end justify-between">
          <div className="flex flex-col relative w-full items-end cursor-pointer">
            <div
              onClick={() => {
                setShowCalender(!showCalender);
              }}
              className="flex items-end justify-end text-xs text-[#714EE7] gap-2"
            >
              <CalendarDays size={18} stroke="#7C56FE" />
            </div>

            {showCalender && (
              <>
                <div className="absolute top-10 bg-white -m-3 border-2 border-[#6200EE] rounded-2xl">
                  <style>{css}</style>
                  <DayPicker
                    mode="single"
                    required
                    fixedWeeks
                    showOutsideDays
                    selected={selectedDay}
                    onSelect={setSelectedDay}
                    modifiersClassNames={{
                      selected: "my-selected",
                      today: "my-today",
                      conainer: "container",
                    }}
                    footer={<CloseCalender />}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div onClick={() => setCollapseQuestionnaire(!collapseQuestionnaire)}>
          <p className="mb-2">Questionnaire</p>
        </div>
        {collapseQuestionnaire && (
          <>
            {seeAllTasks ? (
              <div>
                {allCompleted?.data.length >= 1 ? (
                  <div className="pb-3">
                    {/* display renderData or sortedRenderData */}
                    {/* {Object.entries(renderData).map(([date, items]) => ( */}
                    {Object.entries(sortedRenderData).map(([date, items]) => (
                      <div key={date} className="">
                        <p className="text-xs text-white py-3 font-bold">
                          {date}
                        </p>
                        {items.map((i, index) => (
                          <div key={index}>
                            <>
                              {i.type === "DAILY_REWARD" ? (
                                <div
                                  key={i.id}
                                  className="text-[#626262] mb-3 bg-white font-bold flex items-center justify-between p-3 rounded-xl"
                                >
                                  <p className="text-xs">Daily rewards</p>
                                  <p className="text-sm">100 ribbon</p>
                                </div>
                              ) : (
                                <TodoCompletedForm
                                  key={i.id}
                                  score={i.score}
                                  reward={i.reward}
                                  priority={i.priority}
                                  taskTitle={i.name}
                                  approximateTime={i.duration / 60}
                                  ratings={i.ratings}
                                  totalRatings={i.totalRatings}
                                  params={undefined}
                                />
                              )}
                            </>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : allLoading ? (
                  <SpinnerIcon />
                ) : (
                  <NoCompletedTaskOnDate onclick={() => setSeeAllTasks(true)} />
                )}
              </div>
            ) : (
              <div>
                {data?.data.length >= 1 ? (
                  <div className="">
                    <p className="text-xs text-[#141414] py-3 font-bold">
                      {formatDate(selectedDay)}
                    </p>

                    {data?.data?.map((i: any) => (
                      <>
                        {i.type === "DAILY_REWARD" ? (
                          <div
                            key={i.id}
                            className="text-[#626262] mb-3 bg-white font-bold flex items-center justify-between p-3 rounded-xl"
                          >
                            <p className="text-xs">Daily rewards</p>
                            <p className="text-sm">1000 pts</p>
                          </div>
                        ) : (
                          <TodoCompletedForm
                            key={i.id}
                            score={i.score}
                            reward={i.reward}
                            priority={i.priority}
                            taskTitle={i.description}
                            approximateTime={i.duration / 60}
                            ratings={i.ratings}
                            totalRatings={i.totalRatings}
                            params={undefined}
                          />
                        )}
                      </>
                    ))}
                  </div>
                ) : isLoading ? (
                  <SpinnerIcon />
                ) : (
                  <NoCompletedTaskOnDate onclick={() => setSeeAllTasks(true)} />
                )}
              </div>
            )}
          </>
        )}
      </div>

      <div className="mb-8">
        <div onClick={() => setCollapseSurvey(!collapseSurvey)}>
          <p className="mb-2">Survey</p>
        </div>
        {collapseSurvey && (
          <>
            {completedSurvey?.data?.map((i: any) => (
              <TodoCompletedForm
                key={i.id}
                score={i.score}
                reward={i.reward}
                priority={i.priority}
                taskTitle={i.name}
                approximateTime={i.duration / 60}
                ratings={i.ratings}
                totalRatings={i.totalRatings}
                params={undefined}
              />
            ))}
          </>
        )}
      </div>

      {/* <div className="mb-8">
        <div className="bg-[#F2EEFF] mb-2 flex flex-row items-center justify-between text-[#A81DA6] text-xs px-3 py-1 font-bold rounded-md">
          <p>Tasks</p>
          <Image width={40} alt="tasks" height={40} src="/images/tasks.png" />
        </div>
      </div> */}
    </div>
  );
};

export default CompletedActivities;
