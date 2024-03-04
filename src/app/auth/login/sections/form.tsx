"use client";

import { useAtom } from "jotai";
import PhoneInput from "@/components/phone-input";
import { mobileOnboardAtom } from "@/app/lib/atoms";
import CountrySelect from "@/components/country-select";

const FormInput = () => {
  const [state, setState] = useAtom(mobileOnboardAtom);

  const setCountryCode = (countryCode: string) =>
    setState((prev) => ({ ...prev, countryCode }));

  const setPhoneNumber = (phone: string) => {
    const phoneNumber = phone?.startsWith("+") ? phone : `+${phone}`;
    setState((prev) => ({ ...prev, phoneNumber }));
  };

  return (
    <>
      <CountrySelect setValue={setCountryCode} />
      <PhoneInput
        value={state.phoneNumber}
        setValue={setPhoneNumber}
        countryCode={state.countryCode}
      />
    </>
  );
};

export default FormInput;
