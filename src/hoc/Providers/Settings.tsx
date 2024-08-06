'use client'

import { createContext, ReactNode, useContext } from 'react'
import { useManyStorage } from '@/hooks/Storage'
import { LocalStorageParameters } from '@/utils/config'

type SettingsContextReturn = {
   Settings: Map<string, string>
   updateSettings: (values: { name: string; value: string }[]) => void
}

const SettingsContext = createContext<SettingsContextReturn>({
   Settings: new Map<string, string>(),
   updateSettings: () => {},
})

export default function SettingsProvider({
   children,
}: {
   children: ReactNode
}) {
   const parameters = () => {
      const result = []
      for (const [key, value] of Object.entries(LocalStorageParameters)) {
         result.push({ name: value.name, initialValue: value.defaultValue })
      }
      return result
   }

   const [Settings, updateSettings] = useManyStorage(parameters())

   return (
      <SettingsContext.Provider
         value={{ Settings: Settings, updateSettings: updateSettings }}
      >
         {children}
      </SettingsContext.Provider>
   )
}

export const useSettings = () => useContext(SettingsContext)
