'use client'

import { FC, useEffect, useState } from 'react'
import { useSettings } from '@/hoc/Providers/Settings'
import { LocalStorageParameters } from '@/utils/config'
import Notification from '@/components/entity/Notification'

const GlowBG: FC = () => {
   const [State, setState] = useState(true)
   const { Settings, updateSettings } = useSettings()
   const Parameter = Settings.get(LocalStorageParameters.glowBG.name)

   useEffect(() => {
      setState(Parameter === LocalStorageParameters.glowBG.positive)
   }, [Parameter])

   // уведомление о проблемах с производительностью
   useEffect(() => {
      if (typeof window === 'undefined') return

      const localStorageData = localStorage.getItem(
         LocalStorageParameters.glowBG.name
      )

      if (!localStorageData) {
         Notification({
            title: 'Эффект свечения включен',
            text: 'Если будут наблюдаться проблемы с производительностью вы сможете отключить его в настройках',
         })
         updateSettings([
            {
               name: LocalStorageParameters.glowBG.name,
               value: LocalStorageParameters.glowBG.positive,
            },
         ])
      }
   }, [updateSettings])

   return State && <div className="glow-effect transform-gpu" />
}

export default GlowBG
