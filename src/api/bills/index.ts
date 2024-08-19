import { onError } from "../api-client";
import { TBuyData, TPurchaseAirtime } from "./types";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  buyData,
  getDataServiceLists,
  getServicesBalance,
  purchaseAirtime,
} from "./req";

export const useGetServicesBalance = () => {
  return useQuery({
    queryKey: ["service-balance"],
    queryFn: () => getServicesBalance(),
  });
};

export const usePurchaseAirtime = () => {
  return useMutation({
    onError,
    mutationFn: (body: TPurchaseAirtime) => purchaseAirtime(body),
  });
};

export const useGetDataServiceList = (serviceId: string) => {
  return useQuery({
    enabled: !!serviceId,
    queryKey: ["data-service", serviceId],
    queryFn: () => getDataServiceLists(serviceId),
  });
};

export const useBuyData = () => {
  return useMutation({
    onError,
    mutationFn: (body: TBuyData) => buyData(body),
  });
};
