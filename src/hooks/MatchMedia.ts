'use client'

import { useEffect, useState } from 'react'

export type TUseMatchMedia = (maxWidth: number | string) => boolean | null

export const useMatchMedia: TUseMatchMedia = (maxWidth) => {
   const [MatchState, setMatchState] = useState<boolean | null>(null)

   useEffect(() => {
      const checkSize = () => {
         const condition = window.matchMedia(
            typeof maxWidth === 'number'
               ? `(max-width: ${maxWidth}px)`
               : maxWidth
         ).matches

         setMatchState(condition)
      }
      checkSize()
      window.addEventListener('resize', checkSize)
   }, [maxWidth])

   return MatchState
}
