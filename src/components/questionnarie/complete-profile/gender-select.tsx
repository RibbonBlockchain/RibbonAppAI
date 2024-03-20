import React from "react";
import RadioSelect from "../radio-select";

const GenderSelect = () => {
  const genderOptions = ["Male", "Female", "Other"];

  return <RadioSelect options={genderOptions} />;
};

export default GenderSelect;
