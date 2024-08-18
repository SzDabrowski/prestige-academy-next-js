import Script from "next/script";

function CookiesBot() {
  return (
    <Script
      id="Cookiebot"
      src="https://consent.cookiebot.com/uc.js"
      data-cbid="d2aaebb8-fc8b-4b60-ad63-52d868e43e33"
      data-blockingmode="auto"
      type="text/javascript"
    />
  );
}

export default CookiesBot;
