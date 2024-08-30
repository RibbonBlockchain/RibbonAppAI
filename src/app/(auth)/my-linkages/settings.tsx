"use client";

import Button from "@/components/button";
import InputBox from "@/components/questionnarie/input-box";
import clsx from "clsx";
import { Profile2User, Setting2 } from "iconsax-react";
import React, { useState } from "react";

const Settings = () => {
  const [selected, setSelected] = useState("general");

  const [email, setEmail] = useState("");

  const isSubmitDisabled = !email;

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 py-3 border-b border-[#C3B1FF4D]">
        <p className="text-lg font-bold">Settings</p>
        <p className="text-sm font-normal">
          Modify your bot’s appearance and your Linkage details
        </p>
      </div>

      <div className="flex flex-row gap-4 text-sm font-bold">
        <p
          onClick={() => setSelected("general")}
          className={clsx(
            "w-fit flex flex-row items-center gap-2 px-4 text-center py-2 rounded-md",
            selected === "general" && " bg-[#C3B1FF4D]"
          )}
        >
          <Setting2 size="18" color="#ffffff" />
          General
        </p>
        <p
          onClick={() => setSelected("members")}
          className={clsx(
            "w-fit flex flex-row items-center gap-2 px-4 text-center py-2 rounded-md",
            selected === "members" && " bg-[#C3B1FF4D]"
          )}
        >
          <Profile2User size="18" color="#ffffff" />
          Members
        </p>
      </div>

      <div>
        {selected === "general" && <div>General settings</div>}

        {selected === "members" && (
          <div className="flex flex-col gap-4">
            <p className="text-lg font-bold">Team Management</p>
            <p className="text-sm font-normal">
              Modify your bot’s appearance and your Linkage details
            </p>
            <InputBox
              name={"email"}
              value={email}
              label={"Invite a new team member"}
              required={false}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              disabled={isSubmitDisabled}
              onClick={() => {}}
              className={clsx(
                "my-10 w-full rounded-[8px] py-3 font-bold text-sm",
                isSubmitDisabled
                  ? "bg-gray-600 text-white cursor-not-allowed"
                  : "bg-white text-[#290064]"
              )}
            >
              Publish AI Linkage
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Settings;
