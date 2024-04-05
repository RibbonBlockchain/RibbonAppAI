"use client";

import UserDetailsInputBox, {
  UserSocialsInputBox,
} from "@/containers/account/userdetails-input";
import React from "react";
import toast from "react-hot-toast";
import { useGetAuth } from "@/api/auth";
import { useUpdateProfile } from "@/api/user";
import parsePhoneNumber from "libphonenumber-js";
import BackArrowButton from "@/components/button/back-arrow";
import { Discord, Instagram, LinkedIn, Twitter } from "@/public/images";

const PersonalDetails = () => {
  const { data: user } = useGetAuth({ enabled: true });
  const [edit, setEdit] = React.useState(false);
  const [gender, setGender] = React.useState(user?.gender);

  const { mutate: update } = useUpdateProfile();

  const phoneNumber = parsePhoneNumber(user?.phone);
  const formattedPhoneNumber = phoneNumber?.formatInternational();

  const [userState, setUserState] = React.useState({
    firstName: "",
    lastName: "",
    otherNames: "",
    email: "",
    dob: "",
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
    edit &&
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

  const handleGenderChange = (
    event: React.SyntheticEvent<HTMLSelectElement>
  ) => {
    const value = event.currentTarget.value;
    if (value === "MALE") {
      setGender("MALE");
    } else if (value === "FEMALE") {
      setGender("FEMALE");
    }
  };

  const handleSubmitChanges = () => {
    update(userState, gender);
    toast.success("Profile updated successfully");
  };

  return (
    <div className="p-4 sm:p-6 bg-[#FFFFFF] h-[inherit] flex flex-col gap-6">
      <div className="flex flex-row justify-between items-center">
        <BackArrowButton stroke="#583DB4" />
        <p>Personal Details</p>
        <div
          className="w-[40px] p-2 text-end text-[#7C56FE] text-sm font-medium"
          onClick={() => setEdit(!edit)}
        >
          {edit ? <p onClick={handleSubmitChanges}>Save</p> : <p>Edit</p>}
        </div>
      </div>

      <div>
        <h1 className="text-xs text-[#626262] font-medium">Basic Info</h1>
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
            <div className="relative inline-block w-full">
              <select
                disabled={edit === false}
                onChange={handleGenderChange}
                className="w-full h-full bg-transparent border-b border-[#EDEEEF] text-start -ml-[3px] py-2.5 mb-6 text-sm focus:outline-none focus:border-[#7C56FE] placeholder:text-[#ADADAD]"
              >
                <option className="text-[#ADADAD] hidden">
                  {gender ? "Male" : "Female"}
                </option>
                <option value={"MALE"}>Male</option>
                <option value={"FEMALE"}>Female</option>
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

      <div>
        <h1 className="text-xs text-[#626262] font-medium">Contact Info</h1>
        <div className="mt-4">
          <UserDetailsInputBox
            name="email"
            label={"Email"}
            required={false}
            value={userState?.email}
            onChange={handleChange}
          />
          <UserDetailsInputBox
            name={undefined}
            required={false}
            value={formattedPhoneNumber}
            label={"Phone number"}
            onChange={() => {}}
          />
        </div>
      </div>

      <div className="pb-14">
        <h1 className="text-xs text-[#626262] font-medium">Social Handles</h1>
        <div className="mt-4">
          <UserSocialsInputBox
            image={<Discord />}
            name={undefined}
            required={false}
            value={userState?.socials?.discord}
            label={"Discord"}
            onChange={(e) =>
              edit && handleSocialChange("discord", e.target.value)
            }
          />
          <UserSocialsInputBox
            image={<Instagram />}
            name={undefined}
            required={false}
            value={userState?.socials?.instagram}
            label={"Instagram"}
            onChange={(e) =>
              edit && handleSocialChange("instagram", e.target.value)
            }
          />
          <UserSocialsInputBox
            image={<Twitter />}
            name={undefined}
            required={false}
            value={userState?.socials?.x}
            label={"X-(twitter)"}
            onChange={(e) => edit && handleSocialChange("x", e.target.value)}
          />
          <UserSocialsInputBox
            image={<LinkedIn />}
            name={undefined}
            required={false}
            value={userState?.socials?.linkedIn}
            label={"LinkedIn"}
            onChange={(e) =>
              edit && handleSocialChange("linkedIn", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
