"use client";

import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { mobileOnboardAtom } from "@/app/lib/atoms";
import { useOnboardOTPRequest } from "@/app/api/auth";

const Submit = () => {
  const router = useRouter();
  const form = useAtomValue(mobileOnboardAtom);
  const { mutate: request, isPending } = useOnboardOTPRequest();

  const onSuccess = () => {
    router.push("/auth/verify");
  };

  const handleSubmit = () => {
    if (!form.phoneNumber || isPending) return;
    request({ phone: "+" + form.phoneNumber }, { onSuccess });
  };

  return (
    <div className="flex items-center justify-center w-full pb-6">
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={isPending || !form.phoneNumber}
        className="w-full text-sm font-semibold text-center p-4 rounded-xl border-solid border-blue-500 border-2 transition-colors duration-100 focus-visible:duration-0 bg-blue-500 text-white hover:bg-blue-600 focus-visible:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-gray-300"
      >
        Continue
      </button>
    </div>
  );
};

export default Submit;
