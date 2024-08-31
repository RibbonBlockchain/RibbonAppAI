import React from "react";

const splitTextAtLength = (text: any, length: any) => {
  if (text?.length <= length) {
    return [text];
  }
  return [text?.slice(0, length), text?.slice(length)];
};

const AddressDisplay = ({ address }: { address: any }) => {
  const [firstPart, secondPart] = splitTextAtLength(address, 27);

  return (
    <div className="text-left break-words">
      <span className="block">{firstPart}</span>
      {secondPart && <span className="block text-center">{secondPart}</span>}
    </div>
  );
};

export default AddressDisplay;
