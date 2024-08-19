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

const useCoinDetails = () => {
  const apiUrl = `https://api.coingecko.com/api/v3/coins/worldcoin-wld?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`;

  const { isLoading, error, data } = useSWR(apiUrl, fetcher);

  return {
    isLoading,
    error,
    data,
  };
};

const WorldCoinPrice = () => {
  const { data, error, isLoading } = useCoinDetails();
  const currentPrice = data?.market_data.current_price.usd as number;

  return <div>Current World Price: {currentPrice}</div>;
};

export default WorldCoinPrice;
