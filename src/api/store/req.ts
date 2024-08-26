import { TResponse, client } from "../api-client";
import {
  TBuyData,
  TCableMerchant,
  TCablePay,
  TElectricityMerchant,
  TElectricityPay,
  TPurchaseAirtime,
} from "./types";

export const getServicesBalance = async () => {
  const res = await client.get<TResponse<any>>("/vtpass/balance");
  return res.data.data;
};

export const getDataServiceLists = async (serviceId: string) => {
  const res = await client.get<TResponse<any>>(
    `/vtpass/service-variations?serviceId=${serviceId}`
  );
  return res.data.data;
};

export const purchaseAirtime = async (body: TPurchaseAirtime) => {
  const res = await client.post("/vtpass/airtime", body);
  return res.data;
};

export const buyData = async (body: TBuyData) => {
  const res = await client.post("/vtpass/data", body);
  return res.data;
};

//Cables and TV
export const verifyCableMerchant = async (body: TCableMerchant) => {
  const res = await client.post("/vtpass/verify-merchant", body);
  return res.data;
};

export const cablePay = async (body: TCablePay) => {
  const res = await client.post("/vtpass/cable-pay", body);
  return res.data;
};

//Electricity
export const verifyElectricityMerchant = async (body: TElectricityMerchant) => {
  const res = await client.post("/vtpass/verify-merchant", body);
  return res.data;
};

export const electricityPay = async (body: TElectricityPay) => {
  const res = await client.post("/vtpass/electricity-pay", body);
  return res.data;
};
