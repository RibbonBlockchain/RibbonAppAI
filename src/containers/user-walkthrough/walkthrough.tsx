import {
  Next,
  Skip,
  Welcome,
  WorldID,
  Previous,
  LetsGoBtn,
  GetStarted,
  VerifyIdentity,
  CompleteProfile,
  WithdrawTokens,
} from "./containers";
import dynamic from "next/dynamic";
import { Step } from "react-joyride";

// using dynamic import for ReactJoyride to prevent hydration issues
const ReactJoyride = dynamic(() => import("react-joyride"), { ssr: false });

export const steps: Step[] = [
  {
    content: <Welcome />,
    locale: {
      skip: <Skip />,
      next: <LetsGoBtn />,
    },
    target: "body",
    placement: "center",
  },

  {
    content: <CompleteProfile />,
    locale: {
      skip: "",
      next: <Next />,
      back: <Previous />,
    },
    target: "#complete-profile",
    placement: "bottom",
  },

  {
    content: <VerifyIdentity />,
    locale: {
      skip: "",
      next: <Next />,
      back: <Previous />,
    },
    target: "#verify-identity",
    placement: "bottom",
  },
  {
    content: <WithdrawTokens />,
    locale: {
      skip: "",
      next: <Next />,
      back: <Previous />,
    },
    target: "#withdraw-tokens",
    placement: "bottom",
  },
  {
    content: <WorldID />,
    locale: {
      back: <Previous />,
      last: <GetStarted />,
    },
    target: "body",
    placement: "center",
  },
];

export const UserWalkthrough = () => {
  return (
    <ReactJoyride
      run
      continuous
      steps={steps}
      showSkipButton
      hideCloseButton
      scrollToFirstStep
      callback={() => {}}
      showProgress={true}
      styles={{
        options: {
          arrowColor: "transparent",
        },
      }}
    />
  );
};
