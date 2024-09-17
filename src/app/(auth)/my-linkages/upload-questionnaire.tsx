import Image from "next/image";
import { UploadCloudIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Edit, Edit2, Trash } from "iconsax-react";
import { useGetLinkageQuestionnaire } from "@/api/linkage";
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

  const [visibleMenu, setVisibleMenu] = useState<{ [key: number]: boolean }>(
    {}
  );
  const menuRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const handleToggleMenu = (id: number) => {
    setVisibleMenu((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClickOutside = (event: MouseEvent) => {
    const clickedOutside = Object.values(menuRefs.current).every((ref) => {
      return ref && !ref.contains(event.target as Node);
    });

    if (clickedOutside) {
      setVisibleMenu({});
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedLinkageString = localStorage.getItem("selectedLinkage");
  const selectedLinkage = JSON.parse(selectedLinkageString as string);

  const { data: linkageQuestionnaaires } = useGetLinkageQuestionnaire({
    linkageId: selectedLinkage?.id,
  });

  const handleEdit = (id: number) => {
    console.log(`Edit item with ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Delete item with ID: ${id}`);
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

            <div className="w-full mt-2 mb-6">
              <>
                {selectedTab === "questionnaires" && (
                  <div className="flex flex-col gap-2">
                    {linkageQuestionnaaires?.data.map((item: any) => (
                      <div
                        key={item.id}
                        className="relative flex flex-row items-center justify-between p-4 border border-[#FFFFFF36] rounded-[6px]"
                      >
                        <div>
                          <p className="text-sm font-semibold">{item.name}</p>
                          <p className="text-xs font-normal text-[#98A2B3]">
                            {item.questions?.length}
                          </p>
                        </div>

                        <div className="relative self-center">
                          <Image
                            alt="icon"
                            width={24}
                            height={24}
                            src="/assets/option-icon.png"
                            className="cursor-pointer"
                            onClick={() => handleToggleMenu(item.id)}
                          />

                          {visibleMenu[item.id] && (
                            <div className="absolute right-0 z-30 flex flex-col gap-1 bg-[#3f3952] rounded-[12px] border border-white text-white text-sm font-semibold">
                              <button
                                className="flex flex-row items-center gap-1 p-2"
                                onClick={() => handleDelete(item.id)}
                              >
                                <Trash size={20} /> Delete
                              </button>
                              <button
                                className="flex flex-row items-center gap-1 p-2"
                                onClick={() => handleEdit(item.id)}
                              >
                                <Edit2 size={20} /> Edit
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>

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
