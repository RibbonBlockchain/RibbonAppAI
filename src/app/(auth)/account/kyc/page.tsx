import dynamic from "next/dynamic";

const Page = dynamic(() => import("@/containers/account/kyc"), { ssr: false });

export default Page;
