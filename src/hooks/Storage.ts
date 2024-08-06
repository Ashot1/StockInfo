import { useState } from 'react'

export function useStorage(
   name: string,
   initialValue = '',
   storageType: 'local' | 'session' = 'local'
) {
   const [data, setData] = useState<string>(() => {
      if (typeof window === 'undefined') return initialValue

      try {
         const storageAgent =
            storageType === 'local' ? localStorage : sessionStorage

         const localStore = storageAgent.getItem(name)

         return localStore ? localStore : initialValue
      } catch (e) {
         console.error(e)
         return initialValue
      }
   })

   const setLocalStorage = (value: string) => {
      try {
         const storageAgent =
            storageType === 'local' ? localStorage : sessionStorage

         storageAgent.setItem(name, value)
         setData(value)
      } catch (e) {
         console.error(e)
      }
   }

   return [data, setLocalStorage] as const
}

export function useManyStorage(
   parameters: { name: string; initialValue: string }[],
   storageType: 'local' | 'session' = 'local'
) {
   const initStorage = () => {
      const result = new Map<string, string>()
      for (const param of parameters) {
         let localStore = null
         if (typeof window !== 'undefined') {
            const storageAgent =
               storageType === 'local' ? localStorage : sessionStorage
            localStore = storageAgent.getItem(param.name)
         }

         result.set(param.name, localStore || param.initialValue)
      }
      return result
   }

   const [data, setData] = useState<Map<string, string>>(initStorage)

   const updateStorage = (values: { name: string; value: string }[]) => {
      const result = new Map<string, string>(data)
      for (const param of values) {
         result.set(param.name, param.value)
         const storageAgent =
            storageType === 'local' ? localStorage : sessionStorage

         storageAgent.setItem(param.name, param.value)
      }
      setData(result)
   }

   return [data, updateStorage] as const
}
