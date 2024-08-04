import { useState } from 'react'

export function useLocalStorage(name: string, initialValue = '') {
   const [data, setData] = useState<string>(() => {
      if (typeof window === 'undefined') return initialValue

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

export function useManyLocalStorage(
   parameters: { name: string; initialValue: string }[]
) {
   const initStorage = () => {
      const result = new Map<string, string>()
      for (const param of parameters) {
         let localStore = null
         if (typeof window !== 'undefined')
            localStore = localStorage.getItem(param.name)

         result.set(param.name, localStore || param.initialValue)
      }
      return result
   }

   const [data, setData] = useState<Map<string, string>>(initStorage)

   const updateStorage = (values: { name: string; value: string }[]) => {
      const result = new Map<string, string>(data)
      for (const param of values) {
         result.set(param.name, param.value)
         localStorage.setItem(param.name, param.value)
      }
      setData(result)
   }

   return [data, updateStorage] as const
}
