"use client";

import { useAtom } from "jotai";
import { useEffect } from "react";
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

  const countryData = state.country ? JSON.parse(state.country) : null;
  const countryCode = countryData?.code || null;

  const successCallback = async (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;

    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );

    if (response.ok) {
      const data = await response.json();
      const countryCode = data.countryCode;
      const countryName = data.countryName;

      console.log(countryCode, countryName, "details here");

      if (countryCode) {
        setCountry(JSON.stringify({ code: countryCode, name: countryName }));
      }
    }
  };

  const errorCallback = (error: GeolocationPositionError) => {
    console.log(error);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  return (
    <>
      <CountrySelect value={state.country} setValue={setCountry} />
      <PhoneInput
        country={countryCode}
        value={state.phoneNumber}
        setValue={setPhoneNumber}
      />
    </>
  );
};

export default FormInput;
