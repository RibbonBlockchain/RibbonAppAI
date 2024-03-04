"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import LinkButton from "@/components/button/link";
import { signIn, useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col h-[inherit] items-center justify-between gap-6">
      <div className="h-full w-full flex flex-col items-center justify-center gap-4 sm:gap-6">
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
        {!session && (
          <Link
            href={`/api/auth/signin`}
            onClick={(e) => {
              e.preventDefault();
              signIn("worldcoin");
            }}
            className="text-white bg-black border-black w-full py-4 flex flex-row self-center items-center justify-center text-center text-base font-semibold gap-3 rounded-xl border-2"
          >
            Signin with World ID
            <Image
              width={24}
              height={24}
              alt="world-coin"
              src="/images/world-coin.svg"
            />
          </Link>
        )}

        <LinkButton href="/auth/login">
          Continue with Mobile Number <Phone />
        </LinkButton>
      </div>
    </div>
  );
};

export default Home;
