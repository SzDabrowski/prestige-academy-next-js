import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";

export const Recaptcha = () => {
  const [capVal, setCapVal] = useState(null);

  return (
    <ReCAPTCHA
      sitekey=""
      onChange={(val) => {
        setCapVal;
      }}
    />
  );
};
