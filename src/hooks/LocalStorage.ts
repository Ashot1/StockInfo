import { useState } from 'react'

export function useLocalStorage(name: string, initialValue = '') {
   const [data, setData] = useState<string>(() => {
      try {
         const localStore = localStorage.getItem(name)

         return localStore ? localStore : initialValue
      } catch (e) {
         console.error(e)
         return initialValue
      }
   })

   const setLocalStorage = (value: string) => {
      try {
         localStorage.setItem(name, value)
         setData(value)
      } catch (e) {
         console.error(e)
      }
   }

   return [data, setLocalStorage] as const
}
