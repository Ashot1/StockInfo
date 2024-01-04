"use client";

import { useEffect, useState } from "react";

export type TUseMatchMedia = (maxWidth: number) => boolean | null;
export const useMatchMedia: TUseMatchMedia = (maxWidth) => {
  const [MatchState, setMatchState] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSize = () => {
      const condition = window.matchMedia(`(max-width: ${maxWidth}px)`).matches;

      setMatchState(condition);
    };
    checkSize();
    window.addEventListener("resize", checkSize);
  }, [maxWidth]);

  return MatchState;
};
