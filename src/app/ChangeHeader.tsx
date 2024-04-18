"use client";

import LandingHeader from "@/components/landing-page/LandingHeader/LandingHeader";
import Header from "@/components/Header/Header";

import { usePathname } from "next/navigation";

const ChangeHeader = () => {
  const pathname = usePathname();

  return pathname === "/" ? <LandingHeader /> : <Header />;
};

export default ChangeHeader;
