"use client";

import clsx from "clsx";
import React from "react";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { DayPicker } from "react-day-picker";
import { formatDate } from "@/lib/utils/format-date";
import { CalendarDays, ChevronDown } from "lucide-react";
import { SpinnerIcon } from "@/components/icons/spinner";
import { NoCompletedTaskOnDate } from "./no-completed-task";
import TodoCompletedForm from "@/containers/activity/todo-completed-form";
import { useGetCompletedTasks, useGetCompletedTasksByDate } from "@/api/user";

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
    <div
      className="text-end text-sm cursor-pointer pt-1 text-[#714EE7]"
      onClick={closeCalender}
    >
      See completed tasks
    </div>
  );

  // get dates
  const [activeDate, setActiveDate] = React.useState(currentDay);
  const [selectedDay, setSelectedDay] = React.useState<Date | undefined>(
    todayDate
  );
  const [seeAllTasks, setSeeAllTasks] = React.useState<boolean>(true);

  // api calls
  const { data, isLoading } = useGetCompletedTasksByDate(
    formatDate(selectedDay)
  );
  const { data: allCompleted, isLoading: allLoading } = useGetCompletedTasks();

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

          <p className="text-xs font-semibold text-[#FFF] bg-[#7C56FE] py-2 px-3 rounded-full">
            {format(selectedDay as Date, "PPP")}
          </p>
        </div>
        <div className="flex flex-row items-center justify-around text-base border-t-[1px] border-[#E8E8E8] pt-3">
          {weekDates.map((date, index) => (
            <div
              key={index}
              className={clsx(
                `px-3 py-2 flex flex-col gap-1 rounded-full text-center`,
                activeDate === date.toDateString() && "bg-[#7C56FE] text-white"
              )}
              // onClick={() => {
              //   setActiveDate(date.toDateString());
              // }}
            >
              <p
                className={clsx(
                  "text-[#939393] font-medium",
                  activeDate === date.toDateString() && "text-white"
                )}
              >
                {date.toDateString()[0]}
              </p>
              <p
                className={clsx(
                  "text-[#7C56FE] font-semibold",
                  activeDate === date.toDateString() &&
                    "bg-[#7C56FE] text-white"
                )}
              >
                {date.toDateString().split(" ")[2]}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div onClick={() => setSeeAllTasks(!seeAllTasks)}>
        {seeAllTasks ? (
          <p className="text-xs cursor-pointer text-[#7C56FE] py-3 font-bold text-end">
            View activities by date
          </p>
        ) : (
          <p className="text-xs cursor-pointer text-[#7C56FE] py-3 font-bold text-end">
            View all completed activities
          </p>
        )}
      </div>

      {seeAllTasks ? (
        <div>
          {allCompleted?.data.length >= 1 ? (
            <div className="py-3">
              <div className="text-[#626262] mb-3 bg-white font-bold flex items-center justify-between p-3 rounded-xl">
                <p className="text-xs">Daily rewards</p>
                <p className="text-sm">1000 pts</p>
              </div>
              {allCompleted?.data?.map((i: any) => (
                <TodoCompletedForm
                  key={i.id}
                  score={i.score}
                  reward={i.reward}
                  priority={i.priority}
                  taskTitle={i.description}
                  approximateTime={i.duration / 60}
                  ratings={i.ratings || 675}
                  ratingsLevel={i.ratingsLevel || "/images/empty-rating.svg"}
                />
              ))}
            </div>
          ) : allLoading ? (
            <SpinnerIcon />
          ) : (
            <NoCompletedTaskOnDate />
          )}
        </div>
      ) : (
        <div>
          {data?.data.length >= 1 ? (
            <div className="">
              <p className="text-xs text-[#141414] py-3 font-bold">
                {formatDate(selectedDay)}
              </p>
              <div className="text-[#626262] mb-3 bg-white font-bold flex items-center justify-between p-3 rounded-xl">
                <p className="text-xs">Daily rewards</p>
                <p className="text-sm">1000 pts</p>
              </div>
              {data?.data?.map((i: any) => (
                <TodoCompletedForm
                  key={i.id}
                  score={i.score}
                  reward={i.reward}
                  priority={i.priority}
                  taskTitle={i.description}
                  approximateTime={i.duration / 60}
                  ratings={i.ratings || 675}
                  ratingsLevel={i.ratingsLevel || "/images/empty-rating.svg"}
                />
              ))}
            </div>
          ) : isLoading ? (
            <SpinnerIcon />
          ) : (
            <NoCompletedTaskOnDate />
          )}
        </div>
      )}

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
