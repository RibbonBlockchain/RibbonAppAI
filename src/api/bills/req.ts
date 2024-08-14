import { TResponse, client } from "../api-client";

export const getSupportedBillsByCountry = async () => {
  const res = await client.get<TResponse<any>>("/bill/categories?country=NG");
  return res.data.data;
};
