import React from "react";
import Image from "next/image";

const BgEffect = () => {
  return (
    <>
      <Image
        src="/images/questionnaire/i1.png"
        alt="q1"
        width={178}
        height={178}
        className="absolute top-0 left-10 z-0"
      />
      <Image
        src="/images/questionnaire/i1.png"
        alt="q1"
        width={178}
        height={178}
        className="absolute self-end justify-center top-[37vh] z-0"
      />

      <Image
        src="/images/questionnaire/i1.png"
        alt="q1"
        width={178}
        height={178}
        className="absolute self-start justify-start left-5 bottom-28 z-0"
      />
    </>
  );
};

export default BgEffect;
