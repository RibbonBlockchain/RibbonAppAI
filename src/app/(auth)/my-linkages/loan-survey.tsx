import React from "react";
import LoanSurveyTemplate from "@/containers/loan/loan-questionnaire-templates";

const LoanSurvey = ({ linkageId }: { linkageId: number }) => {
  return (
    <section className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold">Create a loan</p>
          <p className="text-xs font-light">
            Add some questions for users getting loans
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-6">
        <LoanSurveyTemplate linkageId={linkageId} />
      </div>
    </section>
  );
};

export default LoanSurvey;
