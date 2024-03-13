import dynamic from "next/dynamic";
import { Step } from "react-joyride";
import {
  GetStarted,
  LetsGoBtn,
  Next,
  Previous,
  SetPin,
  Skip,
  VerifyPhone,
  Welcome,
  WorldID,
} from "./containers";

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
    content: <VerifyPhone />,
    locale: {
      skip: "",
      next: <Next />,
      back: <Previous />,
    },
    target: "#verify-phone",
    placement: "bottom",
  },

  {
    content: <SetPin />,
    locale: {
      skip: "",
      next: <Next />,
      back: <Previous />,
    },
    target: "#set-pin",
    placement: "bottom",
  },
  {
    content: <WorldID />,
    locale: {
      back: <Previous />,
      last: <GetStarted />,
    },
    target: "#link-worldID",
    placement: "bottom",
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
      showProgress={false}
      styles={{
        options: {
          arrowColor: "transparent",
        },
      }}
    />
  );
};
