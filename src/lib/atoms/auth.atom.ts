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
  isOpen: false,
  token: getToken(),
  isLoggedIn: !!getToken(),
};

const checkIsLoggedIn = () => {
  const token = getToken();
  if (!token) return false;
  return true;
};

export const authAtom = atom({
  isOpen: false,
  token: getToken(),
  isLoggedIn: checkIsLoggedIn(),
});

export const logoutAtom = atom(null, (_, set, _u) => {
  removeToken();
  return set(authAtom, initialState);
});

export const phoneAuthAtom = atom({
  pin: "",
  code: "",
  phoneNumber: "",
  country: JSON.stringify(countries?.[0]),
});
