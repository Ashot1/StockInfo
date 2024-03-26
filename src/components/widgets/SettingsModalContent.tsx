'use client'

import { FC } from 'react'
import { IModalContent } from '@/types/Modals.types'
import CustomModalContent from '@/components/ui/CustomModalContent'
import ThemeChangeButtons from '@/components/entity/ThemeChangeButtons'
import packageJSON from '@/../package.json'
import CheckBoxRow from '@/components/ui/CheckBox/CheckBoxRow'
import { LocalStorageParameters } from '@/utils/const'
import { useRouter } from 'next/navigation'

const toggleGlow = () => {
   const params = LocalStorageParameters.glowBG
   const state = localStorage.getItem(params.name)
   localStorage.setItem(
      params.name,
      state === params.positive ? params.negative : params.positive
   )
   window.location.reload()
}

const SettingsModalContent: FC<Pick<IModalContent, 'type'>> = ({ type }) => {
   return (
      <CustomModalContent title="Настройки" type={type}>
         <div className="flex min-h-[50dvh] flex-col gap-14 px-5">
            <ThemeChangeButtons />
            <CheckBoxRow
               text="Эффект свечения"
               click={toggleGlow}
               checked={
                  localStorage.getItem(LocalStorageParameters.glowBG.name) ===
                  LocalStorageParameters.glowBG.positive
               }
            />
         </div>
         <div className="grid w-full place-items-center opacity-50">
            Версия: {packageJSON.version}
         </div>
      </CustomModalContent>
   )
}

export default SettingsModalContent
