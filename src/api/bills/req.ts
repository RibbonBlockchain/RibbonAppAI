import { TResponse, client } from "../api-client";

export const getSupportedBillsByCountry = async () => {
  const res = await client.get<TResponse<any>>("/vtpass/balance");
  return res.data.data;
};
