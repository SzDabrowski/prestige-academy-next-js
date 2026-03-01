import FirstDanceContent from "./components/firstDanceContent/FirstDanceContent";

import ContactForm from "@/components/ContactForm/ContactForm";
import Header from "@/components/Header/Header";
console.log({ ContactForm, Header });
export default function Home() {
  return (
    <main className={""}>
      <FirstDanceContent />
    </main>
  );
}
