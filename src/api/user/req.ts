import { client } from "../api-client";
import { TUpdateProfileBody } from "./types";

export const updateProfile = async (body: TUpdateProfileBody) => {
  const res = await client.patch("/user/profile", body);
  return res.data.data;
};
