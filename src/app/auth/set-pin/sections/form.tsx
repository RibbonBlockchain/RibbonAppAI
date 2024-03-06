import { useAtom } from "jotai";
import CreatePin from "@/components/create-pin";
import { mobileOnboardAtom } from "@/app/lib/atoms";
import { useOnboardOTPRequest } from "@/app/api/auth";
import { SpinnerIcon } from "@/components/icons/spinner";

const FormInput = () => {
  const [state, setState] = useAtom(mobileOnboardAtom);
  const { mutate: request, isPending: isRequesting } = useOnboardOTPRequest();

  const setPin = (pin: string) => setState((prev) => ({ ...prev, pin }));
  const confirmPin = (confirmPin: string) =>
    setState((prev) => ({ ...prev, confirmPin }));

  // const handleRequest = () => {
  //   if (isRequesting) return;
  //   request({ phone: state.phoneNumber });
  // };

  return (
    <>
      <CreatePin value={state.pin} setValue={setPin} />

      <p className="text-sm text-slate-600">Re-enter your pin to confirm</p>
      <CreatePin value={state.confirmPin} setValue={confirmPin} />
    </>
  );
};

export default FormInput;
