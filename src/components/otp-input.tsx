import ReactOtpInput from "react-otp-input";

type Props = { value: string; setValue: (v: string) => void };

const OtpInput = ({ value, setValue }: Props) => (
  <ReactOtpInput
    value={value}
    numInputs={6}
    onChange={setValue}
    containerStyle={{
      display: "flex",
      paddingTop: "14px",
      alignItems: "center",
      paddingBottom: "14px",
      justifyContent: "start",
    }}
    inputStyle={{
      gap: "10px",
      width: "40px",
      height: "40px",
      outline: "none",
      fontSize: "16px",
      textAlign: "center",
      borderRadius: "5px",
      borderColor: "#007bff",
      border: "1px solid #3b3b3b",
    }}
    renderSeparator={<span className="mr-3"> </span>}
    renderInput={(props) => <input {...props} />}
  />
);

export default OtpInput;
