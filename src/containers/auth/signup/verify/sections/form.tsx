import { useAtom } from "jotai";
import { authAtom } from "@/lib/atoms/auth.atom";
import { usePhoneSignUpRequest } from "@/api/auth";
import OtpInput from "@/components/input/otp-input";
import { SpinnerIcon } from "@/components/icons/spinner";

const FormInput = () => {
  const [state, setState] = useAtom(authAtom);
  const { isPending, mutate: request } = usePhoneSignUpRequest();

  const setOtp = (code: string) => setState((prev) => ({ ...prev, code }));

  const handleRequest = () => {
    if (isPending) return;
    request({ phone: state.phoneNumber });
  };

  return (
    <>
      <OtpInput
        inputType="password"
        numInputs={6}
        value={state.code}
        setValue={setOtp}
      />
      <p className="flex items-center gap-2 text-sm text-slate-600 dark:text-white">
        <span>I didn&apos;t get a code!</span>{" "}
        <span
          onClick={handleRequest}
          className="cursor-pointer text-sm inline-flex font-normal text-[#4285F4]"
        >
          {isPending ? (
            <SpinnerIcon className="text-blue-500" />
          ) : (
            "Resend Code"
          )}
        </span>
      </p>
    </>
  );
};

export default FormInput;
