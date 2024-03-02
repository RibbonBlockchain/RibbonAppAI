import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import VerifyWorldID from "@/components/verify-worldID";

const Home = () => {
  // const { data: session } = useSession();

  return (
    <div className="flex flex-col h-[inherit] items-center justify-between gap-6">
      <div className="h-full w-full flex flex-col items-center justify-center gap-4 sm:gap-6">
        {/* {session ? (
          <Link href={"/api/auth/signout?callbackUrl=/"}>Logout</Link>
        ) : (
          <Link href={"/api/auth/signin"}>Signin</Link>
        )} */}

        <Image
          width={100}
          height={24}
          alt="ribbon logo"
          src="/images/ribbon.svg"
        />

        <div className="text-center">
          <h1 className="text-slate-700 text-2xl font-extrabold">
            Welcome to Ribbon Protocol
          </h1>
          <p className="text-base font-normal text-slate-500 text-center">
            Earn tokenized Universal Basic Income
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-3 pb-6">
        <button className="text-white bg-black border-black w-full py-4 flex flex-row self-center items-center justify-center text-center text-base font-semibold gap-3 rounded-xl border-2">
          Signin with World ID
          <Image
            width={24}
            height={24}
            alt="world-coin"
            src="/images/world-coin.svg"
          />
        </button>

        <VerifyWorldID />

        <Link
          href="/auth/login"
          className="w-full flex flex-row items-center justify-center gap-3 text-sm font-semibold text-center p-4 rounded-xl border-solid border-gray-300 border-2 transition-colors duration-100 focus-visible:duration-0 bg-gray-100 text-gray-700 hover:bg-gray-300 focus-visible:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-gray-300"
        >
          Continue with Mobile Number
          <Phone />
        </Link>
      </div>
    </div>
  );
};

export default Home;
