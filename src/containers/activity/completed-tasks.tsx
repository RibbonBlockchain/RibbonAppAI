"use client";

import React from "react";
import Image from "next/image";
import { priorityTask, todo } from "@/lib/values/mockData";
import CoompletedSurvey from "@/containers/activity/completed-survey";
import TodoCompletedForm from "@/containers/activity/todo-completed-form";
import clsx from "clsx";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";

const date = [
  {
    day: "Sunday",
    date: 3,
  },
  {
    day: "Monday",
    date: 4,
  },
  {
    day: "Tuesday",
    date: 5,
  },
  {
    day: "Wednesday",
    date: 6,
  },
  {
    day: "Thursday",
    date: 7,
  },
  {
    day: "Friday",
    date: 8,
  },
  {
    day: "Saturday",
    date: 9,
  },
];

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
  const [activeDate, setActiveDate] = React.useState("Monday");
  const [showCalender, setShowCalender] = React.useState(false);

  const today = new Date();
  const [selectedDay, setSelectedDay] = React.useState<Date | undefined>(today);

  return (
    <div className="p-4 sm:p-6 ">
      <div className="flex flex-col mb-6 max-w-[320px]">
        <div className="my-2 py-2 flex flex-row items-end justify-between">
          <div className="flex flex-col relative">
            <Image
              alt="cal"
              width={125}
              height={34}
              className=""
              onClick={() => {
                setShowCalender(!showCalender);
              }}
              src="/images/calender.png"
            />
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
        <div className="flex flex-row items-center justify-around text-base">
          {date.map(({ day, date }) => (
            <div
              key={day}
              onClick={() => setActiveDate(day)}
              className={clsx(
                `px-3 py-2 flex flex-col gap-1 rounded-full`,
                activeDate === day && "bg-[#6200EE]"
              )}
            >
              <p className="text-[#939393] font-medium">{day[0]}</p>
              <p className="text-[#5C105B] font-semibold">{date}</p>
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
