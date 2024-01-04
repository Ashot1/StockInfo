import { useEffect, useState } from "react";

export type TUseMatchMedia = (maxWidth: number) => boolean;
export const useMatchMedia: TUseMatchMedia = (maxWidth) => {
  const condition = window.matchMedia(`(max-width: ${maxWidth}px)`).matches;
  const [MatchState, setMatchState] = useState(condition);

  useEffect(() => {
    setMatchState(condition);
  }, [window.innerWidth]);

  return MatchState;
};
