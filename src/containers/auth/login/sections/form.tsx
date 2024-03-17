"use client";

import { useAtom } from "jotai";
import { authAtom } from "@/lib/atoms/auth.atom";
import PhoneInput from "@/components/input/phone-input";
import CountrySelect from "@/components/select/country-select";

const FormInput = () => {
  const [state, setState] = useAtom(authAtom);

  const setCountry = (country: string) =>
    setState((prev) => ({ ...prev, country }));

  const setPhoneNumber = (phone: string) => {
    const phoneNumber = phone?.startsWith("+") ? phone : `+${phone}`;
    setState((prev) => ({ ...prev, phoneNumber }));
  };

  const country = state.country ? JSON.parse(state.country)?.code : null;

  return (
    <>
      <CountrySelect value={state.country} setValue={setCountry} />
      <PhoneInput
        value={state.phoneNumber}
        setValue={setPhoneNumber}
        country={country}
      />
    </>
  );
};

export default FormInput;
