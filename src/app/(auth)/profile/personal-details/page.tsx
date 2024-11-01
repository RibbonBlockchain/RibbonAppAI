"use client";

import UserDetailsInputBox, {
  UserSocialsInputBox,
} from "@/containers/account/userdetails-input";
import Image from "next/image";
import toast from "react-hot-toast";
import { Edit2 } from "iconsax-react";
import React, { useState } from "react";
import { useGetAuth } from "@/api/auth";
import { Mail, Phone } from "lucide-react";
import { useUpdateProfile } from "@/api/user";
import parsePhoneNumber from "libphonenumber-js";
import BackArrowButton from "@/components/button/back-arrow";
import { Discord, LinkedIn, Instagram, Twitter } from "@/public/assets";

const PersonalDetails = () => {
  const { data: user, refetch } = useGetAuth({ enabled: true });
  const [allowEdit, setAllowEdit] = useState<boolean>(false);

  const { mutate: update } = useUpdateProfile();

  const SES_Score = user?.wallet.ses;

  const phoneNumber = user?.phone ? parsePhoneNumber(user.phone) : null;
  const formattedPhoneNumber = phoneNumber
    ? phoneNumber.formatInternational()
    : null;

  const [userState, setUserState] = React.useState({
    firstName: "",
    lastName: "",
    otherNames: "",
    email: "",
    dob: "",
    gender: "",
    socials: {
      discord: "",
      instagram: "",
      x: "",
      linkedIn: "",
    },
  });

  React.useEffect(() => {
    setUserState(user);
  }, [user]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    allowEdit &&
      setUserState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
  };

  const handleSocialChange = (social: any, value: any) => {
    setUserState((prevState) => ({
      ...prevState,
      socials: {
        ...prevState.socials,
        [social]: value,
      },
    }));
  };

  const [gender, setGender] = React.useState(userState.gender);

  const handleGenderChange = (
    event: React.SyntheticEvent<HTMLSelectElement>
  ) => {
    const value = event.currentTarget.value;
    if (value === "MALE") {
      allowEdit &&
        setUserState((prevState) => ({
          ...prevState,
          gender: value,
        }));
    } else if (value === "FEMALE") {
      allowEdit &&
        setUserState((prevState) => ({
          ...prevState,
          gender: value,
        }));
    }
  };

  const handleSubmitChanges = () => {
    update(userState);
    refetch();
    setAllowEdit(false);
    toast.success("Profile updated successfully");
  };

  return (
    <div className="bg-[#0B0228] text-white min-h-[inherit] flex flex-col">
      <div className="bg-peronalDetails bg-cover rounded-b-[32px] flex flex-col p-4 sm:p-6">
        <div className="flex flex-row justify-between items-center">
          <BackArrowButton stroke="#fff" />

          <p>Personal Details</p>

          <div
            className="w-fit min-w-[40px] p-2 text-end cursor-pointer"
            onClick={() =>
              allowEdit ? handleSubmitChanges() : setAllowEdit(true)
            }
          >
            {allowEdit ? (
              <div>Save</div>
            ) : (
              <div className="flex flex-row gap-1 items-center justify-center">
                <Edit2 color="#fff" size={20} /> Edit
              </div>
            )}
          </div>
        </div>

        <div className="my-6 flex flex-row items-center justify-start gap-6">
          <div className="relative flex flex-row">
            <Image
              priority
              width={83}
              height={79}
              alt="avatar"
              src={user?.avatar || ""}
              className="border-2 border-[#A81DA6] rounded-[34px]"
            />
            <Image
              width={24}
              height={24}
              alt="camera"
              src="/images/camera.svg"
              className="absolute bottom-2 -right-1"
            />
          </div>
          <div className="flex flex-col gap-1 text-xs font-normal ">
            <p className="text-lg font-semibold">
              {user?.firstName || "Ribbon"} {user?.lastName || "Protocol"}
            </p>
            <p>SES Score: {SES_Score}</p>

            <p>Balance: {user?.wallet.balance.toFixed(2)} WLD</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 my-2 text-sm font-medium">
          <div className="flex flex-row gap-4 items-center">
            <Phone size={20} /> {formattedPhoneNumber}
          </div>
          <div className="flex flex-row gap-4 items-center">
            <Mail size={20} /> {userState?.email || "Not set"}
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <h1 className="text-xs font-medium">Basic Info</h1>
        <div className="mt-4">
          <UserDetailsInputBox
            name="firstName"
            required={false}
            label={"First name"}
            onChange={handleChange}
            value={userState?.firstName}
          />
          <UserDetailsInputBox
            name="lastName"
            required={false}
            label={"Last name"}
            onChange={handleChange}
            value={userState?.lastName}
          />
          <UserDetailsInputBox
            required={false}
            name="otherNames"
            label={"Other names"}
            onChange={handleChange}
            value={userState?.otherNames}
          />
          <div>
            <label
              htmlFor="input"
              className={`flex flex-row items-center after:ml-1 text-xs font-medium mb-2`}
            >
              Gender
            </label>

            <div className="relative inline-block w-full bg-[#0B0228] text-white">
              <select
                disabled={allowEdit === false}
                onChange={handleGenderChange}
                className="w-full h-full bg-[#0B0228] border pl-2 border-[#EDEEEF] text-start -ml-[3px] py-2.5 mb-6 text-sm focus:outline-none focus:border-[#7C56FE] placeholder:text-[#ADADAD]"
              >
                <option className="text-[#ADADAD] hidden">
                  {userState.gender === "MALE"
                    ? "Male"
                    : userState.gender === "FEMALE"
                    ? "Female"
                    : userState.gender === "OTHER"
                    ? "Other"
                    : ""}
                </option>
                <option value={"MALE"}>Male</option>
                <option value={"FEMALE"}>Female</option>
                <option value={"OTHER"}>Others</option>
              </select>
            </div>
          </div>
          <UserDetailsInputBox
            name={"dob"}
            type="date"
            required={false}
            value={userState?.dob}
            label={"Date of Birth"}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="px-4 sm:px-6">
        <h1 className="text-xs font-medium">Contact Info</h1>
        <div className="mt-4">
          <UserDetailsInputBox
            name="email"
            label={"Email"}
            required={false}
            value={userState?.email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-14 p-4 sm:p-6">
        <h1 className="text-xs font-medium">Social Handles</h1>
        <div className="mt-4">
          <UserSocialsInputBox
            image={<Discord />}
            name={undefined}
            required={false}
            value={userState?.socials?.discord}
            label={"Discord"}
            onChange={(e) =>
              allowEdit && handleSocialChange("discord", e.target.value)
            }
          />
          <UserSocialsInputBox
            image={<Instagram />}
            name={undefined}
            required={false}
            value={userState?.socials?.instagram}
            label={"Instagram"}
            onChange={(e) =>
              allowEdit && handleSocialChange("instagram", e.target.value)
            }
          />
          <UserSocialsInputBox
            image={<Twitter />}
            name={undefined}
            required={false}
            value={userState?.socials?.x}
            label={"X-(twitter)"}
            onChange={(e) =>
              allowEdit && handleSocialChange("x", e.target.value)
            }
          />
          <UserSocialsInputBox
            image={<LinkedIn />}
            name={undefined}
            required={false}
            value={userState?.socials?.linkedIn}
            label={"LinkedIn"}
            onChange={(e) =>
              allowEdit && handleSocialChange("linkedIn", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
