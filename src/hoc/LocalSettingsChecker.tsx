'use client'

import { FC, ReactNode, useEffect, useState } from 'react'
import { LocalStorageParameters } from '@/utils/const'

const LocalSettingsChecker: FC<{
   children: ReactNode
   Params: typeof LocalStorageParameters.glowBG
}> = ({ children, Params }) => {
   const [Value, setValue] = useState<undefined | string>(undefined)

   useEffect(() => {
      let item = localStorage.getItem(Params.name)

      if (!item) {
         localStorage.setItem(Params.name, Params.defaultValue)
         item = Params.defaultValue
      }

      setValue(item)
   }, [Params.name, Params.defaultValue])

   if (Params.conditionalRender && Value === Params.negative) return <></>

   return children
}

export default LocalSettingsChecker
