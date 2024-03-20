"use client";

import React from "react";
import clsx from "clsx";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { DayPicker } from "react-day-picker";
import { CalendarDays, ChevronDown } from "lucide-react";
import { priorityTask, todo } from "@/lib/values/mockData";
import CoompletedSurvey from "@/containers/activity/completed-survey";
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
  const currentDay = todayDate.toDateString().split(" ")[0];
  const currentMonth = todayDate.toDateString().split(" ")[1];
  const startOfWeekDate = startOfWeek.toDateString().split(" ")[2];
  const endOfWeekDate = endOfWeek.toDateString().split(" ")[2];

  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + i);
    weekDates.push(currentDate);
  }

  const [activeDate, setActiveDate] = React.useState(currentDay);
  const [showCalender, setShowCalender] = React.useState(false);
  const [selectedDay, setSelectedDay] = React.useState<Date | undefined>(today);

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col mb-6 max-w-[320px]">
        <div className="my-2 py-2 flex flex-row items-end justify-between">
          <div className="flex flex-col relative">
            <div
              onClick={() => {
                setShowCalender(!showCalender);
              }}
              className="flex flex-row items-center justify-center text-xs text-[#714EE7] gap-2"
            >
              <CalendarDays size={18} stroke="#7C56FE" />
              {currentMonth} {startOfWeekDate} - {endOfWeekDate}
              <ChevronDown size={18} stroke="#7C56FE" />
            </div>

            {showCalender && (
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
                />
              </div>
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
                `px-3 py-2 flex flex-col gap-1 rounded-full`,
                activeDate === date.toDateString().split(" ")[0] &&
                  "bg-[#6200EE]"
              )}
              // onClick={() => setActiveDate(date.toDateString().split(" ")[0])}
            >
              <p className="text-[#939393] font-medium">
                {date.toDateString()[0]}
              </p>
              <p className="text-[#5C105B] font-semibold">
                {date.toDateString().split(" ")[2]}
              </p>
            </div>
          ))}
        </div>
      </div>

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
