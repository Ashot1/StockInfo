import { ReactNode } from "react";
import MainHeader from "@/components/module/MainHeader";

export default function MainPagesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MainHeader />
      {children}
    </>
  );
}
