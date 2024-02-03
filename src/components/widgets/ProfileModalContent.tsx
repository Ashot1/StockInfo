'use client'

import { FC, useState } from 'react'
import { ProfileModeState, TProfileModalContent } from '@/types/Modals.types'
import CustomModalContent from '@/components/ui/CustomModalContent'
import { DrawerFooter } from '@/components/ui/drawer'
import { DialogFooter } from '@/components/ui/dialog'
import ConfirmMessage from '@/components/entity/CongirmMessage'
import ProfileDefaultModalContent from '@/components/entity/ProfileDefaultModalContent'
import { AnimatePresence, motion } from 'framer-motion'
import ProfileButtons from '@/components/entity/ProfileButtons'

const ProfileModalContent: FC<TProfileModalContent> = ({
    type,
    UserInfo,
    avatar,
}) => {
    const [Mode, setMode] = useState<ProfileModeState>({
        name: 'default',
    })
    const MotionProfileDefaultModalContent = motion(ProfileDefaultModalContent)
    const MotionConfirmMessage = motion(ConfirmMessage)

    const Drawerfooter = (
        <DrawerFooter>
            <div className="w-full flex justify-center items-center gap-4">
                <ProfileButtons setMode={setMode} />
            </div>
        </DrawerFooter>
    )
    const Dialogfooter = (
        <DialogFooter>
            <ProfileButtons setMode={setMode} />
        </DialogFooter>
    )
    const Defaultfooter = type === 'Drawer' ? Drawerfooter : Dialogfooter

    return (
        <CustomModalContent
            key="default"
            title="Профиль"
            type={type}
            AnotherFooter={Mode.name === 'default' && Defaultfooter}
        >
            <AnimatePresence initial={false} mode="wait">
                {Mode.name === 'default' && (
                    <MotionProfileDefaultModalContent
                        initial={{ x: -200, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -200, opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        UserInfo={UserInfo}
                        avatar={avatar}
                    />
                )}
                {Mode.name === 'confirm' && (
                    <MotionConfirmMessage
                        action={Mode.action}
                        className="w-full h-full 768p:h-[40dvh] px-5"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 100, opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        BackFunction={Mode.BackFunction}
                        CallbackText={Mode.CallbackText}
                        Description={Mode.Description}
                        Title={Mode.Title}
                    />
                )}
            </AnimatePresence>
        </CustomModalContent>
    )
}

export default ProfileModalContent
