import {
  buyData,
  cablePay,
  purchaseAirtime,
  getServicesBalance,
  getDataServiceLists,
  verifyCableMerchant,
  verifyElectricityMerchant,
  electricityPay,
} from "./req";
import { onError } from "../api-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  TBuyData,
  TCableMerchant,
  TCablePay,
  TElectricityMerchant,
  TElectricityPay,
  TPurchaseAirtime,
} from "./types";

export const useGetServicesBalance = () => {
  return useQuery({
    queryKey: ["service-balance"],
    queryFn: () => getServicesBalance(),
  });
};

export const useGetDataServiceList = (serviceId: string) => {
  return useQuery({
    enabled: !!serviceId,
    queryKey: ["data-service", serviceId],
    queryFn: () => getDataServiceLists(serviceId),
  });
};

export const usePurchaseAirtime = () => {
  return useMutation({
    onError,
    mutationFn: (body: TPurchaseAirtime) => purchaseAirtime(body),
  });
};

export const useBuyData = () => {
  return useMutation({
    onError,
    mutationFn: (body: TBuyData) => buyData(body),
  });
};

// cables and tv
export const useVerifyCableMerchant = () => {
  return useMutation({
    onError,
    mutationFn: (body: TCableMerchant) => verifyCableMerchant(body),
  });
};

export const useCablePay = () => {
  return useMutation({
    onError,
    mutationFn: (body: TCablePay) => cablePay(body),
  });
};

// electricity
export const useVerifyElectricityMerchant = () => {
  return useMutation({
    onError,
    mutationFn: (body: TElectricityMerchant) => verifyElectricityMerchant(body),
  });
};

export const useElectricityPay = () => {
  return useMutation({
    onError,
    mutationFn: (body: TElectricityPay) => electricityPay(body),
  });
};
