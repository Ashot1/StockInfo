import { tektur } from "@/utils/fronts";
import { ReactNode } from "react";

export default function PageTitle({ children }: { children: ReactNode }) {
  return (
    <p className={`text-base 300p:text-xl mb-6 ${tektur.className}`}>
      {children}
    </p>
  );
}
