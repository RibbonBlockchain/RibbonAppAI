import { atom } from "jotai";
import { countries } from "../values/countries";

export const mobileOnboardAtom = atom({
  code: "",
  phoneNumber: "",
  countryCode: countries?.[0]?.code,
});
