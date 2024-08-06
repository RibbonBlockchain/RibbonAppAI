"use client";

import React from "react";
import Persona from "persona";
import PageLoader from "@/components/loader";

const InlineInquiry = () => {
  const [ready, setReady] = React.useState(false);
  const templateId = process.env.NEXT_PUBLIC_PERSONA_TEMPLATE_ID;
  const environmentId = process.env.NEXT_PUBLIC_PERSONA_ENVIRONMENT_ID;

  return (
    <div className="h-screen w-full [&_iframe]:h-screen [&_iframe]:w-full">
      {!ready && <PageLoader />}

      <Persona.Inquiry
        templateId={templateId}
        environmentId={environmentId}
        onReady={() => setReady(true)}
        onLoad={() => console.log("Loaded inline")}
        onComplete={({ inquiryId, status, fields }) => {
          // Inquiry completed. Optionally tell your server about it.
          console.log("status", status, "fields", fields);
          console.log(`Sending finished inquiry ${inquiryId} to backend`);
        }}
      />
    </div>
  );
};

export default InlineInquiry;
