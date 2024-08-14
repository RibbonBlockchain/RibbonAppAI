import { useQuery } from "@tanstack/react-query";
import { getSupportedBillsByCountry } from "./req";

export const useGetSupportedBillsByCountry = () => {
  return useQuery({
    queryKey: ["bill-country"],
    queryFn: () => getSupportedBillsByCountry(),
  });
};
