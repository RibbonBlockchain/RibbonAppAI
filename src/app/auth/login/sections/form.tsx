"use client";

import { useAtom } from "jotai";
import PhoneInput from "@/components/phone-input";
import { phoneAuthAtom } from "@/lib/atoms/auth.atom";
import CountrySelect from "@/components/country-select";

const FormInput = () => {
  const [state, setState] = useAtom(phoneAuthAtom);

  const setCountry = (country: string) =>
    setState((prev) => ({ ...prev, country }));

  const setPhoneNumber = (phone: string) => {
    const phoneNumber = phone?.startsWith("+") ? phone : `+${phone}`;
    setState((prev) => ({ ...prev, phoneNumber }));
  };

  return (
    <>
      <CountrySelect value={state.country} setValue={setCountry} />
      <PhoneInput
        value={state.phoneNumber}
        setValue={setPhoneNumber}
        country={JSON.parse(state.country)?.code}
      />
    </>
  );
};

export default FormInput;
