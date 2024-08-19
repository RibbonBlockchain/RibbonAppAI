import { TResponse, client } from "../api-client";
import { TBuyData, TPurchaseAirtime } from "./types";

// mtn
// airtel
// etisalat
// glo
export const getServicesBalance = async () => {
  const res = await client.get<TResponse<any>>("/vtpass/balance");
  return res.data.data;
};

export const purchaseAirtime = async (body: TPurchaseAirtime) => {
  const res = await client.post("/vtpass/airtime", body);
  return res.data;
};

// mtn-data
// airtel-data
// etisalat-data
// glo-data
export const getDataServiceLists = async (serviceId: string) => {
  const res = await client.get<TResponse<any>>(
    `/vtpass/data-variations?serviceId=${serviceId}`
  );
  return res.data.data;
};

export const buyData = async (body: TBuyData) => {
  const res = await client.post("/vtpass/data", body);
  return res.data;
};
