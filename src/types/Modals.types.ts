import { InputHTMLAttributes, ReactNode } from 'react'
import { DrawerHeader, DrawerTitle } from '@/components/ui/ShadCN/drawer'
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
   UserInfo: UserProfileInfo[]
   className?: string
}

export type TProfileModalContent = Pick<IModalContent, 'type'> & ModalContent

export type UserProfileInfo = {
   Title: string
   Text: string | undefined
   Editable: boolean
   Value: string
} & Pick<InputHTMLAttributes<HTMLInputElement>, 'type'>

export type ProfileModeState =
   | { name: 'edit' }
   | (Omit<TConfirmMessage, 'className'> & { name: 'confirm' })
   | { name: 'default' }

export type SettingsModalMods =
   | { name: 'default' }
   | (Omit<TConfirmMessage, 'className'> & { name: 'confirm' })

export type ProfileModeEdit = {
   className?: string
   avatar?: string
   Info: UserProfileInfo[]
}
