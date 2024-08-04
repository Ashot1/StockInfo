import { useEffect, useState } from 'react'

export type THotKey = { ctrl: boolean; shift: boolean; code: string }

export const useHotKey = (hotKey?: THotKey) => {
   const [State, setState] = useState(false)

   useEffect(() => {
      if (!hotKey) return

      const listener = (e: KeyboardEvent) => {
         const CTRL = hotKey.ctrl ? e.ctrlKey : !e.ctrlKey
         const shift = hotKey.shift ? e.shiftKey : !e.shiftKey

         if (e.code === hotKey.code && CTRL && shift) setState(true)
      }

      window.addEventListener('keyup', listener)

      return () => window.removeEventListener('keyup', listener)
   }, [hotKey])

   return [State, setState] as const
}
