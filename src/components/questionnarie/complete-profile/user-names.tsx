import React from "react";
import InputBox from "../input-box";

const UserNames = () => {
  const [value, setValue] = React.useState({
    firstName: "",
    lastName: "",
    otherNames: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValue(e.target.value);
  };

  return (
    <div>
      <InputBox
        value={value.firstName}
        label={"First Name"}
        required={true}
        onChange={handleChange}
      />
      <InputBox
        value={value.lastName}
        label={"Last Name"}
        required={true}
        onChange={handleChange}
      />
      <InputBox
        value={value.otherNames}
        label={"Other Names"}
        required={false}
        onChange={handleChange}
      />
    </div>
  );
};

export default UserNames;
