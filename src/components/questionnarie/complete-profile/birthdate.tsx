import React from "react";

const Birthdate = ({ setValue }: any) => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from(
    { length: 80 },
    (_, i) => new Date().getFullYear() - i
  );

  const [state, setState] = React.useState({ day: 1, month: 1, year: 2000 });
  const onChange = (e: any) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  React.useEffect(() => {
    if (state.day && state.month && state.year) {
      const date = `${state.month}/${state.day}/${state.year}`;
      console.log(date);
      console.log(new Date(date).toISOString());
      setValue(
        new Date(`${state.month}/${state.day}/${state.year}`).toISOString()
      );
    }
  }, [state.day, state.month, state.year]);

  return (
    <div className="flex flex-row items-center gap-3 justify-between">
      <div>
        Days
        <select name="day" onChange={onChange}>
          {days.map((day) => (
            <option onChange={onChange} className=" " key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        Months
        <select name="month" onChange={onChange}>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        Years
        <select name="year" onChange={onChange}>
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
