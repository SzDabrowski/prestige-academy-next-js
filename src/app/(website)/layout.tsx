import Header from "@/components/Header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
