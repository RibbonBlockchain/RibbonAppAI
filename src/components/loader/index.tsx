import { SpinnerIcon } from "../icons/spinner";

const PageLoader = () => (
  <div className="absolute w-full max-w-[500px] h-full flex items-center justify-center bg-white">
    <SpinnerIcon className="w-6 h-6 text-[#7c56fe]" />
  </div>
);

export default PageLoader;
