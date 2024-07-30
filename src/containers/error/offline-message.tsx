import React from "react";
// import { NoInternetSVG } from "@/public/images";

const OfflineMessage = () => {
  return (
    <div className="h-[80vh] max-w-[300px] m-auto gap-1 flex flex-col items-center justify-center">
      {/* <NoInternetSVG /> */}
      <p className="text-[22px] font-medium mt-10">No internet connection</p>
      <p className="text-sm text-[#434343] text-center">
        Can’t open the page because you are not connected to the internet
      </p>
    </div>
  );
};

export default OfflineMessage;
