'use client'

import { FC } from 'react'
import { IModalContent } from '@/types/Modals.types'
import CustomModalContent from '@/components/ui/CustomModalContent'
import ThemeChangeButtons from '@/components/entity/ThemeChangeButtons'
import packageJSON from '@/../package.json'
import CheckBoxRow from '@/components/ui/CheckBox/CheckBoxRow'
import { LocalStorageParameters } from '@/utils/const'
import { useRouter } from 'next/navigation'
import { useLocalStorage } from '@/hooks/LocalStorage'

const SettingsModalContent: FC<Pick<IModalContent, 'type'>> = ({ type }) => {
   const params = LocalStorageParameters.glowBG
   const [GlowBG, setGlowBG] = useLocalStorage(params.name, params.positive)

   return (
      <CustomModalContent title="Настройки" type={type}>
         <div className="flex min-h-[50dvh] flex-col gap-14 px-5">
            <ThemeChangeButtons />
            <CheckBoxRow
               text="Эффект свечения"
               click={() => {
                  setGlowBG(
                     GlowBG === params.positive
                        ? params.negative
                        : params.positive
                  )

                  setTimeout(() => window.location.reload(), 25)
               }}
               checked={GlowBG === params.positive}
            />
         </div>
         <div className="grid w-full place-items-center opacity-50">
            Версия: {packageJSON.version}
         </div>
      </CustomModalContent>
   )
}

export default SettingsModalContent
