import Image from "next/image";
import { X } from "lucide-react";
import React, { useState } from "react";
import { useGetAuth } from "@/api/auth";
import { useClaimDailyRewards } from "@/api/user";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Mood {
  largeImage: string;
  logo: string;
  name: string;
}

const moods: Mood[] = [
  {
    largeImage: "/assets/unhappy.png",
    logo: "/assets/unhappy-thumbnail.png",
    name: "Unhappy",
  },
  {
    largeImage: "/assets/sad.png",
    logo: "/assets/sad-thumbnail.png",
    name: "Sad",
  },
  {
    largeImage: "/assets/neutral.png",
    logo: "/assets/neutral-thumbnail.png",
    name: "Neutral",
  },
  {
    largeImage: "/assets/good.png",
    logo: "/assets/good-thumbnail.png",
    name: "Good",
  },
  {
    largeImage: "/assets/happy.png",
    logo: "/assets/happy-thumbnail.png",
    name: "Happy",
  },
];

const reasons: string[] = [
  "Health challenges",
  "Financial problems",
  "Family",
  "Lifestyle",
  "Marital issues",
];

const services = [
  "Counseling",
  "Therapy",
  "Support Groups",
  "Online Resources",
  "Workshops",
];

const MoodModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [view, setView] = useState<
    "selectMood" | "selectReason" | "selectService"
  >("selectMood");
  const [selectedReason, setSelectedReason] = useState<string>("");

  const { mutate } = useClaimDailyRewards();

  if (!isOpen) return null;

  const handleSetMoodClick = () => {
    if (selectedMood) {
      setView("selectReason");
      mutate();
    }
  };

  const handleGetRecommendationsClick = () => {
    if (selectedReason) {
      setView("selectService");
    }
  };

  return (
    <main className="fixed inset-0 bg-opacity-70 bg-black flex items-center justify-center z-50">
      <div className="flex flex-col w-full max-w-[375px] min-h-[550px] bg-[#3f3952] bg-opacity-75 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-lg">
        <X onClick={onClose} className="self-start cursor-pointer mb-4" />

        {view === "selectMood" && (
          <section className="flex flex-col items-center justify-between gap-4 flex-grow">
            <div className="text-2xl font-bold text-center mb-4">
              Hi Tolu, how do you feel today
            </div>

            <Image
              width={215}
              height={215}
              alt="mood"
              src={selectedMood?.largeImage || "/assets/default-mood.png"}
              className="rounded-full w-[200px] bg-[#3f3856] mb-4"
            />
            <div className="grid grid-cols-5 gap-4 items-center justify-center mb-4">
              {moods.map((mood) => (
                <div
                  key={mood.name}
                  className="flex flex-col items-center justify-center text-center gap-2 cursor-pointer"
                  onClick={() => setSelectedMood(mood)}
                >
                  <Image
                    width={32}
                    height={32}
                    alt={mood.name}
                    src={mood.logo}
                    className="rounded-md w-[32px] bg-[#3f3856]"
                  />
                  <p className="text-center">{mood.name}</p>
                </div>
              ))}
            </div>

            <button
              className="py-2.5 text-sm font-medium rounded-[8px] text-[#290064] bg-white w-full"
              onClick={handleSetMoodClick}
              disabled={!selectedMood}
            >
              Set Mood
            </button>
          </section>
        )}

        {view === "selectReason" && (
          <section className="flex flex-col items-center justify-between gap-4 flex-grow">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col items-start justify-center mb-4">
                <p className="text-2xl font-bold">We&apos;re here to help</p>
                <p className="text-base font-medium">
                  We&apos;re sorry to hear you&apos;re feeling{" "}
                  {selectedMood?.name.toLowerCase()}, we&apos;ll recommend some
                  helpful Linkage.
                </p>
              </div>

              <div className="flex flex-col gap-2 mb-4">
                <p className="text-xs font-bold mb-2">
                  Kindly reflect on recent events or triggers that might have
                  contributed to your mood.
                </p>
                <select
                  className="p-2 rounded-md bg-inherit border border-[#FFFFFF]"
                  onChange={(e) => setSelectedReason(e.target.value)}
                  value={selectedReason}
                >
                  <option className="bg-[#3f3952] py-1.5" value="">
                    Select a reason
                  </option>
                  {reasons.map((reason) => (
                    <option
                      className="flex flex-col gap-1 bg-[#3f3952] py-1.5"
                      key={reason}
                      value={reason}
                    >
                      {reason}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              className="py-2.5 text-sm font-medium rounded-[8px] text-[#290064] bg-white w-full"
              onClick={handleGetRecommendationsClick}
              disabled={!selectedReason}
            >
              Get Linkage Recommendations
            </button>
          </section>
        )}

        {view === "selectService" && (
          <section className="flex flex-col gap-4 flex-grow">
            <div className="flex flex-col gap-1 mb-4">
              <p className="text-2xl font-bold">Linkage Recommendation</p>
              <p className="text-sm font-medium">
                We have found some Linkages that will help you
              </p>
            </div>

            <div className="flex flex-col">
              <ul className="list-disc list-inside mt-4">
                {services.map((service) => (
                  <li key={service} className="text-base font-medium mb-2">
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default MoodModal;
