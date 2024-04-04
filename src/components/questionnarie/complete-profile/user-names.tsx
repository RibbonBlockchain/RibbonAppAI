import React from "react";
import InputBox from "../input-box";

const UserNames = ({ state, setState }: any) => {
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setState((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="z-10">
      <InputBox
        name="firstName"
        required={true}
        label={"First Name"}
        value={state.firstName}
        onChange={handleChange}
      />
      <InputBox
        name="lastName"
        value={state.lastName}
        required={true}
        label={"Last Name"}
        onChange={handleChange}
      />
      <InputBox
        name="otherNames"
        value={state.otherNames}
        label={"Other Names"}
        required={false}
        onChange={handleChange}
      />
    </div>
  );
};

export default UserNames;
