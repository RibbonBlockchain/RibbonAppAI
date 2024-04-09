import React from "react";

const Birthdate = ({ setValue }: any) => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );

  const formatDateMonth = (number: any) => {
    return number < 10 ? "0" + number : number;
  };

  const [state, setState] = React.useState({ day: 1, month: 1, year: 2000 });
  const onChange = (e: any) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  React.useEffect(() => {
    if (state.day && state.month && state.year) {
      const date = `${state.month}/${state.day}/${state.year}`;

      setValue(
        new Date(`${state.month}/${state.day}/${state.year}`).toISOString()
      );
    }
  }, [state.day, state.month, state.year]);

  return (
    <div className="relative flex flex-row items-start text-xs gap-5">
      <div className="flex flex-col gap-2 relative">
        Days
        <select
          name="day"
          onChange={onChange}
          className="appearance-none relative w-[90px] h-[40px] rounded-md px-2 focus:border-2 focus:border-[#7C56FE]"
        >
          {days.map((day) => (
            <option
              onChange={onChange}
              key={day}
              value={day}
              className="text-[#939393] relative"
            >
              {formatDateMonth(day)}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        Months
        <select
          name="month"
          onChange={onChange}
          className="appearance-none w-[90px] h-[40px] rounded-md px-2 focus:border-2 focus:border-[#7C56FE]"
        >
          {months.map((month) => (
            <option
              onChange={onChange}
              key={month}
              value={month}
              className="text-[#939393]"
            >
              {formatDateMonth(month)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2 relative">
        Years
        <select
          name="year"
          onChange={onChange}
          className="appearance-none w-[90px] h-[40px] rounded-md px-2 focus:border-2 focus:border-[#7C56FE]"
        >
          {years.map((year) => (
            <option
              onChange={onChange}
              key={year}
              value={year}
              className="text-[#939393]"
            >
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Birthdate;
