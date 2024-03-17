import { SpinnerIcon } from "../icons/spinner";

const PageLoader = () => (
  <div className="absolute w-full h-full flex items-center justify-center bg-white">
    <SpinnerIcon className="w-6 h-6 text-gray-800" />
  </div>
);

export default PageLoader;
