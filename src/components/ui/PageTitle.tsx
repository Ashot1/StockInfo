import { bellota, comfortaa, poiretone, russoOne, tektur } from "@/utils/fonts";
import { ReactNode } from "react";

export default function PageTitle({ children }: { children: ReactNode }) {
  return (
    <p
      className={`text-lg 300p:text-xl mb-6 animate-appearance ${bellota.className}`}
    >
      {children}
    </p>
  );
}
