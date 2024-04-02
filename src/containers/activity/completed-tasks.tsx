"use client";

import {
  useGetCompletedTasks,
  useGetUserActivities,
  useGetCompletedTasksByDate,
} from "@/api/user";
import clsx from "clsx";
import React from "react";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { DayPicker } from "react-day-picker";
import NoCompletedTask from "./no-completed-task";
import { formatDate } from "@/lib/utils/format-date";
import { CalendarDays, ChevronDown } from "lucide-react";
import TodoCompletedForm from "@/containers/activity/todo-completed-form";

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

const CompletedTasks = () => {
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  const endOfWeek = new Date(
    today.setDate(today.getDate() - today.getDay() + 6)
  );

  const todayDate = new Date();
  const currentDay = todayDate.toDateString();
  const currentMonth = todayDate.toDateString().split(" ")[1];
  const startOfWeekDate = startOfWeek.toDateString().split(" ")[2];
  const endOfWeekDate = endOfWeek.toDateString().split(" ")[2];

  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + i);
    weekDates.push(currentDate);
  }

  // state management
  const [showCalender, setShowCalender] = React.useState(false);
  const closeCalender = () => setShowCalender(false);

  const CloseCalender = () => (
    <div className="text-end" onClick={closeCalender}>
      Close
    </div>
  );

  const [activeDate, setActiveDate] = React.useState(currentDay);
  const [selectedDay, setSelectedDay] = React.useState<Date | undefined>(
    todayDate
  );

  // api calls
  const { data } = useGetCompletedTasks();

  const { data: activityData } = useGetUserActivities();
  const filteredData = activityData?.data?.filter(
    (item: any) =>
      item.completedDate !== null &&
      item.completedDate === formatDate(selectedDay)
  );
  console.log(activityData);

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col mb-6 max-w-[320px]">
        <div className="my-2 py-2 flex flex-row items-end justify-between">
          <div className="flex flex-col relative">
            <div
              onClick={() => {
                setShowCalender(!showCalender);
              }}
              className="flex flex-row items-center  justify-center text-xs text-[#714EE7] gap-2"
            >
              <CalendarDays size={18} stroke="#7C56FE" />
              {currentMonth} {startOfWeekDate} - {endOfWeekDate}
              <ChevronDown size={18} stroke="#7C56FE" />
            </div>

            {showCalender && (
              <>
                <div className="absolute top-10 bg-white -m-3 border-2 border-[#6200EE] rounded-2xl">
                  <style>{css}</style>
                  <DayPicker
                    mode="single"
                    required
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

          <p className="text-xs font-semibold text-[#626262]">
            {format(selectedDay as Date, "PPP")}
          </p>
        </div>
        <div className="flex flex-row items-center justify-around text-base border-t-[1px] border-[#E8E8E8] pt-3">
          {weekDates.map((date, index) => (
            <div
              key={index}
              className={clsx(
                `px-3 py-2 flex flex-col gap-1 rounded-full text-center`,
                activeDate === date.toDateString().split(" ")[0] &&
                  "bg-[#7C56FE] text-white"
              )}
              onClick={() => {
                setActiveDate(date.toDateString());
              }}
            >
              <p
                className={clsx(
                  "text-[#939393] font-medium",
                  activeDate === date.toDateString().split(" ")[0] &&
                    " text-white"
                )}
              >
                {date.toDateString()[0]}
              </p>
              <p
                className={clsx(
                  "text-[#7C56FE] font-semibold",
                  activeDate === date.toDateString().split(" ")[0] &&
                    "bg-[#7C56FE] text-white"
                )}
              >
                {date.toDateString().split(" ")[2]}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        {data?.data.length >= 1 ? (
          <div className="">
            <p className="text-xs text-[#141414] py-3 font-bold">
              {format(selectedDay as Date, "PPP")}
            </p>
            {data?.data?.map((i: any) => (
              <TodoCompletedForm
                key={i.id}
                score={i.score}
                reward={i.reward}
                priority={i.priority}
                taskTitle={i.description}
                approximateTime={i.duration / 60}
              />
            ))}
          </div>
        ) : (
          <NoCompletedTask />
        )}{" "}
      </div>

      {/* 
      {selectedDay !== todayDate ? (
        <div>
          {filteredData?.length >= 1 ? (
            <>
              <p className="py-3 text-xs font-semibold text-[#626262]">
                {formatDate(selectedDay)}
              </p>
              <div>
                {filteredData?.map((i: any) => (
                  <TodoCompletedForm
                    key={i.id}
                    score={i.score}
                    reward={i.reward}
                    taskTitle={i.name}
                    approximateTime={i.duration / 60}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="py-3 text-xs font-semibold text-[#626262]">
                {formatDate(selectedDay)}
              </p>
              <NoCompletedTaskOnDate />
            </>
          )}{" "}
        </div>
      ) : (
        <div>
          {data?.data.length >= 1 ? (
            <div className="">
              <p className="text-xs text-[#141414] py-3 font-bold">
                {format(selectedDay as Date, "PPP")}
              </p>
              {data?.data?.map((i: any) => (
                <TodoCompletedForm
                  key={i.id}
                  score={i.score}
                  reward={i.reward}
                  priority={i.priority}
                  taskTitle={i.description}
                  approximateTime={i.duration / 60}
                />
              ))}
            </div>
          ) : (
            <NoCompletedTask />
          )}{" "}
        </div>
      )} */}

      {/* <div>
        <TaskListByDate />
      </div> */}

      {/* <div className="w-full">
        <p className="text-xs text-[#141414] py-3 font-bold">
          Yesterday, 8:30 am
        </p>
        <CoompletedSurvey />
      </div> */}
    </div>
  );
};

export default CompletedTasks;
