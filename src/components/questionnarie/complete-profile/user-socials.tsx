import React from "react";
import InputBox from "../input-box";

const UserSocials = () => {
  const [value, setValue] = React.useState({
    email: "",
    discord: "",
    instagram: "",
    twitter: "",
    linkedIn: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValue(e.target.value);
  };

  return (
    <div>
      <InputBox
        value={value.email}
        label={"Email address"}
        required={true}
        onChange={handleChange}
      />
      <InputBox
        value={value.discord}
        label={"Discord"}
        required={true}
        onChange={handleChange}
      />
      <InputBox
        value={value.instagram}
        label={"Instagram Username"}
        required={false}
        onChange={handleChange}
      />
      <InputBox
        value={value.twitter}
        label={"X/Twitter Username"}
        required={false}
        onChange={handleChange}
      />{" "}
      <InputBox
        value={value.linkedIn}
        label={"LinkedIn"}
        required={false}
        onChange={handleChange}
      />
    </div>
  );
};

export default UserSocials;
