import { ReactNode } from 'react'
import { DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { TConfirmMessage } from '@/components/entity/CongirmMessage'

export interface IModalContent {
    title: string
    AnotherHeader?: ReactNode
    AnotherFooter?: ReactNode
    children?: ReactNode
    type: 'Drawer' | 'Dialog'
}

export type TModalSubContent = Omit<IModalContent, 'type'> & {
    HeaderComponent: typeof DrawerHeader
    HeaderTitleComponent: typeof DrawerTitle
}

export type ModalContent = {
    avatar?: string
    UserInfo: UserProfileInfo
    className?: string
}

export type TProfileModalContent = Pick<IModalContent, 'type'> & ModalContent

export type UserProfileInfo = {
    Title: string
    Text: string | undefined
    Editable: boolean
}[]

export type ProfileModeState =
    | (Omit<TConfirmMessage, 'className'> & { name: 'confirm' })
    | { name: 'default' }
