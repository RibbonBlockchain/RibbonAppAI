import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import Button from "@/components/button";
import WorldIDIcon from "@/components/world-icon";

const Home = () => {
  return (
    <div className="flex flex-col h-[inherit] items-center justify-between gap-6">
      <div className="h-full w-full flex flex-col items-center justify-center gap-4 sm:gap-6">
        <Image
          width={100}
          height={24}
          alt="ribbon logo"
          src="/images/ribbon-logo.png"
        />

        <div className="">
          <h1 className="text-[#141414] text-2xl font-black">
            Welcome to Ribbon Protocol
          </h1>
          <p className="text-base font-light text-center">
            Earn tokenized Universal Basic Income
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-3 pb-6">
        <button
          className={`text-white bg-[#4285F4] border-[#4285F4] w-full max-w-[370px] py-3.5 flex flex-row self-center items-center justify-center text-center text-base font-semibold gap-3 rounded-xl border-2`}
        >
          Signup with World ID
          <WorldIDIcon />
        </button>

        <Link
          href={"/auth/login"}
          className="w-full flex self-center justify-center "
        >
          <Button
            image={<Phone />}
            bgColor={"white"}
            textColor="black"
            text={"Signup with mobile number"}
          />
        </Link>
      </div>
    </div>
  );
};

export default Home;
