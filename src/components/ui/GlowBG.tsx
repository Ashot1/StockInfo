'use client'

import { FC, useEffect, useState } from 'react'
import { useSettings } from '@/hoc/Providers/Settings'
import { LocalStorageParameters } from '@/utils/config'

const GlowBG: FC = () => {
   const [State, setState] = useState(true)
   const { Settings } = useSettings()
   const Parameter = Settings.get(LocalStorageParameters.glowBG.name)

   useEffect(() => {
      setState(Parameter === LocalStorageParameters.glowBG.positive)
   }, [Parameter])

   return State && <div className="glow-effect transform-gpu" />
}

export default GlowBG
