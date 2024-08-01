import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export const verifyReCaptcha = async (data: any, executeRecaptcha: any) => {
  if (!executeRecaptcha) {
    console.log("not available to execute recaptcha");
    return;
  }

  const gRecaptchaToken = await executeRecaptcha("inquirySubmit");

  executeRecaptcha("enquiryFormSubmit").then(async (gReCaptchaToken: any) => {
    const response = await axios({
      method: "post",
      url: "/api/recaptchaSubmit",
      data: {
        name: data.name,
        email: data.email,
        phoneNumber: data.phone,
        courseTitle: data.selectedDanceCourse,
        gRecaptchaToken: gReCaptchaToken,
      },
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    if (response?.data?.success === true) {
      console.log(`Success with score: ${response?.data?.score}`);
    } else {
      console.log(`Failure with score: ${response?.data?.score}`);
    }
    return response?.data?.success;
  });
};
