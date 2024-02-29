import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import { countries } from "@/constants/countries";
import TextPrimary, { TextSecondary } from "@/components/text";

const Login = () => {
  return (
    <div className="flex flex-col h-[inherit] items-center justify-between gap-6">
      <div className="h-full w-full flex flex-col  gap-4 sm:gap-6">
        <Link href="/" className="flex py-4 w-[40px]">
          <ArrowLeft />
        </Link>

        <div className="flex flex-col gap-2">
          <TextPrimary text="Let’s get started!" />
          <TextSecondary text="Enter your phone number . We will send you confirmation code here" />
        </div>

        <div className="flex flex-row gap-3 mt-5">
          <div className="flex flex-col ">
            <p>Country</p>
            {/* <select className="py-3.5 pl-1 w-auto">
            {countries.map((i: any) => (
              <option key={i.name} className="flex gap-1">
                <ReactCountryFlag countryCode={i.code} />
                <h1 className="ml-1">+{i.phone}</h1>
              </option>
            ))}
          </select> */}
          </div>
          <div className="flex flex-col ">
            <p>Mobile number</p>
            <input
              type="number"
              className="py-3.5 px-2 text-base text-black border w-[200px] border-slate-300 rounded-md focus:outline-none focus:border-sky-500 focus:ring-sky-500"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full pb-6">
        <Link
          href={"/auth/verify"}
          className="w-full text-white bg-[#4285F4] border-[#4285F4] py-3.5 flex flex-row self-center items-center justify-center text-center text-base font-semibold gap-3 rounded-xl border-2"
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Login;
