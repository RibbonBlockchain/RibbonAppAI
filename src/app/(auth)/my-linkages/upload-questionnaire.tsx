import React, { useState } from "react";
import { UploadCloudIcon } from "lucide-react";
import { ArrowLeft, Edit } from "iconsax-react";
import QuestionnaireTemplate from "@/containers/loan/loan-questionnaire-templates";
import Questionnaire from "@/containers/questionnaire/quetionnaire-templates";

const tabs = [
  { name: "All questionnaires", value: "questionnaires" },
  { name: "Manually added", value: "manually-added" },
  { name: "Uploaded files", value: "uploaded-files" },
];

const UploadQuestionnaire = ({ linkageId }: { linkageId: number }) => {
  const [selected, setSelected] = useState("add-maually");
  const [updating, setUpdating] = useState(false);

  const [selectedTab, setSelectedTab] = useState("questionnaires");
  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <section className="w-full flex flex-col gap-6">
      {!updating && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold">Upload questionnaires</p>

            <div className="flex flex-row gap-4">
              <div
                onClick={() => {
                  setSelected("add-manually"), setUpdating(true);
                }}
                className="w-full flex flex-col items-center justify-center bg-[#3f3856] py-4 rounded-lg"
              >
                <div className="flex flex-row gap-2 items-center justify-center text-[13px] font-semibold">
                  <p>Add manually</p>
                  <Edit size={"20"} />
                </div>
                <p className="font-normal text-xs">edit and organize</p>
              </div>

              <div
                onClick={() => {
                  setSelected("upload"), setUpdating(true);
                }}
                className="w-full flex flex-col items-center justify-center bg-[#3f3856] py-4 rounded-lg"
              >
                <div className="flex flex-row gap-2 items-center justify-center text-[13px] font-semibold">
                  <p>Upload files</p>
                  <UploadCloudIcon size={"20"} />
                </div>
                <p className="font-normal text-xs">docs, xlsx...</p>
              </div>
            </div>
          </div>

          <section className="w-full flex flex-col">
            <p className="text-md font-semibold">
              Recently added questionnaires
            </p>

            <div className="mt-2 text-xs flex flex-row gap-2 w-[inherit] border-b border-[#F2EEFF40] overflow-x-auto scroll-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => handleTabClick(tab.value)}
                  className={`min-w-fit px-3 py-3 ${
                    selectedTab === tab.value
                      ? "text-white border-b-2 border-b-white"
                      : "bg-transparent text-[#F2EEFF]"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            <div className="w-full mt-2">
              {selectedTab === "questionnaires" && (
                <div>All questionnaires</div>
              )}
              {selectedTab === "manually-added" && <div>Manually added</div>}
              {selectedTab === "uploaded-files" && <div>Uploaded files</div>}
            </div>
          </section>
        </div>
      )}

      {updating && (
        <div>
          {selected === "add-manually" && (
            <div className="w-full flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <ArrowLeft size={20} onClick={() => setUpdating(false)} />
                <p className="flex flex-row gap-2 items-center text-sm font-semibold">
                  Add questionnaires manually
                </p>
                <p className="text-xs font-light">
                  Submit maximum of 5 questions
                </p>
              </div>

              <Questionnaire linkageId={linkageId} />
            </div>
          )}

          {selected === "upload" && (
            <div className="w-full flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <ArrowLeft size={20} onClick={() => setUpdating(false)} />
                <p className="flex flex-row gap-2 items-center text-sm font-semibold">
                  Upload questionnaires
                </p>{" "}
                <p className="text-xs font-light">
                  Submit maximum of 5 questions
                </p>
              </div>
              <div className="flex items-center text-sm text-center font-semibold bg-[#3f3856] h-[100px] rounded-lg justify-center">
                Coming soon
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default UploadQuestionnaire;
