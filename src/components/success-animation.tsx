import Image from "next/image";
import React, { useEffect, useState } from "react";

const SuccessAnimation = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="w-full h-screen absolute top-0 z-50">
      <Image
        alt="Success"
        width={300}
        height={40}
        className="w-full"
        src={"/assets/success-animation.gif"}
      />
    </div>
  );
};

export default SuccessAnimation;
