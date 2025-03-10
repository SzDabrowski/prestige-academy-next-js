"use client";
import "./admin.css";
import { ModeToggle } from "@/components/ui/modeToggle";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="restore-spacing">
      <ModeToggle />
      {children}
    </main>
  );
}
