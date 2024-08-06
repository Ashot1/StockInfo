'use client'

import { FC, useState } from 'react'
import { IModalContent, SettingsModalMods } from '@/types/Modals.types'
import CustomModalContent from '@/components/ui/HightOrder/CustomModalContent'
import SettingsDefaultModalContent from '@/components/entity/ModalsContent/Settings/SettingsDefaultModalContent'
import { AnimatePresence, motion } from 'framer-motion'
import ConfirmMessage from '@/components/entity/CongirmMessage'

const SettingsModalContent: FC<Pick<IModalContent, 'type'>> = ({ type }) => {
   const [Mode, setMode] = useState<SettingsModalMods>({ name: 'default' })

   const MotionSettingsDefaultModalContent = motion(SettingsDefaultModalContent)

   const Animations = {
      side: {
         initial: { x: 100, opacity: 0 },
         animate: { x: 0, opacity: 1 },
         exit: { x: 100, opacity: 0 },
         transition: { duration: 0.1 },
      },
   }

   return (
      <CustomModalContent
         title="Настройки"
         type={type}
         description="Настройки приложения"
      >
         <AnimatePresence initial={false} mode="wait">
            {Mode.name === 'default' && (
               <MotionSettingsDefaultModalContent
                  initial={{ x: -200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -200, opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  key="defaultSettings"
                  setMode={setMode}
               />
            )}
            {Mode.name === 'confirm' && (
               <ConfirmMessage
                  key="confirmSettings"
                  {...Mode}
                  {...Animations.side}
                  className="h-full w-full px-5 768p:h-[40dvh]"
               />
            )}
         </AnimatePresence>
      </CustomModalContent>
   )
}

export default SettingsModalContent
