import { useAtom } from "jotai";
import OtpInput from "@/components/otp-input";
import { mobileOnboardAtom } from "@/app/lib/atoms";
import { useOnboardOTPRequest } from "@/app/api/auth";
import { SpinnerIcon } from "@/components/icons/spinner";

const FormInput = () => {
  const [state, setState] = useAtom(mobileOnboardAtom);
  const { mutate: request, isPending: isRequesting } = useOnboardOTPRequest();

  const setOtp = (code: string) => setState((prev) => ({ ...prev, code }));

  const handleRequest = () => {
    if (isRequesting) return;
    request({ phone: state.phoneNumber });
  };

  return (
    <>
      <OtpInput value={state.code} setValue={setOtp} />
      <p className="flex items-center gap-2 text-sm text-slate-600">
        <span>I didn&apos;t get a code!</span>{" "}
        <span
          onClick={handleRequest}
          className="cursor-pointer text-sm inline-flex font-normal text-[#4285F4]"
        >
          {isRequesting ? (
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
