'use client'

import { createContext, FC, ReactNode, useEffect, useState } from 'react'
import { LocalStorageParameters, MobileScreen } from '@/utils/config'
import Notification from '@/components/entity/Notification'
import { useMatchMedia } from '@/hooks/MatchMedia'

type withAlert = {
   needAlert?: false
   textAlert?: never
}

type withoutAlert = {
   needAlert?: true
   textAlert: { title: string; text: string }
}

export const LocalStorageCheckerContext = createContext<string | undefined>(
   undefined
)

const LocalSettingsChecker: FC<
   {
      children: ReactNode
      Params: typeof LocalStorageParameters.glowBG
   } & (withAlert | withoutAlert)
> = ({
   children,
   Params,
   needAlert = false,
   textAlert = { text: '', title: '' },
}) => {
   const [Value, setValue] = useState<undefined | string>(undefined)

   useEffect(() => {
      let item = localStorage.getItem(Params.name)

      if (!item) {
         localStorage.setItem(Params.name, Params.defaultValue)
         item = Params.defaultValue
         needAlert &&
            Notification({
               text: textAlert.text,
               title: textAlert.title,
            })
      }

      setValue(item)
   }, [
      Params.name,
      Params.defaultValue,
      needAlert,
      textAlert.text,
      textAlert.title,
   ])

   if (Params.conditionalRender && Value === Params.negative) return <></>

   return (
      <LocalStorageCheckerContext.Provider value={Value}>
         {children}
      </LocalStorageCheckerContext.Provider>
   )
}

export default LocalSettingsChecker
