import { tektur } from "@/utils/fonts";
import { ReactNode } from "react";

export default function PageTitle({ children }: { children: ReactNode }) {
  return (
    <p
      className={`text-base 300p:text-xl mb-6 animate-appearance ${tektur.className}`}
    >
      {children}
    </p>
  );
}
