import { useState } from 'react'

type StorageType = 'local' | 'session'

export function useStorage(
   name: string,
   initialValue = '',
   storageType: StorageType = 'local'
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

export type ManyStorageReturnDataType = Map<string, string>
export type UpdateManyStorageType = (
   values: { name: string; value: string }[]
) => void

export type ManyStorageParameters = { name: string; initialValue: string }[]

export function useManyStorage(
   parameters: ManyStorageParameters,
   storageType: StorageType = 'local'
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

   const [data, setData] = useState<ManyStorageReturnDataType>(initStorage)

   const updateStorage: UpdateManyStorageType = (values) => {
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
