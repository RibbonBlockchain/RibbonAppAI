import React from "react";
import RadioSelect from "../radio-select";

const GenderSelect = ({ value, onChange }: any) => {
  const genderOptions = ["MALE", "FEMALE", "OTHER"];

  return (
    <RadioSelect value={value} onChange={onChange} options={genderOptions} />
  );
};

export default GenderSelect;
