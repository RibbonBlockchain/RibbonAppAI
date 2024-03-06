import { atom } from "jotai";
import { countries } from "../values/countries";

export const mobileOnboardAtom = atom({
  pin: "",
  code: "",
  confirmPin: "",
  phoneNumber: "",
  countryCode: countries?.[0]?.code,
});
