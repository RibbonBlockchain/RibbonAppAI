import React, { useState } from "react";

const NumberLine = () => {
  return (
    <div className="relative w-full flex items-center mt-2">
      <div className="w-1/5 text-xs">0</div>
      <div className="flex text-xs w-full items-center justify-between">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </div>
    </div>
  );
};

export default NumberLine;
