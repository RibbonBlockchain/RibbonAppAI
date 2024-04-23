"use client";

import React from "react";
import Notifications from "./notifications";
import { useGetUserNotifications } from "@/api/user";

const DisplayNotifications = () => {
  const { data } = useGetUserNotifications();

  return (
    <>
      <p className="text-xs font-bold mb-3">Today</p>
      <Notifications notifications={data?.data} />
    </>
  );
};

export default DisplayNotifications;
