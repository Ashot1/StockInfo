'use client'

import { ElementType, FC, ReactNode, useState } from 'react'
import { ProfileModeState, TProfileModalContent } from '@/types/Modals.types'
import CustomModalContent from '@/components/ui/CustomModalContent'
import { DrawerFooter } from '@/components/ui/ShadCN/drawer'
import { DialogFooter } from '@/components/ui/ShadCN/dialog'
import ConfirmMessage from '@/components/entity/CongirmMessage'
import ProfileDefaultModalContent from '@/components/entity/ProfileDefaultModalContent'
import { AnimatePresence, motion } from 'framer-motion'
import ProfileButtons from '@/components/entity/ProfileButtons'
import ProfileEditModalContent from '@/components/entity/ProfileEditModalContent'
import ProfileEditButtons from '@/components/entity/ProfileEditButtons'

const ProfileModalContent: FC<TProfileModalContent> = ({
   type,
   UserInfo,
   avatar,
}) => {
   const [Mode, setMode] = useState<ProfileModeState>({
      name: 'default',
   })

   // создание motion компонентов
   const MotionProfileDefaultModalContent = motion(ProfileDefaultModalContent)
   const MotionConfirmMessage = motion(ConfirmMessage)
   const MotionProfileEditModalContent = motion(ProfileEditModalContent)

   // выбор футера
   const Drawerfooter = ({ BtnComponent }: { BtnComponent: ElementType }) => (
      <DrawerFooter className="animate-fast-appearance-moving-top">
         <div className="flex w-full items-center justify-center gap-4">
            <BtnComponent setMode={setMode} />
         </div>
      </DrawerFooter>
   )
   const Dialogfooter = ({ BtnComponent }: { BtnComponent: ElementType }) => (
      <DialogFooter className="animate-fast-appearance-moving-top">
         <BtnComponent setMode={setMode} />
      </DialogFooter>
   )
   const Footer = ({ BtnComponent }: { BtnComponent: ElementType }) =>
      type === 'Drawer' ? (
         <Drawerfooter BtnComponent={BtnComponent} />
      ) : (
         <Dialogfooter BtnComponent={BtnComponent} />
      )

   const ChooseFooter =
      Mode.name === 'default' ? (
         <Footer BtnComponent={ProfileButtons} />
      ) : Mode.name === 'edit' ? (
         <Footer BtnComponent={ProfileEditButtons} />
      ) : undefined

   // анимации
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
         key="default"
         title="Профиль"
         type={type}
         AnotherFooter={ChooseFooter}
      >
         <AnimatePresence initial={false} mode="wait">
            {Mode.name === 'default' && (
               <MotionProfileDefaultModalContent
                  initial={{ x: -200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -200, opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  key="default"
                  UserInfo={UserInfo}
                  avatar={avatar}
               />
            )}
            {Mode.name === 'confirm' && (
               <MotionConfirmMessage
                  {...Animations.side}
                  key="confirm"
                  action={Mode.action}
                  className="h-full w-full px-5 768p:h-[40dvh]"
                  BackFunction={Mode.BackFunction}
                  CallbackText={Mode.CallbackText}
                  Description={Mode.Description}
                  Title={Mode.Title}
               />
            )}
            {Mode.name === 'edit' && (
               <MotionProfileEditModalContent
                  {...Animations.side}
                  avatar={avatar}
                  className="768p:h-[52dvh]"
                  key="edit"
                  Info={UserInfo}
               />
            )}
         </AnimatePresence>
      </CustomModalContent>
   )
}

export default ProfileModalContent
