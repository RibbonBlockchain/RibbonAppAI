"use client";

import ReactSelect from "react-select";
import ReactCountryFlag from "react-country-flag";
import { countries } from "@/utils/values/countries";

type Props = { value: string; setValue: (v: string) => void };

const options = countries.map((c) => ({
  value: c.code,
  label: (
    <div className="p-3 rounded-xl flex gap-4 items-center">
      <ReactCountryFlag
        svg
        countryCode={c.code}
        className="!w-7 !h-7 rounded-full object-cover"
      />

      <span className="text-slate-700 text-md">{c.name}</span>
    </div>
  ),
}));

const CountrySelect = ({ value, setValue }: Props) => {
  return (
    <ReactSelect
      unstyled
      options={options}
      isSearchable={false}
      defaultValue={options?.[0]}
      instanceId="auth-country-select"
      onChange={(v) => setValue(v!.value)}
      classNames={{
        option: () => ``,
        input: () => `pl-3`,
        control: () => `w-full`,
        placeholder: () => `px-3`,
        singleValue: () => `!pl-0`,
        indicatorsContainer: () => `pr-3`,
        menu: () =>
          `rounded-xl !top-[calc(100%+8px)] bg-white shadow-lg border-[1px] border-gray-200`,
        container: () =>
          `h-[56px] border-[1px] border-gray-300 rounded-xl flex items-center w-full`,
      }}
    />
  );
};

export default CountrySelect;
