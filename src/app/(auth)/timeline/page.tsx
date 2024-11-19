import React from "react";
import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";
import Topbar from "@/containers/dashboard/top-bar";
import TimelineCard, { testData } from "@/components/timeline-card";

const Timeline = () => {
  return (
    <AuthNavLayout>
      <main className="w-full min-h-screen text-white bg-[#0B0228] p-4 sm:p-6">
        <Topbar>
          <p className="text-xl font-bold">Timeline</p>
        </Topbar>

        <section className="mt-5 mb-20">
          <div className="space-y-4">
            {testData.map((data, index) => (
              <TimelineCard key={index} {...data} />
            ))}
          </div>
        </section>
      </main>
    </AuthNavLayout>
  );
};

export default Timeline;
