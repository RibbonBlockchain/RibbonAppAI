"use client";

import UserDetailsInputBox, {
  UserSocialsInputBox,
} from "@/containers/account/userdetails-input";
import React from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useGetAuth } from "@/api/auth";
import { Mail, Phone } from "lucide-react";
import { useUpdateProfile } from "@/api/user";
import parsePhoneNumber from "libphonenumber-js";
import BackArrowButton from "@/components/button/back-arrow";

const PersonalDetails = () => {
  const { data: user } = useGetAuth({ enabled: true });
  const [edit, setEdit] = React.useState(false);

  const { mutate: update } = useUpdateProfile();

  const SES_Score = user?.wallet.point;

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

  const [gender, setGender] = React.useState(userState.gender);

  const handleGenderChange = (
    event: React.SyntheticEvent<HTMLSelectElement>
  ) => {
    const value = event.currentTarget.value;
    if (value === "MALE") {
      edit &&
        setUserState((prevState) => ({
          ...prevState,
          gender: value,
        }));
    } else if (value === "FEMALE") {
      edit &&
        setUserState((prevState) => ({
          ...prevState,
          gender: value,
        }));
    }
  };

  const handleSubmitChanges = () => {
    update(userState);
    toast.success("Profile updated successfully");
  };

  return (
    <div className=" bg-[#FFFFFF] h-[inherit] flex flex-col">
      <div className="bg-peronalDetails bg-cover rounded-b-[32px] flex flex-col p-4 sm:p-6">
        <div className="flex flex-row justify-between items-center">
          <BackArrowButton stroke="#583DB4" />
          <p>Personal Details</p>
          <div
            className="w-[40px] p-2 text-end text-[#7C56FE] text-sm font-medium cursor-pointer"
            onClick={() => setEdit(!edit)}
          >
            {edit ? <p onClick={handleSubmitChanges}>Save</p> : <p>Edit</p>}
          </div>
        </div>

        <div className="my-6 flex flex-row items-center justify-start gap-6">
          <div className="relative flex flex-row">
            <Image
              priority
              width={83}
              height={79}
              alt="avatar"
              src={user?.avatar || "/images/avatar.jpg"}
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
          <div className="flex flex-col gap-1 text-[#626262] text-xs font-normal ">
            <p className="text-lg text-black font-semibold">
              {user?.firstName} {user?.lastName}
            </p>
            <p>SES Score: {SES_Score}</p>
            <p>Balance: {user?.wallet.balance} WLD</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 my-2 text-sm text-[#626262] font-medium">
          <div className="flex flex-row gap-4 items-center">
            <Phone /> {formattedPhoneNumber}
          </div>
          <div className="flex flex-row gap-4 items-center">
            <Mail /> {userState?.email}
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
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
            {/* <div className="px-2 mb-6 flex flex-row gap-2 w-full items-center justify-between">
              <p
                onClick={() => edit && setSelected("MALE")}
                className={clsx(
                  "rounded-xl py-2 border-2 w-full text-center",
                  selected === "MALE" && "border-[#7C56FE]"
                )}
              >
                Male
              </p>
              <p
                onClick={() => edit && setSelected("FEMALE")}
                className={clsx(
                  "rounded-xl py-2 border-2 w-full text-center",
                  selected === "FEMALE" && "border-[#7C56FE]"
                )}
              >
                Female
              </p>
              <p
                onClick={() => edit && setSelected("OTHERS")}
                className={clsx(
                  "rounded-xl py-2 border-2 w-full text-center",
                  selected === "OTHERS" && "border-[#7C56FE]"
                )}
              >
                Others
              </p>
            </div> */}
            <div className="relative inline-block w-full">
              <select
                disabled={edit === false}
                onChange={handleGenderChange}
                className="w-full h-full bg-transparent border pl-2 border-[#EDEEEF] text-start -ml-[3px] py-2.5 mb-6 text-sm focus:outline-none focus:border-[#7C56FE] placeholder:text-[#ADADAD]"
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
        <h1 className="text-xs text-[#626262] font-medium">Contact Info</h1>
        <div className="mt-4">
          <UserDetailsInputBox
            name="email"
            label={"Email"}
            required={false}
            value={userState?.email}
            onChange={handleChange}
          />
          {/* <UserDetailsInputBox
            name={undefined}
            required={false}
            value={formattedPhoneNumber}
            label={"Phone number"}
            onChange={() => {}}
          /> */}
        </div>
      </div>

      <div className="mb-14 p-4 sm:p-6">
        <h1 className="text-xs text-[#626262] font-medium">Social Handles</h1>
        <div className="mt-4">
          <UserSocialsInputBox
            // image={<Discord />}
            name={undefined}
            required={false}
            value={userState?.socials?.discord}
            label={"Discord"}
            onChange={(e) =>
              edit && handleSocialChange("discord", e.target.value)
            }
          />
          <UserSocialsInputBox
            // image={<Instagram />}
            name={undefined}
            required={false}
            value={userState?.socials?.instagram}
            label={"Instagram"}
            onChange={(e) =>
              edit && handleSocialChange("instagram", e.target.value)
            }
          />
          <UserSocialsInputBox
            // image={<Twitter />}
            name={undefined}
            required={false}
            value={userState?.socials?.x}
            label={"X-(twitter)"}
            onChange={(e) => edit && handleSocialChange("x", e.target.value)}
          />
          <UserSocialsInputBox
            // image={<LinkedIn />}
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
