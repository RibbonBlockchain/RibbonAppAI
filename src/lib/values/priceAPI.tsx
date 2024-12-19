"use client";

import React from "react";
import useSWR from "swr";

export async function fetcher(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Network response failed");
  }
  return res.json();
}

export const useUsdcCoinDetails = () => {
  // Updated API URL to fetch details for USDC
  const apiUrl = `https://api.coingecko.com/api/v3/coins/usd-coin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`;

  const { isLoading, error, data } = useSWR(apiUrl, fetcher);

  return {
    isLoading,
    error,
    data,
  };
};

export const useEthCoinDetails = () => {
  const apiUrl = `https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`;

  const { data, error, isLoading } = useSWR(apiUrl, fetcher);

  const ethPrice = data?.market_data?.current_price?.usd;

  return {
    ethPrice,
    error,
    isLoading,
    data,
  };
};

const UsdcCoinPrice = () => {
  const { data, error, isLoading } = useUsdcCoinDetails();
  const currentPrice = data?.market_data.current_price.usd as number;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return <div>Current USDC Price: ${currentPrice}</div>;
};

export default UsdcCoinPrice;
