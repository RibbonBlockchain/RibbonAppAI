"use client";

import ReactSelect from "react-select";
import ReactCountryFlag from "react-country-flag";
import { countries } from "@/app/lib/values/countries";

type Props = { setValue: (v: string) => void };

const options = countries.map((c) => ({
  value: JSON.stringify(c),
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

const CountrySelect = ({ setValue }: Props) => {
  return (
    <ReactSelect
      unstyled
      isSearchable
      options={options}
      defaultValue={options?.[0]}
      instanceId="auth-country-select"
      onChange={(v) => setValue(v!.value)}
      classNames={{
        option: () => ``,
        input: () => `pl-14`,
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
