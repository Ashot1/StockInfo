'use client'

import { useEffect, useState } from 'react'

export type TUseMatchMedia = (maxWidth: number | string) => boolean | null

export const useMatchMedia: TUseMatchMedia = (query) => {
   const [MatchState, setMatchState] = useState<boolean | null>(null)

   useEffect(() => {
      const checkSize = () => {
         const condition = window.matchMedia(
            typeof query === 'number' ? `(max-width: ${query}px)` : query
         ).matches

         setMatchState(condition)
      }
      checkSize()
      window.addEventListener('resize', checkSize)

      return () => window.removeEventListener('resize', checkSize)
   }, [query])

   return MatchState
}
