import { atom } from "jotai";
import { signOut } from "next-auth/react";
import { client } from "@/api/api-client";
import { countries } from "../values/countries";
import { TOKEN_KEY } from "../values/constants";
import { getSession } from "next-auth/react";

const doNothing = () => {};
const isClient = typeof window !== "undefined";

// export const getToken = () =>
//   isClient ? sessionStorage.getItem(TOKEN_KEY) : undefined;

export const getTokenAsync = async () => {
  const session = await getSession();
  const token = isClient ? sessionStorage.getItem(TOKEN_KEY) : undefined;
  return token || session?.accessToken;
};

export const removeToken = () =>
  isClient ? sessionStorage.removeItem(TOKEN_KEY) : doNothing;

export const logout = async () => {
  await signOut();
  removeToken();
};

export const prepareRequestHeader = (token: string) => {
  const authHeader = token ? `Bearer ${token}` : null;
  client.defaults.headers.common.Authorization = authHeader;
};

const initialState = {
  pin: "",
  pin2: "",
  code: "",
  email: "",
  phoneNumber: "",
  token: undefined,
  isLoggedIn: false,
  country: JSON.stringify(countries?.[0]),
};

export const authAtom = atom({
  pin: "",
  pin2: "",
  code: "",
  email: "",
  phoneNumber: "",
  token: undefined,
  isLoggedIn: false,
  country: JSON.stringify(countries?.[0]),
});

export const createLinkageAtom = atom({
  id: null,
  slug: "",
});

export const logoutAtom = atom(null, (_, set) => {
  signOut();
  removeToken();
  return set(authAtom, initialState);
});
