import axios from "axios";
import toast from "react-hot-toast";
import { getSession } from "next-auth/react";
import { logout } from "@/lib/atoms/auth.atom";
import { DEFAULT_ERROR_MESSAGE } from "@/lib/values/constants";
import { useRouter } from "next/navigation";

export type TResponse<T> = { data: T; message: string };

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const client = axios.create({ baseURL: `${baseURL}/v1` });

export const onError = (error: any) => {
  const err = error.response?.data?.message;

  let msg = !!err ? (Array.isArray(err) ? err[0] : err) : DEFAULT_ERROR_MESSAGE;
  if (msg) toast.error(msg);
};

export const onMutate = (msg: string, id?: string) => {
  toast.loading(msg, { id });
};

export const onSuccess = (id?: string, msg?: string) => {
  toast.success(msg || "Success", { id });
};

client.interceptors.request.use(async (config) => {
  const session = await getSession();
  const token = session?.accessToken;

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

client.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response.status !== 401) throw error;
    await logout();
  }
);
