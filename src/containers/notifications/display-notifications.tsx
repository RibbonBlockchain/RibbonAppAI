"use client";

import React from "react";
import Notifications from "./notifications";
import { useGetUserNotifications } from "@/api/user";

const DisplayNotifications = () => {
  const { data } = useGetUserNotifications();

  // filter and display only notifications not read
  const filteredData = data?.data.filter((item: any) => item.isRead === false);

  return (
    <>
      <Notifications
        notifications={filteredData.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )}
      />
    </>
  );
};

export default DisplayNotifications;
