"use client";

import React, { useEffect, useState, useRef } from "react";
import Topbar from "@/containers/dashboard/top-bar";
import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";
import TimelineCard from "@/components/timeline-card";
import { useGetUserNotifications } from "@/api/user";
import { formatDateAndTimeAgo } from "@/lib/values/format-dateandtime-ago";
import { SpinnerIcon } from "@/components/icons/spinner";

const TimelineComponent = () => {
  const { data: notifications, isLoading } = useGetUserNotifications();

  const sortedNotifications = notifications?.data?.sort((a: any, b: any) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <AuthNavLayout>
      <main className="w-full min-h-screen text-white bg-[#0B0228] p-4 sm:p-6">
        <Topbar>
          <p className="text-xl font-bold">Timeline</p>
        </Topbar>
        <section className="mt-5 mb-20">
          {isLoading ? (
            <div className="mt-10 flex items-center justify-center">
              <SpinnerIcon />
            </div>
          ) : (
            <div className="space-y-4">
              {sortedNotifications?.map((i: any) => (
                <TimelineCard
                  key={i.id}
                  title={i.title}
                  image={null}
                  time={formatDateAndTimeAgo(i.createdAt).relativeTime}
                  description={i.message}
                  comments={"0"}
                  likes={"0"}
                  shares={""}
                  id={i.id}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </AuthNavLayout>
  );
};

export default TimelineComponent;
