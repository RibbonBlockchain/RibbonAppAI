import { atom } from "jotai";
import { client } from "@/api/api-client";
import { countries } from "../values/countries";
import { TOKEN_KEY } from "../values/constants";

const doNothing = () => {};
const isClient = typeof window !== "undefined";

export const getToken = () =>
  isClient ? sessionStorage.getItem(TOKEN_KEY) : undefined;

export const removeToken = () =>
  isClient ? sessionStorage.removeItem(TOKEN_KEY) : doNothing;

export const prepareRequestHeader = (token: string) => {
  const authHeader = token ? `Bearer ${token}` : null;
  client.defaults.headers.common.Authorization = authHeader;
};

const initialState = {
  pin: "",
  code: "",
  phoneNumber: "",
  token: getToken(),
  isLoggedIn: !!getToken(),
  country: JSON.stringify(countries?.[0]),
};

const checkIsLoggedIn = () => {
  const token = getToken();
  if (!token) return false;
  return true;
};

export const authAtom = atom({
  pin: "",
  code: "",
  phoneNumber: "",
  token: getToken(),
  isLoggedIn: checkIsLoggedIn(),
  country: JSON.stringify(countries?.[0]),
});

export const logoutAtom = atom(null, (_, set) => {
  removeToken();
  return set(authAtom, initialState);
});
