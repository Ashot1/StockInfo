'use client'

import { ElementType, FC, useState } from 'react'
import { ProfileModeState, TProfileModalContent } from '@/types/Modals.types'
import CustomModalContent from '@/components/ui/HightOrder/CustomModalContent'
import { DrawerFooter } from '@/components/ui/ShadCN/drawer'
import { DialogFooter } from '@/components/ui/ShadCN/dialog'
import ConfirmMessage from '@/components/entity/CongirmMessage'
import ProfileDefaultModalContent from '@/components/entity/ModalsContent/Profile/ProfileDefaultModalContent'
import { AnimatePresence, motion } from 'framer-motion'
import ProfileButtons from '@/components/entity/ModalsContent/Profile/ProfileButtons'
import ProfileEditModalContent from '@/components/entity/ModalsContent/Profile/ProfileEditModalContent'
import ProfileEditButtons from '@/components/entity/ModalsContent/Profile/ProfileEditButtons'

// создание motion компонентов
const MotionProfileEditModalContent = motion(ProfileEditModalContent)

const ProfileModalContent: FC<TProfileModalContent> = ({
   type,
   UserInfo,
   avatar,
}) => {
   const [Mode, setMode] = useState<ProfileModeState>({
      name: 'default',
   })

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

   const Animations = {
      main: {
         initial: { x: -100, opacity: 0 },
         animate: { x: 0, opacity: 1 },
         exit: { x: -200, opacity: 0 },
         transition: { duration: 0.1 },
      },
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
         description="Данные о пользователе"
         type={type}
         AnotherFooter={ChooseFooter}
      >
         <AnimatePresence initial={false} mode="wait">
            {Mode.name === 'default' && (
               <ProfileDefaultModalContent
                  {...Animations.main}
                  key="DefaultProfileModal"
                  UserInfo={UserInfo}
                  avatar={avatar}
               />
            )}
            {Mode.name === 'confirm' && (
               <ConfirmMessage
                  {...Animations.side}
                  key="ConfirmProfileModal"
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
                  key="EditProfileModal"
                  avatar={avatar}
                  className="768p:h-[52dvh]"
                  Info={UserInfo}
               />
            )}
         </AnimatePresence>
      </CustomModalContent>
   )
}

export default ProfileModalContent
