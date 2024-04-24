"use client";

import React from "react";
import Notifications from "./notifications";
import { useGetUserNotifications } from "@/api/user";

const DisplayNotifications = () => {
  const { data } = useGetUserNotifications();

  return (
    <>
      <p className="text-xs font-bold mb-3">Today</p>
      <Notifications
        notifications={data?.data.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )}
      />
    </>
  );
};

export default DisplayNotifications;
