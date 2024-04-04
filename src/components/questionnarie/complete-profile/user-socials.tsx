import React from "react";
import InputBox from "../input-box";

const UserSocials = ({ state, setState }: any) => {
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setState((prev: any) => ({
      ...prev,
      socials: { ...prev.socials, [name]: value },
    }));
  };

  return (
    <div className="z-10">
      <InputBox
        name="email"
        required={true}
        value={state.email}
        label={"Email address"}
        onChange={(e: any) =>
          setState((prev: any) => ({ ...prev, email: e.target.value }))
        }
      />
      <InputBox
        name="discord"
        value={state.socials.discord}
        label={"Discord"}
        required={true}
        onChange={handleChange}
      />
      <InputBox
        name="instagram"
        value={state.socials.instagram}
        label={"Instagram Username"}
        required={false}
        onChange={handleChange}
      />
      <InputBox
        name="x"
        value={state.socials.x}
        label={"X/Twitter Username"}
        required={false}
        onChange={handleChange}
      />{" "}
      <InputBox
        name="linkedIn"
        value={state.socials.linkedIn}
        label={"LinkedIn"}
        required={false}
        onChange={handleChange}
      />
    </div>
  );
};

export default UserSocials;
