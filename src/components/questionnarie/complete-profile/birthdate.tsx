import React from "react";

const Birthdate = () => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from(
    { length: 80 },
    (_, i) => new Date().getFullYear() - i
  );

  return (
    <div className="flex flex-row items-center gap-3 justify-between">
      <div>
        Days
        <select>
          {days.map((day) => (
            <option className=" " key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        Months
        <select>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        Years
        <select>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Birthdate;
