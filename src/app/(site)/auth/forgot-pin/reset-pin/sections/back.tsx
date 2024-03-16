"use client";

import { useAtom } from "jotai";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { authAtom } from "@/lib/atoms/auth.atom";

const BackArrow = () => {
  const router = useRouter();
  const [_, setState] = useAtom(authAtom);

  const handleBack = () => {
    setState((prev) => ({
      ...prev,
      code: "",
      country: "",
      phoneNumber: "",
      pin: "",
    }));
    router.back();
  };

  return (
    <div className="flex py-4 w-[40px] cursor-pointer" onClick={handleBack}>
      <ArrowLeft className="text-slate-700" />
    </div>
  );
};

export default BackArrow;
