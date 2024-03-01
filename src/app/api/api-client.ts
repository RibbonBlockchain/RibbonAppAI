import axios from "axios";
import toast from "react-hot-toast";
// import { getToken } from "./store/auth.atom";
// import { DEFAULT_ERROR_MESSAGE, TOKEN_KEY } from "@/utils/constants";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const client = axios.create({ baseURL: `${baseURL}/v1` });

export const onError = (error: any, id?: string) => {
  const err = error.response?.data?.message;
  let msg = !!err
    ? Array.isArray(err)
      ? err[0]
      : err
    : "DEFAULT_ERROR_MESSAGE";
  if (msg) toast.error(msg, { id });
};

export const onMutate = (msg: string, id?: string) => {
  toast.loading(msg, { id });
};

export const onSuccess = (id?: string, msg?: string) => {
  toast.success(msg || "Success", { id });
};

client.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${""}`;
  return config;
});

client.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response.status !== 401) throw error;
    sessionStorage.removeItem("TOKEN_KEY");
    location.reload();
  }
);
