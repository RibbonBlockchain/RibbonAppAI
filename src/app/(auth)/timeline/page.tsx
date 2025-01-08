"use client";

import { Tweet } from "react-tweet";
import React, { useEffect } from "react";
import Topbar from "@/containers/dashboard/top-bar";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import TimelineCard, { testData } from "@/components/timeline-card";
import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";

const Timeline = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);

    script.onload = () => {
      console.log("Twitter widgets script loaded");
    };
    script.onerror = (error) => {
      console.error("Error loading Twitter widgets script:", error);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <AuthNavLayout>
      <main className="w-full min-h-screen text-white bg-[#0B0228] p-4 sm:p-6">
        <Topbar>
          <p className="text-xl font-bold">Timeline</p>
        </Topbar>

        <a
          className="twitter-timeline"
          href="https://twitter.com/RibbonProtocol?ref_src=twsrc%5Etfw"
        >
          Tweets by RibbonProtocol
        </a>

        <section className="flex flex-col gap-2 mt-5 mb-20">
          {/* <div className="space-y-4">
            {testData.map((data, index) => (
              <TimelineCard key={index} {...data} />
            ))}
          </div> */}

          <Tweet id="1783448062242816398" />

          <Tweet id="1628832338187636740" />
        </section>
      </main>
    </AuthNavLayout>
  );
};

export default Timeline;
